# API REST para E-commerce de Productos Tecnológicos

Este proyecto consiste en el desarrollo de una API REST diseñada para gestionar una página web dedicada a la venta de productos tecnológicos. El propósito de este sistema es ofrecer una solución funcional y escalable para la gestión de un e-commerce especializado en productos tecnológicos. Este proyecto combina el diseño de base de datos, desarrollo de API y conexión con el frontend, proporcionando una experiencia integral para el usuario final.

## Descripción del Proyecto

El sistema está compuesto por un backend robusto que proporciona las funcionalidades necesarias para administrar los productos tecnológicos disponibles en la tienda, así como las operaciones relacionadas con los usuarios y sus compras. Este proyecto incluye:

- Diseño y gestión de la base de datos: Se creó una base de datos estructurada para almacenar información sobre los productos, usuarios, imágenes, categorías y otras entidades necesarias.
- Creación de rutas y controladores: El backend implementa un conjunto de rutas organizadas que permiten manejar las solicitudes HTTP. Esto incluye operaciones CRUD (crear, leer, actualizar y eliminar) sobre productos y usuarios.
- Integración con el frontend: La API se comunica con el frontend, permitiendo que las funcionalidades del sitio web se basen en la información de la base de datos.
- Seguridad y validación: Se implementaron medidas de seguridad como la autenticación y validación de datos para proteger los recursos del sistema.

## Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL
- CORS
- bcryptjs
- jest
- jsonwebtoken

## Autores

- [@cristianrozas-cr](https://www.github.com/cristianrozas-cr)
- [@ramiro-sepulveda](https://github.com/ramiro-sepulveda)
- [@nachytto](https://www.github.com/nachytto)

## Variables de entorno

Para ejecutar este proyecto, deberás añadir las siguientes variables de entorno a tu archivo .env:

DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=softjobs
DB_PORT=5432
JWT_SECRET=tu clave secreta

## Testing

Para ejecutar las pruebas, crea la base de datos y ejecute el siguiente comando:

```bash
  npm run test
```
