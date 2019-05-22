import React, { useContext, useEffect, useCallback, memo } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text } from "react-native";
import Swipeout from "react-native-swipeout";
import { colors } from "../../common";
import { StoreContext } from "../../Store";
import { boughtItem, removeItemFromShoppingList } from "../../actions";
import { Menu } from "../../components";
import { getShoppingListItems } from "../../actions";

const generateBorderColor = type => {
  switch (type) {
    case "greens":
      return colors.greens;
    case "sweets":
      return colors.sweets;
    case "meat":
      return colors.meat;
    case "milk":
      return colors.milk;
    case "fruits":
      return colors.fruits;
    case "drinks":
      return colors.drinks;
    default:
      return "#fff";
  }
};

const Product = memo(({ id, name, price, type, timestamp, index }) => {
  const { dispatch } = useContext(StoreContext);
  const boughItem = useCallback(() => boughtItem(dispatch)({ id, timestamp }), [
    id,
    timestamp
  ]);
  const deleteItem = useCallback(
    () => removeItemFromShoppingList(dispatch)({ id, timestamp }),
    [id, timestamp]
  );
  const leftSwipeOutButtons = [
    {
      text: "Bought",
      backgroundColor: colors.bought,
      underlayColor: colors.boughtSecondary,
      color: "#fff",
      onPress: boughItem
    }
  ];
  const rightSwipeoutButtons = [
    {
      text: "Delete",
      backgroundColor: colors.delete,
      underlayColor: colors.deleteSecondary,
      color: "#fff",
      onPress: deleteItem
    }
  ];

  return (
    <Swipeout left={leftSwipeOutButtons} right={rightSwipeoutButtons}>
      <View
        style={[
          styles.item,
          {
            borderTopWidth: index === 0 ? 1 : 0,
            borderLeftWidth: 5,
            borderLeftColor: generateBorderColor(type)
          }
        ]}
      >
        <Text>{name}</Text>
        <Text>{price}</Text>
      </View>
    </Swipeout>
  );
});

const renderItem = ({ item, index }) => <Product {...item} index={index} />;

const keyExtractor = ({ id }, index) => `${id}${index}`;

const ShoppingList = ({ navigation }) => {
  const { store, dispatch } = useContext(StoreContext);
  const shoppingList = Object.values(store.shoppingList);

  useEffect(() => {
    getShoppingListItems(dispatch);
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={shoppingList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
      <Menu navigation={navigation} dispatch={dispatch} />
    </>
  );
};

ShoppingList.navigationOptions = {
  title: "Shopping list"
};

export default ShoppingList;

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
  list: {
    flex: 1
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
  }
});