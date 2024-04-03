import { TorrentFile } from './interfaces/TorrentFile';
import * as url from 'url';
import crypto from 'crypto';


export class Torrent {
    private info: TorrentFile;

    constructor(info: TorrentFile){
        this.info = info;
    }

    buildTrackerURL(port: number): string {
        try{
            const baseUrl = new url.URL(this.info.announce);

            //Create query
            const params = new url.URLSearchParams({
                "info_hash": this.info.infoHash,
                "peer_id": this.generatePeerId(),
                "port": port.toString(),
                "uploaded": '0',
                "downloaded": '0',
                "compact": '1',
                "left": this.info.length.toString()
            });

            baseUrl.search = params.toString(); //Assign parameters to the URL

            return baseUrl.toString();
        }catch(error){
            if(error instanceof Error && typeof error.message === 'string'){ //Check is an Error and the message is a string
                throw new Error('Error at building tracker URL:' + error.message);
            }else{
                throw new Error('Error at building tracker URL: Unknown error');
            }
        }
    }

    generatePeerId(): string{
        const bytes= crypto.randomBytes(20);
    
        const peerId = bytes.toString('binary');
    
        return peerId;
    }
}