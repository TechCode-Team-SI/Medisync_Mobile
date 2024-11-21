import { ActivityIndicator, Modal, Portal } from "react-native-paper";

interface LoaderProps {
  showLoader: boolean;
}

const LoaderPopup = ({ showLoader }: LoaderProps) => {
  if (!showLoader) return null;

  return (
    <Portal>
      <Modal
        visible={showLoader}
        contentContainerStyle={{
          backgroundColor: "white",
          borderRadius: 100,
          padding: 10,
          marginHorizontal: "auto",
          marginVertical: "auto",
        }}
      >
        <ActivityIndicator size={"large"} animating={true} color={"#539091"} />
      </Modal>
    </Portal>
  );
};

export default LoaderPopup;
