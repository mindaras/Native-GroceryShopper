import React, { memo, useContext, useEffect, useCallback } from "react";
import { StoreContext } from "../../Store";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
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
import {
  getProducts,
  refreshProducts,
  addItemToShoppingList,
  removeItemFromProducts
} from "../../actions";

const Product = memo(({ id, name, price, type, index, navigate }) => {
  const { store, dispatch } = useContext(StoreContext);
  const { username, idToken } = store.auth;
  const addToShoppingList = useCallback(
    () =>
      addItemToShoppingList(dispatch)({
        username,
        idToken,
        productId: id,
        name,
        price,
        type
      }),
    [id, name, price, type]
  );
  const navigateToProductDetails = useCallback(() => {
    navigate("ProductDetails", { id, type });
  }, [id, type]);
  const removeFromProducts = useCallback(() => {
    removeItemFromProducts(dispatch)({ username, idToken, id, type });
  }, [id, type]);
  const leftSwipeOutButtons = [
    {
      text: "Buy",
      backgroundColor: colors.secondary,
      underlayColor: colors.secondaryVariant,
      color: "#000",
      onPress: addToShoppingList
    }
  ];
  const rightSwipeoutButtons = [
    {
      text: "Edit",
      backgroundColor: colors.edit,
      underlayColor: colors.editSecondary,
      color: "#000",
      onPress: navigateToProductDetails
    },
    {
      text: "Delete",
      backgroundColor: colors.delete,
      underlayColor: colors.deleteSecondary,
      color: "#fff",
      onPress: removeFromProducts
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
      { backgroundColor: colors[title.toLowerCase()] }
    ]}
  >
    <Text style={styles.sectionHeader}>{title}</Text>
  </View>
);

const keyExtractor = ({ id }) => id;

const Products = ({ navigation }) => {
  const { store, dispatch } = useContext(StoreContext);
  const { products: refreshing } = store.refresh;
  const refreshHandler = useCallback(() => {
    refreshProducts(dispatch);
  }, []);
  const addHandler = useCallback(() => navigation.navigate("AddProduct"), []);
  const { products } = store;
  const sections = [
    { title: "Greens", data: Object.values(products.greens || {}) },
    { title: "Meat", data: Object.values(products.meat || {}) },
    { title: "Sweets", data: Object.values(products.sweets || {}) },
    { title: "Fruits", data: Object.values(products.fruits || {}) },
    { title: "Milk", data: Object.values(products.milk || {}) },
    { title: "Drinks", data: Object.values(products.drinks || {}) },
    { title: "Grain", data: Object.values(products.grain || {}) },
    { title: "Spices", data: Object.values(products.spices || {}) },
    { title: "Other", data: Object.values(products.other || {}) }
  ].filter(({ data }) => data.length);

  useEffect(() => {
    getProducts(dispatch)({ refreshing });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshHandler}
            />
          }
        >
          <SectionList
            renderItem={renderItem(navigation.navigate)}
            renderSectionHeader={renderSectionHeader}
            sections={sections}
            keyExtractor={keyExtractor}
          />
        </ScrollView>
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
