import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from 'src/shared/Vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  veiculos: Vehicle[] = [];

  constructor(private service: VehicleService, private router: Router) {
    // this.veiculos = [
    //   {
    //     "id": 1,
    //     "name": "Vehicle 1",
    //     "model": "Model 1",
    //     "mark": {
    //       "id": 1,
    //       "name": "Mark 1",
    //       "createdAt": "2020-08-29T18:43:36.000+00:00",
    //       "updatedAt": "2020-08-29T18:43:36.000+00:00"
    //     },
    //     "cityConsume": 10,
    //     "highwayConsume": 20,
    //     "fabrication": new Date().toString(),
    //     "createdAt": "2020-08-30T00:33:20.000+00:00",
    //     "updatedAt": "2020-08-30T00:33:20.000+00:00"
    //   },
    //   {
    //     "id": 2,
    //     "name": "Vehicle 2",
    //     "model": "Model 2",
    //     "mark": {
    //       "id": 1,
    //       "name": "Mark 1",
    //       "createdAt": "2020-08-29T18:43:36.000+00:00",
    //       "updatedAt": "2020-08-29T18:43:36.000+00:00"
    //     },
    //     "cityConsume": 12,
    //     "highwayConsume": 22,
    //     "fabrication": new Date().toString(),
    //     "createdAt": "2020-08-30T00:33:20.000+00:00",
    //     "updatedAt": "2020-08-30T00:33:20.000+00:00"
    //   },
    // ];
  }

  ngOnInit(): void {
    this.fetch();
  }

  public async fetch() {
    try {
      this.service.findAll().subscribe(r => this.veiculos = r.content);
    } catch (e) {
      console.error(e)
    }
  }

  public async novoVeiculo() {
    this.router.navigate(['/veiculo-novo']);
  }

}
