import express from 'express';
import { errorHandlers, logging } from './middleware';
// import middleware from './middleware';

// const { errorHandlers } = middleware;
// console.log(errorHandlers);
const app = express();
const { generic } = errorHandlers;
const { requestLogger } = logging;

app.use(requestLogger);
app.get('/', (req, res) => {
  res.send('This is my first Express server');
});
app.use('/', (err, req, res, next) => {
  // if response has already started streaming and error occurs, pass it to Express
  // default error handler - it will close the connection and fail the request.
  if (res.headersSent) {
    next(err);
  } else {
    generic(err, req, res);
  }
});

export default app;
