import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/appContext'
import { PageBuilder } from '../../components'

import { buildLink } from '../../utils'
import { useNavigate } from 'react-router-dom'

function LinkBasedSiteBuilderPage() {
    const [pageState, setPageState] = useState({ components: [], template: [], pages: [{ name: 'New Page', path: '/', templateid: 'index' }] });
    const { appState } = useAppContext();
    const navigate = useNavigate();

    const onComponentClick = (component, position = 'after', index = null) => { // Function to add component to template, if index is provided, it will add the component before or after that index
        if (!component) {
            throw new Error('No component provided');
        }

        if (!['before', 'after'].includes(position)) {
            throw new Error('Invalid position provided');
        }

        if (index == null) {
            if (position === 'before') {
                setPageState(prev => ({ ...prev, template: [component, ...prev.template] }));
            } else {
                setPageState(prev => ({ ...prev, template: [...prev.template, component] }));
            }
        }

        if (index != null) {
            const newTemplate = [...pageState.template];
            newTemplate.splice(position === 'before' ? index : index + 1, 0, component);
            setPageState(prev => ({ ...prev, template: newTemplate }));
        }
    }

    const updateComponentTemplateItem = (updatedItem, index) => {
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
            <PageBuilder {...{
                pages: pageState.pages,
                template: pageState.template,
                updateTemplate: onComponentClick,
                components: pageState.components,
                updateTemplateItem: updateComponentTemplateItem,
                removeTemplateItem: removeComponentFromTemplate,
                submitTemplate: () => navigate(buildLink(pageState.template)),
                resetTemplate: () => resetTemplate(),
            }} />
        </div>
    )
}


export default LinkBasedSiteBuilderPage