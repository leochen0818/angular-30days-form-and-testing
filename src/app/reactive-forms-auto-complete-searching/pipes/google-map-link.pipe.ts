import { Pipe, PipeTransform } from '@angular/core';

import { StationPosition } from '../station.dto';

@Pipe({
  name: 'googleMapLink'
})
export class GoogleMapLinkPipe implements PipeTransform {

  transform({ PositionLat, PositionLon }: StationPosition, ...args: unknown[]): string {
    return `https://www.google.com/maps?q=${PositionLat},${PositionLon}&z=7`;
  }

}
