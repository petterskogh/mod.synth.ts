import { createContext, createVolumeControl } from '../dist/index.js';
import { getFrequency, notes } from '../dist/frequency-utils.js';
import { Oscillator } from '../dist/oscillator.js';
import { createKey } from '../dist/keys.js';

const context = createContext();
const volumeControl = createVolumeControl(context);
volumeControl.connect(context.destination);

const keyOscillators = notes.map(note => 
  new Oscillator(context, volumeControl, { frequency: getFrequency(note, 3), waveForm: 'triangle' })
);

const keyboard = document.querySelector('.keyboard');

const keyboardMappings = {
  [notes[0]]: 'z',
  [notes[1]]: 's',
  [notes[2]]: 'x',
  [notes[3]]: 'd',
  [notes[4]]: 'c',
  [notes[5]]: 'v',
  [notes[6]]: 'g',
  [notes[7]]: 'b',
  [notes[8]]: 'h',
  [notes[9]]: 'n',
  [notes[10]]: 'j',
  [notes[11]]: 'm',
};

notes.forEach((note, i) => {
  const keyElement = createKey(keyOscillators[i], [keyboardMappings[note]]);

  const labelElement = document.createElement('label');
  labelElement.textContent = note;

  keyboard.appendChild(keyElement);
  keyboard.appendChild(labelElement);
});

const waveFormSelect = document.querySelector('select.waveform');
waveFormSelect.addEventListener('change', () => {
  keyOscillators.forEach(oscillator => {
    oscillator.waveForm = waveFormSelect.value;
  });
});
