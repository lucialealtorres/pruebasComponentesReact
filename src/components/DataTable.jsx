// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useRef } from 'react';
import Cantantes from './Tablas/Cantantes';
import Cats from './Tablas/Cats';
import Companys from './Tablas/Companys';
import Games from './Tablas/Games';
import Consolas from './Tablas/Consolas';

const DataTable = (props) => {

    // -------------------------------------------------> R E T U R N <-------------------------------------------------

    return (
        <div>

            {/* <Games /> */} {/* AG GRIND*/}
            {/* <Companys /> */} {/* DATA GRIND MATERIAL*/}
            {/* <Cats /> */} {/* HTML TABLE + EXCEL*/}
            <Cantantes />  {/* MATERIAL TABLE*/}
            {/*<Consolas />*/} {/* MATERIAL CONTAINER + CRUD*/}
        </div>
    )
}

export default DataTable
