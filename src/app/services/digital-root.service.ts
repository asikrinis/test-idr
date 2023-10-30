import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DigitalRootService {

  constructor() { }

  computeDigitalRoot(n: number) {
    return of(n).pipe(
      map(num => this.calculateDigitalRoot(num))
    );
  }

  private calculateDigitalRoot(num: number): number {
    while (num >= 10) {
      num = num.toString().split('').reduce((acc, digit) => acc + +digit, 0);
    }
    return num;
  }
}
