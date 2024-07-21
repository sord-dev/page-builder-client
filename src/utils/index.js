import lodash from 'lodash';
import * as library from '../lib/component-library';

export const encodeToBase64 = (data) => {
    return btoa(JSON.stringify(data));
};

export const returnAllComponentNames = () => {
    return Object.keys(library).filter(key => key !== 'default')
        .map(key => ({ type: key, props: library[key].defaultProps || {} }));
};

export const buildLink = (components) => { // TODO-  mode to LinkBuilder
    if (!components.length) return;
    const pageData = buildPage(components, {});
    const base64Data = encodeToBase64(pageData);

    return `/sites/render?data=${base64Data}`;
};

export const buildPage = (components, userValues) => { // TODO-  mode to LinkBuilder
    let processComponent = components.map((c, i) => {
        const componentData = lodash.cloneDeep(c);
        componentData.props = lodash.merge(componentData.props, userValues);

        return componentData;
    });

    return { components: processComponent };
};

export const reduceComponentsByTags = (components) => {
    if(!components.length) return;
    console.log(components);
    return components.reduce((acc, c) => {
        if (!acc[c.props._tag]) {
            acc[c.props._tag] = [];
        }
        
        acc['misc'] = [];
        if (!c.props._tag) {
            c.props._tag = 'misc';
        }

        acc[c.props._tag].push(c);
        return acc;
    }, {});
};

import TemplateExporter from './TemplateExporter';
export { TemplateExporter }; // Export TemplateExporter util class