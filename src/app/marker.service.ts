import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

const WEBSOCKET_URL = 'http://localhost::3000';

export interface GeolocationData {
  // identifiant: number;
  latitude: number;
  longitude: number;
}
@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private data: any = [];
  public geolocations = this.socket.fromEvent<GeolocationData>('receive_geolocation');
  constructor(public socket: Socket ) {}

  // geolocations(data: any){
  //   return this.socket.fromEvent<any>('receive_geolocation');
  // }
}

