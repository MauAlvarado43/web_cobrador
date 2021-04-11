const login = async (e) => {

    document.body.style.cursor = 'progress'
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

    if (json.code != 201) {

        let alert = document.getElementById('alert')
        let html = ""
        if (json.code == 400) {
            html = getAlert("danger", "Error interno en el servidor, por favor intentenlo mas tarde")
        } else if (json.code == 301) {
            html = getAlert("danger", "Usuario y/o contraseña incorrectos")
        }
        alert.innerHTML = html
    }
    else {
        window.location.href = json.data.url
    }

}

const registerClientNav = (e, step, direction) => {

    e.preventDefault();

    if (direction == 'next') {
        if (step == 1) {

            let name = document.getElementById("nameClient")
            let apat = document.getElementById("appClient")
            let amat = document.getElementById("apmClient")
            let curp = document.getElementById("curpClient")
            let tel = document.getElementById("telFijoClient")
            let cel = document.getElementById("telCelClient")

            let nameHelp = document.getElementById("nameClientHelp")
            let apatHelp = document.getElementById("appClientHelp")
            let amatHelp = document.getElementById("apmClientHelp")
            let curpHelp = document.getElementById("curpClientHelp")
            let telHelp = document.getElementById("telFijoClientHelp")
            let celHelp = document.getElementById("telCelClientHelp")

            name.classList.remove("border-danger")
            apat.classList.remove("border-danger")
            amat.classList.remove("border-danger")
            curp.classList.remove("border-danger")
            tel.classList.remove("border-danger")
            cel.classList.remove("border-danger")

            nameHelp.innerText = ""
            apatHelp.innerText = ""
            amatHelp.innerText = ""
            curpHelp.innerText = ""
            telHelp.innerText = ""
            celHelp.innerText = ""

            if (name.value == "" || name.value.length > 50) {
                name.classList.add("border-danger")
                nameHelp.innerText = "El nombre del cliente no puede estar vacío ni pasar de 50 caracteres"
                return
            }
            if (apat.value == "" || apat.value.length > 50) {
                apat.classList.add("border-danger")
                apatHelp.innerText = "El apellido paterno del cliente no puede estar vacío ni pasar de 50 caracteres"
                return
            }
            if (amat.value == "" || amat.value.length > 50) {
                amat.classList.add("border-danger")
                amatHelp.innerText = "El apellido materno del cliente no puede estar vacío ni pasar de 50 caracteres"
                return
            }
            if (curp.value.length != 18) {
                curp.classList.add("border-danger")
                curpHelp.innerText = "El curp del cliente debe tener 18 caracteres"
                return
            }
            if (tel.value == "" || tel.value.toString().length > 20) {
                tel.classList.add("border-danger")
                telHelp.innerText = "El télefono del cliente no puede estar vacío ni pasar de 20 caracteres"
                return
            }
            if (cel.value == "" || cel.value.toString().length > 20) {
                cel.classList.add("border-danger")
                celHelp.innerText = "El celular del cliente no puede estar vacío ni pasar de 20 caracteres"
                return
            }

            document.getElementById("dataClient").style.display = 'none';
            document.getElementById("dataAddress").style.display = 'block';
            document.getElementById("dataIdentity").style.display = 'none';

            document.getElementById("nav-data").classList.add("disabled")
            document.getElementById("nav-dom").classList.remove("disabled")

        } else if (step == 2) {

            let state = document.getElementById("stateClient")
            let mun = document.getElementById("muniClient")
            let col = document.getElementById("colClient")
            let street = document.getElementById("streetClient")
            let cp = document.getElementById("cpClient")
            let ext = document.getElementById("noextClient")
            let _int = document.getElementById("nointClient")

            let stateHelp = document.getElementById("stateClientHelp")
            let munHelp = document.getElementById("muniClientHelp")
            let colHelp = document.getElementById("colClientHelp")
            let streetHelp = document.getElementById("streetClientHelp")
            let cpHelp = document.getElementById("cpClientHelp")
            let extHelp = document.getElementById("noextClientHelp")
            let _intHelp = document.getElementById("nointClientHelp")

            state.classList.remove("border-danger")
            mun.classList.remove("border-danger")
            col.classList.remove("border-danger")
            street.classList.remove("border-danger")
            cp.classList.remove("border-danger")
            ext.classList.remove("border-danger")
            _int.classList.remove("border-danger")

            stateHelp.innerText = ""
            munHelp.innerText = ""
            colHelp.innerText = ""
            streetHelp.innerText = ""
            cpHelp.innerText = ""
            extHelp.innerText = ""
            _intHelp.innerText = ""

            if (state.value == "" || state.value.length > 40) {
                state.classList.add("border-danger")
                stateHelp.innerText = "El estado no puede estar vacío ni pasar de 40 caracteres"
                return
            }
            if (mun.value == "" || mun.value.length > 40) {
                mun.classList.add("border-danger")
                munHelp.innerText = "El municipio no puede estar vacío ni pasar de 40 caracteres"
                return
            }
            if (col.value == "" || col.value.length > 40) {
                col.classList.add("border-danger")
                colHelp.innerText = "La colonia no puede estar vacía ni pasar de 40 caracteres"
                return
            }
            if (street.value == "" || street.value.length > 40) {
                street.classList.add("border-danger")
                streetHelp.innerText = "La calle no puede estar vacía ni pasar de 40 caracteres"
                return
            }
            if (cp.value == "" || cp.value.length > 10) {
                cp.classList.add("border-danger")
                cpHelp.innerText = "El código postal no puede estar vacío ni pasar de 10 caracteres"
                return
            }
            if (ext.value == "" || ext.value.toString().length > 10) {
                ext.classList.add("border-danger")
                extHelp.innerText = "El número exterior no puede estar vacío ni pasar de 10 caracteres"
                return
            }
            if (_int.value == "" || _int.value.toString().length > 10) {
                _int.classList.add("border-danger")
                _intHelp.innerText = "El número interior no puede estar vacío ni pasar de 10 caracteres"
                return
            }

            document.getElementById("dataClient").style.display = 'none';
            document.getElementById("dataAddress").style.display = 'none';
            document.getElementById("dataIdentity").style.display = 'block';

            document.getElementById("nav-dom").classList.add("disabled")
            document.getElementById("nav-finish").classList.remove("disabled")
        }
    } else if (direction == 'before') {
        if (step == 1) {
            document.getElementById("dataClient").style.display = 'block';
            document.getElementById("dataAddress").style.display = 'none';
            document.getElementById("dataIdentity").style.display = 'none';

            document.getElementById("nav-data").classList.remove("disabled")
            document.getElementById("nav-dom").classList.add("disabled")
        } else if (step == 2) {
            document.getElementById("dataClient").style.display = 'none';
            document.getElementById("dataAddress").style.display = 'block';
            document.getElementById("dataIdentity").style.display = 'none';

            document.getElementById("nav-dom").classList.remove("disabled")
            document.getElementById("nav-finish").classList.add("disabled")
        }
    }

}

