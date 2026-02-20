class GestorTareas {
  // Datos de usuarios como propiedad estática de la clase
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
  }

  // ... todos los otros métodos permanecen IGUALES (agregarTarea, eliminarTarea, etc.) ...

  async sincronizarConAPI() {
    try {
      // Cargar desde datos locales de usuarios (ahora accesible con GestorTareas.usuariosData)
      this.tareas = GestorTareas.usuariosData.map(({ id, name: descripcion, completed }) => {
        const tarea = new Tarea(descripcion);
        tarea.id = id;
        tarea.estado = completed ? 'completada' : 'pendiente';
        return tarea;
      });

      this.guardarEnLocalStorage();
      this.renderizarTareas();
      console.log('Tareas cargadas desde datos de usuarios:', this.tareas.length);
    } catch (error) {
      console.error('Error al sincronizar:', error);
      alert('Error al cargar tareas');
    }
  }

  // ... resto de métodos sin cambios ...
}
