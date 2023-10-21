export type Key = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' |'A#' | 'B';
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const keys: Key[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G','G#', 'A', 'A#', 'B'];

export const getFrequency = (key: Key, octave: Octave): number => {
  const semitonesFromA4 = getSemitonesFromA4(key, octave);
  return 440 * Math.pow(2, semitonesFromA4 / 12);
}

const getSemitonesFromA4 = (key: Key, octave: Octave): number => {
  const keyIndex = keys.indexOf(key);
  const aIndex = keys.indexOf('A');
  const octaveIndex = (octave - 4) * 12;
  return keyIndex - aIndex + octaveIndex;
}

