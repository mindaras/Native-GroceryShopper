import React, { memo, useContext, useCallback } from "react";
import { StoreContext } from "../../Store";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity
} from "react-native";
import { colors } from "../../common";
import Swipeout from "react-native-swipeout";
import { Menu } from "../../components";
import { addIconSource } from "../../assets";
import { addItemToShoppingList, removeItemFromProducts } from "../../actions";

const generateTitleColor = title => {
  switch (title) {
    case "Greens":
      return colors.greens;
    case "Meat":
      return colors.meat;
    case "Sweets":
      return colors.sweets;
    case "Fruits":
      return colors.fruits;
    case "Milk":
      return colors.milk;
    case "Drinks":
      return colors.drinks;
    default:
      return "#fff";
  }
};

const Product = memo(({ id, name, price, type, index, navigate }) => {
  const { dispatch } = useContext(StoreContext);
  const leftSwipeOutButtons = [
    {
      text: "Buy",
      backgroundColor: colors.secondary,
      underlayColor: colors.secondaryVariant,
      color: "#000",
      onPress: () => addItemToShoppingList(dispatch)({ id, name, price, type })
    }
  ];
  const rightSwipeoutButtons = [
    {
      text: "Edit",
      backgroundColor: colors.edit,
      underlayColor: colors.editSecondary,
      color: "#000",
      onPress: () => navigate("ProductDetails", { id, type })
    },
    {
      text: "Delete",
      backgroundColor: colors.delete,
      underlayColor: colors.deleteSecondary,
      color: "#fff",
      onPress: () => removeItemFromProducts(dispatch)({ id, type })
    }
  ];

  return (
    <Swipeout
      left={leftSwipeOutButtons}
      right={rightSwipeoutButtons}
      autoClose={true}
    >
      <View
        style={[
          styles.item,
          {
            borderTopWidth: index === 0 ? 1 : 0
          }
        ]}
      >
        <Text>{name}</Text>
        <Text>{price}</Text>
      </View>
    </Swipeout>
  );
});

const renderItem = navigate => ({ item, index }) => (
  <Product {...item} index={index} navigate={navigate} />
);

renderSectionHeader = ({ section: { title } }) => (
  <View
    style={[
      styles.sectionHeaderContainer,
      { backgroundColor: generateTitleColor(title) }
    ]}
  >
    <Text style={styles.sectionHeader}>{title}</Text>
  </View>
);

const keyExtractor = ({ id }) => id;

const Products = ({ navigation }) => {
  const { store, dispatch } = useContext(StoreContext);
  const addHandler = useCallback(() => navigation.navigate("AddProduct"), []);
  const { products } = store;
  const sections = [
    { title: "Greens", data: Object.values(products.greens || {}) },
    { title: "Meat", data: Object.values(products.meat || {}) },
    { title: "Sweets", data: Object.values(products.sweets || {}) },
    { title: "Fruits", data: Object.values(products.fruits || {}) },
    { title: "Milk", data: Object.values(products.milk || {}) },
    { title: "Drinks", data: Object.values(products.drinks || {}) }
  ].filter(({ data }) => data.length);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SectionList
          renderItem={renderItem(navigation.navigate)}
          renderSectionHeader={renderSectionHeader}
          sections={sections}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
      <TouchableOpacity onPress={addHandler} style={styles.addContainer}>
        <Image source={addIconSource} resizeMode="contain" style={styles.add} />
      </TouchableOpacity>
      <Menu navigation={navigation} dispatch={dispatch} />
    </>
  );
};

Products.navigationOptions = {
  title: "Products"
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginVertical: 30
  },
  sectionHeaderContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 10
  },
  sectionHeader: {
    fontWeight: "bold"
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#fff"
  },
  addContainer: {
    position: "absolute",
    top: 10,
    right: 10
  },
  add: {
    width: 50,
    height: 50
  }
});
