const decodeMorse = (pattern) => {
  let humanReadable = '';
  let whiteSpace = '\u00A0';
  const trimPattern = pattern.trim();
  if (!String(trimPattern)) {
    return 'You need to provide a morse code';
  }
  const splitPattern = trimPattern.split(' ');

  splitPattern.forEach((code) => {
    const codeMapping = MORSE_CODE[code];
    if (codeMapping) {
      humanReadable = `${humanReadable}${codeMapping}`
    }
    if (code.length === 0) {
      humanReadable = humanReadable.trim() + whiteSpace
    }
  });

  if (!humanReadable.length) {
    return 'No human readable string gotten from morse code';
  }

  return humanReadable;
}