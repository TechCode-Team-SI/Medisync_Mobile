import { TextProps as NativeTextProps, Text as TextNative } from "react-native";

type TextProps = {
  children: React.ReactNode;
} & NativeTextProps;

export const Text = ({ children, ...props }: TextProps) => {
  return (
    <TextNative className="font-roboto" {...props}>
      {children}
    </TextNative>
  );
};
