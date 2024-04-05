export const removeQuote = (text) => {
  if (text && text.length > 0 && text.includes(`"`)) {
    return text.split(`"`)[1];
  } else {
    return text;
  }
};
