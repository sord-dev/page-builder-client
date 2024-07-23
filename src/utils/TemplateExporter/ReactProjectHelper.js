class ReactProjectHelper {
    static generateComponentString(importStatements, componentJSX) {
        return `
import React from "react";
${importStatements}

export default function Component() {
    return (
        <>
${componentJSX.join('\n')}
        </>
    );
}
`;
    }

    static generatePageString(fileName, importStatements, components) {
        return `
import React from 'react';
${importStatements}

const ${fileName} = () => (
    <div className="${fileName.toLowerCase()}">
        ${components}
    </div>
);

export default ${fileName};`;
    }

    static generateAppJs(pages) {
        const routes = pages.map(page => {
            const componentName = page.name.replace(/\s+/g, '');
            return `<Route path="${page.path}" element={<${componentName} />} />`;
        }).join('\n');

        return `
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
${pages.map(page => `import ${page.name.replace(/\s+/g, '')} from './pages/${page.name.replace(/\s+/g, '')}';`).join('\n')}

function App() {
    return (
        <Router>
            <Routes>
                ${routes}
            </Routes>
        </Router>
    );
}

export default App;`;
    }

    static generateProjectStructure(templateData) {
        return {
            'public/index.html': `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>`,
            'src/index.js': `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);`,
            'src/App.js': this.generateAppJs(templateData.pages),
            'src/index.css': `
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}`
        };
    }
}

export default ReactProjectHelper;