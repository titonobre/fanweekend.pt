export default function looksRealName(value: unknown) {
  return typeof value === "string" && !value.match(/[\d@_+*!?%#]/g);
}
