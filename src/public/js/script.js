const login = async (e) => {

    document.body.style.cursor = 'progress'

    let msgInterval

    e.preventDefault()

    let response = await fetch('/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            rfc: encrypt(document.getElementById('rfc').value),
            password: encrypt(document.getElementById('password').value),
            session: document.getElementById('session').checked
        })
    })

    let json = await response.json()

    document.body.style.cursor = 'auto'

    if(json.code != 201) {

        if(document.getElementById('alert')){
            clearTimeout(msgInterval)
            document.body.removeChild(document.getElementById('alert'))
        }

        let alert = document.createElement("div");
        alert.id = 'alert';
        alert.innerHTML = `
            <div class="msg alert alert-danger mb-0 alert-dismissible alert-absolute fade show " id="alert" role="alert" data-mdb-color="secondary">
                ${codes[json.code]}
                <button type="button" class="btn-close ms-2" data-mdb-dismiss="alert" aria-label="Close" onclick="document.body.removeChild(document.getElementById('alert'))"></button>
            </div>
        `
        document.body.appendChild(alert);
        msgInterval = setTimeout(() => {
            document.body.removeChild(document.getElementById('alert'))
        }, 6000)

    }
    else {
        window.location.href = json.data.url
    }
        
}

const registerClientNav = (e, step, direction) => {

    e.preventDefault();
    
    if(direction == 'next'){
        if(step == 1){
            document.getElementById("dataClient").style.display = 'none';
            document.getElementById("dataAddress").style.display = 'block';
            document.getElementById("dataIdentity").style.display = 'none';
            
            document.getElementById("nav-data").classList.add("disabled")
            document.getElementById("nav-dom").classList.remove("disabled")
        }else if(step == 2){
            document.getElementById("dataClient").style.display = 'none';
            document.getElementById("dataAddress").style.display = 'none';
            document.getElementById("dataIdentity").style.display = 'block';
    
            document.getElementById("nav-dom").classList.add("disabled")
            document.getElementById("nav-finish").classList.remove("disabled")
        }
    }else if(direction == 'before'){
        if(step == 1){
            document.getElementById("dataClient").style.display = 'block';
            document.getElementById("dataAddress").style.display = 'none';
            document.getElementById("dataIdentity").style.display = 'none';

            document.getElementById("nav-data").classList.remove("disabled")
            document.getElementById("nav-dom").classList.add("disabled")
        }else if(step == 2){
            document.getElementById("dataClient").style.display = 'none';
            document.getElementById("dataAddress").style.display = 'block';
            document.getElementById("dataIdentity").style.display = 'none';

            document.getElementById("nav-dom").classList.remove("disabled")
            document.getElementById("nav-finish").classList.add("disabled")
        }   
    }

}

const registerClient = async (e)=>{
    
    document.body.style.cursor = 'progress'
    e.preventDefault();

    let response = await fetch('/registerClient', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            name: encrypt(document.getElementById('nameClient').value),
            apat: encrypt(document.getElementById('appClient').value),
            amat: encrypt(document.getElementById('apmClient').value),
            curp: encrypt(document.getElementById('curpClient').value),
            tel: encrypt(document.getElementById('telFijoClient').value),
            cel: encrypt(document.getElementById('telCelClient').value),
            est: encrypt(document.getElementById('stateClient').value),
            mun: encrypt(document.getElementById('muniClient').value),
            col: encrypt(document.getElementById('colClient').value),
            st: encrypt(document.getElementById('streetClient').value),
            cp: encrypt(document.getElementById('cpClient').value),
            ext: encrypt(document.getElementById('noextClient').value),
            _int: encrypt(document.getElementById('nointClient').value),
            client: encrypt(document.getElementById('pictureClient').value),
            cdom: encrypt(document.getElementById('domClient').value),
            ine: encrypt(document.getElementById('ineClient').value)
        })
    })

    let json = await response.json()

    document.body.style.cursor = 'auto'

    if(json.code == 201) {
        alert("Cliente registrado exitosamente")
        location.reload();
    }else{
        alert("Hubo un problema al registrar al cliente, intente mas tarde")
        location.reload();
    }
}

