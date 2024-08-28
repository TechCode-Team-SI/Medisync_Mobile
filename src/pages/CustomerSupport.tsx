import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import {
  Color,
  Border,
  Padding,
  FontSize,
  FontFamily,
} from "../../GlobalStyles";

const CustomerSupport = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={[styles.customersupport, styles.parentFlexBox]}>
      <View style={styles.vectorParent}>
        <Image
          style={styles.vectorIcon}
          contentFit="cover"
          source={require("../../assets/images/vector10.png")}
        />
        <Text style={styles.soporteAlCliente}>Soporte al cliente</Text>
      </View>
      <View style={[styles.ellipseParent, styles.parentFlexBox]}>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../../assets/images/ellipse-25.png")}
        />
        <Text style={styles.enQuPodemos}>¿En qué podemos ayudarte?</Text>
        <Text style={styles.nosImportaTu}>
          ¡Nos importa tu opinión! Elige una opción:
        </Text>
        <Image
          style={styles.vectorIcon1}
          contentFit="cover"
          source={require("../../assets/images/vector11.png")}
        />
      </View>
      <View style={[styles.frameParent, styles.parentFlexBox]}>
        <Pressable
          style={[styles.sugerenciasParent, styles.parentShadowBox1]}
          onPress={() => navigation.navigate("Suggestions")}
        >
          <Text style={[styles.sugerencias, styles.reclamosTypo]}>
            Sugerencias
          </Text>
          <Image
            style={styles.vectorIcon2Layout}
            contentFit="cover"
            source={require("../../assets/images/vector1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.reclamosParent, styles.parentShadowBox]}
          onPress={() => navigation.navigate("Claims")}
        >
          <Text style={[styles.reclamos, styles.reclamosTypo]}>Reclamos</Text>
          <Image
            style={styles.vectorIcon2Layout}
            contentFit="cover"
            source={require("../../assets/images/vector3.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.ajusteDeCitaParent, styles.parentShadowBox]}
          onPress={() => navigation.navigate("Requests")}
        >
          <Text style={[styles.reclamos, styles.reclamosTypo]}>
            Ajuste de cita
          </Text>
          <Image
            style={[
              styles.arcticonsgoogleWebviewDevto,
              styles.vectorIcon2Layout,
            ]}
            contentFit="cover"
            source={require("../../assets/images/arcticonsgooglewebviewdevtools1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.historialParent, styles.parentShadowBox1]}
          onPress={() => navigation.navigate("ListRequests")}
        >
          <Text style={[styles.reclamos, styles.reclamosTypo]}>Historial</Text>
          <Image
            style={styles.vectorIcon2Layout}
            contentFit="cover"
            source={require("../../assets/images/vector12.png")}
          />
        </Pressable>
      </View>
      <Image
        style={[styles.maskGroupIcon, styles.maskGroupIconLayout]}
        contentFit="cover"
        source={require("../../assets/images/mask-group2.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  parentShadowBox1: {
    justifyContent: "space-between",
    height: 54,
    backgroundColor: Color.colorAzure,
    borderRadius: Border.br_mini,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    paddingVertical: Padding.p_sm,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  reclamosTypo: {
    textAlign: "left",
    letterSpacing: 1.6,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    display: "flex",
    color: Color.colorCadetblue_200,
    alignItems: "center",
    flex: 1,
  },
  parentShadowBox: {
    paddingHorizontal: Padding.p_xl,
    justifyContent: "space-between",
    height: 54,
    backgroundColor: Color.colorAzure,
    borderRadius: Border.br_mini,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  vectorIcon2Layout: {
    height: 24,
    width: 24,
  },
  maskGroupIconLayout: {
    width: "100%",
    flex: 1,
    overflow: "hidden",
  },
  vectorIcon: {
    width: 18,
    height: 16,
  },
  soporteAlCliente: {
    letterSpacing: 1.5,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorWhite,
    textAlign: "center",
    fontSize: FontSize.size_mini,
    flex: 1,
  },
  vectorParent: {
    backgroundColor: Color.colorCadetblue_200,
    height: 44,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 51,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameChild: {
    width: 109,
    height: 104,
    zIndex: 0,
  },
  enQuPodemos: {
    fontSize: FontSize.size_xl,
    letterSpacing: 2,
    lineHeight: 27,
    fontWeight: "900",
    fontFamily: FontFamily.montserratBlack,
    height: 38,
    zIndex: 1,
    display: "flex",
    color: Color.colorCadetblue_200,
    textAlign: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  nosImportaTu: {
    height: 37,
    zIndex: 2,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    display: "flex",
    color: Color.colorCadetblue_200,
    textAlign: "center",
    fontSize: FontSize.size_mini,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  vectorIcon1: {
    position: "absolute",
    height: "25.61%",
    marginLeft: -26,
    top: "6.68%",
    bottom: "67.71%",
    left: "50%",
    width: 49,
    zIndex: 3,
    maxHeight: "100%",
  },
  ellipseParent: {
    gap: 46,
    alignSelf: "stretch",
  },
  sugerencias: {
    height: 21,
  },
  sugerenciasParent: {
    paddingHorizontal: Padding.p_mid,
    paddingVertical: Padding.p_sm,
  },
  reclamos: {
    height: 22,
  },
  reclamosParent: {
    paddingVertical: Padding.p_mini,
  },
  arcticonsgoogleWebviewDevto: {
    overflow: "hidden",
  },
  ajusteDeCitaParent: {
    paddingVertical: Padding.p_sm,
  },
  historialParent: {
    paddingHorizontal: 18,
    paddingVertical: Padding.p_sm,
  },
  frameParent: {
    gap: 27,
    alignSelf: "stretch",
  },
  maskGroupIcon: {
    maxWidth: "100%",
    maxHeight: "100%",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  customersupport: {
    backgroundColor: Color.colorWhite,
    height: 800,
    gap: 58,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default CustomerSupport;
