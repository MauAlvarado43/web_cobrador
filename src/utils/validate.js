
const validateNewClientData = (name, app, apm, curp, tel, cel)=>{
   if(name == ''){
      return {'message': 'Ingrese el nombre', status: 0}
   }
   if(app == ''){
      return {'message': 'Ingrese el apellido paterno', status: 0}
   }
   if(apm == ''){
      return {'message': 'Ingrese el apellido materno', status: 0}
   }
   if(curp == ''){
      return {'message': 'Ingrese el curp', status: 0}
   }
   if(tel == ''){
      return {'message': 'Ingrese el telefono fijo', status: 0}
   }
   if(cel == ''){
      return {'message': 'Ingrese el telefono celular', status: 0}
   }

}