const getClientData = async (curp)=>{

    document.body.style.cursor = 'progress'

    let response = await fetch('/getClient',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            curp: encrypt(curp)
        })
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){

        let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
            keyboard: false
        })
        document.getElementById('nameClientModal').innerHTML = "<b>Nombre completo: </b>" + decrypt(json.data.name) + " " + decrypt(json.data.apat) + " " + decrypt(json.data.amat)
        document.getElementById('curpClientModal').innerHTML = "<b>CURP: </b>" + decrypt(json.data.curp)

        document.getElementById('telClientModal').innerHTML = "<b>Teléfono fijo: </b>" + decrypt(json.data.tel)
        document.getElementById('celClientModal').innerHTML = "<b>Teléfono celular: </b>" + decrypt(json.data.cel)
        document.getElementById('domClientModal').innerHTML = "<b>Domicilio: </b>" + decrypt(json.data.st) + " " + decrypt(json.data.ext) + " int. " + decrypt(json.data._int) + ", Col. " + decrypt(json.data.col) + ", C.P. " + decrypt(json.data.cp) + " " + decrypt(json.data.mun) + ", " + decrypt(json.data.est)  

        document.getElementById('curpClientModalInput').value = decrypt(json.data.curp)

        myModal.show()

    }else{
        alert("Hubo un problema al obtener la informacion del cliente, intente mas tarde")
        location.reload();
    }
    
}

const registerLending = async (e) => {
    
    e.preventDefault()

    document.body.style.cursor = 'progress'
    let response = await fetch('/registerLending',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            curp: encrypt(document.getElementById('curpClientModalInput').value), 
            amount: encrypt(document.getElementById('amountLending').value.toString()),
            comments: encrypt(document.getElementById('commentsLending').value),
            lapse: encrypt(document.getElementById('timeLending').value)
        })
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){
        alert("Prestamo registrado")
    }else if(json.code == 304){
        alert("Prestamo declinado. El cliente ya tiene un préstamo activo")
    }else if(json.code == 401){
        alert("Error interno del servidor, Intentelo de nuevo mas tarde")
    }
    location.reload();

}

const getPayments = async (e, curp, name)=>{

    e.preventDefault()
    document.body.style.cursor = 'progress'
    
    let response = await fetch('/getPayments',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encrypt(curp)
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){

        let myModal = new bootstrap.Modal(document.getElementById('staticBackdropPayments'), {
            keyboard: false
        })
        document.getElementById('staticBackdropLabel').innerHTML = "<b>Pagos de </b>" + name

        let info = document.getElementById('infoPayment')
        info.innerHTML = `
            <p><b>Monto del prestamo: </b>${decrypt(json.data.can_pre)}</p>
            <p><b>Intereses del prestamo: </b>${decrypt(json.data.can_pre)*0.20}</p>
            <p><b>Total a pagar: </b>${decrypt(json.data.can_pre)*1.20}</p>
            <p><b>Pagado: </b>${decrypt(json.data.tot_pay)}</p>
            <p><b>Por pagar: </b>${(decrypt(json.data.can_pre)*1.20) - decrypt(json.data.tot_pay)}</p>
        `

        let body = document.getElementById('paymentsModal')
        let i = 1
        let html = ''
        json.data.lendings.forEach( payment => {
            html += `
                <div class="p-0 col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <div class="card w-100">
                        <div class="card-body">`
                        if(i == 1){
                            html += `<h6 class="text-center">Inicio del préstamo</h6>`
                        }else if(i == json.data.lendings.length){
                            html += `<h6 class="text-center">Fin del préstamo</h6>`
                        }            
                        html += `<h5 class="text-center">${i}</h5>
                            <p>${formateDate(generateDate(decrypt(payment.fec_pag)))}</p>`

            if(generateDate(decrypt(payment.fec_pag)).toDateString() == new Date().toDateString() && decrypt(payment.can_pag) == 0 && i != 1 && i != json.data.lendings.length){
                html += `<button type="button" class="btn" onclick="doPayment('${curp}')" data-bs-target="#doPaymentModal" data-bs-toggle="modal" data-bs-dismiss="modal">Registrar pago</button>`
            }else{
                html += `<p>Cantidad: ${decrypt(payment.can_pag)}</p>`
            }                    
            html += `   </div>
                    </div>
                </div>` 
            i++
        })
        body.innerHTML = html
        document.getElementById('btnRegisterPayment').setAttribute("onclick", "requestPayment(event, '"+curp+"')")

        myModal.show()

    }else{
        alert("Error al cargar la informacion, por favor intente mas tarde")
        location.reload();
    }

}

