// dynamic-stepper.component.ts

import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Type,
  inject,
} from '@angular/core';
import { StepOneComponent } from '../step-one/step-one.component';
import { StepTwoComponent } from '../step-two/step-two.component';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

interface Step {
  label: string;
  componentName: string; // name of the component to be loaded dynamically
}

@Component({
  selector: 'app-dynamic-stepper',
  standalone: true,
  imports: [
    CommonModule,
    StepOneComponent,
    StepTwoComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './dynamic-stepper.component.html',
  styleUrl: './dynamic-stepper.component.scss',
})
export class DynamicStepperComponent implements OnInit {
  fb = inject(FormBuilder);
  @Input() steps: Step[] = [];
  @ViewChild('stepContainer', { read: ViewContainerRef, static: true })
  stepContainer!: ViewContainerRef;

  formArray!: FormArray; // Holds each step’s FormGroup
  stepNumber = 0;

  ngOnInit(): void {
    this.initForm();
    // this.loadComponent(0); // Load the first component initially
  }

  initForm() {
    // Initialize formArray with empty FormGroups for each step
    this.formArray = this.fb.array(
      this.steps.map(() => this.fb.control(null)), // FormGroups start empty, components will populate them
    );
  }

  goToStep(index: number): void {
    this.stepNumber = index;
    // this.loadComponent(index);
  }

  // loadComponent(index: number): void {
  //   const step = this.steps[index];
  //   const component = this.getComponent(step.componentName);

  //   if (!component) return;

  //   this.stepContainer.clear(); // Clear previous component
  //   const componentRef = this.stepContainer.createComponent(component); // Load new component

  //   // Pass the FormGroup of the current step to the loaded component
  //   (componentRef.instance as any).formControl = this.formArray.at(index);
  // }

  // Map componentName to actual components
  // getComponent(componentName: string): Type<any> | null {
  //   const componentsMap: { [key: string]: Type<any> } = {
  //     StepOneComponent: StepOneComponent,
  //     StepTwoComponent: StepTwoComponent,
  //     // add mappings for other components here
  //   };

  //   return componentsMap[componentName] || null;
  // }

  // form group
  mainForm: FormGroup = this.fb.group({
    group1: this.fb.control(null),
    group2: this.fb.control(null),
  });
}
