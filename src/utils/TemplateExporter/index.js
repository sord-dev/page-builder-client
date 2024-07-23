import JSZip from "jszip";
import { saveAs } from "file-saver";
import ReactProjectHelper from "./ReactProjectHelper";

class TemplateExporter {
    static generateComponent(template) {
        this.validateTemplateData(template);

        const componentImports = new Set();
        const componentJSX = template.components.map(component => {
            this.validateComponentData(component);
            componentImports.add(`import ${component.type} from "../lib/component-lib";`);
            return `          <${component.type} {...${JSON.stringify(component.props)}} />`;
        });

        const importStatements = Array.from(componentImports).join('\n');
        return ReactProjectHelper.generateComponentString(importStatements, componentJSX);
    }

    static generatePageContent(page, templates) {
        const components = templates[page.templateId].map(template => {
            this.validateComponentData(template);
            return `          <${template.type} {...${JSON.stringify(template.props)}} />`;
        }).join('\n');

        const componentImports = new Set();
        templates[page.templateId].forEach(template => {
            componentImports.add(`import ${template.type} from '../components/${template.type}';`);
        });

        const importStatements = Array.from(componentImports).join('\n');
        return ReactProjectHelper.generatePageString(page.name.replace(/\s+/g, ''), importStatements, components);
    }

    static downloadComponentFile(templateData, fileName = 'Component') {
        const componentStr = this.generateComponent(templateData);
        this.createFileAndDownload(componentStr, fileName);
    }

    static downloadProjectZip(templateData) {
        const zip = new JSZip();
        const projectStructure = ReactProjectHelper.generateProjectStructure(templateData);

        // Add pages and components based on the template data
        templateData.pages.forEach(page => {
            const pageContent = this.generatePageContent(page, templateData.templates);
            projectStructure[`src/pages/${page.name.replace(/\s+/g, '')}.js`] = pageContent;
        });

        // Add components based on the template data
        Object.keys(templateData.templates).forEach(templateKey => {
            templateData.templates[templateKey].forEach(template => {
                projectStructure[`src/components/${template.type}.js`] = this.generateComponent({ components: [template] });
            });
        });

        // Add each file to the zip
        for (const [path, content] of Object.entries(projectStructure)) {
            zip.file(path, content);
        }

        // Generate the zip file and prompt the user to download it
        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, 'my-react-app.zip');
        });
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

    static async createFileAndDownload(content, fileName) {
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${fileName}.js`);
    }
}

export default TemplateExporter;