import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service'

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  constructor(private vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this.getVehiclesList();
  }

  getVehiclesList(): void {
    this.vehiclesService.getVehicles().subscribe((res) => {
      console.log('the vehicles response: ', res);
      this.getOnlyAerialBased();
    },
    err => console.log('vehicles failed: ', err));
  }

  getOnlyAerialBased(): void {
    console.log('the Aerial Based Vehicles are: ', this.vehiclesService.getAerialBased());
  }

}
