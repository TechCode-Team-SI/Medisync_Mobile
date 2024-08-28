import React, { memo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import {
  FontSize,
  FontFamily,
  Color,
  Gap,
  Border,
  Padding,
} from "../../GlobalStyles";

export type Alert11Type = {
  onClose?: () => void;
};

const Alert11 = memo(({ onClose }: Alert11Type) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.alert1}>
      <View style={styles.frame}>
        <Text style={styles.ticketCreado}>¡Ticket creado!</Text>
        <View style={styles.frame1}>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../../assets/images/group-22.png")}
          />
          <Text style={styles.valoramosTuOpinin}>Valoramos tu opinión</Text>
        </View>
      </View>
      <Pressable
        style={[styles.frame2, styles.frame2FlexBox]}
        onPress={() => navigation.navigate("CustomerSupport")}
      >
        <Pressable onPress={() => navigation.navigate("CustomerSupport")}>
          <Text style={[styles.continuar1, styles.frame2FlexBox]}>
            Continuar
          </Text>
        </Pressable>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  frame2FlexBox: {
    height: 37,
    justifyContent: "center",
    alignItems: "center",
  },
  ticketCreado: {
    marginLeft: -137.5,
    top: 50,
    left: "50%",
    fontSize: FontSize.size_xl,
    lineHeight: 22,
    textTransform: "capitalize",
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemiBold,
    width: 275,
    height: 75,
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    position: "absolute",
    alignItems: "center",
  },
  frameChild: {
    width: 50,
    height: 50,
  },
  valoramosTuOpinin: {
    fontSize: FontSize.size_sm,
    lineHeight: 20,
    fontFamily: FontFamily.robotoRegular,
    textAlign: "center",
    color: Color.colorBlack,
    alignSelf: "stretch",
  },
  frame1: {
    top: 0,
    left: 28,
    width: 220,
    position: "absolute",
    gap: Gap.gap_,
    alignItems: "center",
    overflow: "hidden",
  },
  frame: {
    height: 105,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  continuar1: {
    fontSize: FontSize.size_mini,
    fontWeight: "800",
    fontFamily: FontFamily.montserratExtraBold,
    color: Color.colorWhite,
    width: 222,
    display: "flex",
    height: 37,
    textAlign: "center",
  },
  frame2: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorCadetblue_200,
    width: 224,
    flexDirection: "row",
    paddingHorizontal: Padding.p_12xs,
    paddingVertical: 0,
    height: 37,
    overflow: "hidden",
  },
  alert1: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 7,
    elevation: 7,
    shadowOpacity: 1,
    borderRadius: Border.br_4xs,
    backgroundColor: Color.colorWhite,
    width: 295,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_5xs,
    maxWidth: "100%",
    maxHeight: "100%",
    gap: Gap.gap_,
    alignItems: "center",
    overflow: "hidden",
  },
});

export default Alert11;
