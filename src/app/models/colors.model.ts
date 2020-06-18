import { Car2 } from './car2.model';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ColorsToUse {
  colors: string[] = [
    'SILVER',
    'BLACK',
    'BLUE',
    'GREEN',
    'CYAN',
    'RED',
    'MAGENTA',
    'YELLOW',
    'GOLD',
    'BEIGE',
    'BROWN',
    'DARKKHAKI',
    'DARKORANGE',
    'ALICEBLUE',
    'CHOCOLATE',
    'OLIVE',
    'LIGHTGRAY',
    'TURQUOISE',
    'PLUM',
    'DEEPSKYBLUE',
    'SALMON',
    'DARKGREEN',
  ];
  // strTryAry: Array<string> ;
  public colorToAdd(car2: Car2): string[] {
    //  this.strTryAry =  car2.lisByColor.map((e) => e.color) ;
    // return this.colors.filter((c1) => !(car2.lisByColor.map((e) => e.color), c1));

    //   return this.colors.filter((c1) => !this.strTryAry.includes(c1) );
    return this.colors.filter((c1) => !car2.lisByColor.map((e) => e.color).includes(c1));
  }
}
