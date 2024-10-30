import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicStepperComponent } from './dynamic-stepper/dynamic-stepper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DynamicStepperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('stepper') stepper!: DynamicStepperComponent;

  steps = [
    { label: 'Step 1', componentName: 'StepOneComponent' },
    { label: 'Step 2', componentName: 'StepTwoComponent' },
  ];

  submit() {
    if (this.stepper.formData.valid) {
      console.log(this.stepper.formData.value); // Get all step values
    } else {
      console.error('Form is invalid');
    }
  }
}
