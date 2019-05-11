import React, { useContext } from "react";
import { StoreContext } from "../../Store";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  SectionList,
  Dimensions
} from "react-native";
import { colors } from "../../common";
import Swipeout from "react-native-swipeout";

const screenHeight = Dimensions.get("window").height;

const generateTitleColor = title => {
  switch (title) {
    case "Greens":
      return colors.transparentGreen(0.5);
    case "Meat":
      return colors.transparentMeat(0.5);
    case "Sweets":
      return colors.transparentSweets(0.5);
    case "Fruits":
      return colors.transparentFruits(0.5);
    case "Milk":
      return colors.transparentMilk(0.5);
    default:
      return "#fff";
  }
};

const renderItem = ({ item, section }) => {
  const { id, name, price } = item;
  const type = section.title.toLowerCase();
  const leftSwipeOutButtons = [
    {
      text: "Buy",
      backgroundColor: colors.secondary,
      underlayColor: colors.secondaryVariant,
      color: "#000",
      onPress: () => {}
    }
  ];
  const rightSwipeoutButtons = [
    {
      text: "Edit",
      backgroundColor: colors.edit,
      underlayColor: colors.editSecondary,
      color: "#000",
      onPress: () => {
        // pass id and a type
      }
    },
    {
      text: "Delete",
      backgroundColor: colors.delete,
      underlayColor: colors.deleteSecondary,
      color: "#fff",
      onPress: () => {}
    }
  ];

  return (
    <Swipeout left={leftSwipeOutButtons} right={rightSwipeoutButtons}>
      <View style={styles.item}>
        <Text>{name}</Text>
        <Text>{price}</Text>
      </View>
    </Swipeout>
  );
};

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

const Products = () => {
  const { store } = useContext(StoreContext);
  const { products } = store;

  return (
    <SafeAreaView>
      <Text style={styles.title}>Products</Text>
      <SectionList
        style={styles.list}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        sections={[
          { title: "Greens", data: Object.values(products.greens) },
          { title: "Meat", data: Object.values(products.meat) },
          { title: "Sweets", data: Object.values(products.sweets) },
          { title: "Fruits", data: Object.values(products.fruits) },
          { title: "Milk", data: Object.values(products.milk) }
        ]}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    maxHeight: screenHeight - 135
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
    backgroundColor: "#fff"
  }
});
