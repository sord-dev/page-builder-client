import * as library from '../../../lib/component-library';

import { ComponentWrapper } from '../partials';

export const renderComponents = ({ template, previewMode, componentRefs }) => {
    if (!template || !template.components.length) {
        return <div>No components added to state.</div>; // Display a placeholder
    }

    componentRefs.current = []; // Clear previous refs

    return template.components.map((component, index) => {
        try {
            const ComponentElement = renderJSXComponent(component);

            if (!ComponentElement) {
                throw new Error(`Component ${component.type} not found`);
            }

            return (
                <>
                    <ComponentWrapper
                        key={index}
                        index={index}
                        ComponentElement={ComponentElement}
                        componentRefs={componentRefs}
                        editable={previewMode}
                    />
                </>
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    });
};

const renderJSXComponent = (component) => {
    if (!component || !component.type) {
        return null;
    }

    const Component = determineComponentType(component);

    if (!Component) {
        return null;
    }

    return <Component {...component.props} />;
};

const determineComponentType = (component) => {
    if (!component || !component.type) {
        return null;
    }

    const CustomComponent = library[component.type];

    if (!CustomComponent) {
        throw new Error(`Component ${component.type} not found`);
    }

    return CustomComponent;
};