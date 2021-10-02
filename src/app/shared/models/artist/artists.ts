import { IArtist } from './artist';

export interface IArtists {
    href: string;
    items: Array<IArtist>;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}
