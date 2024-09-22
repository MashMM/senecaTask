import express from 'express';
import routes from '../src/routes/routes';

const testApp = express();
testApp.use(express.json());
testApp.use('/', routes);

export default testApp;