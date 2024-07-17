import React from 'react'
import lodash from 'lodash'
import { useAppContext } from '../../context/appContext'

const components = [{ type: 'ContactForm', props: {} }, { type: 'HeadingWith4IconsAndArrows', props: { title: 'string', icon: [] } }, { type: 'HeadingWith6Icons', props: { title: 'string', icon: [] } }] // temporary data, will be from a context or api

function AllSites() {
    const { appState } = useAppContext()
    
    const encodeData = (data) => {
        return btoa(JSON.stringify(data))
    }

    const buildFakePage = (components, userValues) => {

        let processComponent = components.map((c, i) => {
            const componentData = lodash.cloneDeep(c)
            componentData.props = lodash.merge(componentData.props, userValues)

            
            return componentData
        })
        
        console.log(processComponent)

        return { components: processComponent };
    }

    return (
        <div>
            <h3>All Sites</h3>
            {appState.components.index && <p>Available components: {appState.components.index.join(', ')}</p>}
            <p>(temporary data encoder)</p>
            <ul>
                {components?.map((component, index) => (
                    <li key={index}>
                        <a href={`/sites/render?data=${encodeData(buildFakePage([component], {
                            title: 'test title', icon: [{
                                icon: null,
                                title: "Title goes here",
                                desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta neque, officia rerum cum voluptatum asperiores quos! Dolor, ipsa ea eos laborum laboriosam doloribus voluptate quisquam sequi molestiae temporibus officia eveniet?",
                            }]
                        }))}`}>{component.type}</a>
                    </li>
                ))}
                <a href={`/sites/render?data=${encodeData(buildFakePage([components[0], components[1], components[2]], {
                            title: 'test title', icon: [{
                                icon: null,
                                title: "Title goes here",
                                desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta neque, officia rerum cum voluptatum asperiores quos! Dolor, ipsa ea eos laborum laboriosam doloribus voluptate quisquam sequi molestiae temporibus officia eveniet?",
                            }]
                        }))}`}>bomba</a>
            </ul>
        </div>
    )
}

export default AllSites