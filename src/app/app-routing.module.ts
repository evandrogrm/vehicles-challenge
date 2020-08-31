import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleCreateComponent } from './vehicle-create/vehicle-create.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleListComponent,
    pathMatch: 'full'
  },
  {
      path: 'veiculo/:id',
      component: VehicleFormComponent,
  },
  {
      path: 'veiculo-novo',
      component: VehicleCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
