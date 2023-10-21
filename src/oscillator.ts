export interface OscillatorOptions {
  frequency: number;
  waveForm: OscillatorType;
  startTime: number;
}

export class Oscillator {
  oscillator: OscillatorNode;
  context: AudioContext;
  connection: AudioNode;

  constructor(context: AudioContext, connection: AudioNode, oscillatorOptions: OscillatorOptions) {
    this.frequency = oscillatorOptions.frequency;
    this.waveForm = oscillatorOptions.waveForm;
    this.startTime = oscillatorOptions.startTime;
    this.context = context;
    this.connection = connection;
    this.oscillator = this.#createOscillator();
  }

  get frequency(): number {
    return this.frequency;
  }

  get waveForm(): OscillatorType {
    return this.waveForm;
  }

  get delay(): number {
    return this.startTime;
  }

  set frequency(frequency: number) {
    this.frequency = frequency;
    this.oscillator.frequency.value = frequency;
  }

  set waveForm(waveForm: OscillatorType) {
    this.waveForm = waveForm;
    this.oscillator.type = waveForm;
  }

  set startTime(startTime: number) {
    this.startTime = startTime;
  }

  play(delay = 0): void {
    this.oscillator = this.#createOscillator()
    this.oscillator.connect(this.connection);
    this.oscillator.start(delay);
  }
  
  stop(): void {
    this.oscillator.stop(0);
    this.oscillator.disconnect();
  }

  #createOscillator = (): OscillatorNode => {
    const oscillator = this.context.createOscillator();
    oscillator.frequency.setValueAtTime(this.frequency, this.startTime);
    oscillator.type = this.waveForm;
    return oscillator;
  }
}