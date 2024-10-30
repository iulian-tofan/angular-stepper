// dynamic-stepper.component.ts

import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Type,
} from '@angular/core';
import { StepOneComponent } from '../step-one/step-one.component';
import { StepTwoComponent } from '../step-two/step-two.component';
import { CommonModule } from '@angular/common';

interface Step {
  label: string;
  componentName: string; // name of the component to be loaded dynamically
}

@Component({
  selector: 'app-dynamic-stepper',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent],
  templateUrl: './dynamic-stepper.component.html',
  styleUrl: './dynamic-stepper.component.scss',
})
export class DynamicStepperComponent implements OnInit {
  @Input() steps: Step[] = [];
  @ViewChild('stepContainer', { read: ViewContainerRef, static: true })
  stepContainer!: ViewContainerRef;

  ngOnInit(): void {
    this.loadComponent(0); // Load the first component initially
  }

  goToStep(index: number): void {
    this.loadComponent(index);
  }

  loadComponent(index: number): void {
    const step = this.steps[index];
    const component = this.getComponent(step.componentName);

    if (component) {
      this.stepContainer.clear(); // Clear previous component
      this.stepContainer.createComponent(component); // Load new component
    }
  }

  // Map componentName to actual components
  getComponent(componentName: string): Type<any> | null {
    const componentsMap: { [key: string]: Type<any> } = {
      StepOneComponent: StepOneComponent,
      StepTwoComponent: StepTwoComponent,
      // add mappings for other components here
    };

    return componentsMap[componentName] || null;
  }
}
