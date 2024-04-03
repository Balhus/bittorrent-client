import express, {Request, Response} from 'express';
import torrentRoutes from './routes/torrentRoutes';

const app = express();

app.use(express.json()) //Middleware to parse the body of requests as JSON

app.use('/torrent', torrentRoutes);

const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, () => {
    console.log('Server is up and running at port ' + PORT);
});