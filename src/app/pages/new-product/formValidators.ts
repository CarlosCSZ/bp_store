import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ProductsService } from '../../services/products.service';

function idValidation(productsService: ProductsService): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const isValid = productsService.productValidation(control.value);
    return isValid ? of(null) : of({ productExist: true });
  };
}

function urlValidation(): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const urlPattern = /^(http|https):\/\/[^ "]+$/;

    if (control.value && !urlPattern.test(control.value)) {
      return of({ invalidUrl: true });
    }

    return of(null);
  };
}

function dateReleaseValidation(): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const currentDate = new Date();
    const releaseDate = new Date(control.value);

    if (
      (control.value && isNaN(releaseDate.getTime())) ||
      releaseDate < currentDate
    ) {
      return of({ invalidDateRelease: true });
    }

    return of(null);
  };
}

export { idValidation, urlValidation, dateReleaseValidation };
