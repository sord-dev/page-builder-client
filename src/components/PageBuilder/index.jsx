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

      <TemplateEditor {...{ selectedComponent, setSelectedComponent, updateTemplateItem, removeTemplateItem: handleRemoveComponent }} />

      <PreviewMenu {...{ template, handleComponentClick: selectComponent, updateTemplate, components }} />
    </div>
  );
}

export default PageBuilder;
