import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './router/userRouter.js';
import membersRouter from './router/members.js';

const app = express();
const PORT = 3000;

const MONGO_URL = 'mongodb+srv://tinikashvilibarbare:123@cluster0.jhihm4r.mongodb.net/family-tree?retryWrites=true&w=majority&appName=Cluster0';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  last_name: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
  try {
    const { name, email, password, last_name, age } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const newUser = new User({ name, email, password, last_name, age });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expired or invalid' });
  }
}

app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, this is protected data.` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/members', membersRouter);

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(':white_check_mark: Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(` Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
  });