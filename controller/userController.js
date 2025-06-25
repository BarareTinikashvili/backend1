import {User} from '../models/usermodel.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req , res) => {
    const{name , password, last_name, email, age} = req.body
    const newUser = new User({name , password, last_name, email, age});
    await newUser.save()
    res.status(201).json({message:'new user has been created'})
}

export const loginUser = async (req, res) => {
   const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = bcrypt.compare(user.password, password)
    
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    res.status(200).send({ user});
}

