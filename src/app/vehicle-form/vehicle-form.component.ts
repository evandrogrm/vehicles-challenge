import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VehicleService } from '../vehicle.service';
import { MarkService } from '../mark.service';
import { Vehicle } from 'src/shared/Vehicle';
import { Mark } from 'src/shared/Mark';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {
  private routerParamSub: Subscription;
  vehicle: Vehicle;
  id: number;
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
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private markService: MarkService
  ) {}

  ngOnInit(): void {
    this.routerParamSub = this.route.params.subscribe(
      (params) => (this.id = +params['id'])
    );
    this.fetch();
  }

  ngOnDestroy(): void {
    this.routerParamSub.unsubscribe();
  }

  fetch() {
    this.markService.findAll().subscribe((m) => (this.marks = m.content));
    this.vehicleService.get(this.id).subscribe((vehicle) => {
      this.updateVehicleState(vehicle);
    });
  }

  submit() {
    const _vehicle = {
      ...this.form.value,
      id: this.id,
    };
    this.vehicleService
      .update(_vehicle)
      .subscribe((vehicle) => this.updateVehicleState(vehicle));
  }

  private updateVehicleState(vehicle) {
    this.vehicle = vehicle;
    this.form.patchValue(vehicle);
  }

  compareFn(c1: Mark, c2: Mark): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