const requestPayment = async (e, curp)=>{

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/requestPayment',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encrypt(curp),
                amount: encrypt('' + document.getElementById('cant').value)
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){
        alert("Pago registrado")
        location.reload();
    }else{
        alert("No se pudo registrar el pago, intentelo mas tarde")
        location.reload();
    }


}

const registerEntry = async (e) =>{

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/registerEntry',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                amount: encrypt(document.getElementById('entryInput').value) 
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){
        alert("Ingreso registrado exitosamente")
    }else{
        alert("Error al registrar el ingreso, por favor intentelo mas tarde")
    }
    location.reload();

}

const registerEgress = async (e) =>{

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/registerEgress',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                amount: encrypt(document.getElementById('egressInput').value) 
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){
        alert("Egreso registrado exitosamente")
    }else{
        alert("Error al registrar el egreso, por favor intentelo mas tarde")
    }
    location.reload();

}

const getClientDataLending = async (curp) => {

    document.body.style.cursor = 'progress'

    let response = await fetch('/getClientRevision',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encrypt(curp) 
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){

        let myModal = new bootstrap.Modal(document.getElementById('dataLendingClientModal'), {
            keyboard: false
        })
        document.getElementById('nameClientModal').innerHTML = "<b>Nombre completo: </b>" + decrypt(json.data.name) + " " + decrypt(json.data.apat) + " " + decrypt(json.data.amat)
        document.getElementById('curpClientModal').innerHTML = "<b>CURP: </b>" + decrypt(json.data.curp)

        document.getElementById('telClientModal').innerHTML = "<b>Teléfono fijo: </b>" + decrypt(json.data.tel)
        document.getElementById('celClientModal').innerHTML = "<b>Teléfono celular: </b>" + decrypt(json.data.cel)
        document.getElementById('domClientModal').innerHTML = "<b>Domicilio: </b>" + decrypt(json.data.st) + " " + decrypt(json.data.ext) + " int. " + decrypt(json.data._int) + ", Col. " + decrypt(json.data.col) + ", C.P. " + decrypt(json.data.cp) + " " + decrypt(json.data.mun) + ", " + decrypt(json.data.est)  

        document.getElementById('curpClientModalLending').value = decrypt(json.data.curp)

        document.getElementById('amountClientModal').innerHTML = "<b>Monto: </b>" + decrypt(json.data.amount)
        document.getElementById('dateClientModal').innerHTML = "<b>Fecha: </b>" + decrypt(json.data.date)
        document.getElementById('commentsClientModal').innerHTML = "<b>Comentarios adicionales: </b>" + decrypt(json.data.comments)

        myModal.show()

    }else{
        alert("Hubo un problema al obtener la informacion del cliente, intente mas tarde")
        location.reload();
    }
    

}

const responseLending = async (e, accept) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/responseLending',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                accept: accept.toString(), 
                curp: encrypt(document.getElementById('curpClientModalLending').value)
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){
        accept ? alert("Prestamo aceptado exitosamente") : alert("Prestamo declinado exitosamente")
    }else{
        alert("Error en el servidor, por favor intentelo mas tarde")
    }
    location.reload();

}