const registerClient = async (e) => {

    e.preventDefault();

    let profile = document.getElementById("pictureClient")
    let dom = document.getElementById("domClient")
    let ine = document.getElementById("ineClient")

    let profileHelp = document.getElementById("pictureClientHelp")
    let domHelp = document.getElementById("domClientHelp")
    let ineHelp = document.getElementById("ineClientHelp")

    profile.classList.remove("border-danger")
    dom.classList.remove("border-danger")
    ine.classList.remove("border-danger")

    profileHelp.innerText = ""
    domHelp.innerText = ""
    ineHelp.innerText = ""

    if(profile.value == ""){
        profile.classList.remove("border-danger")
        profileHelp.innerText = "Seleccione una imagen png para la foto del cliente"
        return
    }
    if(dom.value == ""){
        dom.classList.remove("border-danger")
        domHelp.innerText = "Seleccione una imagen png para la foto del comprobante de domicilio del cliente"
        return        
    }
    if(ine.value == ""){
        ine.classList.remove("border-danger")
        ineHelp.innerText = "Seleccione una imagen png para el ine del cliente"
        return        
    }

    let bytesImage = await toBase64(profile.files[0])
    let bytesDom = await toBase64(dom.files[0])
    let bytesIne = await toBase64(ine.files[0])

    document.body.style.cursor = 'progress'
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
            client: bytesImage,
            cdom: bytesDom,
            ine: bytesIne
        })
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    let alert = document.getElementById('alert')

    if (json.code == 201) {
        alert.innerHTML = getAlert("success", "Cliente registrado exitosamente")
        window.setTimeout(function () {
            location.reload()
        }, 3500)
    } else if (json.code == 500) {
        alert.innerHTML = getAlert("danger", json.data)
    } else if (json.code == 401) {
        alert.innerHTML = getAlert("danger", "Error interno del servidor, por favor vuelva a intentarlo")
    } else if (json.code == 307) {
        alert.innerHTML = getAlert("danger", "Imagenes erroneas, por favor intente con otras")
    } else {
        alert.innerHTML = getAlert("danger", "Error en los datos de entrada, por favor cierre sesión y vuelva a intentarlo")
    }
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

