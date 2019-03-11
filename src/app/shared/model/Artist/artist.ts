import { IExternalUrl } from './externalUrl';
import { IFollower } from './follower';
import { IImage } from './image';

export interface IArtist {
    external_urls: Array<IExternalUrl>;
    followers: Array<IFollower>;
    genres: Array<string>;
    href: string;
    id: string;
    images: Array<IImage>;
    name: string;
    popularity: string;
    type: string;
    uri: string;
}