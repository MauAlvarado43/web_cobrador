import {Router} from 'express'
import { decryptFront, encryptFront, encryptSession, decryptSession, decryptAPI } from '../utils/cipher'
import { loginUser } from '../config/api'

const router = Router()

router.get('/', (req, res) => {

    let type = 0

    if(req.cookies.SSID)
        req.session.SSID = req.cookies.SSID

    if(req.session.SSID)
        type = JSON.parse(decryptSession(req.session.SSID)).type

    if(type == 1)
        res.redirect('/director')
    else if(type == 2)
        res.redirect('/contador')
    else if(type == 3)
        res.redirect('/gerente')
    else if(type == 4)
        res.redirect('/cobrador')
    else
        res.render('index', {url: '/', user: 'common'})

})

router.get('/logout', (req, res) => {
    
    req.session.destroy()
    res.clearCookie('SSID')
    res.redirect('/')

})

router.post('/login', async (req, res) => {

    let rfc = decryptFront(req.body.rfc)
    let password = decryptFront(req.body.password)
    let session = req.body.session

    let response = await loginUser(rfc, password)

    if(response.code == 201) {

        let type = decryptAPI(response.data.type)
        req.session.SSID = encryptSession(JSON.stringify({
            type: decryptAPI(response.data.type),
            id: decryptAPI(response.data.id),
            name: decryptAPI(response.data.name),
            app: decryptAPI(response.data.app),
            token: decryptAPI(response.data.token),
            password: password,
            rfc: rfc
        }))

        if(session)
            res.cookie('SSID', req.session.SSID)    

        if(type == 1)
            res.send({code: 201, data: {url: '/director'}})
        else if(type == 2)
            res.send({code: 201, data: {url: '/contador'}})
        else if(type == 3)
            res.send({code: 201, data: {url: '/gerente'}})
        else if(type == 4)
            res.send({code: 201, data: {url: '/cobrador'}})

    }else {
        res.send(response)
    }
    
})

module.exports = router