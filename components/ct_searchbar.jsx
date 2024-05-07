import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ data, setData, getDataFromAsyncStorage }) {

console.log(9, getDataFromAsyncStorage)
  const search = (text) => {
    console.log(8, text == '');
    if (text) {
      const newData = data?.filter((item) => {
        const itemTitle = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const titleSearch = text.toUpperCase();
        return itemTitle.indexOf(titleSearch) > -1;
      });
      console.log(21, newData);
      setData(newData);
    } else {
      setData(getDataFromAsyncStorage);
    }
  };

  return (
    <View
      style={{
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        backgroundColor: "#ffffff",
        borderRadius: 8,
      }}
    >
      <TextInput
        placeholder="Search Tasks..."
        maxLength={50}
        onChangeText={(text) => search(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
  },
  input: {
    width: "100%",
    paddingLeft: 5,
  },
});
