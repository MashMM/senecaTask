import express, { Response } from 'express';
import routes from './src/routes/routes';

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use('/', routes)

app.get('/', async (res: Response) => {
  res.send('Seneca stats service');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});