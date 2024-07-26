import { Text as TextNative, TextProps } from "react-native";

type HeadingProps = {
  children: React.ReactNode;
} & TextProps;

export const Heading = ({ children, ...props }: HeadingProps) => {
  return (
    <TextNative className="text-2xl font-montserrat" {...props}>
      {children}
    </TextNative>
  );
};
