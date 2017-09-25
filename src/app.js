import express from 'express';
import bodyParser from 'body-parser';
import badgeRoutes from './routes/badges';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api', badgeRoutes);

export default app;
