import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import SearchBar from "../components/ct_searchbar";
import COLORS from "../styles/colors";
import RenderNote from "../components/ct_renderNotes";
import Ct_modal from "../components/ct_modal";

export default function index() {
  const [data, setData] = useState([]);
  const [getDataFromAsyncStorage, setGetDataFromAsyncStorage] = useState();
  const [showDialog, setShowDialog] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("node");
          let userValue = jsonValue != null ? JSON.parse(jsonValue) : [];
          setData(userValue);
          setGetDataFromAsyncStorage(userValue);
        } catch (err) {
          console.log(err);
          alert("Error loading notes");
        }
      };
      getData();
    }, [])
  );

  console.log(39, data.length);

  return (
    <SafeAreaView style={styles.conteiner}>
      <ScrollView>
        <Text style={styles.txtTitle}>NOTE-TAKING-APP</Text>
        <SearchBar
          data={data}
          setData={setData}
          getDataFromAsyncStorage={getDataFromAsyncStorage}
        />

        {!data.length == 0 ? (
          data.map((item, index) => (
            <RenderNote key={index} item={item} setData={setData} data={data} setShowDialog={setShowDialog} />
          ))
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 16, paddingTop:25, fontWeight:'bold' }}>No Data!</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.newNoteButton}
        onPress={() => router.push("notes")}
      >
        <AntDesign name="pluscircle" size={60} color={COLORS.addButton} />
      </TouchableOpacity>

      <Ct_modal
        modalVisible={showDialog}
        textMsg={"Note Dellelt Successfully"}
        btnMsg={"Continue"}
        color={"#AC0B0B"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  newNoteButton: {
    zIndex: 9,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  noteList: {
    margin: 5,
  },
  txtTitle: {
    margin: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
