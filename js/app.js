class Tarea {
  constructor(descripcion) {
    this.id = Date.now();
    this.descripcion = descripcion;
    this.estado = 'pendiente';
    this.fechaCreacion = new Date().toLocaleString();
  }

  cambiarEstado() {
    this.estado = this.estado === 'pendiente' ? 'completada' : 'pendiente';
  }

  editarDescripcion(nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
  }
}

class GestorTareas {
  static usuariosData = [
    { id: 1, name: 'Leanne Graham', username: 'Bret', completed: false },
    { id: 2, name: 'Ervin Howell', username: 'Antonette', completed: true },
    { id: 3, name: 'Clementine Bauch', username: 'Samantha', completed: false },
    { id: 4, name: 'Patricia Lebsack', username: 'Karianne', completed: true },
    { id: 5, name: 'Chelsey Dietrich', username: 'Kamren', completed: false },
    { id: 6, name: 'Mrs. Dennis Schulist', username: 'Leopoldo_Corkery', completed: true },
    { id: 7, name: 'Kurtis Weissnat', username: 'Elwyn.Skiles', completed: false },
    { id: 8, name: 'Nicholas Runolfsdottir V', username: 'Maxime_Nienow', completed: true },
    { id: 9, name: 'Glenna Reichert', username: 'Delphine', completed: false },
    { id: 10, name: 'Clementina DuBuque', username: 'Moriah.Stanton', completed: true },
  ];

  constructor() {
    this.tareas = [];
    this.cargarDesdeLocalStorage();
    this.inicializarEventos();
    this.renderizarTareas();
  }

  inicializarEventos() {
    const form = document.getElementById('form-tarea');
    const input = document.getElementById('input-tarea');
    const btnApi = document.getElementById('cargar-api');

    form.onsubmit = (e) => {
      e.preventDefault();
      const { value } = input;
      if (value.trim()) {
        this.agregarTarea(value.trim());
        input.value = '';
      }
    };

    btnApi.onclick = () => this.sincronizarConAPI();
  }

  agregarTarea(descripcion) {
    const tarea = new Tarea(descripcion);
    this.tareas.unshift(tarea); // Agrega al inicio
    this.guardarEnLocalStorage();
    this.renderizarTareas();
  }

  eliminarTarea(id) {
    this.tareas = this.tareas.filter(({ id: tareaId }) => tareaId !== id);
    this.guardarEnLocalStorage();
    this.renderizarTareas();
  }

  cambiarEstado(id) {
    const tarea = this.tareas.find(({ id: tareaId }) => tareaId === id);
    if (tarea) {
      tarea.cambiarEstado();
      this.guardarEnLocalStorage();
      this.renderizarTareas();
    }
  }

  editarTarea(id, nuevaDescripcion) {
    const tarea = this.tareas.find(({ id: tareaId }) => tareaId === id);
    if (tarea && nuevaDescripcion.trim()) {
      tarea.editarDescripcion(nuevaDescripcion.trim());
      this.guardarEnLocalStorage();
      this.renderizarTareas();
    }
  }

  async sincronizarConAPI() {
    try {
      this.tareas = GestorTareas.usuariosData.map(({ id, name: descripcion, completed }) => {
        const tarea = new Tarea(descripcion);
        tarea.id = id;
        tarea.estado = completed ? 'completada' : 'pendiente';
        return tarea;
      });
      this.guardarEnLocalStorage();
      this.renderizarTareas();
      console.log('✅ Tareas cargadas desde usuarios:', this.tareas.length);
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Error al cargar tareas');
    }
  }

  guardarEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  cargarDesdeLocalStorage() {
    const datos = JSON.parse(localStorage.getItem('tareas') || '[]');
    this.tareas = datos.map(({ id, descripcion, estado, fechaCreacion }) => {
      const tarea = new Tarea(descripcion);
      Object.assign(tarea, { id, estado, fechaCreacion });
      return tarea;
    });
  }

  renderizarTareas() {
    const lista = document.getElementById('lista-tareas');
    lista.innerHTML = '';

    this.tareas.forEach((tarea) => {
      const li = document.createElement('li');
      li.className = tarea.estado === 'completada' ? 'completada' : '';

      // Descripción visible
      const span = document.createElement('span');
      span.textContent = `${tarea.descripcion} (${tarea.estado})`;

      // Input edición oculto
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = tarea.descripcion;
      inputEdit.style.display = 'none';
      inputEdit.style.width = '200px';
      inputEdit.onblur = () => {
        span.style.display = 'block';
        inputEdit.style.display = 'none';
        this.editarTarea(tarea.id, inputEdit.value);
      };
      inputEdit.onkeyup = (e) => {
        if (e.key === 'Enter') inputEdit.blur();
      };

      // Botón Editar
      const btnEditar = document.createElement('button');
      btnEditar.textContent = '✏️';
      btnEditar.className = 'btn-editar';
      btnEditar.title = 'Editar';
      btnEditar.onclick = () => {
        span.style.display = 'none';
        inputEdit.style.display = 'block';
        inputEdit.focus();
      };

      // Botón Completar
      const btnCompletar = document.createElement('button');
      btnCompletar.textContent = '✅';
      btnCompletar.className = 'btn-completar';
      btnCompletar.title = 'Cambiar estado';
      btnCompletar.onclick = () => this.cambiarEstado(tarea.id);

      // Botón Eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = '🗑️';
      btnEliminar.className = 'btn-eliminar';
      btnEliminar.title = 'Eliminar';
      btnEliminar.onclick = () => this.eliminarTarea(tarea.id);

      li.append(span, inputEdit, btnEditar, btnCompletar, btnEliminar);
      lista.appendChild(li);
    });
  }
}

// 🚀 Inicialización automática
const gestor = new GestorTareas();
