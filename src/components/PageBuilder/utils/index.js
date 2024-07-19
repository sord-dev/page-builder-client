import { useEffect, useRef } from 'react';

export const useComponentRefs = (components, handleClick) => {
    const componentRefs = useRef([]);

    useEffect(() => {
        componentRefs.current.forEach((ref, index) => {
            if (ref) {
                const clickHandler = () => handleClick({ component: components[index], index });
                ref.addEventListener('click', clickHandler);
                ref.clickHandler = clickHandler; // Store handler for cleanup
            }
        });

        return () => {
            componentRefs.current.forEach((ref) => {
                if (ref) {
                    ref.removeEventListener('click', ref.clickHandler);
                }
            });
        };
    }, [components, handleClick]);

    return componentRefs;
};

