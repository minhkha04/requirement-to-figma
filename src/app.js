import express from 'express';
import env from './config/environment.config.js';
import cors from 'cors';
import connectDB from './config/database.config.js';
import rootRouter from './routes/root.route.js';
import { errorHandler } from "./middlewares/error-handle.middleware.js";
import rateLimit from 'express-rate-limit';
import { errorResponse } from './utils/response.util.js';
import http from 'http';
import { initSocket } from './socketIO/index.js';

const app = express();
const PORT = env.PORT;
const ALLOWED_CORS_ORIGIN = env.CORS_ORIGIN;
const PREFIX_API = env.PREFIX_API

app.use(cors({
  origin: (origin, callback) => {
    // Nếu không có origin (ví dụ: từ Postman), cho phép tất cả
    if (!origin) return callback(null, true);

    // Nếu CORS_ORIGIN là '*' thì cho phép tất cả các domain
    if (ALLOWED_CORS_ORIGIN.includes('*')) {
      return callback(null, true);
    }

    // Kiểm tra xem origin có trong whitelist không
    if (ALLOWED_CORS_ORIGIN.includes(origin)) {
      console.log(`Allowed by CORS: ${origin}`);  // Log các domain được phép
      return callback(null, true);
    }

    // Nếu không có trong whitelist -> block
    console.log(`Not allowed by CORS: ${origin}`);  // Log các domain không được phép
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true  // Cho phép cookie, token
}));

app.use(express.json());
app.use(express.static('.'));

await connectDB();

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  max: 100,             // tối đa 100 request trong 1 phút
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    return errorResponse(res, { message: "Too many requests, please try again later." }, 429);
  }
});

app.use(PREFIX_API, apiLimiter, rootRouter);
app.use(errorHandler);


const server = http.createServer(app);

initSocket(server);
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});