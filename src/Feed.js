import React, { useState, useCallback } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  Alert,
  Modal,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import AddEntry from "./AddEntry";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { getTotal } from "./api/getTotal";
import { getEntries } from "./api/getEntries";
import Entries from "./Entries";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const Feed = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { loading, error, data, refetch, networkStatus } = useQuery(getTotal, {
    notifyOnNetworkStatusChange: true,
  });

  console.log(getTotal);

  const [modalVisible, setModalVisible] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await wait(1000);
    console.log("refetching new total");
    try {
      refetch();
    } catch (e) {
      console.log(e.message);
    }

    // GetEntries.refetch();
    // wait(4000).then(() => setRefreshing(false));
    setRefreshing(false);
  }, [refreshing]);

  if (networkStatus === 4) return <Text>Refetching!</Text>;
  if (loading) return <Text>LODING</Text>;
  if (error) return <Text>Error! ${JSON.stringify(error)}</Text>;

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={60}
        />
      }
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AddEntry setModalVisible={setModalVisible} refetch={refetch} />
          </View>
        </View>
      </Modal>

      <View
        style={{ paddingTop: getStatusBarHeight(), backgroundColor: "orange" }}
      ></View>
      <View>
        <View style={styles.feedBox}>
          <Text>{data && data.getTotal}</Text>
          <Text
            style={{ fontSize: 20 }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            Add Entry
          </Text>
        </View>
      </View>
      <View>{/* <Entries refreshing={refreshing} /> */}</View>
    </ScrollView>
  );
};

const styles = {
  feedBox: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "red",
    margin: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "white",
    padding: 35,
    paddingBottom: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 7,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
};

export default Feed;
