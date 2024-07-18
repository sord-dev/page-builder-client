# Client-Side Page Builder

A ReactJS page builder that uses an external component library.

## How we're rendering templates

Currently uses Base64 encoding to read template data from url params. 
Then imports all components from a url library and renders them out. Only allows for very basic templates given the rendering function is not recourrisve.

```js
import React, { useState, useEffect } from 'react';
import * as library from "../../lib/component-lib"

function PageBuilder({ templateData, updateComponentIndex }) {
  const [template, setTemplate] = useState(templateData || { components: [] });

  useEffect(() => {
    updateComponentIndex(Object.keys(library).filter(key => key !== 'default')); // indexing all exported components in the library to AppContext state
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
```

## Limitations 

- Very large url parameters