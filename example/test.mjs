import { createContext, createVolumeControl } from '../dist/index.js';
import { getFrequency, keys } from '../dist/frequency-utils.js';
import { Oscillator } from '../dist/oscillator.js';

const context = createContext();
const volumeControl = createVolumeControl(context);

volumeControl.connect(context.destination);

const keyOscillators = keys.map(key => 
  new Oscillator(context, volumeControl, { frequency: getFrequency(key, 4), waveForm: 'triangle' })
);

const keyboard = document.querySelector('.keyboard');

const keyboardMappings = {
  [keys[0]]: 'z',
  [keys[1]]: 's',
  [keys[2]]: 'x',
  [keys[3]]: 'd',
  [keys[4]]: 'c',
  [keys[5]]: 'v',
  [keys[6]]: 'g',
  [keys[7]]: 'b',
  [keys[8]]: 'h',
  [keys[9]]: 'n',
  [keys[10]]: 'j',
  [keys[11]]: 'm',
};

const keyStates = {};

keys.forEach((key, i) => {
  const keyElement = document.createElement('input');
  keyElement.type = 'checkbox';

  const labelElement = document.createElement('label');
  labelElement.textContent = key;

  keyElement.addEventListener('change', () => {
    if (keyElement.checked) {
      keyOscillators[i].play();
    } else {
      keyOscillators[i].stop();
    }
  });

  if(keyboardMappings[key]) {
    window.addEventListener('keydown', (event) => {
      if (event.key === keyboardMappings[key] && !keyStates[key]) {
        keyStates[key] = true;
        keyElement.checked = true;
        keyElement.dispatchEvent(new Event('change'));
      }
    });
    window.addEventListener('keyup', (event) => {
      if (event.key === keyboardMappings[key]) {
        keyStates[key] = false;
        keyElement.checked = false;
        keyElement.dispatchEvent(new Event('change'));
      }
    });
  }

  keyboard.appendChild(keyElement);
  keyboard.appendChild(labelElement);
});

const waveFormSelect = document.querySelector('select.waveform');
waveFormSelect.addEventListener('change', () => {
  keyOscillators.forEach(oscillator => {
    oscillator.waveForm = waveFormSelect.value;
  });
});
