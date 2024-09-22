import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {

  console.log(req.body, 'is the body being passed.')
  res.send('Seneca stats service');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});