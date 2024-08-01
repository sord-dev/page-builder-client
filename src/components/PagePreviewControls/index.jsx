import React from 'react'
import { FileExportForm, PageList } from './partials'

function PagePreviewControls({ children, fileName, setFileName, pages = [], changePage, activePage, submitForm }) {
   
    return (
        <div>
            <PageList {...{ activePage, changePage, pages }} />
            <div>{children}</div>
            <FileExportForm  {...{ fileName, setFileName, submitForm }} />
        </div>
    )
}

export default PagePreviewControls