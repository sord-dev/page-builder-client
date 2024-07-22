import React from 'react';
import styles from './styles.module.css';

import { PropsEditor } from './partials';
import { validTabs } from './utils';

const TemplateEditor = ({
    selectedComponent = null,
    updateTemplateItem = () => { console.log("Updating template item") },
    removeTemplateItem = () => { console.log("Removing template item") },
    setSelectedComponent = () => { console.log("Setting selected component") }
}) => {
    const [editorState, setEditorState] = React.useState({ tab: 'props' });

    const handleTabChange = (tab) => {
        if (!validTabs.includes(tab)) {
            throw new Error('Invalid tab provided');
        }

        setEditorState(prev => ({ ...prev, tab }));
    }

    const TemplateEditorMap = {
        props: <PropsEditor
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
            updateTemplateItem={updateTemplateItem}
            removeTemplateItem={removeTemplateItem}
        />,
        pages: <div>Pages</div>
    }


    return (
        <div className={styles.componentStateEditor}>
            <div>
                {validTabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={editorState.tab === tab ? styles.active : ''}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {TemplateEditorMap[editorState.tab]}
        </div>
    );
};

export default TemplateEditor;