import React, { useState, useEffect } from 'react';

import { renderComponents } from './utils';
import { useComponentRefs } from '../../hooks';

import { AppendComponentButton } from './partials';

import styles from './styles.module.css';

function PageRender({
  templateData = null,
  style,
  handleComponentClick = () => { },
  previewMode = false,
  appendComponent = (component, position) => { },
  components
}) {
  const [template, setTemplate] = useState(templateData || { components: [] });

  useEffect(() => {
    setTemplate(templateData);
  }, [templateData]);

  const componentRefs = useComponentRefs(template.components, handleComponentClick);

  return (
    <div className='main' style={style}>
      {/* Render loaded components */}

      {template.components.length === 0 && (
        <div className={styles['empty-page']}>
          <p>Click the button below to add a component to the page</p>
          <AppendComponentButton onSubmit={(c) => appendComponent(c, 'before')} components={components} />
        </div>
      )}

      {renderComponents({ template, previewMode, componentRefs, appendComponent, components })}
    </div>
  );
}

export default PageRender;