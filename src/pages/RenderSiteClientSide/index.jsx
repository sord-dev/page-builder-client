import { useEffect, useState } from 'react';
import { PageRender } from '../../components';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';

function RenderSiteClientSide() {
    const [params] = useSearchParams();
    const [templateData, setTemplateData] = useState({ data: null, loading: false, error: null });
    const { updateComponentIndex } = useAppContext()

    useEffect(() => {
        setTemplateData({ data: null, loading: true, error: null });
        try {
            const serializedData = JSON.parse(atob(params.get('data')));
            console.log(serializedData);
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
            <h1>Dynamic Components</h1>
            {templateData.loading && <div>Loading...</div>}
            {templateData.error && <div>Error: {templateData.error.message}</div>}
            {templateData.data && <PageRender templateData={templateData.data} updateComponentIndex={updateComponentIndex} />}
        </>
    );
}

export default RenderSiteClientSide;
