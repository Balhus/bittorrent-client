import parseTorrent from 'parse-torrent';

import fs from 'fs';
import express, {Request, Response} from 'express';

import { Torrent } from '../types/Torrent';
import { TorrentFile } from '../types/interfaces/TorrentFile';

// const parseTorrent = require('parse-torrent');
export const readTorrent = (req: Request, res: Response) => {
    const torrentFile = openFile();

    if(torrentFile && torrentFile.announce?.length > 0){
        const torrent = new Torrent(torrentFile);
        const port: number = 6881;
        const trackerUrl = torrent.buildTrackerURL(port);
        
        fetch(trackerUrl)
        .then(response => {
            if (!response.ok) {
              throw new Error('Hubo un problema con la respuesta del servidor.');
            }

            return response.json();
          })
        .then(data => {
            // Manejar los datos recibidos
            console.log(data);
        })        
        .catch(error => console.error(error))
    }
    // res.json(torrentFile);
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