import { useState } from 'react';
import styles from '../styles.module.css';
import { reduceComponentsByTags } from '../../../utils';

export const ComponentWrapper = ({ ComponentElement, componentRefs, editable = false, index = 0, appendComponent, components }) => {
    const [hovering, setHovering] = useState(false);

    const handleHover = () => { setHovering(true); };
    const handleLeave = () => { setHovering(false); };

    const handleAppendComponent = (component, position, index) => {
        appendComponent(component, position, index);
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
                onSubmit={(result) => handleAppendComponent(result, 'before', index)}
                {...{ components }}
            />)}

            <div className={`${styles["componentContainer"]} ${editable ? styles["componentHover"] : ""}`}
                ref={(el) => (componentRefs.current[index] = el)}
            >
                {ComponentElement}
            </div>
            {hovering && editable && (<AppendComponentButton
                onSubmit={(result) => handleAppendComponent(result, 'after', index)}
                {...{ components }}
            />)}
        </div>
    );
}

export const AppendComponentButton = ({ onSubmit = (component) => { console.log('appending', component) }, components }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className={styles['button-wrapper']}>
            {menuOpen && <ComponentAppendMenu components={components} onSubmit={(c) => onSubmit(c)} />}
            <button className={styles['addSectionBtn']} onClick={handleMenuToggle}>+</button>
        </div>
    );
}

const ComponentAppendMenu = ({ components, onSubmit }) => {
    if (!components) throw new Error('No components provided');
    if (!onSubmit) throw new Error('No onSubmit function provided');
    const [menuState, setMenuState] = useState({ stage: 0, catagory: null, components: null });

    const catagories = reduceComponentsByTags(components)

    const handleCatagorySelect = (catagory) => {
        setMenuState({ stage: 1, catagory, components: catagories[catagory] });
    }

    const handleBackstep = () => {
        setMenuState({ stage: 0, catagory: null, components: null });
    }

    const steps = [
        <CatagoryStep {...{ catagories, handleCatagorySelect }} />,
        <ComponentStep {...{ components: menuState.components, onSubmit, handleBackstep }} />
    ];

    return (
        <>
            {menuState.stage > 0 && <button onClick={handleBackstep}>Back</button>}
            <div className={styles.appendList}>
                <div className={styles['appendList-spacer']} />
                {steps[menuState.stage]}
            </div>
        </>
    )
}

const CatagoryStep = ({ catagories, handleCatagorySelect }) => {
    const catKeys = Object.keys(catagories).sort();

    return (
        <>
            {catKeys.map((catagory, index) => (
                <button key={index} onClick={() => handleCatagorySelect(catagory)}>{catagory}</button>
            ))}
        </>
    );
}

const ComponentStep = ({ components, onSubmit, handleBackstep }) => {
    const alphabeticalComponents = components.sort(item => item.type);

    return (
        <>
            {alphabeticalComponents.map((component, index) => (
                <button key={index} onClick={() => onSubmit(component)}>{component.type}</button>
            ))}
        </>
    );
}