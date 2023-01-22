import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "replaceValue",
})
export class ReplaceValuePipe implements PipeTransform {
  transform(
    value: string,
    valueToReplace: string,
    replacementValue: string
  ): string {
    return value.replace(new RegExp(valueToReplace, "g"), replacementValue);
  }
}
