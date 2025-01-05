const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOKED = "CAKE_RESTOKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}
function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}
function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}
// (previousState, action)=>newState
// const initialState = {
//   numberOfCakes: 10,
//   numberOfIceCream: 20,
// };
const cakeState = {
  numberOfCakes: 10,
};
const iceCreaState = {
  numberOfIceCream: 10,
};

const cakeReducer = (state = cakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    case CAKE_RESTOKED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload,
      };

    default:
      return state;
  }
};
const icreCreamReducer = (state = iceCreaState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream + action.payload,
      };

    default:
      return state;
  }
};
const rootReducer = combineReducers({
  cake: cakeReducer,
  icreCream: icreCreamReducer,
});
const store = createStore(rootReducer);
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Update State", store.getState())
);
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.restockCake(4);
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(3);
unsubscribe();
