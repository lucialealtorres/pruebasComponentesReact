import React from 'react';
import { createStore, combineReducers } from 'redux';
import { slide as Menu } from 'react-burger-menu';

const MenuBurguer = (props) => {
    return (
        <Menu {...props}>
            <a className="menu-item" href="/">Home</a>
            <a className="menu-item" href="/adjuntos">Adjuntos</a>
            <a className="menu-item" href="/dataTable">Data Table</a>
            <a className="menu-item" href="/editorTexto">Editor Texto</a>
            <a className="menu-item" href="/formulario">Formulario</a>
        </Menu>
    )
}

export default MenuBurguer;
