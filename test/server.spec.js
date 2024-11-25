import request from 'supertest'; // Importa supertest
import express from 'express';   // Importa la aplicación Express
import router from '../rutas/rutas';
import { string } from 'pg-format';

const app = express();

app.use("/tecno", router);

// describe('Test API Endpoints', () => {
//   it('should return a 200 status and a message', async () => {
//     const response = await request(app).get('/tecno/galeria');
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('Hello, World!');
//   });
describe("operaciones direcciones", () => {
    it("test get direcciones", async () => {
      const response = await request(app).get("/tecno/direccion/1");
      const status = response.statusCode;
      expect(status).toBe(200);
      console.log(response.body);
      expect(response.body).toEqual(

        expect.arrayContaining([
          expect.objectContaining({
            direccion_id: expect.any(Number),
            pais: expect.any(String),
            ciudad: expect.any(String),
            calle: expect.any(String),
            numero: expect.any(String),
          
          }),
        ])
      );
    });
    it("Test POST /tecno/direccion al agregar una nueva dirección devuelve un 201", async () => {
      const nuevaDireccion = {
        usuario_id: 1,
        pais: "Argentina",
        ciudad: "Buenos Aires",
        calle: "Santa Fe",
        numero: "1234",
      };
    
      console.log("Datos enviados en el test:", nuevaDireccion);
    
      const response = await request(app)
        .post("/tecno/direccion")
        .send(nuevaDireccion)
        .set("Content-Type", "application/json");
    
      // Logs de depuración
      console.log("Estado de respuesta:", response.statusCode);
      console.log("Cuerpo de respuesta:", response.body);
    
      expect(response.statusCode).toBe(201);
    
      expect(response.body).toEqual(
        expect.objectContaining({
          message: "Dirección agregada con éxito",
          direccion: expect.objectContaining({
            direccion_id: expect.any(Number), 
            usuario_id: nuevaDireccion.usuario_id,
            pais: nuevaDireccion.pais,
            ciudad: nuevaDireccion.ciudad,
            calle: nuevaDireccion.calle,
            numero: nuevaDireccion.numero
            // ID generado
          }),
        })
      );
    });
    
    
    
    
  });

    
    

    

  // it("Respuesta de ruta GET es un objeto", async () => {
  //   const { body } = await request(app).get("/cafes").send();
  //   const cafes = body;
  //   expect(cafes).toBeInstanceOf(Object);
  // });

  // it("Error 404 al intentar borrar un ID inexistente", async () => {
  //   const idDeCafeAEliminar = Math.floor(Math.random() * 999);
  //   const jwt = "token";

  //   const response = await request(app)
  //     .delete(`/cafes/${idDeCafeAEliminar}`)
  //     .set("Authorization", jwt)
  //     .send();
  //   const status = response.statusCode;
  //   expect(status).toBe(404);
  // });

  // it("Ruta POST agrega un nuevo cafe", async () => {
  //   const id = Math.floor(Math.random() * 999);
  //   const nuevoCafe = { id, nombre: "Nuevo Cafe" };
  //   const { body: cafes } = await request(app)
  //     .post("/cafes")
  //     .send(nuevoCafe);

  //   expect(cafes).toContainEqual(nuevoCafe);
  // });

  // it("Ruta POST devuelve status 201", async () => {
  //   const id = Math.floor(Math.random() * 999);
  //   const nuevoCafe = { id, nombre: "Nuevo Cafe" };
  //   const response = await request(app).post("/cafes").send(nuevoCafe);
  //   const status = response.statusCode;
  //   expect(status).toBe(201);
  // });

  // it("Ruta PUT devuelve status 400 si ID en params es distinto a ID payload", async () => {
  //   const idCafeParams = Math.floor(Math.random() * 999);
  //   const idPayload = Math.floor(Math.random() * 999);
  //   const cafeModificado = { idPayload, nombre: "Cafe Modificado" };
  //   const response = await request(app)
  //     .put(`/cafes/${idCafeParams}`)
  //     .send(cafeModificado);
  //   const status = response.statusCode;
  //   expect(status).toBe(400);
  // });
