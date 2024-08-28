import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import Alert11 from "../components/Alert11";
import {
  FontFamily,
  Color,
  Border,
  FontSize,
  Padding,
  Gap,
} from "../../GlobalStyles";

const Suggestions = () => {
  const [frameContainer5Visible, setFrameContainer5Visible] = useState(false);

  const openFrameContainer5 = useCallback(() => {
    setFrameContainer5Visible(true);
  }, []);

  const closeFrameContainer5 = useCallback(() => {
    setFrameContainer5Visible(false);
  }, []);

  return (
    <>
      <View style={[styles.suggestions, styles.suggestionsFlexBox]}>
        <View style={[styles.vectorParent, styles.parentFlexBox]}>
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require("../../assets/images/vector.png")}
          />
          <Text style={styles.sugerencias}>Sugerencias</Text>
          <Image
            style={styles.vectorIcon1}
            contentFit="cover"
            source={require("../../assets/images/vector1.png")}
          />
        </View>
        <View style={[styles.frameParent, styles.suggestionsFlexBox]}>
          <View style={[styles.ellipseParent, styles.frameChildLayout]}>
            <Image
              style={[styles.frameChild, styles.frameChildLayout]}
              contentFit="cover"
              source={require("../../assets/images/ellipse-25.png")}
            />
            <Image
              style={styles.vectorIcon2}
              contentFit="cover"
              source={require("../../assets/images/vector2.png")}
            />
          </View>
          <Text style={[styles.tienesAlgunaIdea, styles.crearTypo]}>
            ¿Tienes alguna idea? Compártela con nosotros.
          </Text>
        </View>
        <View style={styles.ttuloParent}>
          <Text style={styles.ttulo}>Título</Text>
          <TextInput style={[styles.frameItem, styles.frameBg]} />
        </View>
        <View style={styles.ttuloParent}>
          <Text style={styles.ttulo}>Descripción</Text>
          <TextInput
            style={[styles.frameInner, styles.frameBg]}
            multiline={true}
          />
        </View>
        <Pressable
          style={[styles.crearWrapper, styles.maskGroupBg]}
          onPress={openFrameContainer5}
        >
          <Text style={[styles.crear, styles.crearTypo]}>Crear</Text>
        </Pressable>
        <View style={[styles.maskGroup, styles.maskGroupBg]} />
      </View>

      <Modal animationType="fade" transparent visible={frameContainer5Visible}>
        <View style={styles.frameContainer5Overlay}>
          <Pressable
            style={styles.frameContainer5Bg}
            onPress={closeFrameContainer5}
          />
          <Alert11 onClose={closeFrameContainer5} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  suggestionsFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  frameChildLayout: {
    height: 104,
    width: 110,
  },
  crearTypo: {
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
    textAlign: "center",
  },
  frameBg: {
    backgroundColor: Color.colorAzure,
    alignSelf: "stretch",
    borderRadius: Border.br_3xs,
  },
  maskGroupBg: {
    backgroundColor: Color.colorCadetblue_200,
    width: 160,
  },
  vectorIcon: {
    width: 18,
    height: 16,
  },
  sugerencias: {
    letterSpacing: 1.5,
    lineHeight: 27,
    fontWeight: "400",
    fontFamily: FontFamily.montserratMedium,
    display: "flex",
    height: 20,
    textAlign: "center",
    color: Color.colorCadetblue_200,
    fontSize: FontSize.size_mini,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  vectorIcon1: {
    width: 24,
    height: 24,
  },
  vectorParent: {
    backgroundColor: Color.colorPowderblue,
    height: 30,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_3xs,
    gap: 12,
    width: 360,
  },
  frameChild: {
    position: "absolute",
    marginLeft: -30,
    top: 0,
    left: "50%",
    zIndex: 0,
  },
  vectorIcon2: {
    width: 49,
    height: 69,
    zIndex: 1,
  },
  ellipseParent: {
    paddingHorizontal: 29,
    paddingVertical: Padding.p_mid,
    gap: Gap.gap_,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tienesAlgunaIdea: {
    alignSelf: "stretch",
    fontFamily: FontFamily.montserratBold,
    color: Color.colorCadetblue_200,
    fontSize: FontSize.size_mini,
  },
  frameParent: {
    gap: Gap.gap_,
    width: 360,
    justifyContent: "center",
  },
  ttulo: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.robotoBold,
    color: Color.colorCadetblue_100,
    fontWeight: "700",
    alignSelf: "stretch",
    textAlign: "center",
  },
  frameItem: {
    height: 56,
  },
  ttuloParent: {
    width: 270,
    gap: Gap.gap_,
  },
  frameInner: {
    height: 257,
  },
  frameContainer5Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  frameContainer5Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  crear: {
    fontSize: FontSize.size_3xl,
    letterSpacing: 2.2,
    color: Color.colorWhite,
  },
  crearWrapper: {
    borderRadius: Border.br_mini,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  maskGroup: {
    height: 12,
  },
  suggestions: {
    backgroundColor: Color.colorWhite,
    width: "100%",
    height: 800,
    overflow: "hidden",
    gap: 31,
    justifyContent: "center",
    flex: 1,
    borderRadius: Border.br_3xs,
    alignItems: "center",
  },
});

export default Suggestions;
