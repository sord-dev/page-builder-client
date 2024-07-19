import lodash from 'lodash';
import * as library from '../lib/component-library';

export const encodeToBase64 = (data) => {
    return btoa(JSON.stringify(data));
};

export const returnAllComponentNames = () => {
    return Object.keys(library).filter(key => key !== 'default')
        .map(key => {
            console.log(library[key]);
            return ({ type: key, props: library[key].defaultProps || {} });
        });
};

export const buildLink = (components) => {
    if (!components.length) return;
    const pageData = buildPage(components, {});
    const base64Data = encodeToBase64(pageData);

    return `/sites/render?data=${base64Data}`;
};

export const buildPage = (components, userValues) => {
    let processComponent = components.map((c, i) => {
        const componentData = lodash.cloneDeep(c);
        componentData.props = lodash.merge(componentData.props, userValues);

        return componentData;
    });

    return { components: processComponent };
};

const generateComponent = (templateData, fileName) => {
    if (!templateData || !templateData.components) {
        throw new Error('Invalid template data');
    }

    const componentImports = new Set();
    const componentJSX = [];
    
    componentImports.add(`import * as components from "@/components";`);

    templateData.components.forEach((component) => {
        if (!component || !component.type) {
            throw new Error('Invalid component data');
        }

        componentJSX.push(`          <${component.type} {...${JSON.stringify(component.props)}} />`);
    });

    const importStatements = Array.from(componentImports).join('\n');

    const componentStr = `
import React from "react";
${importStatements}

export default function ${fileName}() {
    return (
        <>
${componentJSX.join('\n')}
        </>
    );
}
`;

    return componentStr;
};

export const downloadHomeComponent = (templateData, fileName = 'Component') => {
    const componentStr = generateComponent(templateData, fileName);
    
    const blob = new Blob([componentStr], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.js`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
