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
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';

interface Step {
  label: string;
  componentName: string; // name of the component to be loaded dynamically
}

@Component({
  selector: 'app-dynamic-stepper',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StepOneComponent,
    StepTwoComponent,
  ],
  templateUrl: './dynamic-stepper.component.html',
  styleUrl: './dynamic-stepper.component.scss',
})
export class DynamicStepperComponent implements OnInit {
  fb = inject(FormBuilder);
  @Input() steps: Step[] = [];
  @ViewChild('stepContainer', { read: ViewContainerRef, static: true })
  stepContainer!: ViewContainerRef;

  formArray!: FormArray; // To hold all step FormGroups

  ngOnInit(): void {
    this.initForm();

    this.loadComponent(0); // Load the first component initially
  }

  initForm() {
    // Initialize formArray with a FormGroup for each step
    this.formArray = this.fb.array(
      this.steps.map(() => this.fb.group({})) // Initialize each FormGroup empty, step component will populate it
    );
  }

  goToStep(index: number): void {
    this.loadComponent(index);
  }

  loadComponent(index: number): void {
    const step = this.steps[index];
    const component = this.getComponent(step.componentName);

    if (!component) return;

    this.stepContainer.clear(); // Clear previous component
    const componentRef = this.stepContainer.createComponent(component); // Load new component
    (componentRef.instance as any).formGroup = this.formArray.at(index);
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

  // Expose the formArray for the parent to access
  get formData(): FormArray {
    return this.formArray;
  }
}
