Proyecto Final - Academia Desafío Latam
Grupo 1
Ignacio Duarte
Cristian Rozas
Ramiro Sepulveda

## Configuración del archivo .env

Para configurar el acceso a la base de datos, crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=softjobs
DB_PORT=5432

JWT_SECRET=tu clave secreta

## Para probar los test, primero crea la base de datos, luego utiliza el comando 'npm run test'