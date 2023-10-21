export const createContext = (): AudioContext => new window.AudioContext();

export const createVolumeControl = (context: AudioContext): GainNode => context.createGain();