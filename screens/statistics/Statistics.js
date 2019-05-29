import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { Text as SvgText } from "react-native-svg";
import { StoreContext } from "../../Store";
import { colors } from "../../common";
import { getBoughtProducts } from "../../actions";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const Labels = ({ slices }) => {
  return slices.map(slice => {
    const { pieCentroid, data } = slice;

    return (
      <SvgText
        key={data.key}
        x={pieCentroid[0]}
        y={pieCentroid[1]}
        fill="#000"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {data.amount}
      </SvgText>
    );
  });
};

const renderItem = ({ item }) => {
  return (
    <View style={styles.legend}>
      <View
        style={[styles.legendCircle, { backgroundColor: colors[item.key] }]}
      />
      <Text>{item.key}</Text>
    </View>
  );
};

const keyExtractor = ({ key }) => key;

const Statistics = () => {
  const { store, dispatch } = useContext(StoreContext);

  const { bought } = store;

  useEffect(() => {
    const { username, idToken } = store.auth;
    getBoughtProducts(dispatch)({ username, idToken });
  }, []);

  if (!bought.length) return null;

  let total = 0;
  const reducedProductsByType = bought.reduce((acc, curr) => {
    const { type } = curr;
    const price = parseFloat(curr.price);

    if (acc[type]) {
      acc[type].amount += price;
      total += price;
    } else {
      acc[type] = {
        key: type,
        amount: price,
        svg: { fill: colors[type] }
      };

      total += price;
    }

    return acc;
  }, {});
  const data = Object.values(reducedProductsByType);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{months[new Date().getMonth()]}</Text>
      <View>
        <PieChart
          style={styles.chart}
          valueAccessor={({ item }) => item.amount}
          data={data}
          spacing={0}
          outerRadius={"95%"}
        >
          <Labels />
        </PieChart>
        <View style={styles.total}>
          <Text>{total.toFixed(2)}</Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30
  },
  chart: {
    height: 200,
    width: "100%",
    marginTop: 60,
    marginBottom: 30
  },
  total: {
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    height: 20,
    paddingHorizontal: 20
  },
  legendCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 20
  }
});

Statistics.navigationOptions = {
  title: "Statistics"
};

export default Statistics;
