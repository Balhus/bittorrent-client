import express from 'express';

const app = express();

app.get('/', (req,res) => {
    res.send('BitTorrent Client');
});

const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.listen(3000, () => {
    console.log('Server is up and running at port ' + PORT);
});