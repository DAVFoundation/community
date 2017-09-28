import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import badgeRoutes from './routes/badges';
import authRoutes from './routes/auth';
import passport from 'passport';
import session from 'express-session';
import uuid from 'uuid';

let config = null;

if(process.env.NODE_ENV !== 'production'){
  config = require('./config/config.dev.js');
} else {
  config = require('./config/config.js');
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/*app.use(session({
  genid: (req) => {
    return uuid.v4();
  },
  secret: config.sessionSecret,
  resave: false,
  saveUnitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());*/


app.use('/api', badgeRoutes);
app.use('/api',authRoutes);

export default app;
