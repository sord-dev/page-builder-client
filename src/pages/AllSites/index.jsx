import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/appContext'
import { PageBuilder } from '../../components'

import { buildLink } from '../../utils'
import { useNavigate } from 'react-router-dom'

function AllSites() {
    const [pageState, setPageState] = useState({ components: [], template: [], link: null });
    const { appState } = useAppContext();
    const navigate = useNavigate();

    const onComponentClick = (component) => {
    if (!component) return;
    setPageState(prev => ({ ...prev, template: [...pageState.template, component] }));
}

    const updateComponentTemplateItem = (updatedItem, index) => {
        console.log(updatedItem)
        setPageState(prev => {
            const newTemplate = prev.template.map((item, i) => {
                if (i === index) {
                    return updatedItem
                }

                return item
            })

            return { ...prev, template: newTemplate }
        })
    }

    const removeComponentFromTemplate = (index) => {
        setPageState(prev => {
            const newTemplate = prev.template.filter((item, i) => i !== index)

            return { ...prev, template: newTemplate }
        })
    }

    const resetTemplate = () => {
        setPageState(prev => ({ ...prev, template: [] }))
    }

    useEffect(() => {
        if (!appState.components.index) return

        setPageState(prev => ({ ...prev, components: appState.components.index }));
    }, [appState])

    return (
        <div className='site-builder'>
            <h3>Link-based Site builder</h3>
            <p>You're to build a site from state using this menu, there will be a list of components and a submit button in which you can use to then generate and navigate to the site you've built</p>

            <div>
                <PageBuilder {...{
                    template: pageState.template,
                    updateTemplate: onComponentClick,
                    components: pageState.components,
                    updateTemplateItem: updateComponentTemplateItem,
                    removeTemplateItem: removeComponentFromTemplate,
                    submitTemplate: () => navigate(buildLink(pageState.template)),
                    resetTemplate: () => resetTemplate(),
                }} />
            </div>
        </div>
    )
}


export default AllSites