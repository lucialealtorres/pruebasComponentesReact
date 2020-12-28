import React, { useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { DataGrid } from '@material-ui/data-grid';

const Companys = () => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'apellido', headerName: 'Apellido', width: 130 },
        { field: 'apellido', headerName: 'Editar', width: 130 },
        
        // {
        //     field: 'age',
        //     headerName: 'Age',
        //     type: 'number',
        //     width: 90,
        // },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //         `${params.getValue('nombre') || ''} ${params.getValue('apellido') || ''}`,
        // },
    ];

    const rows = [
        { id: 1, apellido: 'Snow', nombre: 'Jon', age: 35 },
        { id: 2, apellido: 'Lannister', nombre: 'Cersei', age: 42 },
        { id: 3, apellido: 'Lannister', nombre: 'Jaime', age: 45 },
    ];

    const [array, setArray] = useState(rows);
    const [modoCrear, setModoCrear] = useState(false);
    const [id, setId] = useState(undefined);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const crear = (e) => {
        e.preventDefault();
        const obj = {
            id: id,
            nombre: nombre,
            apellido: apellido
        }
        setArray([...array, obj])
        setId('');
        setNombre('');
        setApellido('');
        setModoCrear(false);
    }

    return (
        <div>

            <div className="row">
                <h4>Data Table de Material</h4>
                <div style={{ height: 400, width: '100%' }} >
                    <button className="btn btn-dark btn-small" onClick={() => setModoCrear(true)}>Crear</button>
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="tableExcel"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Excel"
                    />
                    <DataGrid
                        rows={array}
                        columns={columns}
                        pageSize={5}
                        tableId="tableExcel" />
                </div>
            </div>

            <div className="mt-5">
                {
                    modoCrear &&
                    <h5>Crear Compañia</h5>
                }
                {
                    modoCrear &&
                    <form onSubmit={crear}>
                        <label>ID</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Id"
                            onChange={evento => setId(evento.target.value)}
                            value={id}
                        />
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Nombre"
                            onChange={evento => setNombre(evento.target.value)}
                            value={nombre}
                        />
                        <label>Apellido</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Apellido"
                            onChange={evento => setApellido(evento.target.value)}
                            value={apellido}
                        />
                        <button type="submit" className="btn-dark fullWitdh">Crear Compañia</button>
                    </form>
                }
            </div>


        </div>
    )
}

export default Companys
