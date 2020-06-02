import cors from 'cors';
import express from 'express';
import path from 'path';

import { hello, items, points } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(hello);
app.use(items);
app.use(points);
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3333, () => console.log("listen on port 3333"));
