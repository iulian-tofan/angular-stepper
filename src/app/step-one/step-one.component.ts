import { Component, forwardRef, inject, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepOneComponent),
      multi: true,
    },
  ],
})
export class StepOneComponent implements OnInit, ControlValueAccessor {
  fb = inject(FormBuilder);
  formGroup!: FormGroup;

  constructor() {
    this.formGroup = this.fb.group({
      control1: [''],
      control2: [''],
    });
  }

  ngOnInit(): void {
    console.log(this);
    console.log((this as any).formControl);
    this.formGroup.valueChanges.subscribe((value) => {
      console.log(value);
      this.onChange(value);
      this.onTouched();
    });
    // const newControls: any = {
    //   control1: new FormControl('value1'),
    //   control2: new FormControl('value2'),
    // };

    // Object.keys(newControls).forEach((controlName) => {
    //   this.formGroup.addControl(controlName, newControls[controlName]);
    // });

    // // this.formGroup = this.fb.group({
    // //   control1: [''],
    // //   control2: [''],
    // // });
    // this.formGroup.valueChanges.subscribe((value) => {
    //   this.onChange(value);
    //   this.onTouched();
    // });
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
