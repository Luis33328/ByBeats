import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(beats: any[], searchTerm: string): any[] {
    if (!beats || !searchTerm) {
      return beats;
    }

    return beats.filter(beat =>
      beat.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}