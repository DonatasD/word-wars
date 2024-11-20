import { MIN_INPUT_HEIGHT } from "../constants.ts";

export const CANVAS_HEIGHT_BREAKPOINTS = {
  xs: MIN_INPUT_HEIGHT,
  sm: MIN_INPUT_HEIGHT + 24,
  md: (MIN_INPUT_HEIGHT + 24) * 2,
  lg: (MIN_INPUT_HEIGHT + 24) * 4,
};

export const FONT_SIZES = {
  xs: `${CANVAS_HEIGHT_BREAKPOINTS.xs - 24}px`,
  sm: `${CANVAS_HEIGHT_BREAKPOINTS.sm - 24}px`,
  md: `${CANVAS_HEIGHT_BREAKPOINTS.md * 0.5}px`,
  lg: `${CANVAS_HEIGHT_BREAKPOINTS.lg * 0.5}px`,
};
