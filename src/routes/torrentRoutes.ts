import express from 'express';
import { readTorrent } from '../controllers/torrentController';

const router = express.Router();

router.get('/read', readTorrent);
// router.get('/read', (req: Request, res: Response) => {
//     res.json();
//     res.status(200).json({ message: 'Error al obtener usuarios' });
// });

export default router; 