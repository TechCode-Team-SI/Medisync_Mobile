import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import {
  Color,
  FontFamily,
  FontSize,
  Padding,
  Border,
  Gap,
} from "../../GlobalStyles";

const ListRequests = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.listrequests}>
      <View style={[styles.vectorParent, styles.parentFlexBox]}>
        <Image
          style={styles.vectorIcon}
          contentFit="cover"
          source={require("../../assets/images/vector8.png")}
        />
        <Text style={styles.historial}>Historial</Text>
        <Image
          style={styles.vectorIcon1}
          contentFit="cover"
          source={require("../../assets/images/vector9.png")}
        />
      </View>
      <View style={styles.frameParent}>
        <Pressable
          style={styles.groupShadowBox}
          onPress={() => navigation.navigate("Thread")}
        >
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../../assets/images/group-80.png")}
          />
          <View style={[styles.nombresApellidoParent, styles.parentFlexBox]}>
            <Text style={[styles.nombresApellido, styles.pendienteFlexBox]}>
              #0001
            </Text>
            <Text style={[styles.ddmmaaaa, styles.hhhhAmTypo]}>dd/mm/aaaa</Text>
            <Text style={[styles.hhhhAm, styles.hhhhAmTypo]}>hh:hh am</Text>
            <Text style={[styles.tipoDeTicket, styles.hhhhAmTypo]}>
              Tipo de ticket
            </Text>
            <Text style={[styles.pendiente, styles.pendienteFlexBox]}>
              Pendiente
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.groupShadowBox}
          onPress={() => navigation.navigate("Thread")}
        >
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../../assets/images/group-80.png")}
          />
          <View style={[styles.nombresApellidoParent, styles.parentFlexBox]}>
            <Text style={[styles.nombresApellido, styles.pendienteFlexBox]}>
              #0002
            </Text>
            <Text style={[styles.ddmmaaaa, styles.hhhhAmTypo]}>dd/mm/aaaa</Text>
            <Text style={[styles.hhhhAm, styles.hhhhAmTypo]}>hh:hh am</Text>
            <Text style={[styles.tipoDeTicket, styles.hhhhAmTypo]}>
              Tipo de ticket
            </Text>
            <Text style={[styles.pendiente, styles.pendienteFlexBox]}>
              Proceso
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.groupShadowBox}
          onPress={() => navigation.navigate("Thread")}
        >
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../../assets/images/group-80.png")}
          />
          <View style={[styles.nombresApellidoParent, styles.parentFlexBox]}>
            <Text style={[styles.nombresApellido, styles.pendienteFlexBox]}>
              #0003
            </Text>
            <Text style={[styles.ddmmaaaa, styles.hhhhAmTypo]}>dd/mm/aaaa</Text>
            <Text style={[styles.hhhhAm, styles.hhhhAmTypo]}>hh:hh am</Text>
            <Text style={[styles.tipoDeTicket, styles.hhhhAmTypo]}>
              Tipo de ticket
            </Text>
            <Text style={[styles.pendiente, styles.pendienteFlexBox]}>
              Cerrado
            </Text>
          </View>
        </Pressable>
      </View>
      <Image
        style={styles.maskGroupIcon}
        contentFit="cover"
        source={require("../../assets/images/mask-group1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  pendienteFlexBox: {
    textAlign: "left",
    width: 82,
    height: 20,
    display: "flex",
    color: Color.colorCadetblue_200,
    alignItems: "center",
  },
  hhhhAmTypo: {
    fontFamily: FontFamily.robotoMedium,
    textAlign: "left",
    height: 20,
    display: "flex",
    color: Color.colorCadetblue_200,
    fontWeight: "500",
    alignItems: "center",
  },
  vectorIcon: {
    width: 18,
    height: 16,
  },
  historial: {
    letterSpacing: 1.5,
    lineHeight: 27,
    fontFamily: FontFamily.montserratMedium,
    textAlign: "center",
    height: 20,
    display: "flex",
    color: Color.colorCadetblue_200,
    fontWeight: "500",
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
    height: 44,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_5xs,
    gap: 16,
    alignSelf: "stretch",
  },
  frameChild: {
    width: 57,
    height: 63,
  },
  nombresApellido: {
    fontWeight: "700",
    fontFamily: FontFamily.robotoBold,
    width: 82,
    fontSize: FontSize.size_mini,
    textAlign: "left",
  },
  ddmmaaaa: {
    fontSize: FontSize.size_2xs,
    fontFamily: FontFamily.robotoMedium,
    width: 82,
  },
  hhhhAm: {
    width: 53,
    fontSize: FontSize.size_2xs,
    fontFamily: FontFamily.robotoMedium,
  },
  tipoDeTicket: {
    fontSize: FontSize.size_smi,
    width: 82,
  },
  pendiente: {
    fontSize: FontSize.size_sm,
    fontWeight: "900",
    fontFamily: FontFamily.robotoBlack,
    width: 82,
  },
  nombresApellidoParent: {
    width: 162,
    flexWrap: "wrap",
    alignContent: "center",
    gap: 2,
  },
  groupShadowBox: {
    paddingVertical: Padding.p_mini,
    paddingHorizontal: Padding.p_5xs,
    backgroundColor: Color.colorAzure,
    borderRadius: Border.br_mini,
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    gap: Gap.gap_,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameParent: {
    width: 245,
    gap: Gap.gap_,
    justifyContent: "center",
    alignItems: "center",
  },
  maskGroupIcon: {
    maxWidth: "100%",
    height: 15,
    alignSelf: "stretch",
    overflow: "hidden",
    width: "100%",
  },
  listrequests: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhite,
    height: 800,
    gap: 183,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    overflow: "hidden",
    width: "100%",
  },
});

export default ListRequests;
