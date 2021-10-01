import { IExternalUrl } from './externalUrl';
import { IFollower } from './follower';
import { IImage } from './image';

export class Artist {
    external_urls: IExternalUrl;
    followers: IFollower;
    genres: Array<string>;
    href: string;
    id: string;
    images: Array<IImage>;
    name: string;
    popularity: number;
    type: string;
    uri: string;
}
