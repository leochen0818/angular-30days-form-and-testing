import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MetroStationDTO } from './station.dto';

import { Observable } from 'rxjs';

@Injectable()
export class ReactiveFormsAutoCompleteSearchingService {

  constructor(private httpClient: HttpClient) { }

  searchStation(stationName: string): Observable<MetroStationDTO[]> {
    let url = 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Station/TRTC?$format=JSON';
    if (stationName) {
      url += `&$filter=contains(StationName/Zh_tw,'${stationName}')`;
    }
    return this.httpClient.get<MetroStationDTO[]>(url);
  }
}
