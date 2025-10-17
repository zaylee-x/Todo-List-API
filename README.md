openapi: 3.0.3
info:
  title: TPA #5 — ToDoList REST API
  version: 1.0.0
  description: API ToDoList dengan Register, Login (JWT), dan CRUD Todo (termasuk Delete One & Delete All).

servers:
  - url: http://localhost:8080
    description: Local
  - url: https://{host}/api
    description: Production (Vercel)
    variables:
      host:
        default: example.vercel.app

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    User:
      type: object
      properties:
        _id: { type: string }
        name: { type: string }
        email: { type: string, format: email }
    Todo:
      type: object
      properties:
        _id: { type: string }
        title: { type: string }
        description: { type: string }
        status: { type: string, enum: [pending, in_progress, done] }
        dueDate: { type: string, format: date }
        user: { type: string }
    RegisterInput:
      type: object
      required: [name, email, password]
      properties:
        name: { type: string }
        email: { type: string, format: email }
        password: { type: string, format: password }
    LoginInput:
      type: object
      required: [email, password]
      properties:
        email: { type: string, format: email }
        password: { type: string, format: password }
    CreateTodoInput:
      type: object
      required: [title]
      properties:
        title: { type: string }
        description: { type: string }
        status: { type: string, enum: [pending, in_progress, done] }
        dueDate: { type: string, format: date }
    UpdateTodoInput:
      type: object
      properties:
        title: { type: string }
        description: { type: string }
        status: { type: string, enum: [pending, in_progress, done] }
        dueDate: { type: string, format: date }

paths:
  /:
    get:
      summary: Health check
      responses:
        '200':
          description: OK

  /auth/register:
    post:
      summary: Register user
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/RegisterInput' }
      responses:
        '201':
          description: Created (returns JWT)
        '409':
          description: Email already used

  /auth/login:
    post:
      summary: Login
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/LoginInput' }
      responses:
        '200':
          description: OK (returns JWT)
        '401':
          description: Invalid credentials

  /todos:
    get:
      summary: List all todos (own)
      security: [ { bearerAuth: [] } ]
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: array
                items: { $ref: '#/components/schemas/Todo' }
    post:
      summary: Create todo
      security: [ { bearerAuth: [] } ]
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/CreateTodoInput' }
      responses:
        '201':
          description: Created
    delete:
      summary: Delete all todos (own)
      security: [ { bearerAuth: [] } ]
      responses:
        '200':
          description: Deleted all

  /todos/{id}:
    get:
      summary: Get todo by id
      security: [ { bearerAuth: [] } ]
      parameters:
        - in: path
          name: id
          required: true
          schema: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Todo' }
        '404': { description: Not found }
    patch:
      summary: Update todo
      security: [ { bearerAuth: [] } ]
      parameters:
        - in: path
          name: id
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/UpdateTodoInput' }
      responses:
        '200': { description: Updated }
        '404': { description: Not found }
    delete:
      summary: Delete one todo
      security: [ { bearerAuth: [] } ]
      parameters:
        - in: path
          name: id
          required: true
          schema: { type: string }
      responses:
        '200': { description: Deleted }
        '404': { description: Not found }