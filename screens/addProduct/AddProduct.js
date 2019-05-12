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

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [typeFocused, setTypeFocused] = useState(false);
  const togglePicker = useCallback(() => setTypeFocused(!typeFocused), [
    typeFocused
  ]);
  const pickerChangeHandler = useCallback(value => setType(value), [
    typeFocused
  ]);
  const capitalizedType = type && `${type[0].toUpperCase()}${type.slice(1)}`;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add product</Text>
      <View style={styles.inputsContainer}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={setName}
          value={name}
        />
        <TextInput
          placeholder="Price"
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
        onPress={() => {}}
        underlayColor={colors.primaryVariant}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
      {typeFocused ? (
        <Picker selectedValue={type} onValueChange={pickerChangeHandler}>
          <Picker.Item label="Salad" value="salad" />
          <Picker.Item label="Meat" value="meat" />
          <Picker.Item label="Sweets" value="sweets" />
          <Picker.Item label="Fruits" value="fruits" />
          <Picker.Item label="Milk" value="milk" />
        </Picker>
      ) : null}
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 30,
    marginBottom: 60
  },
  inputsContainer: {
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
