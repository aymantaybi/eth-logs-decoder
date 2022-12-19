export function fromObject(value: any) {
  return value === Object(value) ? value : {};
}
