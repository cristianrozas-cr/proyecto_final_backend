import { consultasUsuarios } from "../consultas/consultasUsuarios.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

const JWT_SECRET = process.env.JWT_SECRET;

const crearUsuario = async (req, res) => {
    console.log(req.body);
    const { email, password, nombre, apellido, telefono, img_perfil } = req.body;

    // Validación básica
    if (!email || !password || !nombre || !apellido) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const existingUser = await consultasUsuarios.verificarUsuario({ email, telefono })
        if (existingUser.rowCount > 0) {
            return res.status(400).json({ error: 'El email o teléfono ya están en uso' });

        }

        const newUser = await consultasUsuarios.registrarUsuario({
            email,
            password: hashedPassword,
            nombre,
            apellido,
            telefono,
            img_perfil,
        });

        if (!newUser) {
            return res.status(500).json({ error: 'No se pudo registrar al usuario' });
        }

        const token = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email,
            },
            JWT_SECRET,
            { expiresIn: '2h' } // Token válido por 2 horas
        );
        console.log(token)
        // Responder con el token y datos del usuario
        res.status(201).json({
            message: 'Usuario registrado con éxito',
            user: {
                id: newUser.id,
                email: newUser.email,
                nombre: newUser.nombre,
                apellido: newUser.apellido,
            },
            token,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
    }
};


export const usuariosController = { crearUsuario }
