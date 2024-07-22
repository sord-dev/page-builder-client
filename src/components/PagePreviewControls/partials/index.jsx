import React from 'react'

import styles from '../styles.module.css'
import { TemplateExporter } from '../../../utils'

export const FileExportForm = ({ setFileName, fileName }) => {
    return (
        <form className={styles['FileExportForm']}>
            <input
                className={styles['fileNameInput']}
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
            />
            <button className={styles['exportButton']} onClick={() => TemplateExporter.downloadComponent(templateData.data, fileName)}>Export Site</button>
        </form>
    )
}

export const PageList = ({
    pages = [],
    activePage = { name: 'New Page', path: '/', templateId: 'index' },
    changePage = (templateId) => { }
}) => {

    return (
        <div className={styles['PageList']}>
            <h3>Pages</h3>
            <ul>
                {pages.map((page, index) => (
                    <li
                        key={index}
                        className={`${page.name === activePage.name ? styles.active : ''}`}
                        onClick={() => changePage(page.templateId)}>{page.name}</li>
                ))}
            </ul>
        </div>
    )
}