const generateReport = async (e, save) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/generateReportLendings',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                save: save,
                lapse: encrypt(document.getElementById('lapseReport').value)
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){
        
        let div = document.getElementById('resultReport')
        let html = `
            <table class="table">
                <thead>
                    <th>Cliente</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha de término</th>
                    <th>Monto</th>
                    <th>Cuota</th>
                    <th>Total pagado</th>`
        
        json.data[0].payments.forEach(date => {
            html += `<th>${new Date(date.date).toLocaleDateString()}</th>`
        })                
        
        html += `
                </thead>
            <tbody>
        `;

        json.data.forEach( lending => {
            html += `   <tr>
                            <td>${decrypt(lending.name)}</td>
                            <td>${new Date(lending.fec_pre).toLocaleDateString()}</td>
                            <td>${new Date(lending.tfec_pre).toLocaleDateString()}</td>
                            <td>${lending.can_pre}</td>
                            <td>${lending.can_pre * 0.20}</td>
                            <td>${lending.tot_pag}</td>`
                        lending.payments.forEach( payment => {
                            html += `<td>${payment.can_pag}</td>`
                        })

            html += `   </tr>`
        })
        html += `</tbody>
            </table>`

        document.getElementById('buttonCloseModal').click()
        div.innerHTML = html

    }else{
        alert("Error en el servidor, por favor intentelo mas tarde")
        location.reload();
    }
}

const getReport = async (e) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/getReport',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                file: encrypt(document.getElementById('reportFile').value)
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){

        let div = document.getElementById('resultReport')
        let html = `
            <a class="btn btn-primary btn-lg" onclick="">Descargar .csv</a>
            <button class="btn btn-danger btn-lg" onclick="deleteReport(event, '${document.getElementById('reportFile').value}')">Borrar reporte</button>
            <table class="table">
                <thead>
                    <th>Cliente</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha de término</th>
                    <th>Monto</th>
                    <th>Cuota</th>
                    <th>Total pagado</th>`
        
        json.data[0].payments.forEach(date => {
            html += `<th>${new Date(date.date).toLocaleDateString()}</th>`
        })                
        
        html += `
                </thead>
            <tbody>
        `;

        json.data.forEach( lending => {
            html += `   <tr>
                            <td>${decrypt(lending.name)}</td>
                            <td>${new Date(lending.fec_pre).toLocaleDateString()}</td>
                            <td>${new Date(lending.tfec_pre).toLocaleDateString()}</td>
                            <td>${lending.can_pre}</td>
                            <td>${lending.can_pre * 0.20}</td>
                            <td>${lending.tot_pag}</td>`
                        lending.payments.forEach( payment => {
                            html += `<td>${payment.can_pag}</td>`
                        })

            html += `   </tr>`
        })
        html += `</tbody>
            </table>`

        div.innerHTML = html

    }else{
        alert("Ocurrio un error al cargar la informacion, por favor vuelva a intentarlo mas tarde")
    }

}

const deleteReport = async (e, file) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/deleteReport',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                file: encrypt(file)
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){
        alert("Reporte eliminado exitosamente")
    }else{
        alert("Error al eliminar el reporte, por favor vuelva a intentarlo")
    }
    location.reload();

}

