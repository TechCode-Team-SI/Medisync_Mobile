import { Text } from "react-native";

interface ErrorTextProps {
  children: React.ReactNode;
}

const ErrorText = ({ children }: ErrorTextProps) => {
  return <Text className="text-red-500">{children}</Text>;
};

export default ErrorText;