const getClientData = async (curp) => {

    document.body.style.cursor = 'progress'

    let response = await fetch('/getClient', {
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

    if (json.code == 201) {

        let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
            keyboard: false
        })
        document.getElementById('nameClientModal').innerHTML = "<b>Nombre completo: </b>" + decrypt(json.data.name) + " " + decrypt(json.data.apat) + " " + decrypt(json.data.amat)
        document.getElementById('curpClientModal').innerHTML = "<b>CURP: </b>" + decrypt(json.data.curp)

        document.getElementById('telClientModal').innerHTML = "<b>Teléfono fijo: </b>" + decrypt(json.data.tel)
        document.getElementById('celClientModal').innerHTML = "<b>Teléfono celular: </b>" + decrypt(json.data.cel)
        document.getElementById('domClientModal').innerHTML = "<b>Domicilio: </b>" + decrypt(json.data.st) + " " + decrypt(json.data.ext) + " int. " + decrypt(json.data._int) + ", Col. " + decrypt(json.data.col) + ", C.P. " + decrypt(json.data.cp) + " " + decrypt(json.data.mun) + ", " + decrypt(json.data.est)

        document.getElementById('curpClientModalInput').value = json.data.curpEncrypt

        document.getElementById('fotClientModal').innerHTML = `<img src="${decrypt(json.data.fot)}" alt="Foto de perfil del cliente">`
        document.getElementById('ineClientModal').innerHTML = `<img src="${decrypt(json.data.ine)}" alt="Foto del INE del cliente">`
        document.getElementById('fotDomClientModal').innerHTML = `<img src="${decrypt(json.data.cdom)}" alt="Foto del comprobante de domicilio del cliente">`

        myModal.show()

    } else {
        document.getElementById('alertMain').innerHTML = getAlert("danger", "Hubo un problema al obtener la informacion del cliente, intente mas tarde")
    }

}

const registerLending = async (e) => {

    e.preventDefault()
    document.getElementById('amountLending').classList.remove("border")
    document.getElementById('amountLending').classList.remove("border-danger")
    document.getElementById('timeLending').classList.remove("border")
    document.getElementById('timeLending').classList.remove("border-danger")
    document.getElementById('amountLendingHelp').innerText = ""
    document.getElementById('timeLendingHelp').innerText = ""

    if (document.getElementById('amountLending').value.toString() == "" || document.getElementById('amountLending').value <= 0) {
        document.getElementById('amountLending').classList.add("border")
        document.getElementById('amountLending').classList.add("border-danger")
        document.getElementById('amountLendingHelp').innerText = "La cantidad debe ser un numero entero positivo y no puede puede estar vacio"
        return
    }
    if (document.getElementById('timeLending').value == "0") {
        document.getElementById('timeLending').classList.add("border")
        document.getElementById('timeLending').classList.add("border-danger")
        document.getElementById('timeLendingHelp').innerText = "Seleccione un plazo válido"
        return
    }

    document.body.style.cursor = 'progress'
    let response = await fetch('/registerLending', {
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

    let alert = document.getElementById('alert')

    if (json.code == 201) {
        alert.innerHTML = getAlert("success", "Préstamo registrado exitosamente")
        window.setTimeout(function () {
            location.reload()
        }, 3500)
    } else if (json.code == 304) {
        alert.innerHTML = getAlert("warning", "Prestamo declinado. El cliente ya tiene un préstamo activo")
    } else if (json.code == 401) {
        alert.innerHTML = getAlert("danger", "Error interno del servidor, Intentelo de nuevo mas tarde")
    } else if (json.code == 500) {
        alert.innerHTML = getAlert("danger", json.data)
    }
}

const queryClient = async (e) => {

    e.preventDefault()
    let response = await fetch('/queryClient', {
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
            wildcard: encrypt(document.getElementById('searchClient').value)
        })
    })
    let json = await response.json()
    let tbody = document.getElementById('tbodyClients')
    tbody.innerHTML = ""
    let html = ``
    let i = 1
    json.forEach(item => {
        html += `
            <tr>
                <td>${i}</td>
                <td>${item.name + " " + item.apat + " " + item.amat}</td>
                <td><i class="bi bi-plus-square-fill"
                        onclick="getClientData('${item.curp}')"
                        style="color: black; font-size: 30px; cursor: pointer;"></i></td>
            </tr>
        `
        i++
    })
    tbody.innerHTML = html
}

