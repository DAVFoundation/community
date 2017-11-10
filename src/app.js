import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import badgeRoutes from './routes/badges';
import authRoutes from './routes/auth';
import personRoutes from './routes/person';
import stationRoutes from './routes/station';
import dummyDataRoutes from './routes/dummyData';
import updateRoutes from './routes/admin/update';
import passport from 'passport';
import session from 'express-session';
import uuid from 'uuid';
import config from './config';
import passportConfig from './passport/init';
import path from 'path';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

const app = express();

app.use(logger('dev'));

app.use(cors({
  origin: config.allowedOrigins,
  credentials:true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const store = new MongoStore({url:config.mongo.url});

app.use(session({
  genid: (req) => {
    return uuid.v4();
  },
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true,
  store: store
}));

store.on('connected', (e) => {
  console.log("mongo store connected");
});

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

let authApi = authRoutes(passport);

app.use('/api', badgeRoutes);
app.use('/api', authApi);
app.use('/api', personRoutes);
app.use('/api', stationRoutes);
app.use('/api', dummyDataRoutes);
app.use('/api', updateRoutes);

app.get('/', (req, res) => {
  res.send('hello world');
});

export default app;
