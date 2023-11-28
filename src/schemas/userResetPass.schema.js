const userResetPass = Object.freeze({
  emailToResetPass: {
    required: {
      value: true,
      message: 'Correo electrónico requerido'
    },
    pattern: {
      value: /^[a-z0-9._-]+@[a-z0-9._]+\.[a-z]{2,4}$/g,
      message: 'Correo inválido'
    }
  }
})
export default userResetPass
