import React, { useContext, useRef, useState, useCallback } from "react";
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
  const nameRef = useRef();
  const priceRef = useRef();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("greens");
  const [pickerActive, setPickerActive] = useState(false);
  const togglePicker = useCallback(() => {
    if (!pickerActive) {
      nameRef.current.blur();
      priceRef.current.blur();
    }

    setPickerActive(!pickerActive);
  }, [pickerActive]);
  const pickerChangeHandler = useCallback(value => setType(value), [
    pickerActive
  ]);
  const inactivatePicker = useCallback(() => {
    if (pickerActive) togglePicker();
  }, [pickerActive]);
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
          onFocus={inactivatePicker}
          ref={nameRef}
        />
        <TextInput
          placeholder="Price"
          style={styles.input}
          onChangeText={setPrice}
          value={price}
          onFocus={inactivatePicker}
          ref={priceRef}
        />
        <View style={styles.typeContainer}>
          <TextInput
            placeholder="Type"
            style={[styles.input]}
            onBlur={togglePicker}
            value={capitalizedType}
            editable={false}
          />
          <TouchableHighlight
            onPress={togglePicker}
            underlayColor={colors.primaryVariant}
            style={styles.toggleButton}
          >
            <Text style={styles.buttonText}>Change</Text>
          </TouchableHighlight>
        </View>
      </View>
      <TouchableHighlight
        onPress={saveItem}
        underlayColor={colors.primaryVariant}
        style={styles.saveButton}
      >
        <Text style={[styles.buttonText]}>Save</Text>
      </TouchableHighlight>
      {pickerActive ? (
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
  typeContainer: {
    position: "relative",
    paddingTop: 10
  },
  toggleButton: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  saveButton: {
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