const getPayments = async (e, curp, name) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/getPayments', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
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

    if (json.code == 201) {

        let myModal = new bootstrap.Modal(document.getElementById('staticBackdropPayments'), {
            keyboard: false
        })
        document.getElementById('staticBackdropLabel').innerHTML = "<b>Pagos de </b>" + name

        let info = document.getElementById('infoPayment')
        info.innerHTML = `
            <p><b>Monto del prestamo: </b>${decrypt(json.data.can_pre)}</p>
            <p><b>Intereses del prestamo: </b>${decrypt(json.data.can_pre) * 0.20}</p>
            <p><b>Total a pagar: </b>${decrypt(json.data.can_pre) * 1.20}</p>
            <p><b>Pagado: </b>${decrypt(json.data.tot_pay)}</p>
            <p><b>Por pagar: </b>${(decrypt(json.data.can_pre) * 1.20) - decrypt(json.data.tot_pay)}</p>
        `

        let body = document.getElementById('paymentsModal')
        let i = 1
        let html = ''
        json.data.lendings.forEach(payment => {
            html += `
                <div class="p-0 col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <div class="card w-100">
                        <div class="card-body">`
            if (i == 1) {
                html += `<h6 class="text-center">Inicio del préstamo</h6>`
            } else if (i == json.data.lendings.length) {
                html += `<h6 class="text-center">Fin del préstamo</h6>`
            }
            html += `<h5 class="text-center">${i}</h5>
                            <p>${formateDate(generateDate(decrypt(payment.fec_pag)))}</p>`

            if (generateDate(decrypt(payment.fec_pag)).toDateString() == new Date().toDateString() && decrypt(payment.can_pag) == 0 && i != 1 && i != json.data.lendings.length) {
                html += `<button type="button" class="btn" onclick="doPayment('${curp}')" data-bs-target="#doPaymentModal" data-bs-toggle="modal" data-bs-dismiss="modal">Registrar pago</button>`
            } else {
                html += `<p>Cantidad: ${decrypt(payment.can_pag)}</p>`
            }
            html += `   </div>
                    </div>
                </div>`
            i++
        })
        body.innerHTML = html
        document.getElementById('btnRegisterPayment').setAttribute("onclick", "requestPayment(event, '" + curp + "')")

        myModal.show()

    } else {
        document.getElementById('alertMain').innerHTML = getAlert("danger", "Error al cargar la informacion, por favor intente mas tarde")
    }

}

