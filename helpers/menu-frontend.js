const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [{
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'Rxjs', url: 'rxjs' },
            ],
        },
        {
            titulo: 'Mantenedores',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [],
        },
        {
            titulo: 'Administración',
            icono: 'mdi mdi-clipboard-alert',
            submenu: [
                { titulo: 'Faltas asignadas', url: 'visor-faltas' },
                { titulo: 'Turnos asignados', url: 'visor-turnos' },
                { titulo: 'Toma de turnos', url: 'toma-turnos' }
            ],
        },
        {
            titulo: 'Información',
            icono: 'mdi mdi-information-outline',
            submenu: [
                { titulo: 'Noticias', url: 'visor-noticias' },
            ],

        },
    ];


    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
        menu[1].submenu.unshift({ titulo: 'Faltas', url: 'faltas' });
        menu[1].submenu.unshift({ titulo: 'Noticias', url: 'noticias' });
        menu[1].submenu.unshift({ titulo: 'Planillas', url: 'planillas' });
    }

    if (role === 'FALTA_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Faltas', url: 'faltas' });
        menu[1].submenu.unshift({ titulo: 'Noticias', url: 'noticias' });
        menu[1].submenu.unshift({ titulo: 'Asignaciones de falta', url: 'asignar-falta' });
        //quitar luego de hacer pruebas en role falta. 
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
    }

    if (role === 'TURNO_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Planillas', url: 'planillas' });
        menu[1].submenu.unshift({ titulo: 'Noticias', url: 'noticias' });
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}