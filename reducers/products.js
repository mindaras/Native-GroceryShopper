export const productsInitialState = {
  greens: {
    1: {
      id: 1,
      name: "Salad",
      price: 2.59
    }
  },
  meat: {
    2: {
      id: 2,
      name: "Chicken",
      price: 3.48
    }
  },
  sweets: {
    3: {
      id: 3,
      name: "Coca Cola",
      price: 1.38
    }
  },
  fruits: {
    4: {
      id: 4,
      name: "Orange",
      price: 0.56
    }
  },
  milk: {
    5: {
      id: 5,
      name: "Cheese",
      price: 2.17
    }
  }
};

export const products = (state, action) => {
  return state;
};
