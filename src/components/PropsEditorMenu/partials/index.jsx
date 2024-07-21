import { useEffect, useState } from 'react';
import styles from '../styles.module.css';

import { updateNestedState } from '../utils';

export const PropsEditor = ({
    type = null,
    props = {},
    index = null,
    updateTemplateItem = () => console.log('updateTemplateItem not provided'),
    removeTemplateItem = () => console.log('removeTemplateItem not provided')
}) => { // Used to render the props editor for the selected component
    if(!type) return 'No component selected.'; // If no component is selected, return a message
    const [localProps, setLocalProps] = useState(props);

    useEffect(() => {
        setLocalProps(props);
    }, [props]);

    if (localProps === null) return 'No props to edit.'; // If there are no props to edit, return a message

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
        <div className={styles.propEditorMain}>
            {Object.keys(localProps).map(key => <PropertyEditor key={key} keyName={key} value={localProps[key]} handleChange={handleChange} />)}
            <button onClick={handleConfirm}>Confirm Changes</button><br />
            <button onClick={handleDelete}>Delete Component</button>
        </div>
    );
};

const PropertyEditor = ({ keyName, value, handleChange }) => ( // Used to render the props of the selected component
    <div className={styles.propEditor}>
        <label>{keyName}</label>
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

const InputField = ({ keyName, value, handleChange = e => console.log(e.target.value) }) => { // Used to render the input fields of the selected component
    if (keyName.startsWith('_')) {
        return <p>{value}</p>
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
