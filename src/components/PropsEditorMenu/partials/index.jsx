import { useEffect, useState } from 'react';
import styles from '../styles.module.css';

export const PropsEditor = ({ type, props, index, updateTemplateItem, removeTemplateItem }) => {
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


    return (
        <div className={styles.propEditorMain}>
            {Object.keys(localProps).map(key => (
                <div key={key} className={styles.propEditor}>
                    <label>{key}</label>
                    {Array.isArray(localProps[key])
                        ? localProps[key].map((item, itemIndex) => (
                            <ArrayItem keyName={key} item={item} itemIndex={itemIndex} handleChange={handleChange} />
                        ))
                        : <InputField keyName={key} value={localProps[key]} handleChange={handleChange} />
                    }
                </div>
            ))}
            <button onClick={handleConfirm}>Confirm Changes</button><br />
            <button onClick={handleDelete}>Delete Component</button>
        </div>
    );
};


const ArrayItem = ({ keyName, item, itemIndex, handleChange = e => console.log(e.target.value) }) => (
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

const InputField = ({ keyName, value, handleChange = e => console.log(e.target.value) }) => {
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
