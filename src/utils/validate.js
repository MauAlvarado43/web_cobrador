
const validateNewClientData = (name, app, apm, curp, tel, cel, state, mun, col, street, cp, ext, _int) => {

   if (name == "" || name.length > 50) {
      return { code: 500, data: "El nombre del cliente no puede estar vacío ni pasar de 50 caracteres" }
   }
   if (app == "" || app.length > 50) {
      return { code: 500, data: "El apellido paterno del cliente no puede estar vacío ni pasar de 50 caracteres" }
   }
   if (apm == "" || apm.length > 50) {
      return { code: 500, data: "El apellido materno del cliente no puede estar vacío ni pasar de 50 caracteres" }
   }
   if (curp.length != 18) {
      return { code: 500, data: "El curp del cliente debe tener 18 caracteres" }
   }
   if (tel == "" || tel.length > 20) {
      return { code: 500, data: "El télefono del cliente no puede estar vacío ni pasar de 20 caracteres" }
   }
   if (cel == "" || cel.length > 20) {
      return { code: 500, data: "El celular del cliente no puede estar vacío ni pasar de 20 caracteres" }
   }
   if (state == "" || state.length > 40) {
      return { code: 500, data: "El estado no puede estar vacío ni pasar de 40 caracteres" }
   }
   if (mun == "" || mun.length > 40) {
      return { code: 500, data: "El municipio no puede estar vacío ni pasar de 40 caracteres" }
   }
   if (col == "" || col.length > 40) {
      return { code: 500, data: "La colonia no puede estar vacía ni pasar de 40 caracteres" }
   }
   if (street == "" || street.length > 40) {
      return { code: 500, data: "La calle no puede estar vacía ni pasar de 40 caracteres" }
   }
   if (cp == "" || cp.length > 10) {
      return { code: 500, data: "El código postal no puede estar vacío ni pasar de 10 caracteres" }
   }
   if (ext == "" || ext.length > 10) {
      return { code: 500, data: "El número exterior no puede estar vacío ni pasar de 10 caracteres" }
   }
   if (_int == "" || _int.length > 10) {
      return { code: 500, data: "El número interior no puede estar vacío ni pasar de 10 caracteres" }
   }
   return { code: 201 }

}

const validateRegisterLending = (lapse, amount) => {
   if (amount == "" || parseInt(amount) <= 0) {
      return { code: 500, data: "La cantidad debe ser un numero entero positivo y no puede puede estar vacio" }
   }
   if (lapse == "0") {
      return { code: 500, data: "Seleccione un plazo válido" }
   }
   return { code: 201 }
}

const validatePayment = (amount) => {
   if (amount == "" || parseInt(amount) <= 0) {
      return { code: 500, data: "La cantidad debe ser un numero entero positivo y no puede puede estar vacio" }
   }
   return { code: 201 }
}

const validateRennovation = (days) => {
   if (days == "" || parseInt(days) <= 0) {
      return { code: 500, data: "Los dias a incrementar deben ser positivos y enteros" }
   }
   return { code: 201 }
}

const validateEntry = (amount) => {
   if (amount == "" || parseInt(amount) <= 0) {
      return { code: 500, data: "La cantidad de ingreso debe ser un numero entero positivo y no puede puede estar vacío" }
   }
   return { code: 201 }
}

const validateEgress = (amount) => {
   if (amount == "" || parseInt(amount) <= 0) {
      return { code: 500, data: "La cantidad de egreso debe ser un numero entero positivo y no puede puede estar vacío" }
   }
   return { code: 201 }
}

const validateLapseReport = (lapse) => {
   if (lapse == "7" || lapse == "15" || lapse == "31" || lapse == "62") {
      return { code: 200 }
   } else {
      return { code: 500, data: "Seleccione un lapso válido" }
   }
}

const validateNameReport = (name) => {
   if (name == "0") {
      return { code: 500, data: "Seleccione un archivo válido" }
   } else {
      return { code: 200 }
   }
}

const validateNewEmployee = (name, app, apm, rfc, type) => {
   if (name == "" || name.length > 50) {
      return { code: 500, data: "El nombre del empleado no puede estar vacío ni tener mas de 50 carácteres" }
   }
   if (app == "" || app.length > 50) {
      return { code: 500, data: "El apellido paterno del empleado no puede estar vacío ni tener mas de 50 carácteres" }
   }
   if (apm == "" || apm.length > 50) {
      return { code: 500, data: "El apellido materno del empleado no puede estar vacío ni tener mas de 50 carácteres" }
   }
   if (rfc.length != 13) {
      return { code: 500, data: "El rfc del empleado debe tener 13 carácteres" }
   }
   if (type != "1" && type != "2" && type != "3" && type != "4") {
      return { code: 500, data: "Seleccione un tipo de empleado válido" }
   }
   return { code: 200 }
}

const validateUpdatePassword = (password, confirmPassword) => {

   if (password == "") {
      return { code: 500, data: "La contraseña no puede estar vacía" }
   }
   if (confirmPassword == "") {
      return { code: 500, data: "Vuelva a ingresar la contraseña en confirmar contraseña" }
   }
   if (confirmPassword != password) {
      return { code: 500, data: "Las contraseñas no coinciden" }
   }
   return { code: 200 }
}

export { validateNewClientData, validateLapseReport, validateRegisterLending, validatePayment, validateRennovation, validateEntry, validateEgress, validateNameReport, validateNewEmployee, validateUpdatePassword }