module.exports = {
  defaultServerResponse: {
    status: 400,
    message: '',
    body: {}
  },
  productMessage: {
    PRODUCT_CREATED: 'Product Created Successfully',
    PRODUCT_FETCHED: 'Product Fetched Successfully',
    PRODUCT_UPDATED: 'Product Updated Successfully',
    PRODUCT_DELETED: 'Product Deleted Successfully',
    PRODUCT_NOT_FOUND: 'Product Not Found'
  },
  userMessage: {
    REGISTER_TITLE: 'Informacion Personal',
    REGISTER_MESSAGE: 'Use un correo gmail donde pueda recibir un correo para confirmar la cuenta creada.',
    SIGNUP_SUCCESS: 'Registro de correo Exitoso',
    LOGIN_SUCCESS: 'Inicio de sesion',
    DUPLICATE_EMAIL: 'Ya existe un usuario con email Registrado',
    USER_NOT_FOUND: 'Usuario no encontrado',
    INVALID_PASSWORD: 'Password incorrecto'
  },
  requestValidationMessage: {
    BAD_REQUEST: 'Invalid fields',
    TOKEN_MISSING: 'Token missing from header'
  },
  databaseMessage: {
    INVALID_ID: 'Invalid Id'
  }
}