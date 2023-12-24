import { Oscillator } from './oscillator';

export const createKey = (oscillator: Oscillator, activationKeys: string[]): HTMLInputElement => {
  const keyElement = document.createElement('input');
  keyElement.type = 'checkbox';

  keyElement.addEventListener('change', () => {
    console.log('woop');
    if (keyElement.checked) {
      oscillator.play();
    } else {
      oscillator.stop();
    }
  });

  playKeyOnKeyboardPress(keyElement, activationKeys);

  return keyElement;
}

export const playKeyOnKeyboardPress = (keyElement: HTMLInputElement, keyboardKeys: string[]) => {
  let isPlayed = false;

  keyboardKeys.forEach(keyboardKey => {
    window.addEventListener('keydown', (event) => {
      if (event.key === keyboardKey && !isPlayed) {
        isPlayed = true;
        toggleKeyPress(keyElement, true);
      }
    });
    window.addEventListener('keyup', (event) => {
      if (event.key === keyboardKey && isPlayed) {
        isPlayed = false;
        toggleKeyPress(keyElement, false);
      }
    });
  });
}

const toggleKeyPress = (keyElement: HTMLInputElement, play: boolean) => {
  keyElement.checked = play;
  keyElement.dispatchEvent(new Event('change'));
}

/**
 * activateKeys.forEach(activateKey => {
  });
 */