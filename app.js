const fs = require('fs');
const express = require('express');
const app = express();
// used to show the request data when a new request hits the server
const morgan = require('morgan');
const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');

// middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// middleware user to access static files in application files
app.use(express.static(`${__dirname}/public`));

// custom middleware
app.use((req, res, next) => {
  // console.log('hello from middleware');
  next();
});

//  ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
