import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

const NOTES = ['C4', 'E4', 'G4', 'A4', 'B4'];

export function useSoundEngine() {
  const [synth, setSynth] = useState<Tone.Synth | null>(null);
  const lastNoteTime = useRef(0);

  useEffect(() => {
    const newSynth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).toDestination();

    setSynth(newSynth);

    return () => {
      newSynth.dispose();
    };
  }, []);

  const playRandomNote = () => {
    if (synth && Date.now() - lastNoteTime.current > 2000) {
      const note = NOTES[Math.floor(Math.random() * NOTES.length)];
      synth.triggerAttackRelease(note, '0.1');
      lastNoteTime.current = Date.now();
    }
  };

  return { playRandomNote };
}