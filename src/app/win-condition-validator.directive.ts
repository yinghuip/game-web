import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[WinCondition]',
  providers: [{provide: NG_VALIDATORS, useExisting: WinConditionValidatorDirective, multi: true}]
})
export class WinConditionValidatorDirective {

  @Input()boardSize:number | undefined;

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    if(this.boardSize && control.value > this.boardSize) return {'WinCondition': true}
    return null;
  }

}
