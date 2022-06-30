// combineReducers is a convenience function from Redux so 
// you don't have to write your own root reducer. You can if 
// you want to; this is just a bit easier. So now we have a 
// root reducer that will delegate all changed to the 
// location key to this reducer.

import { combineReducers } from "redux";
import location from "./location";
import breed from "./breed";
import animal from "./animal"
import theme from "./theme";

export default combineReducers({
    location,
    breed,
    animal,
    theme,
})