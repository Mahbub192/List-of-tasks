import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Ct_modal from "../components/ct_modal";

export default function Notes() {
  const [date, setDate] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [errorMessage, setErrorMessage]= useState()
  const router = useRouter();
  const [note, setNote] = useState({
    title: "",
    description: "",
    date: date,
  });

  const storenote = async (note) => {
    console.log(27, note.title == "");
    if (!note.title == "") {
      try {
        //   await AsyncStorage.clear();
        setErrorMessage('')
        const jsonValue = await AsyncStorage.getItem("node");
        let notesValue = jsonValue != null ? JSON.parse(jsonValue) : [];
        console.log(32, notesValue);

        notesValue.push(note);

        await AsyncStorage.setItem("node", JSON.stringify(notesValue));
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          router.replace("/");
        }, 2500);
      } catch (error) {
        console.log(33, "error");
      }
    } else {
      setErrorMessage(" The title field required")
    }
  };

  return (
    <SafeAreaView style={styles.conteiner}>
      <ScrollView>
        <View style={{ width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Title:</Text>
          <TextInput
            style={styles.txtTitleNote}
            autoFocus={true}
            maxLength={10000}
            value={note.title}
            placeholder={"Title"}
            onChangeText={(text) => setNote({ ...note, title: text })}
          ></TextInput>
          <Text style={{textAlign:'center', color:'red', fontSize:14,}}>{errorMessage}</Text>
        </View>

        <View style={{ width: "100%", paddingTop: 20 }}>
          <Text style={{ marginBottom: 10 }}>Description:</Text>
          <TextInput
            editable
            multiline
            numberOfLines={5}
            maxLength={40}
            style={[
              styles.txtTitleNote,
              { width: "auto", paddingLeft: 5, paddingTop: -20 },
            ]}
            value={note.description}
            placeholder={"Description"}
            onChangeText={(text) => setNote({ ...note, description: text })}
          ></TextInput>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            bottom: 0,
          }}
        >
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: "#05A105",
                flex: 1,
              },
            ]}
            onPress={() => storenote(note)}
          >
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Save</Text>
          </TouchableOpacity>
        </View>

        <Ct_modal
          modalVisible={showDialog}
          textMsg={"Note Add Successfully"}
          btnMsg={"Continue"}
          color={"#8BC34A"}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    margin: 20,
  },
  txtTitleNote: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 8,
    fontSize: 14,
  },
  actionButton: {
    borderRadius: 10,
    width: 30,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    color: "whight",
  },
});
