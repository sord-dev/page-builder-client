export const ComponentWrapper = ({ ComponentElement, componentRefs, editable = false, index = 0 }) => {
    if (!ComponentElement) {
        throw new Error(`Component ${component.type} not found`);
    }

    if (!componentRefs) {
        throw new Error('Component refs not provided');
    }

    return (
        <div className={`componentContainer ${editable ? "componentHover" : ""}`}
            ref={(el) => (componentRefs.current[index] = el)}
        >
            {ComponentElement}
        </div>
    );
}