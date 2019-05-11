import React, { useContext } from "react";
import { StoreContext } from "../../Store";
import { SafeAreaView, View, Text, SectionList } from "react-native";
import { colors } from "../../common";
import Swipeout from "react-native-swipeout";

const renderItem = ({ item }) => {
  const { id, name, price } = item;
  const rightSwipeoutButtons = [
    {
      text: "Edit",
      backgroundColor: "#ffda0c",
      underlayColor: "#f7d413",
      color: "#000",
      onPress: () => {}
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
    <Swipeout right={rightSwipeoutButtons}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: "#fff"
        }}
      >
        <Text>{name}</Text>
        <Text>{price}</Text>
      </View>
    </Swipeout>
  );
};

renderSectionHeader = ({ section: { title } }) => (
  <Text style={{ fontWeight: "bold", paddingHorizontal: 20 }}>{title}</Text>
);

renderSectionSeparator = () => <View style={{ marginBottom: 30 }} />;

const keyExtractor = ({ id }) => id;

const Products = () => {
  const { store } = useContext(StoreContext);
  const { products } = store;

  return (
    <SafeAreaView>
      <SectionList
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        SectionSeparatorComponent={renderSectionSeparator}
        sections={[
          { title: "Greens", data: Object.values(products.greens) },
          { title: "Meat", data: Object.values(products.meat) },
          { title: "Sweets", data: Object.values(products.sweets) },
          { title: "Fruits", data: Object.values(products.fruits) },
          { title: "Milk products", data: Object.values(products.milk) }
        ]}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export default Products;
