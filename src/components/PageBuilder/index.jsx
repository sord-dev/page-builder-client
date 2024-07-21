import React from 'react';
import { ComponentsPicker, PreviewMenu } from './partials';

import PropsEditorMenu from '../PropsEditorMenu'; // internal component

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

  return (
    <div>
      <ComponentsPicker
        {...{
          updateTemplate,
          components,
          submitTemplate,
          resetTemplate: resetPageTemplate,
        }}
      />

      <PropsEditorMenu {...{ selectedComponent, setSelectedComponent, updateTemplateItem, removeTemplateItem: handleRemoveComponent }} />

      <PreviewMenu {...{ template, handleComponentClick: selectComponent, updateTemplate, components }} />
    </div>
  );
}

export default PageBuilder;
