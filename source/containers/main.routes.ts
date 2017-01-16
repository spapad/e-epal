import {
  Routes,
  RouterModule,
} from '@angular/router';

import {CamelCasePipe} from '../pipes/camelcase';
import Form3 from '../components/form-controls/form3';
import StudentsList from '../components/students/students-list';
import Home from '../components/home';
import CourseFieldsSelect from '../components/student-application-form/course-fields-select';

export const MainRoutes: Routes = [
  { path: '', component: Home },
  { path: 'form3', component: Form3 },
  { path: 'students-list', component: StudentsList },
  { path: 'course-fields-select', component: CourseFieldsSelect }
];

export const MainDeclarations = [
  CamelCasePipe,
  Form3,
  StudentsList,
  Home,
  CourseFieldsSelect
];