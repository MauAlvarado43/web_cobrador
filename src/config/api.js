import fetch from 'node-fetch'
import { encryptAPI, decryptSession } from '../utils/cipher'

const URL = process.env.URL

const registerClient = async (password, rfc, id, type, token, name, apat, amat, curp, tel, cel, est, mun, col, st, cp, ext, _int, client, cdom, ine) => {

    let response = await fetch(URL + '/registerClient', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'password': encryptAPI(password),
            'rfc': encryptAPI(rfc),
            'id': encryptAPI(id),
            'type': encryptAPI(type),
            'token': encryptAPI(token)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                name: encryptAPI(name),
                apat: encryptAPI(apat),
                amat: encryptAPI(amat),
                curp: encryptAPI(curp),
                tel: encryptAPI(tel),
                cel: encryptAPI(cel),
                est: encryptAPI(est),
                mun: encryptAPI(mun),
                col: encryptAPI(col),
                st: encryptAPI(st),
                cp: encryptAPI(cp),
                ext: encryptAPI(ext),
                int: encryptAPI(_int),
                client: encryptAPI(client),
                cdom: encryptAPI(cdom),
                ine: encryptAPI(ine)
            }
        )
    })

    let json = await response.json()
    return json

}

const loginUser = async (rfc, password) => {

    let response = await fetch(URL + '/loginUser', {
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
                rfc: encryptAPI(rfc),
                password: encryptAPI(password)
            }
        )
    })

    let json = await response.json()
    return json

}

const getClients = async (SSID) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getClients', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                typeRequest: encryptAPI('1')
            }
        )
    })

    let json = await response.json()

    return json

}

const getClient = async (SSID, curp)=>{

    let session = JSON.parse(decryptSession(SSID))
    
    let response =  await fetch(URL + '/getClient', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encryptAPI(curp)
            }
        )
    }) 

    let json = await response.json()
    return json

}

const requestLending = async (SSID, curp, amount, comments, lapse) => {
    
    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/requestLending', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encryptAPI(curp),
                amount: encryptAPI(amount.toString()),
                comments: encryptAPI(comments),
                lapse: encryptAPI(lapse)
            }
        )
    })

    let json = await response.json()
    return json

}

const getPayments = async (SSID, curp) =>{

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getClientPayment', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encryptAPI(curp)
            }
        )
    })

    let json = await response.json()
    return json

}

const requestPayment = async (SSID, curp, amount) =>{

    let session = JSON.parse(decryptSession(SSID))
    let date = new Date();

    let response = await fetch(URL + '/realizePayment', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encryptAPI(curp),
                amount: encryptAPI(amount),
                date: encryptAPI(date.getDate().toString() + "/" + (date.getMonth()+1) + "/" + date.getFullYear())
            }
        )
    })

    let json = await response.json()
    return json

}

const getActiveLendings = async (SSID) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getClients', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                typeRequest: encryptAPI('2')
            }
        )
    })

    let json = await response.json()
    return json

}

const getSucursalTotal = async (SSID) =>{

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getSucursalTotal', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {}
        )
    })

    let json = await response.json()
    return json
}

const registerEntry = async (SSID, amount) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/registerEntry', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                amount: encryptAPI(amount)
            }
        )
    })

    let json = await response.json()
    return json
} 

const registerEgress = async (SSID, amount) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/registerEgress', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                amount: encryptAPI(amount)
            }
        )
    })

    let json = await response.json()
    return json
}

const getClientsWithLendingRevision = async (SSID) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getClients', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                typeRequest: encryptAPI('3')
            }
        )
    })

    let json = await response.json()
    return json
}

const getClientRevision = async (SSID, curp) => {
    
    let session = JSON.parse(decryptSession(SSID))
    
    let response = await fetch(URL + '/getClientRevision', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encryptAPI(curp)
            }
        )
    })

    let json = await response.json()
    return json

}

const responseLending = async (SSID, accept, curp) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/responseLending', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encryptAPI(curp),
                accept: accept
            }
        )
    })

    let json = await response.json()
    return json

}

const getEntriesEgress = async (SSID) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getEntriesEgress', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {}
        )
    })

    let json = await response.json()
    return json

}

const getPaymentsSucursal = async (SSID) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getPaymentsSucursal', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {}
        )
    })

    let json = await response.json()
    return json

}

const generateReportLendings = async (SSID, save, lapse) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/generateReportLendings', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                save: save,
                lapse: encryptAPI(lapse) 
            }
        )
    })

    let json = await response.json()
    return json

}

const getReportsName = async (SSID) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getReportsName', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {}
        )
    })

    let json = await response.json()
    return json

}

