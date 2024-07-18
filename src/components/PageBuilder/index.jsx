import React from 'react'
import { ComponentsPicker, PreviewMenu } from './partials'

function PageBuilder({ template, updateTemplate, components, submitTemplate, resetTemplate }) {

  return (
    <div>
      <ComponentsPicker {...{ updateTemplate, components, submitTemplate, resetTemplate }} />
      <PreviewMenu {...{ template }} />
    </div>
  )
}

PageBuilder.defaultProps = {
  template: [],
  updateTemplate: (prevTemplates) => { console.log(prevTemplates) },
  components: []
}

export default PageBuilder