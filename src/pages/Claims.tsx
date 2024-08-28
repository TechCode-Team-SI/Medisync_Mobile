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
import Alert1 from "../components/Alert1";
import {
  Gap,
  FontFamily,
  Color,
  Border,
  FontSize,
  Padding,
} from "../../GlobalStyles";

const Claims = () => {
  const [groupContainerVisible, setGroupContainerVisible] = useState(false);

  const openGroupContainer = useCallback(() => {
    setGroupContainerVisible(true);
  }, []);

  const closeGroupContainer = useCallback(() => {
    setGroupContainerVisible(false);
  }, []);

  return (
    <>
      <View style={[styles.claims, styles.claimsFlexBox]}>
        <View style={[styles.vectorParent, styles.claimsFlexBox]}>
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require("../../assets/images/vector.png")}
          />
          <Text style={[styles.reclamos, styles.crearFlexBox]}>Reclamos</Text>
          <Image
            style={styles.vectorIcon1}
            contentFit="cover"
            source={require("../../assets/images/vector3.png")}
          />
        </View>
        <View style={[styles.groupParent, styles.parentFlexBox]}>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../../assets/images/group-101.png")}
          />
          <Text style={[styles.algoNoEst, styles.crearTypo]}>
            ¿Algo no está bien? Selecciona un tipo de reclamo y cuéntanoslo.
          </Text>
        </View>
        <View style={[styles.ttuloParent, styles.parentFlexBox]}>
          <Text style={styles.ttulo}>Título</Text>
          <TextInput style={[styles.frameItem, styles.frameBg]} />
        </View>
        <View style={[styles.ttuloParent, styles.parentFlexBox]}>
          <Text style={styles.ttulo}>Descripción</Text>
          <TextInput
            style={[styles.frameInner, styles.frameBg]}
            multiline={true}
          />
        </View>
        <Pressable style={styles.rectangleParent} onPress={openGroupContainer}>
          <View style={[styles.groupChild, styles.crearPosition]} />
          <Text style={[styles.crear, styles.crearPosition]}>Crear</Text>
        </Pressable>
        <View style={styles.maskGroup} />
      </View>

      <Modal animationType="fade" transparent visible={groupContainerVisible}>
        <View style={styles.groupContainerOverlay}>
          <Pressable
            style={styles.groupContainerBg}
            onPress={closeGroupContainer}
          />
          <Alert1 onClose={closeGroupContainer} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  claimsFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  crearFlexBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  parentFlexBox: {
    gap: Gap.gap_,
    alignItems: "center",
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
  crearPosition: {
    left: "50%",
    top: -10,
    position: "absolute",
    height: 54,
  },
  vectorIcon: {
    width: 18,
    height: 16,
  },
  reclamos: {
    letterSpacing: 1.5,
    lineHeight: 27,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    height: 20,
    textAlign: "center",
    display: "flex",
    color: Color.colorCadetblue_200,
    fontSize: FontSize.size_mini,
    flex: 1,
  },
  vectorIcon1: {
    width: 24,
    height: 24,
  },
  vectorParent: {
    backgroundColor: Color.colorPowderblue,
    height: 44,
    flexDirection: "row",
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_3xs,
    alignSelf: "stretch",
  },
  frameChild: {
    width: 109,
    height: 104,
  },
  algoNoEst: {
    color: Color.colorCadetblue_200,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.montserratBold,
    alignSelf: "stretch",
  },
  groupParent: {
    alignSelf: "stretch",
  },
  ttulo: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.robotoBold,
    color: Color.colorCadetblue_100,
    fontWeight: "700",
    textAlign: "center",
    alignSelf: "stretch",
  },
  frameItem: {
    height: 56,
  },
  ttuloParent: {
    width: 270,
  },
  frameInner: {
    height: 257,
  },
  groupContainerOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  groupContainerBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  groupChild: {
    marginLeft: -75,
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorCadetblue_200,
    width: 150,
    top: 0,
    position: "absolute",
  },
  crear: {
    marginLeft: -140,
    fontSize: FontSize.size_3xl,
    letterSpacing: 2.2,
    color: Color.colorWhite,
    width: 285,
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangleParent: {
    height: 54,
    width: 258,
  },
  maskGroup: {
    backgroundColor: Color.colorCadetblue_200,
    height: 20,
    alignSelf: "stretch",
  },
  claims: {
    backgroundColor: Color.colorWhite,
    width: "100%",
    height: 800,
    overflow: "hidden",
    gap: 26,
    flex: 1,
    borderRadius: Border.br_3xs,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Claims;
