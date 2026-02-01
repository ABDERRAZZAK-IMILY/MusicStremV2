import { DurationPipe } from './duration-pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('should return "0:00" if the value is undefined', () => {
    expect(pipe.transform(undefined)).toBe('0:00');
  });

  it('should correctly convert seconds to minute:second format', () => {
    expect(pipe.transform(75)).toBe('1:15');
  });

  it('should add a leading zero to seconds if they are less than 10', () => {
    expect(pipe.transform(65)).toBe('1:05');
  });
});
