TaskFlow - Aplicacion de Gestion de Tareas

Proyecto Integrador ABP Modulo 5

Objetivo:
Aplicacion web completa con POO, ES6+, DOM, eventos, API y localStorage.

Estructura:
taskflow/
├── index.html
├── css/styles.css
└── js/app.js

Funcionalidades Implementadas:

Clase Tarea:

- Propiedades: id (Date.now()), descripcion, estado, fechaCreacion
- Metodos: cambiarEstado(), editarDescripcion()

Clase GestorTareas:

- Propiedades: this.tareas = []
- Metodos:
  - agregarTarea(descripcion) - usa push()
  - eliminarTarea(id) - usa filter()
  - cambiarEstado(id) - usa find()
  - sincronizarConAPI() - async/await + try/catch

ES6+ Usado:

- let/const
- Arrow functions
- Destructuring: { id, name: descripcion }
- map(), filter(), find()
- Template literals
- Object.assign()

DOM y Eventos:

- getElementById(), createElement()
- form.onsubmit con preventDefault()
- Delegacion eventos en botones dinamicos
- input.onblur, onkeyup (Enter)

API y Persistencia:

- Carga 10 usuarios como tareas (id, name->descripcion, completed->estado)
- localStorage.setItem/getItem (JSON.stringify/parse)
- Manejo errores con try/catch

Botones Funcionales:

- Agregar: Crea tarea nueva
- Editar: Input inline (blur/Enter)
- Completar: Toggle estado + CSS
- Eliminar: Remueve tarea
- Cargar API: Sincroniza datos

Pruebas:

- Crear/editar/eliminar OK
- Estados cambian visualmente
- Persiste entre recargas
- API carga 10 tareas mixtas

Cumplimiento Consigna:

- Clases exactas solicitadas
- Metodos con array methods (push, filter, find)
- ES6+ obligatorio
- DOM dinamico
- Eventos completos
- API + localStorage + errores
