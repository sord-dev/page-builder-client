class TemplateExporter {
    static generateComponent(templateData, fileName) {
        this.validateTemplateData(templateData);

        const componentImports = new Set();
        const componentJSX = templateData.components.map(component => {
            this.validateComponentData(component);
            componentImports.add(`import ${component.type} from "../lib/component-lib";`);
            return `          <${component.type} {...${JSON.stringify(component.props)}} />`;
        });

        const importStatements = Array.from(componentImports).join('\n');
        return this.buildComponentString(fileName, importStatements, componentJSX);
    }

    static downloadComponent(templateData, fileName = 'Component') {
        const componentStr = this.generateComponent(templateData, fileName);
        this.triggerDownload(componentStr, fileName);
    }

    static validateTemplateData(templateData) {
        if (!templateData || !Array.isArray(templateData.components)) {
            throw new Error('Invalid template data');
        }
    }

    static validateComponentData(component) {
        if (!component || typeof component.type !== 'string') {
            throw new Error('Invalid component data');
        }
    }

    static buildComponentString(fileName, importStatements, componentJSX) {
        return `
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
    }

    static triggerDownload(content, fileName) {
        const blob = new Blob([content], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.js`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export default TemplateExporter;
