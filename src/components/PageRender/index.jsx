import React, { useState, useEffect } from 'react';
import * as library from "../../lib/component-lib"

const renderJSXComponent = (component) => {
  if (!component || !component.type) {
    return null;
  }

  const Component = determineComponentType(component);

  if (!Component) {
    return null;
  }

  return Component
}

const determineComponentType = (component) => {
  if (!component || !component.type) {
    return null;
  }

  const customComponent = library[component.type];

  if (!customComponent) {
    return React.createElement(component.type, component.props);
  }

  return customComponent;
};

function PageRender({ templateData, updateComponentIndex }) {
  const [template, setTemplate] = useState(templateData || { components: [] });

  useEffect(() => {
    const indexedComponents = Object.keys(library).filter(key => key !== 'default')
    .map(key => {console.log('values',library[key].params); return { type: key, props: library[key].defaultProps || {} }});
    updateComponentIndex(indexedComponents); // indexing all exported components in the library to AppContext state
    setTemplate(templateData);
  }, [templateData]);

  const renderComponents = () => {
    if (!template || !template.components.length) {
      return <div>Loading template...</div>; // Display a placeholder
    }

    return template.components.map((component, index) => {
      try {
        const Component = renderJSXComponent(component);

        if (!Component) {
          throw new Error(`Component ${component.type} not found`);
        }

        return (<Component {...component.props} key={`${component.type}-${index}`} />);
      } catch (error) {
        console.error(error);
        return null;
      }
    });
  };

  return (
    <div>
      {/* Render loaded components */}
      {renderComponents()}
    </div>
  );
}

export default PageRender;
