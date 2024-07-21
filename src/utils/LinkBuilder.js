export const LinkBuilder = {
    buildLink: (components) => {
        if (!components.length) return;
        const pageData = buildPage(components, {});
        const base64Data = encodeToBase64(pageData);

        return `/sites/render?data=${base64Data}`;
    },

    buildPage: (components, userValues) => {
        let processComponent = components.map((c, i) => {
            const componentData = lodash.cloneDeep(c);
            componentData.props = lodash.merge(componentData.props, userValues);

            return componentData;
        });

        return { components: processComponent };
    },
};