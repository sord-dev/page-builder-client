import { useState } from 'react';
import styles from '../styles.module.css';

export const ComponentWrapper = ({ ComponentElement, componentRefs, editable = false, index = 0, appendComponent, components }) => {
    const [hovering, setHovering] = useState(false);

    const handleHover = () => { setHovering(true); };
    const handleLeave = () => { setHovering(false); };

    const handleAppendComponent = (component, position) => {
        appendComponent(component, position);
    }

    if (!ComponentElement) {
        throw new Error(`Component ${component.type} not found`);
    }

    if (!componentRefs) {
        throw new Error('Component refs not provided');
    }

    return (
        <div className={`${styles['componentWrapper']}`} onMouseOver={handleHover} onMouseLeave={handleLeave}>
            {hovering && editable && (<AppendComponentButton
                onSubmit={(result) => handleAppendComponent(result, 'before')}
                {...{ components }}
            />)}

            <div className={`${styles["componentContainer"]} ${editable ? styles["componentHover"] : ""}`}
                ref={(el) => (componentRefs.current[index] = el)}
            >
                {ComponentElement}
            </div>
            {hovering && editable && (<AppendComponentButton
                onSubmit={(result) => handleAppendComponent(result, 'after')}
                {...{ components }}
            />)}
        </div>
    );
}


const AppendComponentButton = ({ onSubmit = (component) => { console.log('appending', component) }, components }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            {menuOpen && (
                <div className={styles.appendList}>
                    <div className={styles['appendList-spacer']} />
                    {components.map((component, index) => (
                        <button key={index} onClick={() => onSubmit(component)}>{component.type}</button>
                    ))}
                </div>
            )}

            <button onClick={handleMenuToggle}>+</button>
        </>
    );
}