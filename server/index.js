import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './api/api.js'
import db from './database/db.js';

const app = express();

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use('/api',router);


const URL = `mongodb+srv://dev:dev@twitit.cyprt.mongodb.net/twitit?retryWrites=true&w=majority`;
db(URL);

app.listen(5000,() => {
    console.log('server is up and running on port 8000');
})
