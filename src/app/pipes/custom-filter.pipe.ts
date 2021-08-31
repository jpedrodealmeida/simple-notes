import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customfilterPipe',
    pure: false
})
export class CustomFilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter((item: any) => item.title.indexOf(filter.title) !== -1);
    }
}