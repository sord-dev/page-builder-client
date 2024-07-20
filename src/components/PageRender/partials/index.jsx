import { useState } from 'react';
import styles from '../styles.module.css';

export const ComponentWrapper = ({ ComponentElement, componentRefs, editable = false, index = 0 }) => {
    const [hovering, setHovering] = useState(false);

    const handleHover = () => { setHovering(true); };
    const handleLeave = () => { setHovering(false); };

    if (!ComponentElement) {
        throw new Error(`Component ${component.type} not found`);
    }

    if (!componentRefs) {
        throw new Error('Component refs not provided');
    }

    return (
        <div className={`${styles['componentWrapper']}`} onMouseOver={handleHover} onMouseLeave={handleLeave}>
            {hovering && editable && (<button>boop</button>)}
            <div className={`${styles["componentContainer"]} ${editable ? styles["componentHover"] : ""}`}
                ref={(el) => (componentRefs.current[index] = el)}
            >
                {ComponentElement}
            </div>
            {hovering && editable && (<button>boop</button>)}
        </div>
    );
}