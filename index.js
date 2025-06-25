import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './router/userRouter.js';
import membersRouter from './router/members.js';


const app = express();
const PORT = 3000;

const MONGO_URL = 'mongodb+srv://tinikashvilibarbare:123@cluster0.jhihm4r.mongodb.net/family-tree?retryWrites=true&w=majority&appName=Cluster0';



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