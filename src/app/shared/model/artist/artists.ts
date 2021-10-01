import { Artist } from './artist';

export interface IArtists {
    href: string;
    items: Array<Artist>;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}
