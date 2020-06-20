import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { getEntries } from "./api/getEntries";
import { deleteEntry } from "./api/deleteEntry";

const Entries = ({ refreshing }) => {
  const { data, loading, error, refetch } = useQuery(getEntries);

  // Refetch when Parent is Refreshing
  useEffect(() => {
    try {
      //   alert("refetching");
      refetch();
    } catch (e) {
      console.log(e.message);
    }
  }, [refreshing]);

  if (loading || error) {
    return <Text>Lodaing</Text>;
  }

  return (
    <View>
      <Text>{JSON.stringify(refreshing)}</Text>
      {data.getEntries.map((data, index) => (
        <Entry key={data.id} data={data} refetch={refetch} />
      ))}
    </View>
  );
};

const Entry = ({ data, refetch }) => {
  const [id, setId] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [deleteSingleEntry] = useMutation(deleteEntry({ id: id }));

  // Refetch Parent on Delete

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          color: data.type === "expense" ? "red" : "green",
          fontSize: 20,
        }}
      >
        {data.type === "expense" ? "-" : ""}
        {data.amount}
      </Text>
      {confirmation ? (
        <Text onPress={() => deleteSingleEntry()}>Confirm</Text>
      ) : (
        <Text
          onPress={() => {
            setId(data.id);
            setConfirmation(true);
            refetch();
          }}
        >
          Delete
        </Text>
      )}
    </View>
  );
};

export default Entries;
