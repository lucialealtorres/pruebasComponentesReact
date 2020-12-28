import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from "@material-ui/core";
import { Edit, Delete } from '@material-ui/icons';

const baseUrl = 'http://localhost:3001/consolas/';

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


const Consolas = () => {

    // ************************************************* VARIABLES *************************************************

    const styles = useStyles();

    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        nombre: '',
        empresa: '',
        lanzamiento: '',
        ventas: ''
    })

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

    // El name tiene que coincidir con el name del textField, asi coga magicamente los valores de estos.
    const handleChange = e => {
        const { name, value } = e.target;
        setConsolaSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(consolaSeleccionada)
    }

    
    // --------> PETICIONES

    const peticionPost = async () => {
        await axios.post(baseUrl, consolaSeleccionada)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            })
    }

    const peticionPut = async () => {
        await axios.put(baseUrl + consolaSeleccionada.id, consolaSeleccionada)
            .then(response => {
                var dataNueva = data;
                dataNueva.map(consola => {
                    if (consolaSeleccionada.id === consola.id) {
                        consola.nombre = consolaSeleccionada.nombre;
                        consola.empresa = consolaSeleccionada.empresa;
                        consola.lanzamiento = consolaSeleccionada.lanzamiento;
                        consola.ventas = consolaSeleccionada.ventas;
                    }
                })
                setData(dataNueva);
                abrirCerrarModalEditar();
            })
    }

    const peticionDelete = async () => {
        await axios.delete(baseUrl + consolaSeleccionada.id)
            .then(response => {
                setData(data.filter(consola=>consola.id !== consolaSeleccionada.id));

                })
                abrirCerrarModalEliminar();
    }

    // --------> MODALES

    const seleccionarConsola = (consola, caso) => {
        setConsolaSeleccionada(consola);
        (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
    }

    // 1. CREAR

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Agregar nueva Consola</h3>
            <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} />
            <br />
            <TextField className={styles.inputMaterial} label="Empresa" name="empresa" onChange={handleChange} />
            <br />
            <TextField className={styles.inputMaterial} label="Lanzamiento" name="lanzamiento" onChange={handleChange} />
            <br />
            <TextField className={styles.inputMaterial} label="Unidades Vendidas" name="ventas" onChange={handleChange} />
            <br />
            <div align="right" className="mt-4">
                <Button onClick={() => peticionPost()} color="primary">Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertar()} color="secondary">Cancelar</Button>
            </div>
        </div>
    )

    // 2. EDITAR

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const bodyEditar = (
        <div className={styles.modal}>
            <h3>Editar Consola</h3>
            <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombre} />
            <br />
            <TextField className={styles.inputMaterial} label="Empresa" name="empresa" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.empresa} />
            <br />
            <TextField className={styles.inputMaterial} label="Lanzamiento" name="lanzamiento" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.lanzamiento} />
            <br />
            <TextField className={styles.inputMaterial} label="Unidades Vendidas" name="ventas" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.ventas} />
            <br />
            <div align="right" className="mt-4">
                <Button onClick={() => peticionPut()} color="primary">Editar</Button>
                <Button onClick={() => abrirCerrarModalEditar()} color="secondary">Cancelar</Button>
            </div>
        </div>
    )

    // 3. ELIMINAR

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const bodyEliminar = (
        <div className={styles.modal}>
            <p>¿Estás seguro que deseas eliminar la consola {consolaSeleccionada && consolaSeleccionada.nombre}</p>
            <div align="right" className="mt-4">
                <Button onClick={() => peticionDelete()} color="primary">Si</Button>
                <Button onClick={() => abrirCerrarModalEliminar()} color="secondary">No</Button>
            </div>
        </div>
    )

    // ************************************************* RETURN *************************************************

    return (
        <div>
            <button onClick={() => abrirCerrarModalInsertar()} className="btn btn-dark">Insertar</button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Empresa</TableCell>
                            <TableCell>Año de Lanzamiento</TableCell>
                            <TableCell>Unidades Vendidas</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map(consola => (
                            <TableRow key={consola.id}>
                                <TableCell>{consola.nombre}</TableCell>
                                <TableCell>{consola.empresa}</TableCell>
                                <TableCell>{consola.lanzamiento}</TableCell>
                                <TableCell>{consola.ventas}</TableCell>
                                <TableCell>
                                    <Edit className={styles.iconos} onClick={() => seleccionarConsola(consola, 'Editar')} />
                                    <Delete className={styles.iconos} onClick={() => seleccionarConsola(consola, 'Eliminar')} />
                                </TableCell>
                            </TableRow>
                        ))

                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>

            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>

            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>

        </div>
    )
}

export default Consolas
