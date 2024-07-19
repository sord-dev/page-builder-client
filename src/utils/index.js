import lodash from 'lodash'
import * as library from '../lib/component-library'

export const encodeToBase64 = (data) => {
    return btoa(JSON.stringify(data))
}

export const returnAllComponentNames = () => {
    return Object.keys(library).filter(key => key !== 'default')
        .map(key => {
            console.log(library[key])
            return ({ type: key, props: library[key].defaultProps || {} })
        });
}

export const buildLink = (components) => {
    if (!components.length) return
    const pageData = buildPage(components, {})
    const base64Data = encodeToBase64(pageData)

    return `/sites/render?data=${base64Data}`
}


export const buildPage = (components, userValues) => {
    let processComponent = components.map((c, i) => {
        const componentData = lodash.cloneDeep(c)
        componentData.props = lodash.merge(componentData.props, userValues)

        return componentData
    })

    return { components: processComponent };
}

