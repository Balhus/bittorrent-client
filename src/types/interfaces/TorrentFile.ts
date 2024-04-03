export interface TorrentFile {
    announce: string[];
    infoHash: string;
    pieceHashes: string[];
    pieceLength: number;
    length: number;
    name: string | string[];
}