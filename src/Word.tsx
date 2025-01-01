import { CSSProperties } from 'react';
import Words from './util/words.ts';

type WordProps = {
  word: string;
  size?: 'sm' | 'md' | 'lg';
};

// Poem.split(/\s+/)
//   .map((w) => w.trim())
//   .filter((v) => v.length > 0)
//   .forEach((word: string) => {
//     const steps = Words.pronounceSteps(word);
//     console.log(word, '\t\t\t\t', JSON.stringify(steps));
//   });

const Word = ({ word, size }: WordProps) => {
  const fontSize = size === 'lg' ? '12rem' : size === 'md' ? '8rem' : '6rem';

  const style: CSSProperties = {
    flexBasis: '100%',
    width: '100%',
    fontSize: fontSize,
  };

  if (Words.isAccent(word)) {
    const space = `\u2800`;
    word = `${space}${word}`;
  }

  return <span style={style}>{word}</span>;
};

export default Word;