const requestPayment = async (e, curp) => {

    e.preventDefault()
    document.getElementById('cant').classList.remove("border")
    document.getElementById('cant').classList.remove("border-danger")
    document.getElementById('cantHelp').innerText = ""

    if (document.getElementById('cant').value.toString() == "" || document.getElementById('cant').value <= 0) {
        document.getElementById('cant').classList.add("border")
        document.getElementById('cant').classList.add("border-danger")
        document.getElementById('cantHelp').innerText = "La cantidad debe ser un numero entero positivo y no puede puede estar vacio"
        return
    }

    document.body.style.cursor = 'progress'
    let response = await fetch('/requestPayment', {
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
                amount: encrypt(document.getElementById('cant').value.toString())
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    let alert = document.getElementById('alert')

    if (json.code == 201) {
        alert.innerHTML = getAlert("success", "Pago registrado exitosamente")
        window.setTimeout(function () {
            location.reload()
        }, 3500)
    } else if (json.code == 401) {
        alert.innerHTML = getAlert("danger", "Error interno del servidor, Intentelo de nuevo mas tarde")
    } else if (json.code == 500) {
        alert.innerHTML = getAlert("danger", json.data)
    } else {
        alert.innerHTML = getAlert("danger", "Error en los datos de entrada, por favor cierre sesión y vuelva a intentarlo la página")
    }


}

const registerEntry = async (e) => {

    e.preventDefault()

    document.getElementById('entryInput').classList.remove("border-danger")
    document.getElementById('entryInputHelp').innerText = ""

    if (document.getElementById('entryInput').value.toString() == "" || document.getElementById('entryInput').value <= 0) {
        document.getElementById('entryInput').classList.add("border-danger")
        document.getElementById('entryInputHelp').innerText = "La cantidad de ingreso debe ser un numero entero positivo y no puede puede estar vacío"
        return
    }

    document.body.style.cursor = 'progress'

    let response = await fetch('/registerEntry', {
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

    let alert = document.getElementById("alertEntry")

    if (json.code == 201) {
        alert.innerHTML = getAlert("success", "Ingreso registrado exitosamente")
        window.setTimeout(function () {
            location.reload()
        }, 3500)
    } else if (json.code == 500) {
        alert.innerHTML = getAlert("danger", json.data)
    } else if (json.code == 401) {
        alert.innerHTML = getAlert("danger", "Error interno del servidor, Intentelo de nuevo mas tarde")
    } else {
        alert.innerHTML = getAlert("danger", "Error en los datos de entrada, por favor cierre sesión y vuelva a intentarlo la página")
    }

}

const registerEgress = async (e) => {

    e.preventDefault()

    document.getElementById('egressInput').classList.remove("border-danger")
    document.getElementById('egressInputHelp').innerText = ""

    if (document.getElementById('egressInput').value.toString() == "" || document.getElementById('egressInput').value <= 0) {
        document.getElementById('egressInput').classList.add("border-danger")
        document.getElementById('egressInputHelp').innerText = "La cantidad de ingreso debe ser un numero entero positivo y no puede puede estar vacío"
        return
    }

    document.body.style.cursor = 'progress'

    let response = await fetch('/registerEgress', {
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

    let alert = document.getElementById("alertEgress")

    if (json.code == 201) {
        alert.innerHTML = getAlert("success", "Egreso registrado exitosamente")
        window.setTimeout(function () {
            location.reload()
        }, 3500)
    } else if (json.code == 500) {
        alert.innerHTML = getAlert("danger", json.data)
    } else if (json.code == 401) {
        alert.innerHTML = getAlert("danger", "Error interno del servidor, Intentelo de nuevo mas tarde")
    } else {
        alert.innerHTML = getAlert("danger", "Error en los datos de entrada, por favor cierre sesión y vuelva a intentarlo la página")
    }

}

const getClientDataLending = async (curp) => {

    document.body.style.cursor = 'progress'

    let response = await fetch('/getClientRevision', {
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

    if (json.code == 201) {

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

        document.getElementById('fotClientModal').innerHTML = `<img src="${decrypt(json.data.fot)}" alt="Foto de perfil del cliente">`
        document.getElementById('ineClientModal').innerHTML = `<img src="${decrypt(json.data.ine)}" alt="Foto del INE del cliente">`
        document.getElementById('fotDomClientModal').innerHTML = `<img src="${decrypt(json.data.cdom)}" alt="Foto del comprobante de domicilio del cliente">`

        myModal.show()

    } else {
        document.getElementById('alertMain').innerHTML = getAlert("danger", "Hubo un problema al obtener la informacion del cliente, intente mas tarde")
    }


}

const getClientLending = async (e, curp) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/getClientLending', {
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
                curp: curp
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    if (json.code == 201) {

        document.getElementById('nameClientRenovationModal').innerHTML = "<b>Nombre completo: </b>" + decrypt(json.data.name) + " " + decrypt(json.data.apat) + " " + decrypt(json.data.amat)
        document.getElementById('curpClientRenovationModal').innerHTML = "<b>CURP: </b>" + decrypt(json.data.curp)

        document.getElementById('telClientRenovationModal').innerHTML = "<b>Teléfono fijo: </b>" + decrypt(json.data.tel)
        document.getElementById('celClientRenovationModal').innerHTML = "<b>Teléfono celular: </b>" + decrypt(json.data.cel)
        document.getElementById('domClientRenovationModal').innerHTML = "<b>Domicilio: </b>" + decrypt(json.data.st) + " " + decrypt(json.data.ext) + " int. " + decrypt(json.data._int) + ", Col. " + decrypt(json.data.col) + ", C.P. " + decrypt(json.data.cp) + " " + decrypt(json.data.mun) + ", " + decrypt(json.data.est)

        document.getElementById('curpClientRenovationModalInput').value = decrypt(json.data.curp)


        document.getElementById('fotClientRenovationModal').innerHTML = `<img src="${decrypt(json.data.fot)}" alt="Foto de perfil del cliente">`
        document.getElementById('ineClientRenovationModal').innerHTML = `<img src="${decrypt(json.data.ine)}" alt="Foto del INE del cliente">`
        document.getElementById('fotDomClientRenovationModal').innerHTML = `<img src="${decrypt(json.data.cdom)}" alt="Foto del comprobante de domicilio del cliente">`

        document.getElementById('amountClientRenovationModal').innerHTML = "<b>Monto: </b>" + decrypt(json.data.amount)
        document.getElementById('interestsClientRenovationModal').innerHTML = "<b>Intereses: </b>" + parseInt(decrypt(json.data.amount)) * 0.20
        document.getElementById('dateClientRenovationModal').innerHTML = "<b>Fecha: </b>" + decrypt(json.data.date)
        document.getElementById('commentsClientRenovationModal').innerHTML = "<b>Comentarios adicionales: </b>" + decrypt(json.data.comments)

        document.getElementById('buttonOpenModalRenovation').click()

    } else {
        document.getElementById('alertMain').innerHTML = getAlert("danger", "Hubo un problema al obtener la informacion del cliente, intente mas tarde")
    }

}

const requestIncreaseDate = async (e) => {

    e.preventDefault()

    document.getElementById('increaseDays').classList.remove("border")
    document.getElementById('increaseDays').classList.remove("border-danger")
    document.getElementById('increaseDaysHelp').innerText = ""

    if (document.getElementById('increaseDays').value.toString() == "" || document.getElementById('increaseDays').value <= 0) {
        document.getElementById('increaseDays').classList.add("border")
        document.getElementById('increaseDays').classList.add("border-danger")
        document.getElementById('increaseDaysHelp').innerText = "Los dias a incrementar deben ser positivos y enteros"
        return
    }

    document.body.style.cursor = 'progress'

    let response = await fetch('/requestIncreaseDate', {
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
                curp: encrypt(document.getElementById('curpClientRenovationModalInput').value),
                days: encrypt(document.getElementById('increaseDays').value.toString()),
                reason: encrypt(document.getElementById('reasonRenovation').value)
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    let alert = document.getElementById('alert')

    if (json.code == 201) {
        alert.innerHTML = getAlert("success", "Solicitud de renovación registrada con éxito")
        window.setTimeout(function () {
            location.reload()
        }, 3500)
    } else if (json.code == 401) {
        alert.innerHTML = getAlert("danger", "Error interno del servidor, por favor cierre sesión y vuelva a intentarlo")
    } else if (json.code == 500) {
        alert.innerHTML = getAlert("danger", json.data)
    } else {
        alert.innerHTML = getAlert("danger", "Error en los datos, por favor cierre sesión y vuelva a intentarlo")
    }

}

const getClientLendingRennovation = async (e, curp) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/getClientLendingRennovation', {
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

    if (json.code == 201) {

        document.getElementById('nameClientRenovationModal').innerHTML = "<b>Nombre completo: </b>" + decrypt(json.data.name) + " " + decrypt(json.data.apat) + " " + decrypt(json.data.amat)
        document.getElementById('curpClientRenovationModal').innerHTML = "<b>CURP: </b>" + decrypt(json.data.curp)

        document.getElementById('telClientRenovationModal').innerHTML = "<b>Teléfono fijo: </b>" + decrypt(json.data.tel)
        document.getElementById('celClientRenovationModal').innerHTML = "<b>Teléfono celular: </b>" + decrypt(json.data.cel)
        document.getElementById('domClientRenovationModal').innerHTML = "<b>Domicilio: </b>" + decrypt(json.data.st) + " " + decrypt(json.data.ext) + " int. " + decrypt(json.data._int) + ", Col. " + decrypt(json.data.col) + ", C.P. " + decrypt(json.data.cp) + " " + decrypt(json.data.mun) + ", " + decrypt(json.data.est)

        document.getElementById('curpClientRenovationModalInput').value = decrypt(json.data.curp)


        document.getElementById('fotClientRenovationModal').innerHTML = `<img src="${decrypt(json.data.fot)}" alt="Foto de perfil del cliente">`
        document.getElementById('ineClientRenovationModal').innerHTML = `<img src="${decrypt(json.data.ine)}" alt="Foto del INE del cliente">`
        document.getElementById('fotDomClientRenovationModal').innerHTML = `<img src="${decrypt(json.data.cdom)}" alt="Foto del comprobante de domicilio del cliente">`

        document.getElementById('amountClientRenovationModal').innerHTML = "<b>Monto: </b>" + decrypt(json.data.amount)
        document.getElementById('interestsClientRenovationModal').innerHTML = "<b>Intereses: </b>" + parseInt(decrypt(json.data.amount)) * 0.20
        document.getElementById('dateClientRenovationModal').innerHTML = "<b>Fecha: </b>" + decrypt(json.data.date)
        document.getElementById('commentsClientRenovationModal').innerHTML = "<b>Comentarios adicionales: </b>" + decrypt(json.data.comments)

        document.getElementById('typeRenovationClient').innerHTML = "<b>Tipo de renovación: </b>" + (decrypt(json.data.tre_pre) == "0" ? "Rennovación de crédito" : "Aumento de lapso")
        if (decrypt(json.data.tre_pre) != "4") {
            document.getElementById('daysIncreaseClient').innerHTML = "<b>Días a aumentar: </b>" + decrypt(json.data.tre_pre)
        }
        document.getElementById('reasonRenovationClient').innerHTML = "<b>Motivos: </b>" + decrypt(json.data.mre_pre)

        document.getElementById('buttonOpenModalRenovation').click()

    } else {
        document.getElementById('alertMain').innerHTML = getAlert("danger", "Hubo un problema al obtener la informacion del cliente, intente mas tarde")
    }

}

const responseRennovation = async (e, resp) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/responseRennovation', {
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
                curp: encrypt(document.getElementById("curpClientRenovationModalInput").value),
                response: resp
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    let alert = document.getElementById('alertManager')

    if (json.code == 201) {
        alert.innerHTML = getAlert("success", "Repuesta registrada")
        window.setTimeout(function () {
            location.reload()
        }, 3500)
    } else if (json.code == 401) {
        alert.innerHTML = getAlert("danger", "Error interno en el servidor, por favor vuelvaa intentarlo")
    } else {
        alert.innerHTML = getAlert("danger", "Error en los datos de entrada, por favor cierre sesión y vuelva a intentarlos")
    }

}

const responseLending = async (e, accept) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/responseLending', {
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

    let alert = document.getElementById("alert")

    if (json.code == 201) {
        if (accept)
            alert.innerHTML = getAlert("success", "Prestamo aceptado exitosamente")
        else
            alert.innerHTML = getAlert("success", "Prestamo declinado exitosamente")
        
        window.setTimeout(function () {
            location.reload()
        }, 3500)
    } else if (json.code == 401) {
        alert.innerHTML = getAlert("danger", "Error interno en el servidor, por favor vuelvaa intentarlo")
    } else {
        alert.innerHTML = getAlert("danger", "Error en los datos de entrada, por favor cierre sesión y vuelva a intentarlos")
    }


}

const generateReport = async (e, save) => {

    e.preventDefault()

    document.getElementById('lapseReport').classList.remove("border-danger")
    document.getElementById('lapseReportHelp').innerText = ""

    if(document.getElementById('lapseReport').value == "0"){
        document.getElementById('lapseReport').classList.add("border-danger")
        document.getElementById('lapseReportHelp').innerText = "Seleccione un plazo válido"
        return
    }

    document.body.style.cursor = 'progress'

    let response = await fetch('/generateReportLendings', {
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

    let alert = document.getElementById('alert')
    
    if (json.code == 201) {

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

        json.data.forEach(lending => {
            html += `   <tr>
                            <td>${decrypt(lending.name)}</td>
                            <td>${new Date(lending.fec_pre).toLocaleDateString()}</td>
                            <td>${new Date(lending.tfec_pre).toLocaleDateString()}</td>
                            <td>${lending.can_pre}</td>
                            <td>${lending.can_pre * 0.20}</td>
                            <td>${lending.tot_pag}</td>`
            lending.payments.forEach(payment => {
                html += `<td>${payment.can_pag}</td>`
            })

            html += `   </tr>`
        })
        html += `</tbody>
            </table>`

        document.getElementById('buttonCloseModal').click()
        div.innerHTML = html

    } else if(json.code == 500){
        alert.innerHTML = getAlert("danger", json.data)
    } else if(json.code == 401){
        alert.innerHTML = getAlert("danger", "Error en el servidor, por favor intentelo mas tarde")
    } else {
        alert.innerHTML = getAlert("danger", "Datos incorrectos, por favor cierre sesión y vuelva a intentarlo")
    }
}

const getReport = async (e) => {

    e.preventDefault()
    
    document.getElementById("reportFile").classList.remove('border-danger')
    document.getElementById("lapseReportHelp").innerHTML = ""

    if(document.getElementById("reportFile").value == "0"){
        document.getElementById("reportFile").classList.add('border-danger')
        document.getElementById("lapseReportHelp").innerHTML = "Seleccione un archivo válido"
        return
    }

    document.body.style.cursor = 'progress'
    let response = await fetch('/getReport', {
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

    let alert = document.getElementById('alert')

    if (json.code == 201) {

        let div = document.getElementById('resultReport')

        let url = await fetch('/getUrlDownload', {
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

        let downloadUrl = await url.json()

        let html = `
            <a class="btn btn-primary btn-lg" href="${downloadUrl.data}">Descargar .csv</a>
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

        json.data.forEach(lending => {
            html += `   <tr>
                            <td>${decrypt(lending.name)}</td>
                            <td>${new Date(lending.fec_pre).toLocaleDateString()}</td>
                            <td>${new Date(lending.tfec_pre).toLocaleDateString()}</td>
                            <td>${lending.can_pre}</td>
                            <td>${lending.can_pre * 0.20}</td>
                            <td>${lending.tot_pag}</td>`
            lending.payments.forEach(payment => {
                html += `<td>${payment.can_pag}</td>`
            })

            html += `   </tr>`
        })
        html += `</tbody>
            </table>`

        div.innerHTML = html

    } else if (json.code == 500){
        alert.innerHTML = getAlert("danger", json.data)
    } else {
        alert.innerHTML = getAlert("danger", "Ocurrio un error al cargar la informacion, por favor vuelva a intentarlo mas tarde")
    }
}

const randomAssigned = async (e) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/randomAssigned', {
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
            {}
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    let alert = document.getElementById("alert")
    if(json.code == 201){
        alert.innerHTML = getAlert("success", "Asignación realizada con éxito")
        window.setTimeout(function(){
            location.reload()
        }, 3500)
    }else if(json.code == 401){
        alert.innerHTML = getAlert("danger", "Error interno en el servidor, por favor intentelo mas tarde")
    }else{
        alert.innerHTML = getAlert("danger", "Error en los datos de entrada, por favor cierre sesión y vuelva a intentarlo")
    }


}

const deleteReport = async (e, file) => {

    e.preventDefault()
    document.body.style.cursor = 'progress'

    let response = await fetch('/deleteReport', {
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

    if (json.code == 201) {
        alert("Reporte eliminado exitosamente")
    } else {
        alert("Error al eliminar el reporte, por favor vuelva a intentarlo")
    }
    location.reload();

}

const getState = async (e) => {

    e.preventDefault()

    let lapse = document.getElementById("lapseState")
    lapse.classList.remove("border-danger")
    document.getElementById("lapseStateHelp").innerHTML = ""

    if(lapse.value != "7" && lapse.value != "15" && lapse.value != "31" && lapse.value != "62"){
        lapse.classList.add("border-danger")
        document.getElementById("lapseStateHelp").innerHTML = "Seleccione un plazo válido"
        return
    }

    document.body.style.cursor = 'progress'

    let response = await fetch('/getAccountStatus', {
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

    let alert = document.getElementById("alert")

    if (json.code == 201) {

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
        json.data.entries.forEach(item => {
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
        json.data.egress.forEach(item => {
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
    } else if(json.code == 500){
        alert.innerHTML = getAlert("danger", json.data)
    } else {
        alert.innerHTML = getAlert("danger", "Hubo un problema interno, por favor intente mas tarde")
    }

}

const registerEmployee = async (e) => {

    e.preventDefault()

    let name = document.getElementById("nameEmp")
    let app = document.getElementById("appEmp")
    let apm = document.getElementById("apmEmp")
    let rfc = document.getElementById("rfcEmp")
    let type = document.getElementById("typeEmp")

    let nameHelp = document.getElementById("nameEmpHelp")
    let appHelp = document.getElementById("appEmpHelp")
    let apmHelp = document.getElementById("apmEmpHelp")
    let rfcHelp = document.getElementById("rfcEmpHelp")
    let typeHelp = document.getElementById("typeEmpHelp")

    name.classList.remove("border-danger")
    app.classList.remove("border-danger")
    apm.classList.remove("border-danger")
    rfc.classList.remove("border-danger")
    type.classList.remove("border-danger")

    nameHelp.innerHTML = ""
    appHelp.innerHTML = ""
    apmHelp.innerHTML = ""
    rfcHelp.innerHTML = ""
    typeHelp.innerHTML = ""

    if(name.value == "" || name.value.length > 50){
        name.classList.add("border-danger")
        nameHelp.innerHTML = "El nombre del empleado no puede estar vacío ni tener mas de 50 carácteres"
        return
    }
    if(app.value == "" || app.value.length > 50){
        app.classList.add("border-danger")
        appHelp.innerHTML = "El apellido paterno del empleado no puede estar vacío ni tener mas de 50 carácteres"
        return
    }
    if(apm.value == "" || apm.value.length > 50){
        apm.classList.add("border-danger")
        apmHelp.innerHTML = "El apellido materno del empleado no puede estar vacío ni tener mas de 50 carácteres"
        return
    }
    if(rfc.value.length != 13){
        rfc.classList.add("border-danger")
        rfcHelp.innerHTML = "El rfc del empleado debe tener 13 carácteres"
        return
    }
    if(type.value != "1" && type.value != "2" && type.value != "3" && type.value != "4"){
        type.classList.add("border-danger")
        typeHelp.innerHTML = "Seleccione un tipo de empleado válido"
        return
    }

    document.body.style.cursor = 'progress'
    let response = await fetch('/registerEmployee', {
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
                name: encrypt(name.value),
                app: encrypt(app.value),
                apm: encrypt(apm.value),
                rfc: encrypt(rfc.value),
                type: encrypt(type.value)
            }
        )
    })

    let json = await response.json()
    document.body.style.cursor = 'auto'

    let alert = document.getElementById("alert")

    if(json.code == 201){
        alert.innerHTML = getAlert("success", "Nuevo empleado registrado exitosamente")
        window.setTimeout(function () {
            location.reload()
        }, 3500)
    }else if(json.code == 500){
        alert.innerHTML = getAlert("danger", json.data)
    }else if(json.code == 401){
        alert.innerHTML = getAlert("danger", "Hubo un problema interno, por favor intente mas tarde")
    }else{
        alert.innerHTML = getAlert("danger", "Datos de entrada incorrectos, por favor cierre sesión y vuelva a intentar")
    }

}

const changeVisibilityPassword = () => {
    if (document.getElementById('password').type == 'password') {
        document.getElementById('eye-close').style.visibility = 'hidden'
        document.getElementById('eye-open').style.visibility = 'visible'

        document.getElementById('eye-close').style.display = 'none'
        document.getElementById('eye-open').style.display = 'inline'

        document.getElementById('password').type = 'text'
    }
    else {
        document.getElementById('eye-close').style.visibility = 'visible'
        document.getElementById('eye-open').style.visibility = 'hidden'

        document.getElementById('eye-close').style.display = 'inline'
        document.getElementById('eye-open').style.display = 'none'

        document.getElementById('password').type = 'password'
    }
}

const generateDate = (info) => {
    let infoDate = info.split("/")
    let newDate = infoDate[1] + "/" + infoDate[0] + "/" + infoDate[2]
    return new Date(newDate)
}

const formateDate = (date) => {
    let months = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    return date.getDate() + " / " + months[date.getMonth()] + " / " + date.getFullYear()
}

const getAlert = (type, message) => {
    return `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <h6 class="text-center">${message}</h6>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
}

const encrypt = txt => {
    let cipher = new JSEncrypt()
    cipher.setPublicKey(publicKeyuser)
    return cipher.encrypt(txt)
}

const decrypt = (txt) => {
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