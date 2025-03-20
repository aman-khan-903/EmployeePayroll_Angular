export interface Employee {
    id?: number;
    name: string;
    profileImage: string;
    gender: 'Male' | 'Female';
    department: string[];
    salary: number;
    startDate: Date;
    notes?: string;
  }