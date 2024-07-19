<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import PageRender from "../../PageRender";
=======
import PageRender from "../../PageRender"
>>>>>>> 4ef24d23e6b96b3aeb3d8c5de457605799622ccb
import styles from '../styles.module.css';

export const ComponentsPicker = ({ updateTemplate, components, submitTemplate, resetTemplate, selectedComponent, setSelectedComponent, updateTemplateItem }) => {
    return (
        <>
            <div className={styles.componentPicker}>
                <h4>Components</h4>
                <ul className={styles.componentGrid}>
                    {components.map((c, i) => <ComponentButton component={c} updateTemplate={updateTemplate} key={i} />)}
                </ul>

                <div className={styles.componentPickerControls}>
                    <button onClick={resetTemplate}>Reset Template</button>
                    <button onClick={submitTemplate}>Submit Site</button>
                </div>
            </div>

            <div className={styles.componentStateEditor}>
                {selectedComponent ? (
                    <div className={styles.selectedComponent}>
                        <div className={styles['heading']}>
                            <h4>Selected Component</h4>
                            <button onClick={() => setSelectedComponent(null)}>&times;</button>
                        </div>
                        <h2>{selectedComponent.component.type}</h2>
                        <p>Props</p>
                        <PropsEditor 
                            type={selectedComponent.component.type}
                            props={selectedComponent.component.props} 
                            index={selectedComponent.index} 
                            updateTemplateItem={updateTemplateItem}
                        />
                    </div>
                ) : (
                    <div>No component selected</div>
                )}
            </div>
        </>
    );
};

const ComponentButton = ({ component, updateTemplate }) => {
    return (
        <button onClick={() => updateTemplate(component)}>{component.type}</button>
    );
};

const PropsEditor = ({ type, props, index, updateTemplateItem }) => {
    const [localProps, setLocalProps] = useState(props);

    const handleChange = (e, itemIndex, subKey) => {
        const { name, value } = e.target;
        
        if (itemIndex !== null && subKey !== null) {
            setLocalProps(prevProps => ({
                ...prevProps,
                [name]: prevProps[name].map((item, idx) =>
                    idx === itemIndex ? { ...item, [subKey]: value } : item
                )
            }));
        } else {
            setLocalProps(prevProps => ({
                ...prevProps,
                [name]: value
            }));
        }
    };

    const handleConfirm = () => {
        updateTemplateItem({ type, props: localProps }, index);
    };

    useEffect(() => {
        setLocalProps(props);
    }, [props]);

    return (
        <div className={styles.propEditorMain}>
            {Object.keys(localProps).map(key => (
                <div key={key} className={styles.propEditor}>
                    <label>{key}</label>
                    {Array.isArray(localProps[key]) ? (
                        localProps[key].map((item, itemIndex) => (
                            <div key={itemIndex} className={styles.propEditor}>
                                {Object.keys(item).map(subKey => (
                                    <div className={styles['prop-item']} key={subKey}>
                                        <label>{`${key}[${itemIndex}].${subKey}`}</label>
                                        <input
                                            type="text"
                                            name={key}
                                            value={item[subKey]}
                                            onChange={(event) => handleChange(event, itemIndex, subKey)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <input
                            type="text"
                            name={key}
                            value={localProps[key]}
                            onChange={(event) => handleChange(event, null, null)}
                        />
                    )}
                </div>
            ))}
            <button onClick={handleConfirm}>Confirm Changes</button>
        </div>
    );
};

export const PreviewMenu = ({ template, handleComponentClick }) => {
    return (
        <PageRender 
            templateData={{ components: template }} 
            updateComponentIndex={() => {}} 
            handleComponentClick={handleComponentClick} 
            style={{ 'scale': '.5', 'marginTop': '0' }} 
        />
    );
};
