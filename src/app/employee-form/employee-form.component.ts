import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  template: `
    <div class="form-container">
      <h2>{{ isEditMode ? 'Edit Employee' : 'Add Employee' }}</h2>
      
      <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
        <div class="form-row">
          <label>Name</label>
          <mat-form-field appearance="outline">
            <input matInput formControlName="name" placeholder="Enter full name">
            <mat-error *ngIf="employeeForm.get('name')?.errors?.['required']">
              Name is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <label>Profile Image</label>
          <div class="profile-images">
            <div *ngFor="let image of profileImages" class="profile-option">
              <input
                type="radio"
                [value]="image"
                formControlName="profileImage"
                [id]="'profile-' + image"
              >
              <label [for]="'profile-' + image">
                <img [src]="image" [alt]="'Profile ' + image">
              </label>
            </div>
          </div>
        </div>

        <div class="form-row">
          <label>Gender</label>
          <mat-radio-group formControlName="gender">
            <mat-radio-button value="Male">Male</mat-radio-button>
            <mat-radio-button value="Female">Female</mat-radio-button>
          </mat-radio-group>
        </div>

        <div class="form-row">
          <label>Department</label>
          <div class="department-checkboxes">
            <mat-checkbox *ngFor="let dept of departments"
              [checked]="isDepartmentSelected(dept)"
              (change)="onDepartmentChange(dept, $event.checked)">
              {{ dept }}
            </mat-checkbox>
          </div>
        </div>

        <div class="form-row">
          <label>Salary</label>
          <mat-form-field appearance="outline">
            <input matInput type="number" formControlName="salary" placeholder="Enter salary">
            <mat-error *ngIf="employeeForm.get('salary')?.errors?.['required']">
              Salary is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <label>Start Date</label>
          <mat-form-field appearance="outline">
            <input matInput [matDatepicker]="picker" formControlName="startDate">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="employeeForm.get('startDate')?.errors?.['required']">
              Start date is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <label>Notes</label>
          <mat-form-field appearance="outline">
            <textarea matInput formControlName="notes" rows="4" placeholder="Enter notes"></textarea>
          </mat-form-field>
        </div>

        <div class="form-actions">
          <button mat-button type="button" routerLink="/employees">Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!employeeForm.valid">
            {{ isEditMode ? 'Update' : 'Submit' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      h2 {
        margin-bottom: 24px;
        color: #445;
      }
    }

    .form-row {
      margin-bottom: 24px;

      label {
        display: block;
        margin-bottom: 8px;
        color: #445;
        font-weight: 500;
      }

      mat-form-field {
        width: 100%;
      }
    }

    .profile-images {
      display: flex;
      gap: 16px;
      margin-top: 8px;

      .profile-option {
        input[type="radio"] {
          display: none;

          &:checked + label {
            border-color: #1976d2;
          }
        }

        label {
          display: block;
          cursor: pointer;
          padding: 4px;
          border: 2px solid transparent;
          border-radius: 50%;
          transition: all 0.3s ease;

          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
      }
    }

    .department-checkboxes {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 32px;
    }

    mat-radio-group {
      display: flex;
      gap: 16px;
    }
  `]
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  departments: string[] = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];
  profileImages: string[] = [
    'assets/image/profile1.jpg',
    'assets/image/profile2.jpg',
    'assets/image/profile3.jpg',
    'assets/image/profile4.jpg'
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      profileImage: ['', Validators.required],
      gender: ['', Validators.required],
      department: [[], Validators.required],
      salary: ['', Validators.required],
      startDate: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.employeeService.getEmployees().subscribe(employees => {
        const employee = employees.find(e => e.id === Number(id));
        if (employee) {
          this.employeeForm.patchValue(employee);
        }
      });
    }
  }

  isDepartmentSelected(dept: string): boolean {
    return this.employeeForm.get('department')?.value?.includes(dept) || false;
  }

  onDepartmentChange(dept: string, checked: boolean) {
    const departments = this.employeeForm.get('department')?.value || [];
    if (checked) {
      departments.push(dept);
    } else {
      const index = departments.indexOf(dept);
      if (index !== -1) {
        departments.splice(index, 1);
      }
    }
    this.employeeForm.patchValue({ department: departments });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
      if (this.isEditMode) {
        this.employeeService.updateEmployee(employee);
      } else {
        this.employeeService.addEmployee(employee);
      }
      this.router.navigate(['/employees']);
    }
  }
}