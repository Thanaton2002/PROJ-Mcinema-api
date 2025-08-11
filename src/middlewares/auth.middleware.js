import jwt from 'jsonwebtoken';
import createError from '../utils/createError.util.js';

export const authCheck =  (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            createError(401, "Token is required");
        }
        const token = header.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                createError(401, "Invalid token");
            }
            req.user = decoded; 
            next();
        })

    } catch (error) {
        next(error);
    }
}