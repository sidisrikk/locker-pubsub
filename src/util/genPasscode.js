const genPasscode = () => {
  const tmp = new Array(6).fill(undefined);
  const arrChar = tmp.map(() => Math.floor(Math.random() * 10)).join('');
  return arrChar;
};

export default genPasscode;
