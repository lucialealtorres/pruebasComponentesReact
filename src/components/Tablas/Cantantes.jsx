import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Search from '@material-ui/icons/Search';
import Export from '@material-ui/icons/ImportExport'
import Clear from '@material-ui/icons/Clear'
import axios from 'axios';
import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CsvBuilder from 'react-csv'

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}));


const columnas = [
    { title: 'Artista', field: 'artista' },
    { title: 'Pais de Origen', field: 'pais' },
    { title: 'Género', field: 'genero' },
    { title: 'Ventas estimadas', field: 'ventas', type: 'numeric' }
]

const baseUrl = 'http://localhost:3001/cantantes/';

const Cantantes = () => {

    // ************************************************* VARIABLES *************************************************

    const styles = useStyles();

    const [data, setData] = useState([]);
    const [cantanteSelect, setCantanteSelect] = useState({ id: "", artista: "", genero: "", pais: "", ventas: "" });

    const [modoCrear, setModoCrear] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);


    // ************************************************* FUNCIONES *************************************************

    // --------> USE EFFECT

    useEffect(() => {
        const peticionGet = async () => {
            await axios.get(baseUrl)
                .then(response => (
                    setData(response.data)
                ))
        }
        peticionGet();
    }, []);


    // --------> HANDLECHANGE

    // El name tiene que coincidir con el name del textField, asi cogerá magicamente los valores de estos.
    const handleChange = e => {
        const { name, value } = e.target;
        setCantanteSelect(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    // --------> PETICIONES

    const peticionPostCrear = async () => {
        await axios.post(baseUrl, cantanteSelect)
            .then(response => {
                setData(...data, response.data);
                abrirCerrarFormCrear();
            }).catch(error => {
                console.log(error)
            })
    }

    const peticionPutEditar = async () => {
        await axios.put(baseUrl + "/" + cantanteSelect.id, cantanteSelect)
            .then(response => {
                var dataNueva = data;
                dataNueva.map(artista => {
                    if (artista.id === cantanteSelect.id) {
                        artista.artista = cantanteSelect.artista;
                        artista.genero = cantanteSelect.genero;
                        artista.pais = cantanteSelect.pais;
                        artista.ventas = cantanteSelect.ventas;
                    }
                });
                setData(dataNueva);
                abrirCerrarFormEditar();
            }).catch(error => {
                console.log(error)
            })
    }


    const peticionDeleteEliminar = async () => {
        await axios.delete(baseUrl + "/" + cantanteSelect.id)
            .then(response => {
                setData(data.filter(artista => artista.id !== cantanteSelect.id));
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error)
            })
    }

    // --------> FOMULARIOS

    const seleccionarArtista = (artista, caso) => {
        setCantanteSelect(artista);
        (caso === "Editar") && abrirCerrarFormEditar();
        (caso === "Eliminar") && abrirCerrarModalEliminar();
    }

    // 1. CREAR

    const abrirCerrarFormCrear = () => {
        setModoCrear(!modoCrear);
    }


    // 2. EDITAR

    const abrirCerrarFormEditar = () => {
        setModoEditar(!modoEditar);
    }

    // 3. ELIMINAR

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const bodyEliminar = (
        <div className={styles.modal}>
            <h3>Nuevo Cantante</h3>
            <p>¿Estás seguro que deseas eliminar el artista {cantanteSelect.artista}?</p>
            <div align="right" className="mt-4">
                <Button onClick={() => peticionDeleteEliminar()} color="primary">Si</Button>
                <Button onClick={() => abrirCerrarModalEliminar()} color="secondary">No</Button>
            </div>
        </div>
    )


    // --------> EXCEL

    const customExcel = () => {

        if(this.props.exportCsv) {
        this.props.exportCsv(this.props.columns, this.props.renderData)
        }
        else  {
            const columns = this.props.columns
              .filter(columnDef => {
                return !columnDef.hidden && columnDef.field && columnDef.export !== false; 
              });
        
            const data = this.props.renderData.map(rowData =>
              columns.map(columnDef => rowData[columnDef.field])
            );
        
            // eslint-disable-next-line no-unused-vars
            const builder = new CsvBuilder((this.props.exportFileName || this.props.title || 'data') + '.csv')
              .setDelimeter(this.props.exportDelimiter)
              .setColumns(columns.map(columnDef => columnDef.title))
              .addRows(data)
              .exportFile();
        
            this.setState({ exportButtonAnchorEl: null });
          }
        }




    // ************************************************* RETURN *************************************************

    return (
        <div>
            <div className="d-grid gap-2">
                <button className="btn btn-dark my-2" onClick={() => abrirCerrarFormCrear()}>Insertar Artista</button>
            </div>

            <MaterialTable
                columns={columnas}
                data={data}
                title="Artistas Musicales con Mayores Ventas"
                actions={[
                    {
                        icon: Edit,
                        tooltip: 'Editar',
                        onClick: (event, rowData) => seleccionarArtista(rowData, "Editar")
                    },
                    {
                        icon: Delete,
                        tooltip: 'Eliminar',
                        onClick: (event, rowData) => seleccionarArtista(rowData, "Eliminar")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    exportButton: true,
                    //exportCsv: customExcel()
                }}
                localization={{
                    header: {
                        actions: 'Acciones'
                    }
                }}
                icons={{
                    Search: Search,
                    Clear: Clear,
                    Export: Export
                }}
            >
            </MaterialTable>

            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>

            <div className="mt-5">
                {
                    modoCrear &&
                    <h5 className="text-center">Nuevo Cantante</h5>
                }
                {
                    modoEditar &&
                    <h5 className="text-center">Editar Cantante</h5>
                }
                {
                    modoCrear &&
                    <form >
                        <input className={styles.inputMaterial} placeholder="Id" name="id" onChange={handleChange}></input>
                        <input className={styles.inputMaterial} placeholder="Artista" name="artista" onChange={handleChange}></input>
                        <input className={styles.inputMaterial} placeholder="Pais de Origen" name="pais" onChange={handleChange}></input>
                        <input className={styles.inputMaterial} placeholder="Género" name="genero" onChange={handleChange}></input>
                        <input className={styles.inputMaterial} placeholder="Ventas estimadas" name="ventas" onChange={handleChange}></input>
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary mt-2" onClick={() => peticionPostCrear()}>Crear Cantante</button>
                            <button className="btn btn-danger" onClick={() => abrirCerrarFormCrear()}>Cancelar</button>
                        </div>
                    </form>
                }
                {
                    modoEditar &&
                    <form >
                        <input className={styles.inputMaterial} placeholder="Artista" name="artista" onChange={handleChange} value={cantanteSelect && cantanteSelect.artista}></input>
                        <input className={styles.inputMaterial} placeholder="Pais de Origen" name="pais" onChange={handleChange} value={cantanteSelect && cantanteSelect.pais}></input>
                        <input className={styles.inputMaterial} placeholder="Género" name="genero" onChange={handleChange} value={cantanteSelect && cantanteSelect.genero}></input>
                        <input className={styles.inputMaterial} placeholder="Ventas estimadas" name="ventas" onChange={handleChange} value={cantanteSelect && cantanteSelect.ventas}></input>
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary mt-2" onClick={() => peticionPutEditar()}>Editar Cantante</button>
                            <button className="btn btn-danger" onClick={() => abrirCerrarFormEditar()}>Cancelar</button>
                        </div>
                    </form>
                }
            </div>


        </div>
    )
}

export default Cantantes
