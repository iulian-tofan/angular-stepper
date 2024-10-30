import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss',
})
export class StepTwoComponent {
  @Input() formGroup!: FormGroup;

  ngOnInit(): void {
    // Add form controls to the provided FormGroup
    this.formGroup.addControl(
      'stepTwoField',
      new FormControl('', Validators.required)
    );
  }
}
