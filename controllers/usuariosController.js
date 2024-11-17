import { consultasUsuarios } from "../consultas/consultasUsuarios.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

const JWT_SECRET = process.env.JWT_SECRET;

const crearUsuario = async (req, res) => {
    const { email, password, nombre, apellido, telefono, img_perfil } = req.body;
    // Validación básica
    if (!email || !password || !nombre || !apellido) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        const existingUser = await consultasUsuarios.comprobarUsuario({ email, telefono })
        if (existingUser.rowCount > 0) {
            return res.status(400).json({ error: 'El email o teléfono ya están en uso' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await consultasUsuarios.registrarUsuario({
            email,
            password: hashedPassword,
            nombre,
            apellido,
            telefono,
            img_perfil,
        });

        console.log(newUser)

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
                "id": newUser.id,
                "email": newUser.email,
                "nombre": newUser.nombre,
                "apellido": newUser.apellido,
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
    }
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {

        const existingUser = await consultasUsuarios.comprobarUsuario({ email })

        if (existingUser.rowCount === 0) {

            return res.status(400).json({ error: 'Los datos ingresados no son validos' });
        }

        const user = existingUser.rows[0]

        // Verificar la contraseña con bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Los datos ingresados no son validos' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id, email: user.email, }, JWT_SECRET, { expiresIn: '2h' } // Token válido por 2 horas
        );

        // Responder con el token y los datos del usuario
        res.status(200).json({
            message: 'Login exitoso',
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                telefono: user.telefono,
                img_perfil: user.img_perfil,
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }

};

const tokenUsuario = async (req, res) => {
    const Authorization = req.header("Authorization");
    console.log(Authorization)

    try {
        const token = Authorization.split("Bearer ")[1];
        console.log(token)
        const decoded = jwt.verify(token, JWT_SECRET);

        const result = await consultasUsuarios.infoUsuario(decoded);
        res.json(result.rows);
    }
    catch (error) {
        return res.status(403).json({ error: "Token inválido" });
    }
};

const updateUsuario = async (req, res) => {
    const { id, nombre, apellido, telefono, img_perfil } = req.body

    if (!id || !nombre || !apellido || !telefono) {
        return res.status(400).json({ error: 'Faltan datos en campos obligatorios' });
    }

    try {
        const user = await consultasUsuarios.actualizarPerfil(req.body)
        console.log(user)
        res.status(200).json({
            message: 'Actualización de perfil existoso',
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                telefono: user.telefono,
                img_perfil: user.img_perfil,
            },
        });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }


}

export const usuarioController = { crearUsuario, loginUsuario, tokenUsuario, updateUsuario }