import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import {
  Color,
  FontSize,
  FontFamily,
  Border,
  Padding,
  Gap,
} from "../../GlobalStyles";

const Thread = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.thread}>
      <View style={[styles.vectorParent, styles.vectorParentFlexBox]}>
        <Pressable
          style={styles.vector}
          onPress={() => navigation.navigate("ListRequests")}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../../assets/images/vector4.png")}
          />
        </Pressable>
        <Text style={styles.agenteDeSoporte}>Agente de Soporte</Text>
      </View>
      <View style={styles.frameParent}>
        <View style={styles.frameGroup}>
          <View style={[styles.groupParent, styles.frameViewFlexBox1]}>
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={require("../../assets/images/group-86.png")}
            />
            <Text style={[styles.nombreDeUsuario, styles.nombreTypo]}>
              Nombre de Usuario
            </Text>
            <Text style={styles.ttulo}>Título</Text>
            <Text style={[styles.loremIpsumDolor, styles.respuestasFlexBox]}>
              Lorem ipsum dolor sit amet consectetur. Aliquam ipsum est habitant
              diam. Libero praesent diam vitae convallis cursus sed egestas.
              Integer ultricies adipiscing at enim velit molestie. Viverra ut
              lectus mi mauris eu lectus at.
            </Text>
          </View>
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require("../../assets/images/vector5.png")}
          />
        </View>
        <Text style={[styles.respuestas, styles.respuestasFlexBox]}>
          Respuestas
        </Text>
      </View>
      <View style={[styles.frameContainer, styles.containerLayout]}>
        <View style={[styles.groupContainer, styles.framePosition]}>
          <Image
            style={[styles.frameItem, styles.frameItemLayout]}
            contentFit="cover"
            source={require("../../assets/images/group-861.png")}
          />
          <Text style={[styles.agenteDeSoporte1, styles.nombreTypo]}>
            Agente de Soporte
          </Text>
          <TextInput style={[styles.frameInner, styles.frameChildLayout]} />
        </View>
        <Text style={[styles.ddmmaaaaHhhhAm, styles.ddmmaaaaHhhhAmPosition]}>
          dd/mm/aaaa hh:hh am
        </Text>
      </View>
      <View style={[styles.frameView, styles.frameViewFlexBox]}>
        <Image
          style={[styles.groupIcon, styles.frameItemLayout]}
          contentFit="cover"
          source={require("../../assets/images/group-87.png")}
        />
        <Text style={[styles.nombreDeUsuario1, styles.ddmmaaaaHhhhAmPosition]}>
          Nombre de Usuario
        </Text>
        <TextInput
          style={[styles.rectangleTextinput, styles.frameChildLayout]}
        />
        <Image
          style={[styles.vectorIcon1, styles.vectorIconPosition]}
          contentFit="cover"
          source={require("../../assets/images/vector6.png")}
        />
        <Text style={[styles.ddmmaaaaHhhhAm1, styles.ddmmaaaaPosition]}>
          dd/mm/aaaa hh:hh am
        </Text>
      </View>
      <View style={[styles.groupParent1, styles.frameViewFlexBox]}>
        <Image
          style={[styles.groupIcon, styles.frameItemLayout]}
          contentFit="cover"
          source={require("../../assets/images/group-87.png")}
        />
        <Text style={[styles.nombreDeUsuario1, styles.ddmmaaaaHhhhAmPosition]}>
          Nombre de Usuario
        </Text>
        <TextInput style={[styles.frameChild2, styles.frameChildLayout]} />
        <Image
          style={[styles.vectorIcon2, styles.vectorIconPosition]}
          contentFit="cover"
          source={require("../../assets/images/vector6.png")}
        />
        <Text style={[styles.ddmmaaaaHhhhAm2, styles.ddmmaaaaPosition]}>
          dd/mm/aaaa hh:hh am
        </Text>
      </View>
      <View style={[styles.frameContainer, styles.containerLayout]}>
        <View style={[styles.groupContainer, styles.framePosition]}>
          <Image
            style={[styles.frameItem, styles.frameItemLayout]}
            contentFit="cover"
            source={require("../../assets/images/group-861.png")}
          />
          <Text style={[styles.agenteDeSoporte1, styles.nombreTypo]}>
            Agente de Soporte
          </Text>
          <TextInput style={[styles.frameChild4, styles.frameChildLayout]} />
        </View>
        <Text style={[styles.ddmmaaaaHhhhAm, styles.ddmmaaaaHhhhAmPosition]}>
          dd/mm/aaaa hh:hh am
        </Text>
      </View>
      <View style={styles.rectangleParent}>
        <View style={styles.rectangleView} />
        <Text style={[styles.escribeTuMensaje, styles.ddmmaaaaHhhhAmPosition]}>
          Escribe tu mensaje
        </Text>
        <Pressable
          style={styles.vector1}
          onPress={() => navigation.navigate("CustomerSupport")}
        >
          <Image
            style={styles.icon1}
            contentFit="cover"
            source={require("../../assets/images/vector7.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vectorParentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  frameViewFlexBox1: {
    alignContent: "center",
    alignItems: "center",
  },
  nombreTypo: {
    width: 163,
    color: Color.colorBlack,
    fontSize: FontSize.size_smi,
    height: 20,
    textAlign: "center",
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    justifyContent: "center",
  },
  respuestasFlexBox: {
    textAlign: "left",
    fontSize: FontSize.size_xs,
    display: "flex",
    alignItems: "center",
  },
  containerLayout: {
    height: 87,
    width: 329,
  },
  framePosition: {
    left: 0,
    position: "absolute",
  },
  frameItemLayout: {
    height: 30,
    width: 30,
  },
  frameChildLayout: {
    height: 57,
    backgroundColor: Color.colorWhitesmoke,
    borderBottomLeftRadius: Border.br_xs,
    borderBottomRightRadius: Border.br_xs,
    borderTopRightRadius: Border.br_xs,
    elevation: 4,
    shadowRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    width: 329,
    shadowOpacity: 1,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  ddmmaaaaHhhhAmPosition: {
    zIndex: 1,
    display: "flex",
    alignItems: "center",
  },
  frameViewFlexBox: {
    gap: 0,
    width: 329,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  vectorIconPosition: {
    zIndex: 3,
    left: "2.13%",
    right: "92.71%",
    width: "5.17%",
    height: "13.79%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  ddmmaaaaPosition: {
    zIndex: 4,
    left: "50%",
    marginLeft: 81.5,
    width: 97,
    color: Color.colorDimgray,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_7xs,
    position: "absolute",
    height: 20,
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  vector: {
    width: 18,
    height: 18,
  },
  agenteDeSoporte: {
    fontSize: FontSize.size_mini,
    letterSpacing: 1.5,
    height: 20,
    textAlign: "center",
    lineHeight: 27,
    display: "flex",
    color: Color.colorCadetblue_200,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  vectorParent: {
    backgroundColor: Color.colorPowderblue,
    width: 360,
    height: 64,
    paddingHorizontal: Padding.p_2xs,
    paddingVertical: 22,
    gap: 11,
  },
  frameChild: {
    width: 36,
    height: 35,
  },
  nombreDeUsuario: {
    display: "flex",
    width: 163,
    alignItems: "center",
  },
  ttulo: {
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    width: 42,
    fontSize: FontSize.size_smi,
    height: 20,
    display: "flex",
    textAlign: "center",
    color: Color.colorCadetblue_200,
    justifyContent: "center",
    alignItems: "center",
  },
  loremIpsumDolor: {
    fontWeight: "300",
    fontFamily: FontFamily.robotoLight,
    width: 270,
    height: 84,
    color: Color.colorBlack,
    fontSize: FontSize.size_xs,
  },
  groupParent: {
    shadowColor: "rgba(0, 0, 0, 0.07)",
    shadowRadius: 6,
    elevation: 6,
    borderTopRightRadius: Border.br_mini,
    borderBottomRightRadius: Border.br_mini,
    borderBottomLeftRadius: Border.br_mini,
    backgroundColor: "#e3e3e3",
    height: 168,
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_8xs,
    flexWrap: "wrap",
    alignContent: "center",
    shadowOpacity: 1,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  vectorIcon: {
    width: 15,
    height: 7,
  },
  frameGroup: {
    gap: 8,
    alignSelf: "stretch",
  },
  respuestas: {
    //textDecoration: "underline",
    height: 14,
    alignSelf: "stretch",
    fontSize: FontSize.size_xs,
    color: Color.colorCadetblue_200,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
  },
  frameParent: {
    width: 325,
  },
  frameItem: {
    left: 0,
    position: "absolute",
    top: 0,
  },
  agenteDeSoporte1: {
    top: 5,
    left: 31,
    position: "absolute",
    display: "flex",
    width: 163,
    alignItems: "center",
  },
  frameInner: {
    top: 30,
    left: 0,
    position: "absolute",
  },
  groupContainer: {
    zIndex: 0,
    top: 0,
    left: 0,
    height: 87,
    width: 329,
  },
  ddmmaaaaHhhhAm: {
    textAlign: "right",
    width: 97,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_7xs,
    zIndex: 1,
    color: Color.colorDimgray,
    height: 20,
  },
  frameContainer: {
    justifyContent: "flex-end",
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: Padding.p_11xl,
    gap: Gap.gap_,
    flexDirection: "row",
    alignItems: "center",
  },
  groupIcon: {
    zIndex: 0,
  },
  nombreDeUsuario1: {
    width: 163,
    color: Color.colorBlack,
    fontSize: FontSize.size_smi,
    height: 20,
    textAlign: "center",
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    justifyContent: "center",
  },
  rectangleTextinput: {
    zIndex: 2,
  },
  vectorIcon1: {
    top: "10.34%",
    bottom: "75.86%",
  },
  ddmmaaaaHhhhAm1: {
    top: 30,
  },
  frameView: {
    alignContent: "center",
    alignItems: "center",
  },
  frameChild2: {
    zIndex: 2,
  },
  vectorIcon2: {
    top: "9.2%",
    bottom: "77.01%",
  },
  ddmmaaaaHhhhAm2: {
    top: 31,
  },
  groupParent1: {
    alignContent: "flex-start",
  },
  frameChild4: {
    top: 30,
    left: 0,
    position: "absolute",
  },
  rectangleView: {
    shadowColor: "rgba(0, 0, 0, 0.14)",
    shadowRadius: 20,
    elevation: 20,
    borderRadius: Border.br_xs,
    height: 44,
    zIndex: 0,
    shadowOpacity: 1,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    alignSelf: "stretch",
    backgroundColor: Color.colorWhite,
  },
  escribeTuMensaje: {
    fontSize: 10,
    letterSpacing: 1,
    fontFamily: FontFamily.robotoMedium,
    height: 17,
    color: Color.colorDimgray,
    zIndex: 1,
    textAlign: "left",
    alignSelf: "stretch",
    fontWeight: "500",
    lineHeight: 27,
  },
  icon1: {
    maxHeight: "100%",
    maxWidth: "100%",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  vector1: {
    left: "89.94%",
    top: "31.82%",
    right: "4.57%",
    bottom: "27.27%",
    width: "5.49%",
    height: "40.91%",
    zIndex: 2,
    position: "absolute",
  },
  rectangleParent: {
    width: 328,
    justifyContent: "space-between",
    height: 44,
    alignItems: "center",
  },
  thread: {
    borderRadius: Border.br_3xs,
    height: 800,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_sm,
    gap: 20,
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.colorWhite,
    alignItems: "center",
  },
});

export default Thread;