const getReport = async (SSID, file) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getReport', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                file: file
            }
        )
    })

    let json = await response.json()
    return json
}

const downloadReport = async () => {

    // let session = JSON.parse(decryptSession(SSID))

    // let parameters = `/downloadReport?id=${encryptAPI(session.id)}&type=${encryptAPI(session.type)}&token=${encryptAPI(session.token)}&rfc=${encryptAPI(session.rfc)}&password=${encryptAPI(session.password)}&file=${encryptAPI(file.replace('.json', '.csv'))}`

    let response = await fetch("http://localhost:3001/downloadReport?id=U2FsdGVkX1+umb7HNGVgtv/IKcD3FUfH0n2ncQdXzts=&type=U2FsdGVkX1+7/ex+1TiMDZjqn4QHimPKP7CLZmio/34=&token=U2FsdGVkX18iQ7S6/T4SGL+H60koiGvfdJQZPO06ryQtEzfr6bJeExh7MeQc4RBMUN0K8+CkCmNupk9b6dDiWOByDhszu7J3N+7fIEkh9vISp/ywijJ0jWSvnBSeDbXwCb80N8Ps9aaPY+uGljIhZFIxd2zqDF0MCzXOPWGMSx8=&rfc=U2FsdGVkX1/370COH4QlwZbDKa2XRM9w2EZj+SRVId4=&password=U2FsdGVkX18S97XQVEThugBeplTAzd4587/m8zBm38A=&file=U2FsdGVkX18dJXWxX+NusjkIC+IfNrs4cStlUeS1T9Apukqr8Qcriv4eIS0J1jP7AxW/kHNvixnBLpSpEh2IKw==", {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })

    let fileD = await response
    return fileD

}

const deleteReport = async (SSID, file) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/deleteReport', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                file: file
            }
        )
    })

    let json = await response.json()
    return json

}

const getAccountStatus = async (SSID, lapse) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getAccountStatus', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                lapse: lapse
            }
        )
    })

    let json = await response.json()
    return json

}

const getClientLending = async (SSID, curp) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getClientLending', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encryptAPI(curp)
            }
        )
    })

    let json = await response.json()
    return json

}

const requestIncreaseDate =async (SSID, curp, days, reason) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/requestIncreaseDate', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encryptAPI(curp),
                days: encryptAPI(days), 
                reason: encryptAPI(reason)
            }
        )
    })

    let json = await response.json()
    return json
}

const getClientsWithRennovation = async (SSID) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getClients', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                typeRequest: encryptAPI('4')
            }
        )
    })

    let json = await response.json()
    return json
}

const getClientLendingRennovation = async (SSID, curp) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getClientLendingRennovation', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encryptAPI(curp)
            }
        )
    })

    let json = await response.json()
    return json

}

const responseRennovation = async (SSID, curp, resp) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/responseRennovation', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                curp: encryptAPI(curp),
                response: resp
            }
        )
    })

    let json = await response.json()
    return json
}

const registerEmployee = async (SSID, name, app, apm, rfc, type) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/registerEmployee', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                name: encryptAPI(name),
                apat: encryptAPI(app),
                amat: encryptAPI(apm),
                rfcEmp: encryptAPI(rfc),
                typeEmp: encryptAPI(type)
            }
        )
    })

    let json = await response.json()
    return json

}

const randomAssigned = async (SSID) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/randomAssigned', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {}
        )
    })

    let json = await response.json()
    return json

}

const getAssigned = async (SSID) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getAssigned', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {}
        )
    })

    let json = await response.json()
    return json

}

const updatePassword = async (DATA, pwd) => { 

    let session = JSON.parse(decryptSession(DATA))

    let response = await fetch(URL + '/updatePassword', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'id': encryptAPI(session.id),
            'type': encryptAPI(session.type),
            'token': encryptAPI(session.token),
            'rfc': encryptAPI(session.rfc),
            'password': encryptAPI(session.password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(
            {
                pwd: encryptAPI(pwd)
            }
        )
    })

    let json = await response.json()
    return json
}

export { loginUser, getClients, updatePassword, registerEmployee, getAssigned, getClientsWithRennovation, randomAssigned, getClientLendingRennovation, responseRennovation, getActiveLendings, getClientLending, registerClient, getClient, requestLending, getPayments, requestPayment, getSucursalTotal, registerEntry, registerEgress, getClientsWithLendingRevision, getClientRevision, responseLending, getEntriesEgress, getPaymentsSucursal, generateReportLendings, getReportsName, getReport, downloadReport, deleteReport, getAccountStatus, requestIncreaseDate }