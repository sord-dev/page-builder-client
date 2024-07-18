
export const encodeToBase64 = (data) => {
    return btoa(JSON.stringify(data))
}
