export default function breed(state = "", action) {
    switch (action.type) {
        case "CHANGE_BREED":
            return action.payload;
        case "CHANGE_ANIMAL":
            return "";
        default:
            return state;
    }
}

// For this one, any time we issue a change animal action, 
// we want to reset the breed to be nothing selected so 
// we don't allow users to select tabby dogs or poodle cats