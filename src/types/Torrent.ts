import { TorrentFile } from './interfaces/TorrentFile';

export class Torrent {
    private info: TorrentFile;

    constructor(info: TorrentFile){
        this.info = info;
    }
}