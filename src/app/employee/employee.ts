import {Project} from '../project/project';
import {Department} from '../department/department';

export interface Employee {
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  phone: string;
  imageUrl: string;
  employeeCode: string;
  empDepartment: Department;
  projects: Project[];
}
