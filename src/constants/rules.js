export const rules = {
  requerido: (v) => !!v || "Este campo es requerido",
  numeroCuenta: (v) => /[0-9]+/.test(v) || "Ingresa un número de cuenta válido",
  fileSize: (v) => {
    let invalid = true;
    v.type !== 'application/pdf' ? false : true;
    return invalid || 'Únicamente se admiten archivos en formato PDF';
  },
  numeroCuentaLongitud: (v) =>
    (v && v.length === 9) || "El número de cuenta debe contener 9 caracteres",
  limit20Caracteres: (v) =>
    (v && v.length >= 20) || "Este dato debe tener al menos 20 caracteres",
  limit10Caracteres: (v) =>
    (v && v.length >= 6) || "Este dato debe tener al menos 10 caracteres",
  rfcFormat: (v) =>
    /^[A-Za-zñÑ&]{3,4}\d{6}\w{3}$/.test(v) ||
    "Por favor, ingrese un RFC valido",
  correo: (v) => {
    const pattern =
      /(^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)|^$/;
    return (
      pattern.test(v) || "Por favor, ingrese un correo electrónico válido."
    );
  },
  numeroTelefono: (v) => {
    const pattern = /^[0-9]{10}$/;
    return pattern.test(v) || "Solo números con tamaño de 10 dígitos";
  },
  ext: v => (!v || v.length <= 5) || 'Ingresa 5 dígitos como máximo',
  number: v => /^(\d+(\.\d+)?|\.\d+)$/.test(v) || 'Ingresa un número válido',
  noEmpleado: v => (!v || v.length === 6) || 'Ingresa un número de 6 dígitos',
  maxTres: v => /^([1-3])*$/.test(v) || 'Puedes aceptar máximo 3 alumnos',
  selectEnItems: (items) => { return (v) =>
      Array.isArray(v) && v.every(opcion => items.includes(opcion)) || 'Solo se permiten opciones válidas';
  },

};
