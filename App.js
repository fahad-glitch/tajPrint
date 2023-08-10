import React from "react";
import { Text, TextInput } from "react-native";
import Router from "./src/Router";
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1;
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1;

export default function App() {
  return <Router />;
}
