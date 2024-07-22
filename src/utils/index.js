import * as library from '../lib/component-library';

export const returnAllComponentNames = () => {
    return Object.keys(library).filter(key => key !== 'default')
        .map(key => ({ type: key, props: library[key].defaultProps || {} }));
};

export { LinkBuilder } from './LinkBuilder';

export const reduceComponentsByTags = (components) => {
    if (!components.length) return;
    return components.reduce((acc, c) => {
        if (!acc[c.props._tag]) {
            acc[c.props._tag] = [];
        }

        if (c.props._tag == undefined) {
            c.props._tag = 'misc';

            if (acc['misc'] === undefined) {
                acc['misc'] = [];
            }

            acc['misc'].push(c);
        }

        acc[c.props._tag].push(c);
        return acc;
    }, {});
};

import TemplateExporter from './TemplateExporter';
import { LinkBuilder } from './LinkBuilder';
export { TemplateExporter }; // Export TemplateExporter util class