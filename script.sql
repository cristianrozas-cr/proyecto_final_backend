CREATE DATABASE tecno_latam;

-- Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    telefono VARCHAR(15) UNIQUE,
    img_perfil VARCHAR(255)
);

-- Categorías
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Publicaciones
CREATE TABLE publicaciones (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria_id INTEGER,
    precio INT NOT NULL CHECK (precio > 0),
    id_vendedor INTEGER,
    fecha_publicacion TIMESTAMP DEFAULT NOW (),
    FOREIGN KEY (categoria_id) REFERENCES categorias (id),
    FOREIGN KEY (id_vendedor) REFERENCES usuarios (id) ON DELETE CASCADE
);

-- Direcciones
CREATE TABLE direcciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER,
    pais VARCHAR(50) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    calle VARCHAR(255) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
);

-- Pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    publicacion_id INTEGER,
    comprador_id INTEGER,
    direccion_id INTEGER,
    cantidad INT NOT NULL,
    fecha_compra TIMESTAMP DEFAULT NOW (),
    estado VARCHAR(20) DEFAULT 'pendiente',
    -- Se agrega columna de estado para definir si esta enviado o pendiente
    FOREIGN KEY (publicacion_id) REFERENCES publicaciones (id),
    FOREIGN KEY (comprador_id) REFERENCES usuarios (id),
    FOREIGN KEY (direccion_id) REFERENCES direcciones (id)
);

-- Posts / Comentarios
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    publicacion_id INTEGER,
    usuario_id INTEGER,
    fecha_post TIMESTAMP DEFAULT NOW (),
    texto TEXT NOT NULL,
    FOREIGN KEY (publicacion_id) REFERENCES publicaciones (id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
);

-- Imágenes de Publicación
CREATE TABLE imagenes (
    id SERIAL PRIMARY KEY,
    publicacion_id INTEGER UNIQUE,
    img1_portada TEXT NOT NULL,
    img2 TEXT,
    img3 TEXT,
    img4 TEXT,
    FOREIGN KEY (publicacion_id) REFERENCES publicaciones (id) ON DELETE CASCADE
);

-- Favoritos
CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER,
    publicacion_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    FOREIGN KEY (publicacion_id) REFERENCES publicaciones (id) ON DELETE CASCADE,
    UNIQUE (usuario_id, publicacion_id)
);

-- Carrito
CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER,
    publicacion_id INTEGER,
    cantidad INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    FOREIGN KEY (publicacion_id) REFERENCES publicaciones (id) ON DELETE CASCADE
);