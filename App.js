import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  ScrollView,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const onChangeText = (e) => {
    setMessage(e);
  };

  const handleMsgSend = (e) => {
    if (message === "") return;
    const newMsg = { sender: "me", text: message, time: Date.now() };
    setChat((oldChat) => [...oldChat, newMsg]);
    console.log(chat.text);
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.backTick}>
            <Entypo name="chevron-thin-left" size={26} color="white" />
          </Text>
          <Text style={styles.roomName}>김수한무</Text>
          <Text>
            <Feather name="menu" size={27} color="white" />
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.chats}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
          >
            {chat.map((c, index) => (
              <View style={styles.textBubbleColumn}>
                <View key={index} style={styles.textBubble__me}>
                  <Text style={{ fontSize: 18 }}>{c.text}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </TouchableWithoutFeedback>
        <View style={styles.chatBox}>
          <TextInput
            style={styles.chatInput}
            onChangeText={onChangeText}
            value={message}
            returnKeyType="submit"
            onSubmitEditing={handleMsgSend}
            enablesReturnKeyAutomatically
            keyboardAppearance="dark"
            blurOnSubmit={false}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    zIndex: 99,
    elevation: 99,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "rgba(26,26,26,0.1)",
    color: "white",
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  inner: {
    flex: 1,
    backgroundColor: "#191919",
  },
  backTick: {
    fontSize: 18,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  roomName: {
    color: "white",
    fontSize: 22,
    fontWeight: "500",
  },
  chatInput: {
    backgroundColor: "#38383A",
    color: "white",
    width: "90%",
    height: 35,
    fontSize: 18,
    paddingLeft: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#454547",
  },
  chatBox: {
    backgroundColor: "#2C2C2E",
    padding: 5,
    marginTop: 10,
  },
  textBubbleColumn: {
    padding: 5,
  },
  chats: {
    flex: 10,
    flexDirection: "column-reverse",
  },
  textBubble__me: {
    backgroundColor: "#F9E54E",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: "auto",
  },
});
