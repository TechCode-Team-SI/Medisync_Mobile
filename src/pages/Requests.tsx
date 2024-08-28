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
import Alert2 from "../components/Alert2";
import {
  FontFamily,
  Color,
  FontSize,
  Padding,
  Border,
} from "../../GlobalStyles";

const Requests = () => {
  const [groupContainerVisible, setGroupContainerVisible] = useState(false);

  const openGroupContainer = useCallback(() => {
    setGroupContainerVisible(true);
  }, []);

  const closeGroupContainer = useCallback(() => {
    setGroupContainerVisible(false);
  }, []);

  return (
    <>
      <View style={styles.requests}>
        <View style={[styles.vectorParent, styles.parentFlexBox]}>
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require("../../assets/images/vector.png")}
          />
          <Text style={[styles.ajusteDeCita, styles.crearFlexBox]}>
            Ajuste de Cita
          </Text>
          <Image
            style={styles.arcticonsgoogleWebviewDevto}
            contentFit="cover"
            source={require("../../assets/images/arcticonsgooglewebviewdevtools.png")}
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
        <TextInput style={styles.requestsChild} multiline={true} />
        <Pressable style={styles.rectangleParent} onPress={openGroupContainer}>
          <View style={[styles.groupChild, styles.crearPosition]} />
          <Text style={[styles.crear, styles.crearPosition]}>Crear</Text>
        </Pressable>
        <Image
          style={styles.maskGroupIcon}
          contentFit="cover"
          source={require("../../assets/images/mask-group.png")}
        />
      </View>

      <Modal animationType="fade" transparent visible={groupContainerVisible}>
        <View style={styles.groupContainerOverlay}>
          <Pressable
            style={styles.groupContainerBg}
            onPress={closeGroupContainer}
          />
          <Alert2 onClose={closeGroupContainer} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  crearFlexBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  crearTypo: {
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
    textAlign: "center",
  },
  crearPosition: {
    left: "50%",
    top: 0,
    position: "absolute",
    height: 54,
  },
  vectorIcon: {
    width: 18,
    height: 16,
  },
  ajusteDeCita: {
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
  arcticonsgoogleWebviewDevto: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  vectorParent: {
    backgroundColor: Color.colorPowderblue,
    height: 44,
    flexDirection: "row",
    paddingHorizontal: Padding.p_2xs,
    paddingVertical: Padding.p_5xs,
    alignSelf: "stretch",
  },
  frameChild: {
    width: 109,
    height: 104,
  },
  algoNoEst: {
    color: Color.colorCadetblue_200,
    fontSize: FontSize.size_mini,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  groupParent: {
    gap: 33,
    alignSelf: "stretch",
  },
  requestsChild: {
    backgroundColor: Color.colorAzure,
    width: 270,
    height: 366,
    borderRadius: Border.br_3xs,
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
    marginLeft: -141,
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
    width: 288,
  },
  maskGroupIcon: {
    maxWidth: "100%",
    height: 15,
    alignSelf: "stretch",
    overflow: "hidden",
    width: "100%",
  },
  requests: {
    backgroundColor: Color.colorWhite,
    height: 800,
    gap: 36,
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    borderRadius: Border.br_3xs,
  },
});

export default Requests;
