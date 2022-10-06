'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();

this.enviarMail = ({nombre, email}, randomPass) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    let mail_options = {
        from: `${process.env.MAIL_SOPORTE}`,
        to: `${email}`,
        subject: `Bienvenido a la aplicación Empaquetadores ${nombre}`,
        html: `
            <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
            <tr height="200px">  
                <td bgcolor="" width="600px">
                    <h1 style="color: #fff; text-align:center">Bienvenido</h1>
                    <p  style="color: #fff; text-align:center">
                        <span style="color: #e84393">${nombre}</span> 
                        a la aplicación. Su contraseña temporal es ${randomPass}
                    </p>
                </td>
            </tr>
            <tr bgcolor="#fff">
                <td style="text-align:center">
                    <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                </td>
            </tr>
            </table>
        
        `
    };

    transporter.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo se envío correctamente ' + info.response);
        }
    });
};

module.exports = this;