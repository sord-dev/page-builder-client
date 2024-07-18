import PageRender from "../../PageRender"

import styles from '../styles.module.css';

export const ComponentsPicker = ({ updateTemplate, components, submitTemplate, resetTemplate }) => {
    return (
        <div className={styles.componentPicker}>
            <h4>Components</h4>
            <ul>
                {components.map((c, i) => <li key={i}><ComponentButton component={c} updateTemplate={updateTemplate} /></li>)}
            </ul>

            <div className={styles.componentPickerControls}>
                <button onClick={resetTemplate}>Reset Template</button>
                <button onClick={submitTemplate}>Submit Site</button>
            </div>
        </div>
    )
}

const ComponentButton = ({ component, updateTemplate }) => {
    return (
        <button onClick={() => updateTemplate(component)}>{component.type}</button>
    )
}

export const PreviewMenu = ({ template }) => {
    return (
        <PageRender {...{ templateData: { components: template }, updateComponentIndex: () => { } }} style={{ 'scale': '.5', 'marginTop:': '0' }} />
    )
}