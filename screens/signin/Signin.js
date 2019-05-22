import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text
} from "react-native";
import { StoreContext } from "../../Store";
import { signIn } from "../../actions";
import { colors } from "../../common";

const Signin = () => {
  const { store, dispatch } = useContext(StoreContext);
  const { error } = store.auth;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signin = useCallback(() => signIn(dispatch)({ username, password }), [
    username,
    password
  ]);

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setUsername}
        placeholder="Username"
        value={username}
        style={styles.input}
      />
      <TextInput
        secureTextEntry
        onChangeText={setPassword}
        placeholder="Password"
        value={password}
        style={styles.input}
      />
      <TouchableHighlight
        onPress={signin}
        underlayColor={colors.primaryVariant}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Signin</Text>
      </TouchableHighlight>
      <Text>{error}</Text>
    </View>
  );
};

Signin.navigationOptions = {
  title: "Sign in"
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    width: "80%",
    paddingHorizontal: 5,
    paddingBottom: 5,
    marginBottom: 30
  },
  button: {
    marginVertical: 30,
    height: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  buttonText: {
    color: "#fff"
  }
});
