const encodeToBase64 = (data) => {
    return btoa(JSON.stringify(data));
};

export const LinkBuilder = {
    buildLink: (pageState) => {
        if (!pageState.pages.length) return;
        const base64Data = encodeToBase64(pageState);

        return `/sites/render?data=${base64Data}`;
    }
};