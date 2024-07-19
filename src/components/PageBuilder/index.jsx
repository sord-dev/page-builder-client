import React from 'react'
import { ComponentsPicker, PreviewMenu } from './partials'

function PageBuilder({
  template = [],
  updateTemplate = (prevTemplates) => { console.log(prevTemplates) },
  components = [],
  submitTemplate = (prevTemplates) => { console.log(prevTemplates) },
  resetTemplate = () => () => { console.log('resetting page template') },
  updateComponentTemplateItem = (data, index) => { console.log('updating component template item') }
}) {
  const [selectedComponent, setSelectedComponent] = React.useState(null)

  const selectComponent = (component) => {
    setSelectedComponent(component)
  }

  const resetPageTemplate = () => {
    setSelectedComponent(null)
    resetTemplate()
  }

  return (
    <div>
      <ComponentsPicker {...{
        template,
        updateTemplate,
        components,
        submitTemplate,
        resetTemplate: resetPageTemplate,
        selectedComponent,
        updateComponentTemplateItem
      }} />

      <PreviewMenu {...{
        template,
        handleComponentClick: selectComponent
      }} />
    </div>
  )
}

export default PageBuilder