import * as library from 'huskio-component-library'

export const encodeToBase64 = (data) => {
    return btoa(JSON.stringify(data))
}

export const returnAllComponentNames = () => {
    return Object.keys(library).filter(key => key !== 'default')
        .map(key => ({ type: key, props: library[key].defaultProps || {} }));
}