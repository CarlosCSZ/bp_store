import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { format, parseISO } from 'date-fns';

import { ProductsService } from '../../services/products.service';

function idValidation(productsService: ProductsService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return productsService.productValidation(control.value)
    .pipe(
      map((isValid) => {
        console.log('idValidation: ', isValid);
        return isValid ? null : { productExist: true };
      }),
      catchError(() => of({ tryLater: true }))
    );
  };
}

function dateReleaseValidation(
  control: AbstractControl
): Observable<ValidationErrors | null> {
  if (control.value) {
    const currentDate = new Date();
    const parsedDate = formatDateStr(control.value);
    const releaseDate = new Date(parsedDate + ' 23:59');
    console.log('dateReleaseValidation: ', currentDate);

    if (isNaN(releaseDate.getTime()) || releaseDate < currentDate) {
      console.log('dateReleaseValidation validation: ', releaseDate);
      console.log('validation: ', releaseDate < currentDate);
      return of({ invalidDateRelease: true });
    }
  }

  return of(null);
}

function formatDateStr(date: string): string {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'yyyy/MM/dd');
}

export { idValidation, dateReleaseValidation };
