import express from 'express';
import conversationRoute from './conversation.route.js';
import messageRoute from './message.route.js';

const rootRouter = express.Router();

rootRouter.use('/conversations', conversationRoute);
rootRouter.use('/messages', messageRoute);

export default rootRouter;

