import { StationPosition } from '../station.dto';

import { LocationStringPipe } from './location-string.pipe';

describe('LocationStringPipe', () => {
  let pipe: LocationStringPipe;
  beforeEach(() => {
    pipe = new LocationStringPipe();
  });

  it('create an instance', () => {
    const pipe = new LocationStringPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    describe('when the first parameter is `true`', () => {
      it('should return "2.34567, 12.34567"', () => {
        // Arrange
        const firstParameter: StationPosition = {
          PositionLon: 12.34567,
          PositionLat: 2.34567,
          GeoHash: 'abcdefg'
        };
        const expectedResult = '2.34567, 12.34567';
        // Acc
        const actualResult = pipe.transform(firstParameter);
        // Assert
        expect(actualResult).toBe(expectedResult);
      });
    });
  });
});
