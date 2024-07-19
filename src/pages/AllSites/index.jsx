import React, { useEffect, useState } from 'react'
import lodash from 'lodash'
import { useAppContext } from '../../context/appContext'
import { PageBuilder } from '../../components'

import { encodeToBase64 } from '../../utils'
import { useNavigate } from 'react-router-dom'

function AllSites() {
    const [pageState, setPageState] = useState({ components: [], template: [], link: null })
    const { appState } = useAppContext()
    const navigate = useNavigate()

    const onComponentClick = (component) => {
        if (!component) return
        setPageState(prev => ({ ...prev, template: [...pageState.template, component] }))
    }

    const resetTemplate = () => {
        setPageState(prev => ({ ...prev, template: [] }))
    }

    const buildPage = (components, userValues) => {
        let processComponent = components.map((c, i) => {
            const componentData = lodash.cloneDeep(c)
            componentData.props = lodash.merge(componentData.props, userValues)

            return componentData
        })

        return { components: processComponent };
    }

    const buildLink = (components) => {
        if (!components.length) return
        const pageData = buildPage(components, {})
        const base64Data = encodeToBase64(pageData)

        return `/sites/render?data=${base64Data}`
    }

    useEffect(() => {
        if (!appState.components.index) return

        setPageState(prev => ({ ...prev, components: appState.components.index }));
    }, [appState])

    return (
        <div>
            <h3>Link-based Site builder</h3>
            <p>You're to build a site from state using this menu, there will be a list of components and a submit button in which you can use to then generate and navigate to the site you've built</p>

            <div>
                <PageBuilder {...{
                    template: pageState.template,
                    updateTemplate: onComponentClick,
                    components: pageState.components,
                    submitTemplate: () => navigate(buildLink(pageState.template)),
                    resetTemplate: () => resetTemplate()
                }} />
            </div>
        </div>
    )
}


export default AllSites