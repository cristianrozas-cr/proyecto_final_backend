import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const validarToken = (req, res, next) => {
    // Obtener el token desde el encabezado Authorization
    const Authorization = req.header("Authorization");

    if (!Authorization || !Authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado o formato incorrecto' });
    }

    // Extraer el token (después de "Bearer ")
    const token = Authorization.split("Bearer ")[1];

    try {
        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Agregar el decoded decodificado al objeto `req` para usarlo en las rutas
        req.user = decoded;

        // Continuar al siguiente middleware o controlador
        next();
    } catch (error) {
        console.error('Error al validar el token:', error.message);
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

export const middlewares = { validarToken };
