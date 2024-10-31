import { Component, forwardRef, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepTwoComponent),
      multi: true,
    },
  ],
})
export class StepTwoComponent implements ControlValueAccessor {
  fb = inject(FormBuilder);
  formGroup: FormGroup;

  constructor() {
    this.formGroup = this.fb.group({
      control3: [''],
      control4: [''],
    });

    this.formGroup.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};
}
