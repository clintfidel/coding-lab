import express from 'express';
import { json } from 'body-parser';
import { connect, Promise, connection } from 'mongoose';
import { createServer } from 'http';
import User from './models/user';
import { log } from './utils/logger';

const mongoDB = process.env.MONGO_URI;

const app = express();

connect(mongoDB, { useMongoClient: true });
Promise = global.Promise;

const db = connection;

app.use(json());

// handler to save user
app.get('/save', (res, req) => {
  const user = new User();

  user.save((err) => {
    if (err) {
      res.status(500).send(err);
      return log(err);
    }
  });

  res.status(200).send('success');

  return res.json(user);
});

const server = createServer(app);

server.listen(80, () => {
  db.on('error', (error) => {
    log(error);
  });
});
