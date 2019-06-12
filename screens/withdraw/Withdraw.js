import React, { useContext, useState, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from "react-native";
import { StoreContext } from "../../Store";
import { colors } from "../../common";
import { withdrawFromSpendingBudget } from "../../actions";

const Withdraw = ({ navigation }) => {
  const { store, dispatch } = useContext(StoreContext);
  const { username, idToken } = store.auth;
  const [amount, setAmount] = useState();
  const withdraw = useCallback(() => {
    withdrawFromSpendingBudget(dispatch)({
      username,
      idToken,
      amount: parseFloat(amount)
    });
    navigation.pop();
  }, [amount]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailsContainer}>
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />
      </View>
      <TouchableHighlight
        onPress={withdraw}
        underlayColor={colors.secondaryVariant}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

Withdraw.navigationOptions = {
  title: "Withdraw"
};

export default Withdraw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  detailsContainer: {
    paddingTop: 60,
    paddingHorizontal: 20
  },
  name: {
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 15
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    width: "100%",
    paddingHorizontal: 5,
    paddingBottom: 5,
    marginBottom: 30
  },
  disabled: {
    opacity: 0.5
  },
  button: {
    alignSelf: "center",
    marginTop: 30,
    height: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.secondary,
    shadowColor: "#000",
    shadowOffset: { height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  buttonText: {
    color: "#fff"
  }
});
