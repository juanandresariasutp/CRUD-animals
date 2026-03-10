# Animals API

API REST construida con Node.js, Express y PostgreSQL para gestionar animales con operaciones CRUD.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- pg

## Requisitos

- Node.js 18+
- PostgreSQL en ejecucion
- Una base de datos con la tabla `animals`

## Instalacion

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raiz del proyecto con este formato:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=database_user
DB_PASSWORD=your_password
PORT=3000
```

Tambien puedes usar `.env.example` como referencia.

## Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Servidor por defecto: `http://localhost:3000`

## Endpoints

Base URL: `http://localhost:3000/api/animals`

- `GET /api/animals` - Listar todos los animales
- `GET /api/animals/:id` - Obtener un animal por id
- `POST /api/animals` - Crear un animal
- `PUT /api/animals/:id` - Actualizar un animal
- `DELETE /api/animals/:id` - Eliminar un animal

## Ejemplos para Postman

### Crear animal

`POST /api/animals`

```json
{
  "name": "Leon",
  "species": "Panthera leo",
  "age": 8,
  "habitat": "Sabana",
  "endangered": true
}
```

Campos obligatorios: `name`, `species`.

### Actualizar solo la edad

`PUT /api/animals/5`

```json
{
  "age": 10
}
```

## Respuestas comunes

- `201` Recurso creado
- `200` Operacion exitosa
- `400` Datos faltantes o invalidos
- `404` Animal no encontrado
- `500` Error interno del servidor

## Estructura del proyecto

```text
animals-api/
  db/
    config.js
  routes/
    animals.js
  server.js
  .env.example
  package.json
```
