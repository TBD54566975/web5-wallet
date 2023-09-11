import { DefaultTheme as ReactNavigationDefaultTheme } from "@react-navigation/native";

const ColorPalette = {
  YELLOW: "#FFEC1A",
  CYAN: "#24F2FF",
  PURPLE: "#9A1AFF",
  RED: "#EB4526",
  GREEN: "#32BF00",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  GRAY_50: "#F1F1F1",
  GRAY_200: "#D3D3D3",
  GRAY_400: "#AFAFAF",
  GRAY_600: "#7C7C7C",
  GRAY_800: "#343434",
  GRAY_900: "#202020",
};

export const ColorTheme = {
  DEFAULT: ColorPalette.BLACK,
  DEFAULT_CONTRAST: ColorPalette.WHITE,
  REDUCED: ColorPalette.GRAY_600,
  MUTED: ColorPalette.GRAY_400,
  PRIMARY: ColorPalette.YELLOW,
  SUCCESS: ColorPalette.GREEN,
  DANGER: ColorPalette.RED,
};

// Monochrome theme gives us fine-grained control over color palette
export const DefaultTheme = {
  ...ReactNavigationDefaultTheme,
  colors: {
    ...ReactNavigationDefaultTheme.colors,
    primary: ColorTheme.DEFAULT,
    background: ColorTheme.DEFAULT_CONTRAST,
    text: ColorTheme.DEFAULT,
    card: ColorTheme.DEFAULT_CONTRAST,
    border: "transparent",
  },
};
