import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    } from "react-router-dom";

import { Header } from "./componentes/ui/Header";
import { InventarioMain, Main } from "./componentes/main/inventario/InventarioMain";
import { UsuarioMain } from "./componentes/main/usuario/UsuarioMain";
import { TipoMain } from "./componentes/main/tipo/TipoMain";
import { MarcaMain } from "./componentes/main/marca/MarcaMain";
import { EstadoMain } from "./componentes/main/estado/EstadoMain";
import { InventarioUpdate } from "./componentes/main/inventario/InventarioUpdate";

const InventarioApp = () => {
    return <Router>
            <Header />
                <Switch>
                    <Route exact path="/" component={InventarioMain} />
                    <Route exact path="/usuario" component={UsuarioMain} />
                    <Route exact path="/tipo" component={TipoMain} />
                    <Route exact path="/marca" component={MarcaMain} />
                    <Route exact path="/estado" component={EstadoMain} />
                    <Route exact path="/inventarios/edit/:inventarioId" component={InventarioUpdate} />
                    <Redirect to="/" />
                </Switch>
        </Router>
}

export {
    InventarioApp,
}