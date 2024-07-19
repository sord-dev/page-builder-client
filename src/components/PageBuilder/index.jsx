import React from 'react'
import { ComponentsPicker, PreviewMenu } from './partials'

function PageBuilder({
  template = [],
  updateTemplate = (prevTemplates) => { console.log(prevTemplates) },
  components = [], submitTemplate = (prevTemplates) => { console.log(prevTemplates) },
  resetTemplate = () => { console.log('resetting template') }
}) {
  const [selectedComponent, setSelectedComponent] = React.useState(null)

  const selectComponent = (component) => {
    setSelectedComponent(component)
  }

  return (
    <div>
      <ComponentsPicker {...{ updateTemplate, components, submitTemplate, resetTemplate, selectedComponent }} />
      <PreviewMenu {...{ template, handleComponentClick: selectComponent }} />
    </div>
  )
}

export default PageBuilder