const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("express");



const registrarUsuario = async ({ email, password, nombre, apellido, telefono, img_perfil}) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
        INSERT INTO usuarios (email, password, nombre, apellido, telefono, img_perfil)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [email, hashedPassword, nombre, apellido, telefono, img_perfil];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const loginUsuario = async (email, password) => {
    const query = "SELECT * FROM usuarios WHERE email = $1"
    const { rows, rowsCount} = await pool.query(query,[email]);
    if (!rowsCount) throw {code: 404, message: "usuario no encontrado"};
    const usuario = rows[0];
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    const token = jwt.sign({ id: usuario.id}, process.env.JWT_SECRET,{ expiresIn: "1h"});
    return { token };
};

const obtenerPerfil = async (id) => {
    const query = "SELECT * FROM usuarios WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

const actualizarPerfil = async (id, { nombre, apellido, telefono, img_perfil}) => {
    const query = `
        UPDATE usuarios SET nombre = $1, apelido = $2, telefono = $3, img_perfil = $4
        WHERE id = $5 RETURNING *`;
    const values = [nombre, apellido, telefono, img_perfil, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
};
module.exports = { registrarUsuario, loginUsuario, obtenerPerfil, actualizarPerfil };