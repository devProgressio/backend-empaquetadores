const { ROLES } = require("../emun/roles");

const getMenuFrontEnd = (role = ROLES.USUARIO) => {

    const menu = [/* {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'Rxjs', url: 'rxjs' },
            ],
        }, */
        {
            titulo: 'Mantenedores',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [],
        },
        {
            titulo: 'Administración',
            icono: 'mdi mdi-clipboard-alert',
            submenu: [
            ],
        },
        {
            titulo: 'Común',
            icono: 'mdi mdi-clipboard-alert',
            submenu: [
                { titulo: 'Faltas asignadas', url: 'falta-asignada' },
                { titulo: 'Turnos asignados', url: 'turno-asignado' },
                { titulo: 'Toma de turnos', url: 'toma-turno' },
                { titulo: 'Noticias', url: 'visor-noticias' }
            ],
        }
    ];


    if (role === ROLES.ADMINISTRADOR) {
        menu[0].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
        menu[0].submenu.unshift({ titulo: 'Tipos de Faltas', url: 'faltas' });
        menu[0].submenu.unshift({ titulo: 'Noticias', url: 'noticias' });
        menu[0].submenu.unshift({ titulo: 'Planillas', url: 'planillas' });
        menu[1].submenu.unshift({ titulo: 'TT realizadas', url: 'toma-turno-realizada' });
        menu[1].submenu.unshift({ titulo: 'Turnos por Planilla', url: 'turno-planilla' });
    }

    if (role === ROLES.FALTA) {
        menu[0].submenu.unshift({ titulo: 'Faltas', url: 'faltas' });
        menu[0].submenu.unshift({ titulo: 'Noticias', url: 'noticias' });
    }

    if (role === ROLES.TURNO) {
        menu[0].submenu.unshift({ titulo: 'Planillas', url: 'planillas' });
        menu[0].submenu.unshift({ titulo: 'Noticias', url: 'noticias' });
        menu[1].submenu.unshift({ titulo: 'Tomas de turnos', url: 'toma-turno-realizada' });
        menu[1].submenu.unshift({ titulo: 'Turnos por Planilla', url: 'turno-planilla' });
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}