const redux = require('redux');

const counterReducer = (state = { counter : 0 }, action) => {
  if(action.type === 'increment') {
    return {
      counter: state.counter + 1
    }
  }
  
  if(action.type === 'decrement') {
    const counter =  state.counter - 1;
    return { counter }
  }
}

const store = redux.createStore(counterReducer);// which reducer updated the current old state
console.log("- STORE-->", store)
store.subscribe(counterSubscriber);
store.dispatch({ type: "increment" })
store.dispatch({ type: "decrement" })
console.log("- STORE 2-->", store);

function counterSubscriber() {
  const latestState = store.getState();
  console.log(latestState);
}