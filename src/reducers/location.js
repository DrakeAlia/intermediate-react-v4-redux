// Ex:
// old state = Seattle
// action: {type: "CHANGE_LOCATION", payload: "SLC" }

// new state = "SLC";

// A reducer must have a default state.In our case, 
// using ES6 default params, we made Seattle, WA our default 
// state.This is how Redux will initialize your store, by 
// calling each of your reducers once to get a default state.

export default function location(state = "Seattle, WA", action) {
    switch (action.type) {
        case "CHANGE_LOCATION":
            return action.payload;
        default:
            return state;
    }
}


// Reducers are synchronous: they cannot be async. They also must 
// be pure with no side - effects.If you call a reducer 
// 10, 000, 000 times with the same state and action, you 
// should get the same answer on the 10, 000, 001st time.