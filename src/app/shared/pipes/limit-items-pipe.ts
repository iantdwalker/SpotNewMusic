import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "limitItems",
})
export class LimitItemsPipe implements PipeTransform {
  transform(value: string, itemsLimit: number, addMore: boolean): string {
    const valuesArray = value.split(",");
    const valuesLimited = valuesArray.slice(0, itemsLimit);
    if (addMore && valuesArray.length > valuesLimited.length) {
      return valuesLimited.join() + " ...";
    }
    return valuesLimited.join();
  }
}
