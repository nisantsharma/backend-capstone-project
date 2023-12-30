import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;



export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    // console.log(token);
    // console.log(req.headers);

    if (!token) {
        return res.status(401).json({ msg: 'Token is missing' });
    }

    jwt.verify(token, ACCESS_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            console.log(err.message);

            return res.status(403).json({
                msg: 'Invalid Token'
            });
        }

        req.body.user = user;
        next();
    })
}