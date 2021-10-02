import { IExternalUrl } from '@models/artist/external-url';
import { IFollower } from '@models/artist/follower';
import { IImage } from '@models/artist/image';

export interface IArtist {
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
