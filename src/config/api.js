import fetch from 'node-fetch'
import { encryptAPI, decryptSession } from '../utils/cipher'

const URL = process.env.URL

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

const getUsers = async (SSID) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getClients', {
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
                id: encryptAPI(session.id),
                type: encryptAPI(session.type),
                token: encryptAPI(session.token)
            }
        )
    })

    let json = await response.json()

    return json

}

const getActiveLendings = async (SSID) => {

    let session = JSON.parse(decryptSession(SSID))

    let response = await fetch(URL + '/getActiveLendings', {
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
                id: encryptAPI(session.id),
                type: encryptAPI(session.type),
                token: encryptAPI(session.token)
            }
        )
    })

    let json = await response.json()

    return json

}

export { loginUser, getUsers, getActiveLendings }