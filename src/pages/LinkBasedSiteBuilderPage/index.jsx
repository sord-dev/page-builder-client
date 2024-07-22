import React, { useEffect } from 'react';
import { PageBuilder } from '../../components';
import { useLinkBasedSiteBuilder } from '../../hooks';
import { useSearchParams } from 'react-router-dom';

function LinkBasedSiteBuilderPage() {
    const [params] = useSearchParams();

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
        overrideTemplate
    } = useLinkBasedSiteBuilder();

    useEffect(() => {
        if (params.get('cached')) {
            const data = JSON.parse(atob(params.get('cached')));
            console.log('decoded', data);
            overrideTemplate(data);
            
            // clear the url to not trigger this effect again
            window.history.pushState({}, document.title, window.location.pathname);
        }
    }, [params]);

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
