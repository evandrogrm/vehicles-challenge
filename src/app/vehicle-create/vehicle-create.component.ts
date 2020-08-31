import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { MarkService } from '../mark.service';
import { Vehicle } from 'src/shared/Vehicle';
import { Mark } from 'src/shared/Mark';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss'],
})
export class VehicleCreateComponent implements OnInit {
  vehicle: Vehicle;
  form = new FormGroup({
    name: new FormControl(''),
    model: new FormControl(''),
    mark: new FormControl({}),
    cityConsume: new FormControl(''),
    highwayConsume: new FormControl(''),
    fabrication: new FormControl(''),
  });
  marks: [];

  constructor(
    private vehicleService: VehicleService,
    private markService: MarkService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.markService.findAll().subscribe((m) => (this.marks = m.content));
  }

  submit() {
    this.vehicleService.create(this.form.value).subscribe((vehicle) => {
      this.updateVehicleState(vehicle);

      setTimeout(() => { // TODO: change this to alert or something
        this.router.navigate(['/veiculo', vehicle.id]);
      }, 1000);
    });
  }

  private updateVehicleState(vehicle: Vehicle) {
    this.vehicle = vehicle;
    this.form.patchValue(vehicle);
  }

  compareFn(c1: Mark, c2: Mark): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
