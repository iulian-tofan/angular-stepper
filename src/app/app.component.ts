import { Component } from '@angular/core';
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
  steps = [
    { label: 'Step 1', componentName: 'StepOneComponent' },
    { label: 'Step 2', componentName: 'StepTwoComponent' },
  ];
}
