import React from 'react'

import styles from '../styles.module.css'

export const FileExportForm = ({ setFileName, fileName, submitForm }) => {
    return (
        <form className={styles['FileExportForm']} onSubmit={(e) => submitForm(e)}>
            <input
                className={styles['fileNameInput']}
                type="text"
                name="fileName"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
            />

            <select name="export-dropdown">
                <option onClick={() => savePageAsJSX} value={'page-jsx'}>Page as JSX</option>
                <option onClick={() => saveSiteAsZip} value={'site-zip'}>Site as ZIP</option>
            </select>

            <button className={styles['exportButton']} type='submit'>Submit</button>
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
