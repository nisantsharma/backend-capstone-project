import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import User from '../models/userModel.js';


dotenv.config();
const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;



export const registerUser = async (req, res) => {
    try {

        const { name, email, mobile, password } = req.body;
        // console.log(name, email, mobile, password);
        // console.log(process.env.ACCESS_SECRET_KEY);
        // console.log(typeof process.env.ACCESS_SECRET_KEY)


        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const userExist = await User.findOne({ email });
        // console.log(userExist);

        if (userExist) {
            return res.status(409).json({ msg: 'this email already exists. Please change email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = {
            name, email, mobile, password: hashedPassword
        }

        const newUser = new User(user);
        await newUser.save();

        // console.log(newUser);

        const token = jwt.sign(newUser.toJSON(), ACCESS_SECRET_KEY, { expiresIn: '1h' });
        // console.log(token);

        return res.status(200).json({ msg: 'Signup successfull', data: { name: newUser.name, token } });
    }
    catch (err) {
        return res.status(500).json({ msg: 'error while signup the user', data: err.message });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const user = await User.findOne({ email });

        if (user) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign(user.toJSON(), ACCESS_SECRET_KEY, { expiresIn: '1h' });

                return res.status(200).json({ msg: 'login successfull', data: { name: user.name, token } });
            }
            else {
                return res.status(400).json({ msg: 'Invalid email or password' });
            }
        }
        else {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

    }
    catch (err) {
        return res.status(500).json({ msg: 'error while login the user', data: err.message });
    }
}

