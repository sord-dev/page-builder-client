import React, { useState, useEffect } from 'react';
import * as library from "../../lib/component-lib"

function PageBuilder({ templateData, updateComponentIndex }) {
  const [template, setTemplate] = useState(templateData || { components: [] });

  useEffect(() => {
    updateComponentIndex(Object.keys(library).filter(key => key !== 'default'));
    setTemplate(templateData);
  }, [templateData]);

  const renderComponents = () => {
    if (!template || !template.components.length) {
      return <div>Loading template...</div>; // Display a placeholder
    }

    return template.components.map((component, index) => {
      try {
        const Component = library[component.type];

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

export default PageBuilder;
