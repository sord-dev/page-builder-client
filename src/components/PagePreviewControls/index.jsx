import React from 'react'
import { FileExportForm, PageList } from './partials'

function PagePreviewControls({ children, fileName, setFileName, pages = [], changePage, activePage }) {
    return (
        <div>
            <PageList {...{ activePage, changePage, pages }} />
            <div>{children}</div>
            <FileExportForm  {...{ fileName, setFileName }} />
        </div>
    )
}

export default PagePreviewControls