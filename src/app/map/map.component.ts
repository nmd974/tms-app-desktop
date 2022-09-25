import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeolocationData, MarkerService } from '../marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ -21.114063, 55.4998053 ],
      zoom: 11
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    var marker = L.marker([-20.8870337, 55.41395]).addTo(this.map);
    marker.bindPopup("HELLO");
  }
  constructor(private WebsocketService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.WebsocketService.geolocations.subscribe((data: GeolocationData) => {
      // this.received.push(msg);
      console.log("Response from websocket: " + data);
      L.marker([data.latitude, data.longitude]).addTo(this.map);
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.WebsocketService.geolocations.subscribe((msg: string) => {
    //   // this.received.push(msg);
    //   console.log("Response from websocket: " + msg);
    // });
  }

}
