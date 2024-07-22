import { useState, useEffect } from 'react';

export const usePageBuilder = ({
  template = [],
  updateTemplate,
  removeTemplateItem,
  resetTemplate
}) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [templateUpdated, setUpdated] = useState(false);

  const selectComponent = (component) => {
    setSelectedComponent(component);
  };

  const resetPageTemplate = () => {
    setSelectedComponent(null);
    resetTemplate();
  };

  const handleRemoveComponent = (index) => {
    removeTemplateItem(index);
    setSelectedComponent(null);
  };

  useEffect(() => {
    if (template.length > 0) setUpdated(true);
    else setUpdated(false);
  }, [template]);

  return {
    selectedComponent,
    templateUpdated,
    selectComponent,
    resetPageTemplate,
    handleRemoveComponent,
    setSelectedComponent,
  };
};
