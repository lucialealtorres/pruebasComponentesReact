import React, { useState, useRef } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Games = () => {

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([
        { titulo: "Metal Gear Solid", genero: "Accion-Aventura", año: 1999 },
        { titulo: "Final Fantasy X", genero: "RPG", año: 2002 },
        { titulo: "The Last Of Us Part II", genero: "Accion-Aventura", año: 2020 },
    ]);

    return (
        <div>
            <div className="row">
                <h4>DataTable AG-GRIND</h4>
                <div className="ag-theme-alpine" style={{ height: 250, width: 600 }}>
                    <div>
                        <ReactHTMLTableToExcel
                            id="btnExportarExcel" className="btn btn-dark mt-4" table="tablaJuegos" filename="JuegoExcel" sheet="P1" buttonText="Excel" />
                    </div>
                    <AgGridReact rowData={rowData} rowSelection="multiple" className="mt-2" id="tablaJuegos">
                        <AgGridColumn field="titulo" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                        <AgGridColumn field="genero" sortable={true} filter={true}></AgGridColumn>
                        <AgGridColumn field="año" sortable={true} filter={true}></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>

        </div>
    )
}

export default Games
