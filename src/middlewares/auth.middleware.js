import jwt from 'jsonwebtoken';

export const authCheck =  (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            return next(createError(401, "Token is required"));
        }
        const token = header.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(createError(401, "Invalid token"));
            }
            req.user = decoded; 
            next();
        })

    } catch (error) {
        next(error);
    }
}