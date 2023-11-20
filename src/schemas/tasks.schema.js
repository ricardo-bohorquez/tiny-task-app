const taskSchema = Object.freeze({
  title: {
    required: {
      value: true,
      message: 'No se permite crear tareas sin títulos'
    },
    pattern: {
      value: /^[a-zá-źA-ZÁ-Ź0-9.,()*+-_= ]{4,24}$/,
      message: 'Solo se permiten caracteres alfanuméricos y . , () * + - _ = /'
    },
    minLength: {
      value: 4,
      message: 'El título debe tener un mínimo de 4 caracteres'
    },
    maxLength: {
      value: 24,
      message: 'El título debe tener un máximo de 24 caracteres'
    }
  },
  description: {
    pattern: {
      value: /^[a-zá-źA-ZÁ-Ź0-9.,()*+-_= ]{10,250}$/,
      message: 'Solo se permiten caracteres alfanuméricos y . , () * + - _ = /'
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
