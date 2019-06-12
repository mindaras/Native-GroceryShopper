import React, { useContext, useCallback, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import { StoreContext } from "../../Store";
import { Menu } from "../../components";
import { colors } from "../../common";
import { getSpendingBudget } from "../../actions";

const SpendingBudget = ({ navigation }) => {
  const { store, dispatch } = useContext(StoreContext);
  const { username, idToken } = store.auth;
  const { spendingBudget } = store;
  const { navigate } = navigation;
  const navigateToTopUp = useCallback(() => navigate("TopUp"), []);
  const navigateToWithdraw = useCallback(() => navigate("Withdraw"), []);

  useEffect(() => {
    getSpendingBudget(dispatch)({ username, idToken });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.total}>{spendingBudget}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableHighlight
            onPress={navigateToTopUp}
            underlayColor={colors.primaryVariant}
            style={[styles.button, styles.topUpButton]}
          >
            <Text style={[styles.buttonText]}>Top up</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={navigateToWithdraw}
            underlayColor={colors.secondaryVariant}
            style={[styles.button, styles.withdrawButton]}
          >
            <Text style={[styles.buttonText]}>Withdraw</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
      <Menu navigation={navigation} dispatch={dispatch} />
    </>
  );
};

SpendingBudget.navigationOptions = {
  title: "Spending budget"
};

export default SpendingBudget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  total: {
    fontSize: 24,
    fontWeight: "bold"
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "80%"
  },
  button: {
    alignSelf: "center",
    marginTop: 30,
    height: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  topUpButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: colors.primary
  },
  withdrawButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: colors.secondary
  },
  buttonText: {
    color: "#fff"
  }
});
