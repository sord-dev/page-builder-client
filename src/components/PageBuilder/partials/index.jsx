import React, { useState } from 'react';
import PageRender from "../../PageRender";
import styles from '../styles.module.css';
import { reduceComponentsByTags } from '../../../utils';

// COMPONENTS PICKER PARTIALS

export const ComponentsPicker = ({ updateTemplate, components, submitTemplate, resetTemplate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const catagorisedComponents = reduceComponentsByTags(components);

    const togglePicker = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button onClick={togglePicker} className={styles.toggleButton}>
                {isOpen ? 'Close Components Picker' : 'Open Components Picker'}
            </button>
            {isOpen && (
                <div className={styles.componentPicker}>
                    <h4>Components ({components.length})</h4>
                    <ul className={styles.componentGrid}>
                        {Object.keys(catagorisedComponents).map((catagory, i) => (
                            <li key={i}>
                                <h5>{catagory}</h5>
                                <ul className={styles.componentCatagoryGrid}>
                                    {catagorisedComponents[catagory].map((c, i) => (
                                        <ComponentButton component={c} updateTemplate={updateTemplate} key={i} />
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.componentPickerControls}>
                        <button onClick={resetTemplate}>Reset Template</button>
                        <button onClick={submitTemplate}>Submit Site</button>
                    </div>
                </div>
            )}
        </>
    );
};

const ComponentButton = ({ component, updateTemplate }) => {
    return (
        <button onClick={() => updateTemplate(component)}>{component.type}</button>
    );
};

// PREVIEW MENU PARTIALS

export const PreviewMenu = ({ template, handleComponentClick, updateTemplate, components }) => {
    return (
        <PageRender
            templateData={{ components: template }}
            updateComponentIndex={() => { }}
            handleComponentClick={handleComponentClick}
            appendComponent={updateTemplate}
            components={components}
            style={{ 'scale': '.5', 'marginTop': '0', "transform": "translateY(-50%)" }}
            previewMode
        />
    );
};
