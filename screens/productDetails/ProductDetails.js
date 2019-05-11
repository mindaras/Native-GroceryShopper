import React, { useContext, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, TextInput } from "react-native";
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
      <TextInput
        placeholder="Name"
        value={localName}
        onChangeText={setLocalName}
      />
      <TextInput
        placeholder="Price"
        value={localPrice}
        onChangeText={setLocalPrice}
      />
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
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 30,
    marginBottom: 60
  }
});
