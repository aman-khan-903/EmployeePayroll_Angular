import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="employee-list-container">
      <div class="header">
        <h1>Employee Details</h1>
        <div class="actions">
          <div class="search-container" [class.expanded]="isSearchExpanded">
            <button mat-icon-button (click)="toggleSearch()">
              <mat-icon>search</mat-icon>
            </button>
            <input
              *ngIf="isSearchExpanded"
              type="text"
              [(ngModel)]="searchTerm"
              placeholder="Search by name..."
              (input)="onSearch()"
            >
          </div>
          <button mat-raised-button color="primary" routerLink="/add-employee">
            <mat-icon>add</mat-icon>
            Add User
          </button>
        </div>
      </div>

      <table mat-table [dataSource]="filteredEmployees" class="employee-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>NAME</th>
          <td mat-cell *matCellDef="let employee">
            <img [src]="employee.profileImage" alt="Profile" class="profile-image">
            {{ employee.name }}
          </td>
        </ng-container>

        <ng-container matColumnDef="gender">
          <th mat-header-cell *matHeaderCellDef>GENDER</th>
          <td mat-cell *matCellDef="let employee">{{ employee.gender }}</td>
        </ng-container>

        <ng-container matColumnDef="department">
          <th mat-header-cell *matHeaderCellDef>DEPARTMENT</th>
          <td mat-cell *matCellDef="let employee">
            <span *ngFor="let dept of employee.department" class="department-tag">
              {{ dept }}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="salary">
          <th mat-header-cell *matHeaderCellDef>SALARY</th>
          <td mat-cell *matCellDef="let employee">₹ {{ employee.salary }}</td>
        </ng-container>

        <ng-container matColumnDef="startDate">
          <th mat-header-cell *matHeaderCellDef>START DATE</th>
          <td mat-cell *matCellDef="let employee">
            {{ employee.startDate | date:'dd MMM yyyy' }}
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>ACTIONS</th>
          <td mat-cell *matCellDef="let employee">
            <button mat-icon-button color="primary" [routerLink]="['/edit-employee', employee.id]">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteEmployee(employee.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .employee-list-container {
      padding: 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      h1 {
        font-size: 24px;
        color: #445;
        margin: 0;
      }

      .actions {
        display: flex;
        gap: 16px;
        align-items: center;
      }
    }

    .search-container {
      display: flex;
      align-items: center;
      transition: all 0.3s ease;

      input {
        width: 0;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-left: 8px;
        transition: all 0.3s ease;
        opacity: 0;
      }

      &.expanded input {
        width: 200px;
        opacity: 1;
      }
    }

    .employee-table {
      width: 100%;
      border-collapse: collapse;

      th {
        background: #445;
        color: white;
        font-weight: 500;
        padding: 12px 16px;
      }

      td {
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
      }
    }

    .profile-image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 12px;
      vertical-align: middle;
    }

    .department-tag {
      background: #e8f5e9;
      color: #2e7d32;
      padding: 4px 8px;
      border-radius: 16px;
      font-size: 12px;
      margin-right: 4px;
    }
  `]
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'gender', 'department', 'salary', 'startDate', 'actions'];
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  isSearchExpanded: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = employees;
    });
  }

  toggleSearch() {
    this.isSearchExpanded = !this.isSearchExpanded;
    if (!this.isSearchExpanded) {
      this.searchTerm = '';
      this.onSearch();
    }
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredEmployees = this.employees;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTermLower)
    );
  }

  deleteEmployee(id: number | undefined) {
    if (id !== undefined && confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
    }
  }
}