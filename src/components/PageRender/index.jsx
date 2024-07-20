import React, { useState, useEffect } from 'react';

import { renderComponents } from './utils';
import { useComponentRefs } from '../../hooks';

function PageRender({ templateData, style, handleComponentClick = () => { }, previewMode = false }) {
  const [template, setTemplate] = useState(templateData || { components: [] });

  useEffect(() => {
    setTemplate(templateData);
  }, [templateData]);

  const componentRefs = useComponentRefs(template.components, handleComponentClick);

  return (
    <div className='main' style={style}>
      {/* Render loaded components */}
      {renderComponents({ template, previewMode, componentRefs })}
    </div>
  );
}

export default PageRender;