const getState = async (e) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/getAccountStatus',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                lapse: encrypt(document.getElementById('lapseState').value)
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if(json.code == 201){

        let totalIng = 0
        let totalEg = 0
        let div = document.getElementById('infoState')
        let html = `
            <h3 class="text-center mt-5 mb-5"><b>Estado de cuenta de la sucursal: ${json.data.sucursal}</b></h3>
            <h4 class="text-center mt-5 mb-5"><b>Total acumulado: </b>$${json.data.previous}</h4>
            <h4 class="text-center mt-5 mb-3"><b>Ingresos</b></h4>
            <table class="table">
                <thead>
                    <th>Fecha</th>
                    <th>Cantidad</th>
                </thead>
                <tbody>
        `
        json.data.entries.forEach( item => {
            html += `
                <tr>
                    <td>${new Date(item.fec_ing).toLocaleDateString()}</td>
                    <td>$${item.can_ing}</td>
                </tr>
            `
            totalIng += item.can_ing
        })
        html += `
                </tbody>
            </table>
            <h4 class="text-center mt-3 mb-5"><b>Total de ingresos: </b>$${totalIng}</h4>
            <h4 class="text-center mt-5 mb-3"><b>Egresos</b></h4>
            <table class="table">
                <thead>
                    <th>Fecha</th>
                    <th>Cantidad</th>
                </thead>
                <tbody>
        `
        json.data.egress.forEach( item => {
            html += `
                <tr>
                    <td>${new Date(item.fec_egr).toLocaleDateString()}</td>
                    <td>$${item.can_egr}</td>
                </tr>
            `
            totalEg += item.can_egr
        })        
        html += `
                </tbody>
            </table>
            <h4 class="text-center mt-2 mb-5"><b>Total de egresos: </b>$${totalEg}</h4>
            <h3 class="text-center mt-5"><b>Total: $${totalIng - totalEg}</b></h3>
        `
        div.innerHTML = html
    }else{
        alert("Hubo un problema interno, por favor intente mas tarde")
        location.reload();
    }

}

const changeVisibilityPassword = () => {
    if(document.getElementById('password').type  == 'password') {
        document.getElementById('eye-close').style.visibility = 'hidden'
        document.getElementById('eye-open').style.visibility = 'visible'
    
        document.getElementById('eye-close').style.display = 'none'
        document.getElementById('eye-open').style.display = 'inline'
    
        document.getElementById('password').type = 'text'
    }
    else{
        document.getElementById('eye-close').style.visibility = 'visible'
        document.getElementById('eye-open').style.visibility = 'hidden'
    
        document.getElementById('eye-close').style.display = 'inline'
        document.getElementById('eye-open').style.display = 'none'
    
        document.getElementById('password').type = 'password'
    }
}

const generateDate = (info) =>{
    let infoDate = info.split("/")
    let newDate = infoDate[1] + "/" + infoDate[0] + "/" + infoDate[2]
    return new Date(newDate)
}

const formateDate = (date) =>{
    let months = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    return date.getDate() + " / " + months[date.getMonth()] + " / " + date.getFullYear()
}


const encrypt = txt => {
    let cipher = new JSEncrypt()
    cipher.setPublicKey(publicKeyuser) 
    return cipher.encrypt(txt)
}

const decrypt = (txt) =>{
    var cipher = new JSEncrypt()
    cipher.setPrivateKey(privateKeyUser)
    return cipher.decrypt(txt)
}

