import request from 'supertest'; // Importa supertest
import express from 'express';   // Importa la aplicación Express
import router from '../rutas/rutas';


const app = express();

app.use("/tecno", router);

describe('Test API Endpoints', () => {
  it('TEST GET GALERIA: Debe retornar un codigo 200 y un array de objetos acorde a una lista de Publicaciones', async () => {
    const response = await request(app).get('/tecno/galeria');
    // console.log(response.body.results)
    expect(response.status).toBe(200); console.log(response.body.results)
    expect(response.body.results).toEqual(

      expect.arrayContaining([
        expect.objectContaining({
          publicacion_id: expect.any(Number),
          titulo: expect.any(String),
          descripcion: expect.any(String),
          precio: expect.any(Number),
          fecha_publicacion: expect.any(String),
          id_vendedor: expect.any(Number),
          img1_portada: expect.any(String),
          href: expect.any(String),
        }),
      ])
    );
  });

  it("test get detalle publicacion", async () => {
    // Hacemos una solicitud GET a la ruta de publicaciones con el ID 1
    const response = await request(app).get("/tecno/publicaciones/1");

    const status = response.statusCode;
    expect(status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        publicacion_id: expect.any(Number),
        titulo: expect.any(String),
        descripcion: expect.any(String),
        precio: expect.any(Number),
        fecha_publicacion: expect.any(String),
        categoria_id: expect.any(Number),
        id_vendedor: expect.any(Number),
        img1_portada: expect.toSatisfy(value => typeof value === 'string' || value === null),
        img2: expect.toSatisfy(value => typeof value === 'string' || value === null),
        img3: expect.toSatisfy(value => typeof value === 'string' || value === null),
        img4: expect.toSatisfy(value => typeof value === 'string' || value === null),
      })
    );
  });


  it("test get direcciones", async () => {
    const response = await request(app).get("/tecno/direccion/1");
    // console.log(response.body);
    expect(response.status).toBe(200);

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

  it('TEST GET DE COMENTARIOS: Debe retornar los comentarios de la publicacion 1', async () => {
    const response = await request(app).get("/tecno/comentario/1");
    // console.log(response.body.publicacion);
    expect(response.status).toBe(201);
    expect(response.body.publicacion).toEqual(

      expect.arrayContaining([
        expect.objectContaining({
          post_id: expect.any(Number),
          publicacion_id: expect.any(Number),
          usuario_id: expect.any(Number),
          fecha_post: expect.any(String),
          texto: expect.any(String),
          nombre: expect.any(String),
          apellido: expect.any(String),

        }),
      ])
    )
  })
})

//  it('Debe retornar un codigo 200 y un array de objetos acorde a una lista de Publicaciones', async () => {
//   const response = await request(app).get("/comentario/:publicacion_id");

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
// })
