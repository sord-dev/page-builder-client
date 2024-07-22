import React, { useEffect } from 'react';
import { ComponentsPicker, PreviewMenu } from './partials';

import TemplateEditor from '../TemplateEditor'; // internal component

function PageBuilder({
  template = [],
  updateTemplate = (prevTemplates) => { console.log(prevTemplates) },
  components = [],
  updateTemplateItem = () => { console.log("Updateing template item") },
  removeTemplateItem = () => { console.log("Removing template item") },
  submitTemplate = (prevTemplates) => { console.log(prevTemplates) },
  resetTemplate = () => { console.log('resetting template') }
}) {
  const [selectedComponent, setSelectedComponent] = React.useState(null);
  const [templateUpdated, setUpdated] = React.useState(false);

  const selectComponent = (component) => {
    setSelectedComponent(component);
  };

  const resetPageTemplate = () => {
    setSelectedComponent(null)
    resetTemplate()
  }

  const handleRemoveComponent = (index) => {
    removeTemplateItem(index)
    setSelectedComponent(null)
  }

  const appendComponent = (component, position, index = null) => {
    updateTemplate(component, position, index)
    setSelectedComponent({ component, index })
  }

  useEffect(() => {
    if (template.length > 0) setUpdated(true)
    else setUpdated(false)
  }, [template])

  return (
    <div>
      <ComponentsPicker
        {...{
          templateUpdated,
          updateTemplate,
          components,
          submitTemplate,
          resetTemplate: resetPageTemplate,
        }}
      />

      <TemplateEditor {...{ selectedComponent, updateTemplateItem, removeTemplateItem: handleRemoveComponent }} />

      <PreviewMenu {...{ template, handleComponentClick: selectComponent, updateTemplate: appendComponent, components }} />
    </div>
  );
}

export default PageBuilder;
