const redux = require("redux");
const createStore = redux.createStore;

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

function increase(qty = 1) {
  return {
    type: INCREMENT,
    payload: qty,
  };
}
function decrease(qty = 1) {
  return {
    type: DECREMENT,
    payload: qty,
  };
}

const initialState = {
  total: 50,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        total: state.total + action.payload,
      };
    case DECREMENT:
      return {
        ...state,
        total: state.total - action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Update State", store.getState())
);

store.dispatch(increase(2));
store.dispatch(increase(2));
store.dispatch(decrease(5));
unsubscribe();
