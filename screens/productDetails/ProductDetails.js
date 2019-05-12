import React, { useContext, useState } from "react";
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

const ProductDetails = ({ id, type }) => {
  const { store } = useContext(StoreContext);
  const { products } = store;
  const { name, price } = products[type][id];
  const [localName, setLocalName] = useState(name);
  const [localPrice, setLocalPrice] = useState(price.toString());

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      <View style={styles.detailsContainer}>
        <TextInput
          placeholder="Name"
          value={localName}
          onChangeText={setLocalName}
          style={styles.input}
        />

        <TextInput
          placeholder="Price"
          value={localPrice}
          onChangeText={setLocalPrice}
          style={styles.input}
        />
      </View>
      <TouchableHighlight
        onPress={() => {}}
        underlayColor={colors.primaryVariant}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

ProductDetails.defaultProps = {
  id: 3,
  type: "meat"
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  detailsContainer: {
    paddingHorizontal: 20
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 30,
    marginBottom: 60
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
