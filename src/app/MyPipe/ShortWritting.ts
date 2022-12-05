import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'shortwritting'
})
export class ShortWritting implements PipeTransform
{
    transform(value: any) {
        if(String(value).length>10)
        {
            return String(value).substring(0,10)+"...";
        }
        return value;
    }
}
