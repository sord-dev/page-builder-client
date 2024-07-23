import { useEffect, useState } from 'react';

import { PagePreviewControls, PageRender } from '../../components';

import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import { TemplateExporter } from '../../utils';

function RenderSiteClientSide() {
    const [params] = useSearchParams();
    const [templateData, setTemplateData] = useState({ data: null, loading: false, error: null });
    const [activePage, setActivePage] = useState({ id: 'index', template: [] });
    const [fileName, setFileName] = useState('Home');
    const { updateComponentIndex } = useAppContext();

    const changePage = (templateId) => {
        if (templateData.data == null) return;
        if (templateData.data.templates[templateId] == null) return;
        setActivePage((prev) => ({ ...prev, id: templateId, template: templateData.data.templates[templateId] }));
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
        if (templateData.data == null) return;
        console.log(templateData);
        setActivePage((prev) => ({ ...prev, template: templateData.data.templates[activePage.id] }));
    }, [templateData]);

    const downloadPageAsJSX = (activePageTemplate, fileName) => {
        const objectKey = Object.keys(activePageTemplate)[0];
        const components = { components: [activePageTemplate[objectKey]] };

        console.log('downloading page as jsx', components);
        TemplateExporter.downloadComponentFile(components, fileName)
    }

    const downloadSiteAsZip = () => {
        console.log('downloading site as zip', templateData.data);
    }

    const submitExportForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
            templates: templateData.data.templates,
            pages: templateData.data.pages,
            fileName: formData.get('fileName'),
            exportType: formData.get('export-dropdown')
        }

        if (data.exportType === 'page-jsx') {

            console.log('submitting form', data);
            downloadPageAsJSX(activePage.template, data.fileName);
        } else if (data.exportType === 'site-zip') {
            downloadSiteAsZip();
        }
    }

    return (
        <>
            <PagePreviewControls {...{ fileName, setFileName, pages: templateData.data?.pages, changePage, activePage, submitForm: submitExportForm }} >
                {templateData.loading && <div>Loading...</div>}
                {templateData.error && <div>Error: {templateData.error.message}</div>}
                {templateData.data && <PageRender templateData={{ components: activePage.template }} updateComponentIndex={updateComponentIndex} />}
            </PagePreviewControls>
        </>
    );
}

export default RenderSiteClientSide;
