import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { format, parseISO } from 'date-fns';

import { ProductValidationUseCase } from 'src/domain/usecases/product-validation.usecase';

function idValidation(productValidationUC: ProductValidationUseCase): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return productValidationUC.execute(control.value)
    .pipe(
      map((isValid) => {
        return isValid ? null : { productExist: true };
      }),
      catchError(() => of({ tryLater: true }))
    );
  };
}

function dateReleaseValidation(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (control.value && control.dirty) {
      const currentDate = new Date();
      const parsedDate = formatDateStr(control.value);
      const releaseDate = new Date(parsedDate + ' 23:59');

      if (isNaN(releaseDate.getTime()) || releaseDate < currentDate) {
        return of({ invalidDateRelease: true });
      }
    }

    return of(null);
  }
}


function formatDateStr(date: string): string {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'yyyy/MM/dd');
}

export { idValidation, dateReleaseValidation };
