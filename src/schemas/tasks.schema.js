const taskSchema = Object.freeze({
  title: {
    required: {
      value: true,
      message: 'No se permite crear tareas sin títulos'
    },
    pattern: {
      value: /^([^<>{}[\]\\/]{4,30})$/g,
      message: 'Titulo inválido'
    },
    minLength: {
      value: 4,
      message: 'El título debe tener un mínimo de 4 caracteres'
    },
    maxLength: {
      value: 30,
      message: 'El título debe tener un máximo de 30 caracteres'
    }
  },
  description: {
    pattern: {
      value: /^([^<>{}[\]\\/]{10,250})$/g,
      message: 'Descripción inválida'
    },
    minLength: {
      value: 10,
      message: 'La descripción debe tener un mínimo de 10 caracteres'
    },
    maxLength: {
      value: 250,
      message: 'La descripción debe tener un máximo de 250 caracteres'
    }
  }
})

export default taskSchema
