export function textFormat(text: string, length: number = 20) {
  if (text == null) {
    return "";
  }
  if (text.length <= length) {
    return text;
  }
  text = text.substring(0, length);
  const last = text.lastIndexOf(" ");
  text = text.substring(0, last);
  return text + "...";
}

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
