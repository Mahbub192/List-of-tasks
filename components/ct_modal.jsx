import { View, Text, Modal, TouchableOpacity } from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";

const Ct_modal = ({modalVisible, textMsg, btnMsg, color}) => {
  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: color,
            padding: 20,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            alignItems: "center",
            width: "80%",
          }}
        >
          <View
            style={{
              borderWidth: 5,
              borderColor: "white",
              width: 80,
              height: 80,
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {/* <Text style={{ color: 'white', fontSize: 34 }}>✓</Text> */}
            {/* <Ionicons fontWeight='bold' name="checkmark-done-outline" size={44} color="white" /> */}
            <MaterialCommunityIcons name="check-bold" size={50} color="white" />
          </View>
          <Text
            style={{ fontSize: 24, color: "#fff", marginTop: -10 }}
          >
            Success
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            alignItems: "center",
            width: "80%",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontFamily: "",
              textAlign: "center",
              marginBottom: 20,
              fontSize: 18
            }}
          >
            {textMsg}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: color,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 15,
              width: "50%",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {btnMsg}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Ct_modal;
