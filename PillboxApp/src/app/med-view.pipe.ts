import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medView'
})
export class MedViewPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
