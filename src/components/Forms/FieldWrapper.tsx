import { View } from "react-native";
import ErrorText from "./ErrorText";

interface FieldWrapperProps {
  children: React.ReactNode;
  errorState?: {
    message?: string;
  };
}

const FieldWrapper = ({ children, errorState }: FieldWrapperProps) => {
  return (
    <View>
      {children}
      {errorState?.message && <ErrorText>{errorState.message}</ErrorText>}
    </View>
  );
};

export default FieldWrapper;
