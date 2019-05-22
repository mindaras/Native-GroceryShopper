import React, { useContext, useState, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Picker,
  TouchableHighlight
} from "react-native";
import { colors } from "../../common";
import { StoreContext } from "../../Store";
import { addItemToProducts } from "../../actions";

const AddProduct = ({ navigation }) => {
  const { store, dispatch } = useContext(StoreContext);
  const { username, idToken } = store.auth;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("greens");
  const [typeFocused, setTypeFocused] = useState(false);
  const togglePicker = useCallback(() => setTypeFocused(!typeFocused), [
    typeFocused
  ]);
  const pickerChangeHandler = useCallback(value => setType(value), [
    typeFocused
  ]);
  const capitalizedType = type && `${type[0].toUpperCase()}${type.slice(1)}`;
  const saveItem = useCallback(() => {
    addItemToProducts(dispatch)({ username, idToken, name, price, type });
    navigation.pop();
  }, [name, price, type]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputsContainer}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={setName}
          value={name}
        />
        <TextInput
          placeholder="Price"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={setPrice}
          value={price}
        />
        <TextInput
          placeholder="Type"
          style={styles.input}
          onFocus={togglePicker}
          onBlur={togglePicker}
          value={capitalizedType}
        />
      </View>
      <TouchableHighlight
        onPress={saveItem}
        underlayColor={colors.primaryVariant}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
      {typeFocused ? (
        <Picker selectedValue={type} onValueChange={pickerChangeHandler}>
          <Picker.Item label="Greens" value="greens" />
          <Picker.Item label="Meat" value="meat" />
          <Picker.Item label="Sweets" value="sweets" />
          <Picker.Item label="Fruits" value="fruits" />
          <Picker.Item label="Milk" value="milk" />
          <Picker.Item label="Drinks" value="drinks" />
        </Picker>
      ) : null}
    </SafeAreaView>
  );
};

AddProduct.navigationOptions = {
  title: "Add product"
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputsContainer: {
    marginTop: 200,
    paddingHorizontal: 20
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    width: "100%",
    paddingHorizontal: 5,
    paddingBottom: 5,
    marginBottom: 30
  },
  button: {
    alignSelf: "center",
    marginTop: 30,
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
