const userRegistrySchema = Object.freeze({
  mail: {
    required: {
      value: true,
      message: 'Correo electrónico requerido'
    },
    pattern: {
      value: /^[a-z0-9._%+-]+@[a-z0-9._]+\.[a-z]{2,4}$/,
      message: 'Correo inválido'
    }
  },
  confirmMail: {
    required: {
      value: true,
      message: 'Confirmación de correo requerida'
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
      value: /^[a-zA-Z0-9._/*-]{6,16}$/,
      message: 'Contraseña solo puede tener caracteres alfanuméricos y . _ / * -'
    }
  },
  confirmPassword: {
    required: {
      value: true,
      message: 'Confirmación de contraseña requerida'
    }
  }
})
export default userRegistrySchema
