import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import badgeRoutes from './routes/badges';
import authRoutes from './routes/auth';
import personRoutes from './routes/person';
import passport from 'passport';
import session from 'express-session';
import uuid from 'uuid';
import config from './config';
import passportConfig from './passport/init';
import path from 'path';

const app = express();

app.use(logger('dev'));

app.use(cors({
  origin: config.allowedOrigins,
  credentials:true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  genid: (req) => {
    return uuid.v4();
  },
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

let authApi = authRoutes(passport);

app.use('/api', badgeRoutes);
app.use('/api', authApi);
app.use('/api', personRoutes);

export default app;
