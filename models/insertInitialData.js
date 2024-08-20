import Rol from './RolModel.js';
import NameBanco from './NameBModel.js';
import Usuario from './UsuarioModel.js';
import argon2 from 'argon2';

async function insertInitialData() {
    try {
        // Crear roles si no existen
        await Rol.findOrCreate({
            where: { NOMBRE_ROL: 'admin' },
            defaults: { NOMBRE_ROL: 'admin' }
        });

        await Rol.findOrCreate({
            where: { NOMBRE_ROL: 'usuario' },
            defaults: { NOMBRE_ROL: 'usuario' }
        });

        // Crear entidades bancarias si no existen
        const bancos = ['BBVA CONTINENTAL', 'BCP', 'SCOTIABANK', 'INTERBANK'];
        for (const banco of bancos) {
            await NameBanco.findOrCreate({
                where: { NOMBRE_ENTIDAD_BANCO: banco },
                defaults: { NOMBRE_ENTIDAD_BANCO: banco }
            });
        }

        // Comprobar si ya existe un usuario con ID_USUARIO = 1
        const existingAdminUser = await Usuario.findOne({
            where: { ID_USUARIO: 1 }
        });

        if (!existingAdminUser) {
            // Crear usuario admin si no existe
            const hashedPassword = await argon2.hash('adminpassword');
            await Usuario.create({
                DNI_USUARIO: '12345678',
                NOMBRE_USUARIO: 'Admin',
                APELLIDO_USUARIO: 'User',
                USERNAME: 'admin',
                EMAIL: 'admin@example.com',
                USER_PASSWORD: hashedPassword,
                ID_ROL: 1 
            });

            console.log('Usuario admin creado.');
        } else {
            console.log('Usuario admin ya existe con ID_USUARIO = 1.');
        }
    } catch (error) {
        console.error('Error insertando datos iniciales:', error);
    }
}

export default insertInitialData;
