import { useEffect, useState } from 'react'
import { PageRender } from '../../components'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../context/appContext'

function RenderSite({ }) {
    const { updateComponentIndex } = useAppContext()

    const { id } = useParams()
    const [templateData, setTemplateData] = useState({ data: null, loading: false, error: null })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setTemplateData({ data: null, loading: true, error: null })
                const response = await axios.get(`http://localhost:3000/api/v1/sites/${id}`)
                setTemplateData({ data: response.data.data.site, loading: false, error: null })
            } catch (error) {
                console.error(error)
                setTemplateData({ data: null, loading: false, error: error })
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <h1>Dynamic Components</h1>
            {templateData.loading && <div>Loading...</div>}
            {templateData.error && <div>Error: {templateData.error.message}</div>}
            {templateData.data && <PageRender templateData={templateData.data} updateComponentIndex={updateComponentIndex} />}
        </>
    )
}

export default RenderSite