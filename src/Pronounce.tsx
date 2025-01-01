import Word from './Word.tsx';
import Words from './util/words.ts';
import { CSSProperties, useEffect, useRef } from 'react';

const Speak = ({ txt }: { txt: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = Words.audioUrl(txt);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioRef]);

  const speak = async () => {
    if (audioRef.current) {
      await audioRef.current!.play();
    }
  };

  const style: CSSProperties = {
    borderRadius: '1rem',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'lowercase',
  };

  return (
    <button onClick={speak} style={style}>
      <Word word={txt} />
      <audio ref={audioRef} hidden={true}>
        <source src={audioUrl} />
      </audio>
    </button>
  );
};

const PronounceStep = ({ step }: { step: string[] }) => {
  return (
    <li
      style={{
        margin: 'auto',
        width: '100%',
        listStyleType: 'none',
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
      }}
    >
      {step.map((part) => (
        <ol key={part}>
          <Speak txt={part} />
        </ol>
      ))}
    </li>
  );
};

const Pronounce = ({ word }: { word: string }) => {
  const steps = Words.pronounceSteps(word);
  return (
    <div style={{ width: '100%' }}>
      <Word word={word} size={'lg'} />
      {steps.map((step) => (
        <PronounceStep key={step.join('+')} step={step} />
      ))}
    </div>
  );
};

export default Pronounce;
