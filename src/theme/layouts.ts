import { StyleSheet } from "react-native";

export const SPACE = {
  XXSMALL: 2,
  XSMALL: 6,
  SMALL: 12,
  BASE: 16,
  MEDIUM: 20,
  LARGE: 24,
  XLARGE: 36,
  XXLARGE: 48,
  XXXLARGE: 64,
};

export const Layouts = StyleSheet.create({
  container: {
    padding: SPACE.BASE,
  },
  row: {
    marginBottom: SPACE.LARGE,
  },
});

export const FlexLayouts = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  containerVerticalCenter: {
    flex: 1,
    justifyContent: "center",
  },
  containerHorizontalCenter: {
    alignItems: "center",
  },
  containerButtonBottom: {
    flexBasis: "100%",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  column: {
    gap: 8,
  },
});
