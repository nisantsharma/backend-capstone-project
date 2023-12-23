import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';


const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;



export const registerUser = async (req, res) => {
    try {

        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const userExist = await User.findOne({ email });
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

        const token = jwt.sign(newUser.toJSON(), ACCESS_SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ msg: 'Signup successfull', data: { ...newUser, token } });
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

                return res.status(200).json({ msg: 'login successfull', data: { ...user, token } });
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

