import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees = new BehaviorSubject<Employee[]>([
    {
      id: 1,
      name: 'Amarpa Shashanka Keerthi Kumar',
      profileImage: 'https://cdn-sharing.adobecc.com/content/storage/id/urn:aaid:sc:US:4cf380a2-4c9f-4018-b3c8-bf73e65a6c3d;revision=0?component_id=6276355b-42aa-4da3-8a76-2808b0d9edca&api_key=CometServer1&access_token=1741581099_urn%3Aaaid%3Asc%3AUS%3A4cf380a2-4c9f-4018-b3c8-bf73e65a6c3d%3Bpublic_c037b996371736401d7f08382a2dae405051a64f',
      gender: 'Female',
      department: ['Sales', 'HR', 'Finance'],
      salary: 10000,
      startDate: new Date('2019-10-29'),
      notes: ''
    },
    {
      id: 2,
      name: 'Mohammad Salman Iqbal Shaikh',
      profileImage: 'https://cdn-sharing.adobecc.com/content/storage/id/urn:aaid:sc:US:4cf380a2-4c9f-4018-b3c8-bf73e65a6c3d;revision=0?component_id=ef6c03c4-6309-4d45-8d9e-06a1f420ee80&api_key=CometServer1&access_token=1741581099_urn%3Aaaid%3Asc%3AUS%3A4cf380a2-4c9f-4018-b3c8-bf73e65a6c3d%3Bpublic_c037b996371736401d7f08382a2dae405051a64f',
      gender: 'Female',
      department: ['Sales', 'HR', 'Finance'],
      salary: 10000,
      startDate: new Date('2019-10-29'),
      notes: ''
    },
    // Add more sample employees here
  ]);

  getEmployees(): Observable<Employee[]> {
    return this.employees.asObservable();
  }

  addEmployee(employee: Employee): void {
    const currentEmployees = this.employees.value;
    this.employees.next([...currentEmployees, { ...employee, id: Date.now() }]);
  }

  updateEmployee(employee: Employee): void {
    const currentEmployees = this.employees.value;
    const index = currentEmployees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      currentEmployees[index] = employee;
      this.employees.next([...currentEmployees]);
    }
  }

  deleteEmployee(id: number): void {
    const currentEmployees = this.employees.value;
    this.employees.next(currentEmployees.filter(e => e.id !== id));
  }
}