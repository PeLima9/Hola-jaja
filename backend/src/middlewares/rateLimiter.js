import rateLimit from 'express-rate-limit';

//Setup library
const limiter = rateLimit({
    windowsMs: 15 * 60 * 1000,
    max: 500,
    message: {
        status: 429,
        message: "Too many requests, please try again later."
    }
});

//Export
export default limiter;