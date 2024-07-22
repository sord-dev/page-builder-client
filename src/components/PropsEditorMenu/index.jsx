import React from 'react';
import styles from './styles.module.css';

import { PropsEditor } from './partials';

const PropsEditorMenu = ({
    selectedComponent = null,
    updateTemplateItem = () => { console.log("Updating template item") },
    removeTemplateItem = () => { console.log("Removing template item") },
    setSelectedComponent = () => { console.log("Setting selected component") }
}) => {
    return (
        <div className={styles.componentStateEditor}>
            {selectedComponent ? (
                <div className={styles.selectedComponent}>
                    <div className={styles['heading']}>
                        <h4>Selected Component</h4>
                        <button onClick={() => setSelectedComponent(null)}>&times;</button>
                    </div>
                    <h2>{selectedComponent.component.type}</h2>
                    <p>Props</p>

                    <PropsEditor
                        type={selectedComponent.component.type}
                        props={selectedComponent.component.props}
                        index={selectedComponent.index}
                        updateTemplateItem={updateTemplateItem}
                        removeTemplateItem={removeTemplateItem}
                    />
                </div>
            ) : (
                <div>No component selected</div>
            )}
        </div>
    );
};

export default PropsEditorMenu;