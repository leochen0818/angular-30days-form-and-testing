import { BooleanInZhTwPipe } from './boolean-in-zh-tw.pipe';

describe('BooleanInZhTwPipe', () => {
  let pipe: BooleanInZhTwPipe;
  beforeEach(() => {
    pipe = new BooleanInZhTwPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    describe('when the first parameter is `true`', () => {
      it('should return "是"', () => {
        // Arrange
        const firstParameter = true;
        const expectedResult = '是';
        // Acc
        const actualResult = pipe.transform(firstParameter);
        // Assert
        expect(actualResult).toBe(expectedResult);
      });
    });

    describe('when the first parameter is `false`', () => {
      it('should return "否"', () => {
        // Arrange
        const firstParameter = false;
        const expectedResult = '否';
        // Acc
        const actualResult = pipe.transform(firstParameter);
        // Assert
        expect(actualResult).toBe(expectedResult);
      });
    });
  });
});
