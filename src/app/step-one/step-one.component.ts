import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
})
export class StepOneComponent {
  @Input() formGroup!: FormGroup;

  ngOnInit(): void {
    // Add form controls to the provided FormGroup
    this.formGroup.addControl(
      'stepOneField',
      new FormControl('', Validators.required)
    );
  }
}
