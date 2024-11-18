export const generateRandomInt = (start: number = 0, end: number) => {
  return Math.floor(Math.random() * end) + start;
};

export const generateRandomColor = () => {
  return "hsla(" + Math.random() * 360 + ", 100%, 50%, 1)";
};
