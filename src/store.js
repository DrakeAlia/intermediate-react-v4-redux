import { createStore } from "redux";
import reducer from './reducers'

// We're including the dev tools middleware (I'll show you at the end.) 
// This is the base of a store: a reducer. A store is just 
// basically a big object with prescribed ways of changing it.
// So let's go make our first reducer.

const store = createStore(
    reducer,
    // this enables the redux dev tools 
    typeof window === 'object' && 
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    );

export default store;
