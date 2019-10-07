import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'limitItems'
})
export class LimitItemsPipe implements PipeTransform {
    transform(value: string, itemsLimit: number) : string {        
        var genresArray = value.split(',');
        var genresLimited = genresArray.slice(0, itemsLimit);
        return genresLimited.join();        
    }
}