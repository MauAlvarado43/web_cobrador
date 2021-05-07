import {Router} from 'express'
import { decryptFront, encryptFront, encryptSession, decryptSession, decryptAPI } from '../utils/cipher'
import { loginUser, updatePassword } from '../config/api'
import { validateUpdatePassword } from '../utils/validate'

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

        if(password == rfc){
            req.session.DATA = encryptSession(JSON.stringify({
                id: decryptAPI(response.data.id),
                type: decryptAPI(response.data.type),
                rfc: rfc,
                password: password,
                token: decryptAPI(response.data.token),
                name: decryptAPI(response.data.name),
                app: decryptAPI(response.data.app),
            }))
            res.send({code: 700})
        }else{

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

        }

    }else {
        res.send(response)
    }
    
})

router.post('/updatePassword', async (req, res) => {
    if(!req.session.DATA){
        res.redirect('/')
    }else{
        let validate  = validateUpdatePassword(decryptFront(req.body.pwd), decryptFront(req.body.cfmpwd));

        if(validate.code == 500){
            res.send(validate)

        }else{
            let dataSession = JSON.parse(decryptSession(req.session.DATA))
            let response = await updatePassword(req.session.DATA, decryptFront(req.body.pwd));
            let session = req.body.session
    
            if(response.code == 201){
    
                req.session.SSID = encryptSession(JSON.stringify({
                    type: dataSession.type,
                    id: dataSession.id,
                    name: dataSession.name,
                    app: dataSession.app,
                    token: dataSession.token,
                    password: decryptFront(req.body.pwd),
                    rfc: dataSession.rfc
                }))
    
                req.session.DATA = ""
    
                if(session)
                    res.cookie('SSID', req.session.SSID)    
    
            }
            res.send(response)
        }
    }
})

module.exports = router