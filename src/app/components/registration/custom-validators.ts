import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


/**
 * Custom validator function to check if the selected date is above a specified minimum age.
 *
 * @param minAge The minimum age required for validation.
 * @returns A validator function that checks if the date is above the minimum age.
 *
 * @example
 * ```typescript
 * const form = this.fb.group({
 *   dob: [null, [Validators.required, ageValidator(13)]]
 * });
 * ```
 *
 * @returns An object with a validation error if the age is below the minimum.
 * The error key is 'ageBelowMinimum'.
 *
 * @remarks
 * The `ageValidator` function is used in conjunction with Angular Reactive Forms
 * to validate if the selected date is above a specified minimum age.
 */
export function ageValidator(minAge: number): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value) {
      return null; // If the control value is empty, don't perform validation
    }

    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < minAge) {
      return { ageBelowMinimum: true };
    }

    return null;
  };
}
