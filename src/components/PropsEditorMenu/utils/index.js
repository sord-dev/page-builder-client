export const updateNestedState = (prevState, name, value, itemIndex = null, subKey = null) => {
    if (itemIndex !== null && subKey !== null) { // If the itemIndex and subKey are not null, then we are updating a nested state
        return { 
            ...prevState,
            [name]: prevState[name].map((item, idx) =>
                idx === itemIndex ? { ...item, [subKey]: value } : item
            )
        };
    }
    
    return { // If the itemIndex and subKey are null, then we are updating a top-level state
        ...prevState,
        [name]: value
    };
};