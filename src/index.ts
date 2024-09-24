import express, { Request, Response } from 'express';
import routes from './routes/routes';

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use('/', routes)

app.get('/', async (req: Request, res: Response) => {
  res.send('Seneca stats service');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});