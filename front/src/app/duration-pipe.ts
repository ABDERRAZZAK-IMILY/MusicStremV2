import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone : true
})
export class DurationPipe implements PipeTransform {

  transform(duration: number): string {

 const minuts =  Math.floor(duration / 60);

 const secend = duration % 60;


 const stringnu =  minuts.toString();

    return stringnu + ':' + secend;

    

  }

}
