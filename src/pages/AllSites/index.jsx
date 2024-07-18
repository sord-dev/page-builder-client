import React, { useEffect, useState } from 'react'
import lodash from 'lodash'
import { useAppContext } from '../../context/appContext'

function AllSites() {
    const [pageState, setPageState] = useState({ components: [], template: [] })
    const { appState } = useAppContext()

    const encodeData = (data) => {
        return btoa(JSON.stringify(data))
    }

    const onComponentClick = (component) => {
        if (!component) return
        setPageState(prev => ({ ...prev, template: [...pageState.template, component] }))
    }


    const buildPage = (components, userValues) => {
        let processComponent = components.map((c, i) => {
            const componentData = lodash.cloneDeep(c)
            componentData.props = lodash.merge(componentData.props, userValues)

            return componentData
        })

        return { components: processComponent };
    }

    useEffect(() => {
        console.log(pageState.template)
    }, [pageState])

    useEffect(() => {
        if (!appState.components.index) return

        setPageState(prev => ({ ...prev, components: appState.components.index }));
    }, [appState])

    return (
        <div>
            <h3>Link-based Site builder</h3>
            <p>You're to build a site from state using this menu, there will be a list of components and a submit button in which you can use to then generate and navigate to the site you've built</p>

            <div>
                <h4>Components</h4>
                <ul>
                    {pageState.components.map((c, i) => {
                        return <li key={i} onClick={() => onComponentClick(c)}>{c.type}</li>
                    })}
                </ul>

                <button onClick={() => {
                    const fakePage = buildPage(pageState.template, {})
                    const encodedData = encodeData(fakePage)
                    window.location.href = `/sites/render?data=${encodedData}`
                }
                }>Build Site</button>

            </div>
        </div>
    )
}


export default AllSites