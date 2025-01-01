import { useEffect, useRef, useState } from 'react';
import Word from './Word.tsx';
import { Poem } from './Poem.ts';
import Words from './util/words.ts';
import Pronounce from './Pronounce.tsx';

function Accents() {
  const space = `\u2800`;
  const wrap = (s: string) => `${space}${s}`;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        minWidth: '100%',
        margin: 'auto',
        gap: '0.5rem',
      }}
    >
      <Word word={wrap(Words.accentMark('grave'))} />
      <Word word={wrap(Words.accentMark('acute'))} />
      <Word word={wrap(Words.accentMark('hook'))} />
      <Word word={wrap(Words.accentMark('tilde'))} />
      <Word word={wrap(Words.accentMark('dot'))} />
    </div>
  );
}

function App() {
  const [word, setWord] = useState('mẹ');
  return (
    <>
      <h1>Learn to read Vietnamese</h1>
      <input
        type={'text'}
        style={{ fontSize: '5rem', borderRadius: '1rem', padding: '1rem' }}
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <Pronounce word={word} />
      <hr />

      <Pronounce word={'con'} />
      <Pronounce word={'ba'} />
      <Pronounce word={'thương'} />
      <Pronounce word={'giống'} />
      <Pronounce word={'mẹ'} />
      <Pronounce word={'mẹ'} />
      <Pronounce word={'cả'} />
      <Pronounce word={'nhà'} />
      <Pronounce word={'ngã'} />
    </>
  );
}

function Input() {
  const [text, setText] = useState(Poem);
  const audioElem = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioElem.current?.load();
  }, [text]);

  const audioUrl = Words.audioUrl(text);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Input</h2>
      <textarea
        style={{ minHeight: '4rem' }}
        id="word"
        placeholder={'Input word to speak'}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <audio controls={true} ref={audioElem}>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;
