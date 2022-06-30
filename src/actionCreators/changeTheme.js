// Let's go make the action creators. These are the functions 
// that the UI gives to the store to effect change: actions. 
// These functions create actions.

export default function changeTheme(theme) {
    return { type: "CHANGE_THEME", payload: theme }
}

// That's it! This one is the simplest form: create an object 
// and return it. Some people will inline these action shapes 
// in their React components. I prefer this because it makes 
// refactors simple.