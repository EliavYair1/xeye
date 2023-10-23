import { Text as DefaultText, StyleSheet } from "react-native";
import colors from "../styles/colors";

export default {
  Regular: "Inter_400Regular",
  Medium: "Inter_500Medium",
  SemiBold: "Inter_600SemiBold",
  Bold: "Inter_700Bold",
};

export function Text({ style, ...props }) {
  const flattenedStyle = StyleSheet.flatten([{ fontSize: 16 }, style]);
  const defaultLineHeight =
    flattenedStyle.fontSize && flattenedStyle.fontSize * 1.15;

  return (
    <DefaultText
      style={[
        {
          lineHeight: defaultLineHeight,
          fontFamily: "Inter_400Regular",
          fontSize: 16,
          color: colors.black,
          overflow: "visible",
        },
        style,
      ]}
      {...props}
    />
  );
}

export function MediumText({ style, ...props }) {
  return <Text style={[{ fontFamily: "Inter_500Medium" }, style]} {...props} />;
}
export function SemiBoldText({ style, ...props }) {
  return (
    <Text style={[{ fontFamily: "Inter_600SemiBold" }, style]} {...props} />
  );
}

export function BoldText({ style, ...props }) {
  return <Text style={[{ fontFamily: "Inter_700Bold" }, style]} {...props} />;
}

export function HeaderText({ style, ...props }) {
  return (
    <BoldText
      style={[
        {
          textAlign: "center",
          fontSize: 30,
          letterSpacing: -0.64,
          lineHeight: 32,
        },
        style,
      ]}
      {...props}
    />
  );
}

export function XLargeButtonText({ style, ...props }) {
  return (
    <BoldText
      style={[
        {
          textAlign: "center",
          fontFamily: "GT-Flexa-Compressed-Black",
          fontSize: 32,
          textTransform: "uppercase",
        },
        style,
      ]}
      {...props}
    />
  );
}

export function LargeButtonText({ style, ...props }) {
  return (
    <BoldText
      style={[
        {
          textAlign: "center",
          fontSize: 24,
        },
        style,
      ]}
      {...props}
    />
  );
}

export function CaptionText({ style, ...props }) {
  return (
    <BoldText
      style={[
        {
          textAlign: "center",
          fontSize: 10,
        },
        style,
      ]}
      {...props}
    />
  );
}

export function CartoonText({ style, ...props }) {
  return <Text style={[{ fontFamily: "ObelixPro" }, style]} {...props} />;
}
