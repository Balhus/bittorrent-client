import parseTorrent from 'parse-torrent';

import fs from 'fs';
import express, {Request, Response} from 'express';

import { Torrent } from '../types/Torrent';
import { TorrentFile } from '../types/interfaces/TorrentFile';
import ParseTorrent from 'parse-torrent';

// const parseTorrent = require('parse-torrent');
export const readTorrent = (req: Request, res: Response) => {
    res.json(openFile());
}

const openFile = () => {
    const filePath: string = './torrent/debian.iso.torrent';

    const torrentData = Object.prototype.constructor(parseTorrent(fs.readFileSync(filePath)));

    try {
        const announce: string[] = torrentData.announce || [];
        const infoHash: string = torrentData.infoHash || "";
        const name: string | string[] = torrentData.name || "";
        const length: number = torrentData.length || 0;
        const pieceLength: number = torrentData.pieceLength || 0;
        const pieces: string[] = torrentData.pieces || [];

        const torrentFile: TorrentFile = {
            announce: announce,
            infoHash: infoHash,
            name: name,
            length: length,
            pieceLength: pieceLength,
            pieceHashes: pieces
        };

        return torrentFile;
    } catch (err) {
        console.error('Error reading the file:', err);
        return;
    }
}