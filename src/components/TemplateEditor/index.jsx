import React, { useEffect } from 'react';
import styles from './styles.module.css';

import { PageEditor, PropsEditor } from './partials';
import { validTabs } from './utils';

const TemplateEditor = ({
    selectedComponent = null,
    updateTemplateItem = () => { console.log("Updating template item") },
    removeTemplateItem = () => { console.log("Removing template item") },
    pages = [],
    selectPage = (templateId) => { console.log("Selecting page") },
    addPage = (name, path) => { console.log("Adding page") },
    removePage = (templateId) => { console.log("Removing page") },
}) => {
    const [editorState, setEditorState] = React.useState({ tab: 'props' });

    const handleTabChange = (tab) => {
        if (!validTabs.includes(tab)) {
            throw new Error('Invalid tab provided');
        }

        setEditorState(prev => ({ ...prev, tab }));
    }

    useEffect(() => {
        if(selectedComponent) setEditorState(prev => ({ ...prev, tab: 'props' }));
    }, [selectedComponent]);

    const TemplateEditorMap = {
        props: <PropsEditor
            selectedComponent={selectedComponent}
            updateTemplateItem={updateTemplateItem}
            removeTemplateItem={removeTemplateItem}
        />,
        pages: <PageEditor {...{ pages, selectPage, addPage, removePage }} />
    }


    return (
        <div className={styles.componentStateEditor}>
            <div className={styles['template-editor-tabs']}>
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