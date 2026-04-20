import { getTriangleArea } from './MyUtil';

describe('getTriangleAreaFunc', () => {
  beforeEach(() => {
    console.log(new Date().toLocaleString());
  });

  test('pattern success', () => {
    expect(getTriangleArea(10, 2)).toBe(10);
  });
});
