class SoundFXManager {
  private ctx: AudioContext | null = null;
  private motorOsc: OscillatorNode | null = null;
  private motorGain: GainNode | null = null;
  private isMuted: boolean = true;
  private isMotorRunning: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopMotorSound();
    } else {
      this.playStartupChime();
    }
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio playback safety
    }
  }

  public playStartupChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [440, 554.37, 659.25, 880]; // A major 7th chord
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.07);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime + index * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + index * 0.07 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + index * 0.07);
        osc.stop(this.ctx.currentTime + index * 0.07 + 0.8);
      });
    } catch {
      // Audio safety
    }
  }

  public setMotorSpeed(speedFactor: number) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    if (speedFactor > 0.05 && !this.isMotorRunning) {
      this.startMotorSound();
    } else if (speedFactor <= 0.05 && this.isMotorRunning) {
      this.stopMotorSound();
      return;
    }

    if (this.motorOsc && this.motorGain) {
      const baseFreq = 80;
      const targetFreq = baseFreq + speedFactor * 260; // Up to 340 Hz whine
      this.motorOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
      const targetGain = Math.min(0.035, speedFactor * 0.035);
      this.motorGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }
  }

  private startMotorSound() {
    if (!this.ctx || this.motorOsc) return;
    try {
      this.motorOsc = this.ctx.createOscillator();
      this.motorGain = this.ctx.createGain();

      this.motorOsc.type = 'sawtooth';
      this.motorOsc.frequency.setValueAtTime(90, this.ctx.currentTime);

      // Lowpass filter to give high-end electric car whine
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, this.ctx.currentTime);

      this.motorGain.gain.setValueAtTime(0.001, this.ctx.currentTime);

      this.motorOsc.connect(filter);
      filter.connect(this.motorGain);
      this.motorGain.connect(this.ctx.destination);

      this.motorOsc.start();
      this.isMotorRunning = true;
    } catch {
      // Audio safety
    }
  }

  private stopMotorSound() {
    if (this.motorOsc && this.ctx) {
      try {
        if (this.motorGain) {
          this.motorGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.05);
        }
        setTimeout(() => {
          this.motorOsc?.stop();
          this.motorOsc?.disconnect();
          this.motorOsc = null;
          this.motorGain = null;
          this.isMotorRunning = false;
        }, 100);
      } catch {
        this.motorOsc = null;
        this.motorGain = null;
        this.isMotorRunning = false;
      }
    }
  }
}

export const soundFX = new SoundFXManager();
