import { useEffect, useState } from 'react';

import { PagePreviewControls, PageRender } from '../../components';

import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';

function RenderSiteClientSide() {
    const [params] = useSearchParams();
    const [templateData, setTemplateData] = useState({ data: null, loading: false, error: null });
    const [activePage, setActivePage] = useState('index');
    const [fileName, setFileName] = useState('Home');
    const { updateComponentIndex } = useAppContext();

    const changePage = (templateId) => {
        if(templateData.data == null) return;
        if(templateData.data.templates[templateId] == null) return;
        setActivePage(templateId);
    }

    useEffect(() => {
        setTemplateData({ data: null, loading: true, error: null });
        try {
            const serializedData = JSON.parse(atob(params.get('data')));
            console.log('decoded', serializedData);
            setTemplateData({ data: serializedData, loading: false, error: null });
        } catch (error) {
            console.error('Error parsing data:', error);
            setTemplateData({ data: null, loading: false, error });
        }
    }, [params]);

    useEffect(() => {
        console.log(templateData);
    }, [templateData]);

    return (
        <>
            <PagePreviewControls {...{ fileName, setFileName, pages: templateData.data?.pages, changePage, activePage }} >
                {templateData.loading && <div>Loading...</div>}
                {templateData.error && <div>Error: {templateData.error.message}</div>}
                {templateData.data && <PageRender templateData={{ components: templateData.data.templates[activePage] }} updateComponentIndex={updateComponentIndex} />}
            </PagePreviewControls>
        </>
    );
}

export default RenderSiteClientSide;
