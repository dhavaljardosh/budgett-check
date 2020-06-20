import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { H4, Switcher, TabButton, P, B } from "nachos-ui";
import { addEntry } from "./api/addEntry";
const handleDecimal = (number) => {
  if (number[number.length - 1] === ".") {
    console.log(number);
    return number + "0";
  } else {
    return number;
  }
};

const AddEntry = ({ setModalVisible, refetch }) => {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [newEntry, { data }] = useMutation(
    addEntry({ amount: handleDecimal(amount) || 0, type })
  );

  const submitEntry = async () => {
    if (!amount || isNaN(Number(amount))) {
      alert("invalid entry");
      return;
    }
    let result = await newEntry();
    try {
      refetch();
    } catch (e) {
      console.log(e.message);
    }

    console.log(result);
    setModalVisible(false);
  };

  return (
    <View style={{ width: 300 }}>
      <TouchableHighlight
        onPress={() => setModalVisible(false)}
        style={{
          position: "absolute",
          top: -50,
          right: 0,
        }}
      >
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: "red",

            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, color: "white" }}>×</Text>
        </View>
      </TouchableHighlight>

      <Text style={{ fontSize: 20, fontWeight: "600", paddingBottom: 10 }}>
        Select the type
      </Text>
      <View
        style={{
          flexDirection: "row",
          borderColor: "skyblue",
          borderWidth: 2,
        }}
      >
        <TouchableHighlight
          style={{ flex: 1 }}
          onPress={() => setType("income")}
        >
          <View
            style={{
              alignItems: "center",
              paddingVertical: 10,
              backgroundColor: type === "income" ? "skyblue" : "white",
            }}
          >
            <Text style={{ fontSize: 20 }}>Income</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={{ flex: 1 }}
          onPress={() => setType("expense")}
        >
          <View
            style={{
              alignItems: "center",
              paddingVertical: 10,
              backgroundColor: type !== "income" ? "skyblue" : "white",
            }}
          >
            <Text style={{ fontSize: 20 }}>Expense</Text>
          </View>
        </TouchableHighlight>
      </View>
      <P style={{ marginVertical: 20 }}>
        <B>Selected value:</B> {type || "no selection"}
      </P>
      <Text style={{ fontSize: 20, fontWeight: "600", paddingBottom: 10 }}>
        Amount:
      </Text>
      <TextInput
        value={amount}
        onChangeText={(amount) => {
          if (isNaN(Number(amount))) {
            return;
          }
          setAmount(amount);
        }}
        placeholder="Enter Amount Here"
        keyboardType="numeric"
        style={{
          paddingHorizontal: 20,
          fontSize: 25,
          paddingVertical: 15,
          borderColor: "skyblue",
          borderWidth: 1.3,
          borderRadius: 50,
        }}
        placeholderTextColor="gray"
      />
      <Text>{JSON.stringify(amount)}</Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: "skyblue",
          borderRadius: 40,
          paddingHorizontal: 20,
          fontSize: 25,
          paddingVertical: 19,
        }}
        onPress={submitEntry}
      >
        <View>
          <Text style={{ fontSize: 20, textAlign: "center", elevation: 4 }}>
            Submit
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddEntry;
