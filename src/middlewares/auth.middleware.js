import { BaseError } from "../utils/base-error.util.js";
import jwtUtils from "../utils/jwt.util.js";


// Middleware to authenticate user by verifying JWT token
export const authenticate = (req, res, next) => {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new BaseError(401, 'No token provided');
    }

    // Bearer tokenString
    const token = authHeader.split(" ")[1];

    try {
        // Verify token
        const decoded = jwtUtils.verifyAccessToken(token);
        // Attach user info to request
        req.payload = decoded;
        next();
    } catch (err) {
        throw new BaseError(401, 'Invalid token');
    }
};


// Middleware to authorize user based on roles
export const authorize = (roles = []) => {
    return (req, res, next) => {
        if (roles.length && !roles.includes(req.payload.role)) {
            throw new BaseError(403, 'You do not have access to this resource');
        }
        next();
    }
};