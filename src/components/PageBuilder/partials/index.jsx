import React, { useEffect, useState } from 'react';
import PageRender from "../../PageRender";
import styles from '../styles.module.css';

export const ComponentsPicker = ({ updateTemplate, components, submitTemplate, resetTemplate }) => {
    const [isOpen, setIsOpen] = useState(false);

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
                    <h4>Components</h4>
                    <ul className={styles.componentGrid}>
                        {components.map((c, i) => (
                            <ComponentButton component={c} updateTemplate={updateTemplate} key={i} />
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

export const PropsEditorMenu = ({ selectedComponent, updateTemplateItem, removeTemplateItem, setSelectedComponent }) => {
    return (
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
                        removeTemplateItem={removeTemplateItem}
                    />
                </div>
            ) : (
                <div>No component selected</div>
            )}
        </div>
    );
};


const PropsEditor = ({ type, props, index, updateTemplateItem, removeTemplateItem }) => {
    const [localProps, setLocalProps] = useState(props);

    useEffect(() => {
        setLocalProps(props);
    }, [props]);

    if (localProps.length <= 0) return 'No props found.';

    const handleChange = (e, itemIndex = null, subKey = null) => {
        const { name, value } = e.target;

        setLocalProps(prevProps => {
            if (itemIndex !== null && subKey !== null) {
                return {
                    ...prevProps,
                    [name]: prevProps[name].map((item, idx) =>
                        idx === itemIndex ? { ...item, [subKey]: value } : item
                    )
                };
            } else {
                return {
                    ...prevProps,
                    [name]: value
                };
            }
        });
    };

    const handleConfirm = () => {
        updateTemplateItem({ type, props: localProps }, index);
    };

    const handleDelete = () => {
        removeTemplateItem(index);
        setLocalProps({});
    };

    const ArrayItem = ({ keyName, item, itemIndex }) => (
        <div key={itemIndex} className={styles.propEditor}>
            {Object.keys(item).map(subKey => (
                <div className={styles.propItem} key={subKey}>
                    <label>{`${keyName}[${itemIndex}].${subKey}`}</label>
                    <input
                        type="text"
                        name={keyName}
                        value={item[subKey]}
                        onChange={(e) => handleChange(e, itemIndex, subKey)}
                    />
                </div>
            ))}
        </div>
    );

    const InputField = ({ keyName, value }) => (
        <input
            type="text"
            name={keyName}
            value={value}
            onChange={(e) => handleChange(e)}
        />
    );

    return (
        <div className={styles.propEditorMain}>
            {Object.keys(localProps).map(key => (
                <div key={key} className={styles.propEditor}>
                    <label>{key}</label>
                    {Array.isArray(localProps[key])
                        ? localProps[key].map((item, itemIndex) => (
                            <ArrayItem keyName={key} item={item} itemIndex={itemIndex} />
                        ))
                        : <InputField keyName={key} value={localProps[key]} />
                    }
                </div>
            ))}
            <button onClick={handleConfirm}>Confirm Changes</button><br />
            <button onClick={handleDelete}>Delete Component</button>
        </div>
    );
};

export const PreviewMenu = ({ template, handleComponentClick }) => {
    return (
        <PageRender
            templateData={{ components: template }}
            updateComponentIndex={() => { }}
            handleComponentClick={handleComponentClick}
            style={{ 'scale': '.5', 'marginTop': '0', "transform": "translateY(-50%)" }}
            previewMode
        />
    );
};
