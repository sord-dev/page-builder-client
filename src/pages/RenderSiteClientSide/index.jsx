import { useEffect, useState } from 'react';
import { PageRender } from '../../components';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import { TemplateExporter } from '../../utils';

function RenderSiteClientSide() {
    const [params] = useSearchParams();
    const [templateData, setTemplateData] = useState({ data: null, loading: false, error: null });
    const [fileName, setFileName] = useState('Home');
    const { updateComponentIndex } = useAppContext();

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
            <input
                className='fileNameInput'
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
            />
            <button className='exportButton' onClick={() => TemplateExporter.downloadComponent(templateData.data, fileName)}>Export Site</button>
            {templateData.loading && <div>Loading...</div>}
            {templateData.error && <div>Error: {templateData.error.message}</div>}
            {templateData.data && <PageRender templateData={{ components: templateData.data.templates['index'] }} updateComponentIndex={updateComponentIndex} />}
        </>
    );
}

export default RenderSiteClientSide;
