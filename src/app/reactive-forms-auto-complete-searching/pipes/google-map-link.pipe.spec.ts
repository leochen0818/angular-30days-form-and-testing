import { StationPosition } from '../station.dto';

import { GoogleMapLinkPipe } from './google-map-link.pipe';

describe('GoogleMapLinkPipe', () => {
  let pipe: GoogleMapLinkPipe;
  beforeEach(() => {
    pipe = new GoogleMapLinkPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    describe('when the first parameter is `true`', () => {
      it('should return "https://www.google.com/maps?q=2.34567,12.34567&z=7"', () => {
        // Arrange
        const firstParameter: StationPosition = {
          PositionLon: 12.34567,
          PositionLat: 2.34567,
          GeoHash: 'abcdefg'
        };
        const expectedResult = 'https://www.google.com/maps?q=2.34567,12.34567&z=7';
        // Acc
        const actualResult = pipe.transform(firstParameter);
        // Assert
        expect(actualResult).toBe(expectedResult);
      });
    });
  });
});
