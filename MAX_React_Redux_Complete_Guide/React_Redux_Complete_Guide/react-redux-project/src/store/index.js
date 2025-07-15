const redux = require('redux');


function reducerFunction (state = { counter : 0 }, action) {
  if(action.type ==='increment') {
    return {
      counter: state.counter + 1
    }
  }

   if(action.type ==='decrement') {
    return {
      counter: state.counter - 1
    }
  }

  return state;
}

const store = redux.createStore(reducerFunction);

// store.dispatch({ type: "increment"});
// store.dispatch({ type: "decrement"});

export default store;