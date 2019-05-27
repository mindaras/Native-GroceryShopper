import React, { useCallback } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import {
  homeIconSource,
  productsIconSource,
  statisticsIconSource,
  logoutIconSource
} from "../assets";
import { signOut } from "../actions";

const Menu = ({ navigation, dispatch }) => {
  const { popToTop, navigate } = navigation;
  const navigateToHome = useCallback(() => popToTop(), []);
  const navigateToProducts = useCallback(() => navigate("Products"), []);
  const navigateToStatistics = useCallback(() => navigate("Statistics"), []);
  const signOutUser = useCallback(() => signOut(dispatch)(), []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToHome}>
        <Image
          style={{
            width: 25,
            height: 25
          }}
          resizeMode="contain"
          source={homeIconSource}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToProducts}>
        <Image
          style={{
            width: 25,
            height: 25
          }}
          resizeMode="contain"
          source={productsIconSource}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToStatistics}>
        <Image
          style={{
            width: 25,
            height: 25
          }}
          resizeMode="contain"
          source={statisticsIconSource}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={signOutUser}>
        <Image
          style={{
            width: 25,
            height: 25
          }}
          resizeMode="contain"
          source={logoutIconSource}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    paddingHorizontal: 20
  }
});
