import request from 'supertest'; // Importa supertest
import express from 'express';   // Importa la aplicación Express
import router from '../rutas/rutas';
import { string } from 'pg-format';

const app = express();

app.use(express.json());
app.use("/tecno", router);

describe('Test API Endpoints', () => {
  it('TEST GET GALERIA: Debe retornar un codigo 200 y un array de objetos acorde a una lista de Publicaciones', async () => {
    const response = await request(app).get('/tecno/galeria');
    console.log(response.body.results)
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

  it("TEST GET detalle publicacion ID 1", async () => {
    // Hacemos una solicitud GET a la ruta de publicaciones con el ID 1
    const response = await request(app).get("/tecno/publicaciones/1");

    const status = response.statusCode;
    expect(status).toBe(200);
    expect(response.body.img1_portada === null || typeof response.body.img1_portada === 'string').toBe(true);
    expect(response.body.img2 === null || typeof response.body.img2 === 'string').toBe(true);
    expect(response.body.img3 === null || typeof response.body.img3 === 'string').toBe(true);
    expect(response.body.img4 === null || typeof response.body.img4 === 'string').toBe(true);

    expect(response.body).toEqual(

      expect.objectContaining({
        publicacion_id: expect.any(Number),
        titulo: expect.any(String),
        descripcion: expect.any(String),
        precio: expect.any(Number),
        fecha_publicacion: expect.any(String),
        categoria_id: expect.any(Number),
        id_vendedor: expect.any(Number),

      }),
    );
  });

  it("TEST GET DIRECCIONES", async () => {
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
          usuario_id: nuevaDireccion.usuario_id,
          pais: nuevaDireccion.pais,
          ciudad: nuevaDireccion.ciudad,
          calle: nuevaDireccion.calle,
          numero: nuevaDireccion.numero,
          id: expect.any(Number), // ID generado
        }),
      })
    );
  });

})

