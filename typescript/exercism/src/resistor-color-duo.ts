/**
 * https://exercism.org/tracks/typescript/exercises/resistor-color-duo
 */
export enum Color {
  black = 0,
  brown,
  red,
  orange,
  yellow,
  green,
  blue,
  violet,
  grey,
  white,
}

function toColor(color: string) {
  return Color[color as keyof typeof Color];
}
export function colorCode(color: string): number {
  const [firstColor, secondColor] = color.split("-");

  return parseInt(`${toColor(firstColor)}${toColor(secondColor)}`);
}
