import JSZip from "jszip";
import { saveAs } from "file-saver";

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

    static downloadComponentZip(templateData, fileName = 'Component') {
        const componentStr = this.generateComponent(templateData, fileName);
        this.createZipAndDownload(componentStr, fileName);
    }

    static downloadComponentFile(templateData, fileName = 'Component') {
        const componentStr = this.generateComponent(templateData, fileName);
        this.createFileAndDownload(componentStr, fileName);
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

    static async createZipAndDownload(content, fileName) {
        const zip = new JSZip();
        zip.folder(fileName).file("page.js", content);

        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, `${fileName}.zip`);
    }

    static async createFileAndDownload(content, fileName) {
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${fileName}.js`);
    }
}

export default TemplateExporter;
