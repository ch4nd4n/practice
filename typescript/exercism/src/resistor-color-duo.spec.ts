import { Color, colorCode } from "./resistor-color-duo";

describe("colorCode", () => {
  it("should return the correct color code for black and brown", () => {
    expect(colorCode("black-brown")).toBe(1);
  });

  it("should return the correct color code for red and orange", () => {
    expect(colorCode("red-orange")).toBe(23);
  });

  it("should return the correct color code for yellow and green", () => {
    expect(colorCode("yellow-green")).toBe(45);
  });

  it("should return the correct color code for blue and violet", () => {
    expect(colorCode("blue-violet")).toBe(67);
  });

  it("should return the correct color code for grey and white", () => {
    expect(colorCode("grey-white")).toBe(89);
  });
});
