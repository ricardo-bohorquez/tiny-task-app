const userLoginSchema = Object.freeze({
  mail: {
    required: {
      value: true,
      message: 'Correo electrónico requerido'
    },
    pattern: {
      value: /^[a-z0-9._-]+@[a-z0-9._]+\.[a-z]{2,4}$/g,
      message: 'Correo inválido'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Contraseña requerida'
    },
    minLength: {
      value: 6,
      message: 'La contraseña debe tener un mínimo de 6 caracteres'
    },
    maxLength: {
      value: 16,
      message: 'La contraseña debe tener un máximo de 16 caracteres'
    },
    pattern: {
      value: /^[a-zA-Z0-9._/*-]{6,16}$/g,
      message: 'Contraseña solo puede tener caracteres alfanuméricos y . _ / * -'
    }
  }
})
export default userLoginSchema
