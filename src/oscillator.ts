export interface OscillatorOptions {
  frequency: number;
  waveForm: OscillatorType;
  delay: number;
}

export class Oscillator {
  private _oscillator: OscillatorNode;
  private _context: AudioContext;
  private _connection: AudioNode;
  private _frequency: number;
  private _waveForm: OscillatorType;
  private _delay: number;

  constructor(context: AudioContext, connection: AudioNode, { frequency = 440, waveForm = 'sine', delay = 0 }: OscillatorOptions) {
    this._frequency = frequency;
    this._waveForm = waveForm;
    this._delay = delay;
    this._context = context;
    this._connection = connection;
    this._oscillator = this.#createOscillator();
  }

  get frequency(): number {
    return this._frequency;
  }

  set frequency(frequency: number) {
    this._frequency = frequency;
    this._oscillator.frequency.value = frequency;
  }

  get waveForm(): OscillatorType {
    return this._waveForm;
  }

  set waveForm(waveForm: OscillatorType) {
    this._waveForm = waveForm;
    this._oscillator.type = waveForm;
  }

  get delay(): number {
    return this._delay;
  }

  set delay(delay: number) {
    this._delay = delay;
  }

  play(delay = 0): void {
    this._oscillator = this.#createOscillator()
    this._oscillator.connect(this._connection);
    this._oscillator.start(delay);
  }
  
  stop(): void {
    this._oscillator.stop(0);
    this._oscillator.disconnect();
  }

  #createOscillator = (): OscillatorNode => {
    const oscillator = this._context.createOscillator();
    oscillator.frequency.setValueAtTime(this.frequency, this.delay);
    oscillator.type = this.waveForm;
    return oscillator;
  }
}