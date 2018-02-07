
export function reverse(name, reverse) {
  let className = name;
  if (reverse) {
    className = className + ' reverse';
  }
  return className;
}
