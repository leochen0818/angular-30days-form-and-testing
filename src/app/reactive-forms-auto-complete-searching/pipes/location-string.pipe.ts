import { Pipe, PipeTransform } from '@angular/core';

import { StationPosition } from '../station.dto';

@Pipe({
  name: 'locationString'
})
export class LocationStringPipe implements PipeTransform {

  transform({ PositionLat, PositionLon }: StationPosition, ...args: unknown[]): string {
    return `${PositionLat}, ${PositionLon}`;
  }

}
