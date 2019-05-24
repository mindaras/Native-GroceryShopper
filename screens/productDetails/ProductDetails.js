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
import { updateItemInProducts, updateItemInShoppingList } from "../../actions";

const ProductDetails = ({ navigation }) => {
  const { id, type } = navigation.state.params;
  const { store, dispatch } = useContext(StoreContext);
  const {
    products,
    auth: { username, idToken }
  } = store;
  const { name, price } = products[type][id];
  const capitalizedType = `${type[0].toUpperCase()}${type.slice(1)}`;
  const [localName, setLocalName] = useState(name);
  const [localPrice, setLocalPrice] = useState(price.toString());
  const updateItem = useCallback(() => {
    if (!localName || !localPrice) return;

    const productsPayload = {
      username,
      idToken,
      id,
      type,
      name: localName,
      price: localPrice
    };
    const shoppingListItemKeys = Object.values(store.shoppingList).reduce(
      (acc, curr) => {
        if (curr.productId === id) {
          acc = [...acc, { id: curr.id }];
        }

        return acc;
      },
      []
    );

    const shoppingListPayload = {
      ...productsPayload,
      productId: id,
      keys: shoppingListItemKeys
    };

    updateItemInProducts(dispatch)(productsPayload);
    updateItemInShoppingList(dispatch)(shoppingListPayload);
    navigation.pop();
  }, [localName, localPrice]);

  return (
    <SafeAreaView style={styles.container}>
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
        <TextInput
          editable={false}
          value={capitalizedType}
          style={[styles.input, styles.disabled]}
        />
      </View>
      <TouchableHighlight
        onPress={updateItem}
        underlayColor={colors.primaryVariant}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

ProductDetails.navigationOptions = {
  title: "Product details"
};

export default ProductDetails;

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
