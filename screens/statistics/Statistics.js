import React from "react";
import { PieChart } from "react-native-svg-charts";
import { Text } from "react-native-svg";
import { colors } from "../../common";

const Statistics = ({ products }) => {
  const data = products.reduce((acc, curr) => {
    if (acc[curr.type]) {
      acc[curr.type].amount += curr.price;
    } else {
      acc[curr.type] = {
        key: curr.type,
        amount: curr.price,
        svg: { fill: colors[curr.type] }
      };
    }

    return acc;
  }, {});

  const Labels = ({ slices }) => {
    return slices.map(slice => {
      const { pieCentroid, data } = slice;

      return (
        <Text
          key={data.key}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="#000"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {data.amount}
        </Text>
      );
    });
  };

  return (
    <PieChart
      style={{ height: 200 }}
      valueAccessor={({ item }) => item.amount}
      data={Object.values(data)}
      spacing={0}
      outerRadius={"95%"}
    >
      <Labels />
    </PieChart>
  );
};

Statistics.defaultProps = {
  products: [
    {
      id: "2321fg1",
      timestamp: "1558974633670",
      name: "Rice",
      type: "grain",
      price: 1.49
    },
    {
      id: "2321fg2",
      timestamp: "1558974633670",
      name: "Chicken",
      type: "meat",
      price: 1.49
    },
    {
      id: "23321f",
      timestamp: "1558974633670",
      name: "Beef",
      type: "meat",
      price: 1.49
    },
    {
      id: "2324gf1",
      timestamp: "1558974633670",
      name: "Yogurt",
      type: "other",
      price: 1.49
    },
    {
      id: "232gh51",
      timestamp: "1558974633670",
      name: "Milk",
      type: "milk",
      price: 1.49
    },
    {
      id: "2321dd",
      timestamp: "1558974633670",
      name: "Coke",
      type: "drinks",
      price: 1.49
    },
    {
      id: "238261",
      timestamp: "1558974633670",
      name: "Snickers",
      type: "sweets",
      price: 1.49
    },
    {
      id: "23721",
      timestamp: "1558974633670",
      name: "Cheese",
      type: "milk",
      price: 1.49
    },
    {
      id: "232ewrr1",
      timestamp: "1558974633670",
      name: "Ferrero roche",
      type: "sweets",
      price: 1.49
    },
    {
      id: "232wer1",
      timestamp: "1558974633670",
      name: "Salad",
      type: "greens",
      price: 1.49
    },
    {
      id: "23sdf21",
      timestamp: "1558974633670",
      name: "Tea",
      type: "drinks",
      price: 1.49
    },
    {
      id: "232bg1",
      timestamp: "1558974633670",
      name: "Chicken Curry",
      type: "meat",
      price: 1.49
    },
    {
      id: "23u7721",
      timestamp: "1558974633670",
      name: "Rice",
      type: "greens",
      price: 1.49
    },
    {
      id: "232871",
      timestamp: "1558974633670",
      name: "Beef",
      type: "meat",
      price: 1.49
    },
    {
      id: "2327i1",
      timestamp: "1558974633670",
      name: "Water",
      type: "drinks",
      price: 1.49
    },
    {
      id: "237821",
      timestamp: "1558974633670",
      name: "Rice",
      type: "greens",
      price: 1.49
    }
  ]
};

Statistics.navigationOptions = {
  title: "Statistics"
};

export default Statistics;
