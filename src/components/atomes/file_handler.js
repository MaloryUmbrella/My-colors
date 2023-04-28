import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons'
import { exportFile, importFile } from '../functions';

let FileHandler = (props) => {
    return (
        <p className="buttons">
            <button className="button is-info" onClick={() => importFile(props.colors)}>
                <span className="icon2">
                    <FontAwesomeIcon icon={faFileImport}/>
                </span>
                <span>
                    Importer
                </span>
            </button>
            <button className="button is-primary" onClick={() => exportFile(props.colors)}>
                <span className="icon2">
                    <FontAwesomeIcon icon={faFileExport} />
                </span>
                <span>
                    Exporter
                </span>
            </button>
        </p>
    )
}

export default FileHandler;