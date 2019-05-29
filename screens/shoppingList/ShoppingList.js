import React, { useContext, useEffect, useCallback, memo } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
  View,
  Text
} from "react-native";
import Swipeout from "react-native-swipeout";
import { colors } from "../../common";
import { StoreContext } from "../../Store";
import {
  refreshShoppingList,
  boughtItem,
  removeItemFromShoppingList
} from "../../actions";
import { Menu } from "../../components";
import { getShoppingListItems } from "../../actions";

const Product = memo(({ id, name, price, type, index }) => {
  const { store, dispatch } = useContext(StoreContext);
  const { username, idToken } = store.auth;
  const buyItem = useCallback(() => {
    boughtItem(dispatch)({
      username,
      idToken,
      id,
      name,
      price,
      type
    }),
      [id, name, price, type];
  });
  const deleteItem = useCallback(() => {
    removeItemFromShoppingList(dispatch)({
      username,
      idToken,
      id
    }),
      [id];
  });
  const leftSwipeOutButtons = [
    {
      text: "Bought",
      backgroundColor: colors.bought,
      underlayColor: colors.boughtSecondary,
      color: "#fff",
      onPress: buyItem
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
    <Swipeout
      left={leftSwipeOutButtons}
      right={rightSwipeoutButtons}
      autoClose={true}
    >
      <View
        style={[
          styles.item,
          {
            borderTopWidth: index === 0 ? 1 : 0,
            borderLeftWidth: 5,
            borderLeftColor: colors[type]
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
  const { shoppingList: refreshing } = store.refresh;
  const refreshHandler = useCallback(() => {
    refreshShoppingList(dispatch);
  }, []);

  useEffect(() => {
    getShoppingListItems(dispatch)({ refreshing });
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
          <FlatList
            data={shoppingList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </ScrollView>
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
