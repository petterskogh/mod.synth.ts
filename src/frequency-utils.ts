import { Note, Octave } from './types';

export const notes: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G','G#', 'A', 'A#', 'B'];

export const getFrequency = (note: Note, octave: Octave): number => {
  const semitonesFromA4 = getSemitonesFromA4(note, octave);
  return 440 * Math.pow(2, semitonesFromA4 / 12);
}

const getSemitonesFromA4 = (note: Note, octave: Octave): number => {
  const keyIndex = notes.indexOf(note);
  const aIndex = notes.indexOf('A');
  const octaveIndex = (octave - 4) * 12;
  return keyIndex - aIndex + octaveIndex;
}