const privateKeyUser = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA5+FDZnywh94Psvwe8oMKmfBFFXXt7olCxft/NCm5m5Z40qsP
dlfbgqu598k3t9Lbqf+/9SWGnT4pUMylqJXetgL4UIJLvvbm0tqhJ1MGQHDbhlTG
DPiX5LMU6o8nbySqZrhjOgtXnpBKaXGz9ibXHu3BwV0eDgJqxsGU8h1dZCRLL852
fQkZA8uQgyX6LkYuknYFFXMhCu1Z/MP+JrHRdzSNq9/ZNs8AEXfdQB8rszhIcqIb
zQFdV4rtepP1V7jVh8O4T47G42iw3REgduhBqgaYLUtJl43iBPgAMxE+LbNBAIlN
sdXI0+ELg6VPp1O1JhzzYieTLCguZtj1k7HlzQIDAQABAoIBAQC+28x1dBZ9jssP
QLRcWn4EXR8P3gScvYAno619CwcKSJ1kkYZlm0VD1gN5L7db6AQEdkzTBDM8BClP
p1KHY+xvlhw7cDPWmDU/wtK4on7X1czrUaW+kXO8u6Zwtqn3so9Lg2OxKBrTmeKV
zhAZgLi6bWp4tSOC1nx64mWtr3vqauAdjwRICpHn13uy/rYuqxMFxl4tYuW5z0nh
9XffVGe3pcgcVV5SmPpoOHyHeL8LjNvjRGTdUZLqAiQZHpNqFKqu8quZpnFqQhEl
+VjiyPC4mEMyLUA/a02Uq0Stzzk5ujkF7eKsPKaY4Bq1tkHni+935qwPH50SUo/M
X9rgvclFAoGBAPSKXk1WmkNLalR2oNHgf+5XzmfRlSAOGlxR8gtJnlXsXR0UKnmn
rEQ/3h9RX8YMB4Yt3TX82LC++gshMpHy5u8r16gDj3o5f/LgI/XJXxe89QwFVAG6
ktDpU1qGmvzCgXiudG0r1KdGaa+2c9c+yl9RMmCx3tzhfRpERnVvaJxDAoGBAPK/
Ayk+qSQxqkTjUgHEOiTBtlJV63BEb/751c7KxnHRbDhg733KKqi3VoxMCJadE+Xb
PcV2c9/PMHRsDnaWV2iNEnpYCEONpCPw1PgC+W+zRSddIWWxGokwmKrQHgIWQL4G
wLB3qA8R9aKvV7ais33giu/UZWAflo1+YWUj7VyvAoGBAOPDsPvVqs79Aidzamyw
7lcff4chJQV7PUA5rvimdAxRn5SDAODYtFHJLuj6kPrUn3lxZHVxcJ6G8jvFiuV3
WXLw4eeCkXNk9PBRpgy6p5BjldXBbLJDhZWBjPpnHxpHS/IMgzJfvayjn7JifNjB
ihpndUWsxgfzGeOKLhoZT1UjAoGBAOcusUUDjzSQNDfdQsm55yIAdrIdb9eA5iSw
LUb/aVUWfPmIoC1tb4k06jE9bGR8fmnHjiHT+PEqslv+WRvpfJ9u0y0/T8d+SteL
0lfNBV+zHOYrVNYzgDEt3ge3owybwtb3OWYW3zBTC1v/oAqpE0aLpeZYop+UFd71
gK5BNBqzAoGAcvuq2IG3z9VenMewZUZzkuWIRIZ92m9F2dQH91J9ITvgf4y/bvmF
h7MCgFdaIm4e867MihRXNrYa40v3g9SojeDP3Iou50ervBS3/Wrc1MDdxv4HpzLA
E0G7COn7Ojc7IXbmB2jJO/6n+ojlGUpL6el4qEODJ+ASpwYz1tLV3u0=
-----END RSA PRIVATE KEY-----
`

const publicKeyuser = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1mCZSbGSHJgRsQCTUJad
Q6ZC0kWMedOlHOjLuurmeMVYKnKvsAsvgA2JQj88jdK59fUV7RHpaVGGztkd7hzm
EB8uXgk1Tehk9MOAPJVxL3F+VvVLXkST4qHcU42UohWrOlvkc/J5SEl5m0H/+6Kj
jMJacYXZdkvl0gC599BtlpjmehYzY2qgdIew36iMFBY1wIySuk2CRkdTKVUa64lD
5ZBMKBSrGmihsYTtitc7Kv9GeWjiZpvssm1QIYYPLz/HDKhNtDkCmCjKW6ksSO9t
/BeTEJ32tODDTmsFjNmZPJdvx5j7JVboPocm5TJ8bHzyfeyjYNu3JbBjCRwjjaRB
HwIDAQAB
-----END PUBLIC KEY-----
`

const codes = {
    "201": "Inicio de sesión exitoso!",
    "301": "RFC y/o contraseña incorrectos!"
}