import React, { useState, useEffect } from 'react';
import * as library from '../../lib/component-library';

import { useComponentRefs } from '../PageBuilder/utils';

const renderJSXComponent = (component) => {
  if (!component || !component.type) {
    return null;
  }

  const Component = determineComponentType(component);

  if (!Component) {
    return null;
  }

  return <Component {...component.props} />;
};

const determineComponentType = (component) => {
  if (!component || !component.type) {
    return null;
  }

  const CustomComponent = library[component.type];

  if (!CustomComponent) {
    throw new Error(`Component ${component.type} not found`);
  }

  return CustomComponent;
};

function PageRender({ templateData, style, handleComponentClick = () => {} }) {
  const [template, setTemplate] = useState(templateData || { components: [] });

  useEffect(() => {
    setTemplate(templateData);
  }, [templateData]);

  const componentRefs = useComponentRefs(template.components, handleComponentClick);

  const renderComponents = () => {
    if (!template || !template.components.length) {
      return <div>Loading template...</div>; // Display a placeholder
    }

    componentRefs.current = []; // Clear previous refs

    return template.components.map((component, index) => {
      try {
        const ComponentElement = renderJSXComponent(component);

        if (!ComponentElement) {
          throw new Error(`Component ${component.type} not found`);
        }

        return (
          <div
            key={`${component.type}-${index}`}
            ref={(el) => (componentRefs.current[index] = el)}
          >
            {ComponentElement}
          </div>
        );
      } catch (error) {
        console.error(error);
        return null;
      }
    });
  };

  return (
    <div style={style}>
      {/* Render loaded components */}
      {renderComponents()}
    </div>
  );
}

export default PageRender;
