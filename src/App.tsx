import { useState } from 'react';
import Pronounce from './Pronounce.tsx';

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

export default App;
