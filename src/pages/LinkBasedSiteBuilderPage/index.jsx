import React, { useEffect } from 'react';
import { PageBuilder } from '../../components';
import { useLinkBasedSiteBuilder } from '../../hooks';

function LinkBasedSiteBuilderPage() {
    const {
        pageState,
        onComponentClick,
        updateComponentTemplateItem,
        removeComponentFromTemplate,
        resetTemplate,
        addPage,
        selectPage,
        removePage,
        submitTemplate,
    } = useLinkBasedSiteBuilder();


    useEffect(() => {
        console.log(pageState);
    }, [pageState]);

    return (
        <div className='site-builder'>
            <PageBuilder
                template={pageState.templates[pageState.currentPageId]}
                pages={pageState.pages}
                selectPage={selectPage}
                addPage={addPage}
                removePage={removePage}
                updateTemplate={onComponentClick}
                components={pageState.components}
                updateTemplateItem={updateComponentTemplateItem}
                removeTemplateItem={removeComponentFromTemplate}
                submitTemplate={submitTemplate}
                resetTemplate={resetTemplate}
            />
        </div>
    );
}

export default LinkBasedSiteBuilderPage;
