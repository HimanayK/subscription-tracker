import express from 'express';
import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);



app.use('/api/v1/auth', authRouter) // api/v1/auth/sign-up
app.use('/api/v1/users', userRouter)  // api/v1/auth/users
app.use('/api/v1/subscriptions', subscriptionRouter) // api/v1/auth/subscriptions
app.use('/api/v1/workflows', workflowRouter);


app.use(errorMiddleware);

// This route sends an H2 heading as HTML to the browser
app.get('/', (req, res) => {
    res.send('<h2>Welcome to the Subscription Tracker API!</h2>');  // body: 'Welcome to the Subscription Tracker API!'
});

// Listen on port 3000 and log a message when the server starts
//  the parameters should be (port, callback) --> port: 3000, hostname: callback
app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    await connectToDatabase();
})