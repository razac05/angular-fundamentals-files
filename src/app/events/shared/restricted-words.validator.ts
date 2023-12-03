
import { AbstractControl, ValidatorFn } from '@angular/forms';

export const restrictedWords = (words: any): ValidatorFn => {
    return (control: AbstractControl): {[key: string]: any} | null => {
        if (!words) return null;
        var invalidWords = words
            .map((w: any) => control.value.includes(w) ? w : null)
            .filter((w: any) => w != null);
        return invalidWords && invalidWords.length > 0
            ? {'restrictedWords': invalidWords.join(', ')}
            : null;
    }
}

