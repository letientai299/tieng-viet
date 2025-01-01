// Helpful links for English term regarding the alphabet
// https://flavorsofhanoi.com/blog/glimpse-of-vietnamese-alphabet/

const VOWELS = [
  'a',
  'ă',
  'â',
  'e',
  'ê',
  'i',
  'o',
  'ô',
  'ơ',
  'u',
  'ư',
  'y',
] as const;

type VnVowel = (typeof VOWELS)[number];

const CONSONANTS = [
  'b',
  'c',
  'd',
  'đ',
  'g',
  'h',
  'k',
  'l',
  'm',
  'n',
  'p',
  'q',
  'r',
  's',
  't',
  'v',
  'x',
] as const;

type VnConsonant = (typeof CONSONANTS)[number];

export type VnAlphabet = VnVowel | VnConsonant;

const VOWELS_GRAVE = [
  'à',
  'ằ',
  'ầ',
  'è',
  'ề',
  'ì',
  'ò',
  'ồ',
  'ờ',
  'ù',
  'ừ',
  'ỳ',
] as const;

// dau huyen
type VnVowelWithGrave = (typeof VOWELS_GRAVE)[number];

const VOWELS_HOOK = [
  'ả',
  'ẳ',
  'ẩ',
  'ẻ',
  'ể',
  'ỉ',
  'ỏ',
  'ổ',
  'ở',
  'ủ',
  'ử',
  'ỷ',
] as const;

// dau hoi
type VnVowelWithHook = (typeof VOWELS_HOOK)[number];

const VOWELS_TILDE = [
  'ã',
  'ẵ',
  'ẫ',
  'ẽ',
  'ễ',
  'ĩ',
  'õ',
  'ỗ',
  'ỡ',
  'ũ',
  'ữ',
  'ỹ',
] as const;

// dau nga
type VnVowelWithTilde = (typeof VOWELS_TILDE)[number];

const VOWELS_ACUTE = [
  'á',
  'ắ',
  'ấ',
  'é',
  'ế',
  'í',
  'ó',
  'ố',
  'ớ',
  'ú',
  'ứ',
  'ý',
] as const;

// dau sac
type VnVowelWithAcute = (typeof VOWELS_ACUTE)[number];

const ENDING_CONSONANTS = ['c', 'ch', 'm', 'n', 'ng', 'nh', 'p', 't'] as const;

const VOWELS_DOT = [
  'ạ',
  'ặ',
  'ậ',
  'ẹ',
  'ệ',
  'ị',
  'ọ',
  'ộ',
  'ợ',
  'ụ',
  'ự',
  'ỵ',
] as const;

// dau nang
type VnVowelWithDot = (typeof VOWELS_DOT)[number];

export type VnVowelWithAccent =
  | VnVowelWithGrave
  | VnVowelWithAcute
  | VnVowelWithHook
  | VnVowelWithTilde
  | VnVowelWithDot;

const DIGRAPHS = [
  'ch',
  'gh',
  'gi',
  'kh',
  'nh',
  'ng',
  'ph',
  'th',
  'tr',
  'qu',
] as const;

const TRIGRAPH = 'ngh' as const;

type Accent = 'grave' | 'acute' | 'hook' | 'tilde' | 'dot' | 'none';

function pronounceStepsLowercase(word: string): string[][] {
  const possiblePrefixes = [[TRIGRAPH], DIGRAPHS, CONSONANTS];

  // try to find the prefixing consonant group, if any
  for (const prefixes of possiblePrefixes) {
    for (const prefix of prefixes) {
      if (word.startsWith(prefix)) {
        const rest = word.substring(prefix.length);
        return [...pronounceStepsLowercase(rest), [prefix, rest, word]];
      }
    }
  }

  // then, try to find the suffixing consonant group
  for (const ending of ENDING_CONSONANTS) {
    if (word.endsWith(ending)) {
      const n = word.length;
      const rest = word.substring(0, n - ending.length);
      return [...pronounceStepsLowercase(rest), [rest, ending, word]];
    }
  }

  return [[word]];
}

function accentMark(accent: Accent) {
  switch (accent) {
    case 'grave':
      return '\u0300';
    case 'acute':
      return '\u0301';
    case 'hook':
      return '\u0309';
    case 'tilde':
      return '\u0303';
    case 'dot':
      return '\u0323';
    case 'none':
      return '';
  }
}

function isAccent(txt: string) {
  return accentSound(txt).isAccent;
}

function accentSound(accent: string): { sound: string; isAccent: boolean } {
  switch (accent) {
    case '\u0300':
      return { sound: 'huyền', isAccent: true };
    case '\u0301':
      return { sound: 'sắc', isAccent: true };
    case '\u0309':
      return { sound: 'hỏi', isAccent: true };
    case '\u0303':
      return { sound: 'ngã', isAccent: true };
    case '\u0323':
      return { sound: 'nặng', isAccent: true };
  }
  return { sound: '', isAccent: false };
}

const pronounceSteps = (original: string) => {
  const lower = original.toLowerCase();
  const { word, accent } = findAccent(lower);
  const steps = pronounceStepsLowercase(word);
  if (accent === 'none') {
    return [...steps];
  }

  return [...steps, [word, accentMark(accent), lower]];
};

function findAccent(word: string): { accent: Accent; word: string } {
  const chars = [...word];

  const lists: Record<Accent, readonly string[]> = {
    none: [],
    grave: VOWELS_GRAVE,
    acute: VOWELS_ACUTE,
    hook: VOWELS_HOOK,
    tilde: VOWELS_TILDE,
    dot: VOWELS_DOT,
  };

  for (let i = 0; i < chars.length; i++) {
    for (const [accent, list] of Object.entries(lists)) {
      const j = list.indexOf(word[i] as never);
      if (j >= 0) {
        chars[i] = VOWELS[j];
        return {
          accent: accent as Accent,
          word: chars.join(''),
        };
      }
    }
  }

  return { accent: 'none', word: word };
}

const GG_TRANSLATE_API = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi-VN&client=tw-ob`;

function normalizePronunciation(txt: string): string {
  txt = txt.toLowerCase();
  if (
    CONSONANTS.includes(txt as never) ||
    DIGRAPHS.includes(txt as never) ||
    TRIGRAPH === (txt as never)
  ) {
    // adding "ờ" so that Google will spell "c" as "cờ" instead of "xê"
    return `${txt}ờ`;
  }

  const { sound, isAccent } = accentSound(txt as Accent);
  return isAccent ? sound : txt;
}

function audioUrl(txt: string) {
  const url = new URL(GG_TRANSLATE_API);
  const normalized = normalizePronunciation(txt);
  url.searchParams.set('q', normalized);
  return url.toString() + `#local_version=${Date.now()}`;
}

const Words = {
  pronounceSteps,
  accentMark,
  audioUrl,
  isAccent,
};

export default Words;
