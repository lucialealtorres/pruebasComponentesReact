import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Cats = () => {
    return (
        <div>
            <div className="row">
                <h4>Data Table de Bootstrap</h4>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"
                />
                <table className="table table-hover table-bordered mt-2" id="table-to-xls">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Raza</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <th>Tiffa</th>
                            <th>Persa</th>
                        </tr>
                        <tr>
                            <th>2</th>
                            <th>Cloud</th>
                            <th>Común Europeo</th>
                        </tr>
                        <tr>
                            <th>2</th>
                            <th>Rikku</th>
                            <th>Siames</th>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Cats
