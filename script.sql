CREATE DATABASE tecno_latam;

CREATE TABLE usuarios(id serial PRIMARY KEY, email VARCHAR(100) unique not null, password VARCHAR(255), nombre VARCHAR(50), apellido VARCHAR(50), telefono VARCHAR(15) unique, img_perfil VARCHAR(255));

CREATE TABLE publicaciones (id SERIAL PRIMARY KEY, titulo VARCHAR(150) NOT NULL, descripcion TEXT NOT NULL, categoria_id references categoria(id), precio INT NOT NULL CHECK (precio > 0), id_vendedor REFERENCES usuarios(id) ON DELETE CASCADE, fecha_publicacion TIMESTAMP DEFAULT NOW());

CREATE TABLE pedidos (id SERIAL PRIMARY KEY, publicacion_id REFERENCES publicaciones(id), comprador_id references usuarios(id), direccion_id references direcciones(id), cantidad INT not null, fecha_compra TIMESTAMP DEFAULT NOW());

/*  categoria, direcciones, posts, imagenes, carrito, favoritos */


