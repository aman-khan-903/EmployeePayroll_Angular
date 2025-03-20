import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <header>
        <div class="logo">
          <img src="assets/images/logo.png" alt="Employee Payroll">
          <span>EMPLOYEE PAYROLL</span>
        </div>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f5f5f5;

      header {
        background: white;
        padding: 1rem 2rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;

          img {
            height: 40px;
          }

          span {
            font-size: 1.5rem;
            font-weight: 600;
            color: #333;
          }
        }
      }

      main {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }
    }
  `]
})
export class AppComponent {
  title = 'Employee Payroll System';
}