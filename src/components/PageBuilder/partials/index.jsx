import React, { useState } from 'react';
import PageRender from "../../PageRender";
import styles from '../styles.module.css';
import { reduceComponentsByTags } from '../../../utils';

// COMPONENTS PICKER PARTIALS

export const ComponentsPicker = ({ updateTemplate, components, submitTemplate, resetTemplate, templateUpdated }) => {
    const [isOpen, setIsOpen] = useState(false);
    const catagorisedComponents = reduceComponentsByTags(components);

    const togglePicker = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <>
            <div className={styles['quick-controls']}>
                <button disabled={!templateUpdated} onClick={resetTemplate}>Reset Template</button>
                <button disabled={!templateUpdated} onClick={submitTemplate}>Submit Site</button>
                <button onClick={togglePicker}>
                    {isOpen ? 'Close Components Picker' : 'Open Components Picker'}
                </button>
            </div>

            {isOpen && (
                <div className={styles.componentPicker}>
                    <div className={styles.componentPickerHead}>
                        <h4>Components ({components.length})</h4>
                        <button onClick={closeMenu}>x</button>
                    </div>

                    <ul className={styles.componentGrid}>
                        {Object.keys(catagorisedComponents).map((catagory, i) =>
                            <RenderComponentCatagory {...{
                                catagory,
                                components: catagorisedComponents[catagory],
                                updateTemplate
                            }}
                                key={i}
                            />)}
                    </ul>

                    <div className={styles.componentPickerControls}>

                    </div>
                </div>
            )}
        </>
    );
};

const RenderComponentCatagory = ({ catagory, components, updateTemplate }) => {
    return (
        <li>
            <h5>{catagory}</h5>
            <ul className={styles.componentCatagoryGrid}>
                {components.map((c, i) => (
                    <ComponentButton component={c} updateTemplate={updateTemplate} key={i} />
                ))}
            </ul>
        </li>
    )
}

const ComponentButton = ({ component, updateTemplate }) => {
    const Icon = component.props._icon;
    return (
        <>
            <button onClick={() => updateTemplate(component)}>
                {Icon ? (
                    <Icon />
                ) : (
                    component.type
                )}
            </button>
            {Icon && <span>{component.type}</span>}
        </>
    );
};


// PREVIEW MENU PARTIALS

export const PreviewMenu = ({ template, pages, handleComponentClick, updateTemplate, components }) => {
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
