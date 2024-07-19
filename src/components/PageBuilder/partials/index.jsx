import PageRender from "../../PageRender"
import styles from '../styles.module.css';

export const ComponentsPicker = ({ updateTemplate, components, submitTemplate, resetTemplate, selectedComponent }) => {
    return (
        <>
            <div className={styles.componentPicker}>
                <h4>Components</h4>
                <ul className={styles.componentGrid}>
                    {components.map((c, i) => <ComponentButton component={c} updateTemplate={updateTemplate} key={i} />)}
                </ul>

                <div className={styles.componentPickerControls}>
                    <button onClick={resetTemplate}>Reset Template</button>
                    <button onClick={submitTemplate}>Submit Site</button>
                </div>
            </div>

            <div className={styles.componentStateEditor}>
                {
                    selectedComponent ? <div className={styles.selectedComponent}>
                        <h4>Selected Component</h4>
                        <h2>{selectedComponent.component.type}</h2>
                        <p>Props</p>
                        <pre>{JSON.stringify({ ...selectedComponent.component.props, index: selectedComponent.index }, null, 2)}</pre>
                    </div>

                        : <div> No component selected</div>
                }
            </div>
        </>
    )
}

const ComponentButton = ({ component, updateTemplate }) => {
    return (
        <button onClick={() => updateTemplate(component)}>{component.type}</button>
    )
}

export const PreviewMenu = ({ template, handleComponentClick }) => {
    return (
        <PageRender {...{ templateData: { components: template }, updateComponentIndex: () => { }, handleComponentClick }} style={{ 'scale': '.5', 'marginTop:': '0' }} />
    )
}