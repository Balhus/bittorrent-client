export interface TorrentFile {
    announce: string[] | undefined;
    infoHash: string | undefined;
    pieceHashes: string[];
    pieceLength: number;
    length: number;
    name: string | string[];
}