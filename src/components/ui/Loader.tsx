import { ActivityIndicator } from "react-native-paper";

const Loader = () => {
  return (
    <ActivityIndicator size={"large"} animating={true} color={"#539091"} />
  );
};

export default Loader;
