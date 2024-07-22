import { useEffect, useState } from 'react';
import styles from '../styles.module.css';

import { updateNestedState } from '../utils';

export const PageEditor = ({ pages }) => {
    return (
        <div className={styles.selectedComponent}>
            <h4>All Pages</h4>
            <div className={styles.pageEditorMain}>
                {pages.map((page, i) => (
                    <div key={i} className={styles.pageLink}>
                        <h5>{page.name}</h5>
                        <p>{page.path}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const PropsEditor = ({
    selectedComponent = { component: { type: null, props: {} }, index: null },
    updateTemplateItem = () => console.log('updateTemplateItem not provided'),
    removeTemplateItem = () => console.log('removeTemplateItem not provided')
}) => { // Used to render the props editor for the selected component
    if (selectedComponent == null) {
        return (
            <div className={styles.selectedComponent}>
                <p>Select a component to edit</p>
                <div className={styles.propEditorMain}>
                    No component selected
                </div>
            </div>
        );
    };
    const { component: { type, props }, index } = selectedComponent;

    const [localProps, setLocalProps] = useState(props);

    useEffect(() => {
        setLocalProps(props);
    }, [props]);

    const handleChange = (e, itemIndex = null, subKey = null) => {
        const { name, value } = e.target;
        setLocalProps(prevProps => updateNestedState(prevProps, name, value, itemIndex, subKey));
    };

    const handleConfirm = () => {
        updateTemplateItem({ type, props: localProps }, index);
    };

    const handleDelete = () => {
        removeTemplateItem(index);
        setLocalProps({});
    };

    return (
        <div className={styles.selectedComponent}>
            <div className={styles['heading']}>
                <h5>{type}</h5>
            </div>

            <div className={styles.propEditorMain}>
                {Object.keys(localProps).map(key => <PropertyEditor key={key} keyName={key} value={localProps[key]} handleChange={handleChange} />)}
            </div>

            <div className={styles.propEditorControls}>
                <button onClick={handleConfirm}>Confirm Changes</button>
                <button onClick={handleDelete}>Delete Component</button>
            </div>
        </div>
    );
};

const PropertyEditor = ({ keyName, value, handleChange }) => ( // Used to render the props of the selected component
    <div className={styles.propEditor}>
        <label className={styles['props-editor-subtitle']}>{keyName}</label>
        {Array.isArray(value)
            ? value.map((item, itemIndex) => (
                <ArrayItem
                    key={`${keyName}-${itemIndex}`}
                    keyName={keyName}
                    item={item}
                    itemIndex={itemIndex}
                    handleChange={handleChange}
                />
            ))
            : <InputField
                keyName={keyName}
                value={value}
                handleChange={handleChange}
            />
        }
    </div>
);

const ArrayItem = ({ keyName, item, itemIndex, handleChange = e => console.log(e.target.value) }) => ( // Used to render the array items of the selected component
    <div key={itemIndex} className={styles.propEditor}>
        {Object.keys(item).map(subKey => {

            return (
                <div className={styles[`prop-item`]} key={subKey}>
                    <label>{`${subKey} ${itemIndex}`}</label>
                    <input
                        type="text"
                        name={keyName}
                        value={item[subKey]}
                        onChange={(e) => handleChange(e, itemIndex, subKey)}
                    />
                </div>
            )
        })}
    </div>
);

const InputField = ({ keyName, value, handleChange = e => console.log(e.target.value) }) => { // Used to render the input fields of the selected component
    if (keyName.startsWith('_')) {
        return <p className={styles['tag']}>{value}</p>
    }

    return (
        <input
            type="text"
            name={keyName}
            value={value}
            onChange={(e) => handleChange(e)}
        />
    );
}
