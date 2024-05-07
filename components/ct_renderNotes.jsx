import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import Colors from "../styles/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RenderNote({ item, setData, data,setShowDialog }) {
  

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("node");
          let userValue = jsonValue != null ? JSON.parse(jsonValue) : [];
          setData(userValue);
        } catch (err) {
          console.log(err);
          alert("Error loading notes");
        }
      };
      getData();
    }, [])
  );

  const handleDelete = async (date) => {
    setShowDialog(true);
    const deleteTask = data.filter((item) => item.date !== date);
    setData(deleteTask);
    await AsyncStorage.setItem("node", JSON.stringify(deleteTask));
    setTimeout(() => {
      setShowDialog(false);
    }, 2500);
  };

  return (
    <View style={styles.noteArea}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.txtNoteTitle} numberOfLines={3}>
            Title: {item?.title}
          </Text>
          <TouchableOpacity onPress={() => handleDelete(item?.date)}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.txtNote} numberOfLines={6}>
        Description: {item?.description}
      </Text>

      
    </View>
  );
}

const styles = StyleSheet.create({
  noteArea: {
    backgroundColor: Colors.notes,
    width: "100%",
    height: "auto",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    card: { flexDirection: "row", justifyContent: "space-between" },
    marginTop: 10,
    marginBottom: 10,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  txtNoteTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  txtNote: {
    color: "#000",
  },
});
