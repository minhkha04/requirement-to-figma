import 'dotenv/config';

const env = {
    PORT: process.env.PORT,
    CORS_ORIGIN: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
        : ['*'],
    MONGODB_URI: process.env.MONGODB_URI,
    PREFIX_API: process.env.PREFIX_API,
    APP_NAME: process.env.APP_NAME,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
}

export default env;