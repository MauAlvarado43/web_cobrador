import { Router } from 'express'
import { decryptFront, encryptFront, encryptSession, decryptSession, decryptAPI } from '../utils/cipher'
import { getClients, requestIncreaseDate, getActiveLendings, getClient, getAssigned, requestLending, getPayments, requestPayment} from '../config/api'
import { validateRegisterLending, validatePayment, validateRennovation } from '../utils/validate'

const router = Router()

/* -------------------------------------------------
                    Requests
------------------------------------------------- */

router.post('/requestPayment', async (req, res) => {
    if(!req.session.SSID){
        res.send({code: 302, data: {}})
    }else{
        let validate = validatePayment(decryptFront(req.body.amount))
        if(validate.code == 500){
            res.send(validate)
        }else{
            let response = await requestPayment(req.session.SSID, decryptFront(req.body.curp), decryptFront(req.body.amount))
            res.send(response)
        }
    }    
})

router.post('/requestIncreaseDate', async (req,res) => {
    if(!req.session.SSID){
        res.send({code: 302, data: {}})
    }else{
        let validate = validateRennovation(decryptFront(req.body.days))
        if(validate.code == 500){
            res.send(validate)
        }else{
            let response = await requestIncreaseDate(req.session.SSID, decryptFront(req.body.curp), decryptFront(req.body.days), decryptFront(req.body.reason))
            res.send(response)
        }
    }  
})

router.post('/getPayments', async (req, res)=>{
    if(!req.session.SSID){
        res.send({code: 302, data: {}})
    }else{

        let response = await getPayments(req.session.SSID, decryptFront(req.body.curp))

        if(response.code == 201){

            response.data.tot_pay = encryptFront(decryptAPI(response.data.tot_pay))
            response.data.can_pre = encryptFront(decryptAPI(response.data.can_pre))
            response.data.lendings.forEach( item =>{
                item.fec_pag = encryptFront(decryptAPI(item.fec_pag))
                item.can_pag = encryptFront(decryptAPI(item.can_pag))
            })
            res.send(response)

        }else{
            res.send(response)
        }
    }
})

router.post('/getClient', async (req,res)=>{
    if(!req.session.SSID){
        res.send({code: 302, data: {}})
    }else{
        let response = await getClient(req.session.SSID, decryptFront(req.body.curp))
        if(response.code == 201){
            let resp = {
                code: 201,
                data: {}
            }
            let curp = response.data.curp;
            resp.data.name = encryptFront(decryptAPI(response.data.name))
            resp.data.apat = encryptFront(decryptAPI(response.data.apat))
            resp.data.amat = encryptFront(decryptAPI(response.data.amat))
            resp.data.curp = encryptFront(decryptAPI(curp))
            resp.data.tel = encryptFront(decryptAPI(response.data.tel))
            resp.data.cel = encryptFront(decryptAPI(response.data.cel))
            resp.data.est = encryptFront(decryptAPI(response.data.est))
            resp.data.mun = encryptFront(decryptAPI(response.data.mun))
            resp.data.col = encryptFront(decryptAPI(response.data.col))
            resp.data.cp = encryptFront(decryptAPI(response.data.cp))
            resp.data.st = encryptFront(decryptAPI(response.data.st))
            resp.data.ext = encryptFront(decryptAPI(response.data.ext))
            resp.data._int = encryptFront(decryptAPI(response.data._int))
            resp.data.ine = encryptFront(decryptAPI(response.data.ine))
            resp.data.fot = encryptFront(decryptAPI(response.data.fot))
            resp.data.cdom = encryptFront(decryptAPI(response.data.cdom))
            resp.data.curpEncrypt = curp
            res.send(resp)
        }else{
            res.send(response)
        }
    }
})

router.post('/registerLending', async (req,res) =>{
    if(!req.session.SSID){
        res.send({code: 302, data: {}})
    }else{
        let validate = validateRegisterLending(decryptFront(req.body.lapse), decryptFront(req.body.amount))
        if(validate.code == 500){
            res.send(validate)
        }else{
            let response = await requestLending(req.session.SSID, decryptAPI(decryptFront(req.body.curp)), decryptFront(req.body.amount), decryptFront(req.body.comments), decryptFront(req.body.lapse))
            res.send(response)
        }
    }
})

router.post('/queryClient', async (req, res) => {
    if(!req.session.SSID){
        res.send({code: 302, data: {}})
    }else{
        let wildcard = decryptFront(req.body.wildcard).toLowerCase()
        let response = []
        let lendings = JSON.parse(decryptSession(req.session.lendings))
        lendings.responseData.forEach(item => {
            let name = item.name + " " + item.apat + " " + item.amat 
            if(name.toLowerCase().includes(wildcard)){
                response.push(item)
            }
        })
        res.send(response)
    }
})

/* -------------------------------------------------
                    Rendering
------------------------------------------------- */

router.get('/cobrador', (req, res) => {
    let nameUser = JSON.parse(decryptSession(req.session.SSID)).name + " " +  JSON.parse(decryptSession(req.session.SSID)).app
    if(!req.session.SSID) 
        res.redirect('/')
    else
        res.render('user_index', {url: '/cobrador', user: "cobrador", name: nameUser})
})

router.get('/cobrador/solicitudes', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{

        let response = await getClients(req.session.SSID)
        response.data.forEach(item => {
            item.name = decryptAPI(item.name)
            item.apat = decryptAPI(item.apat)
            item.amat = decryptAPI(item.amat)
            item.curp = decryptAPI(item.curp)
        })
        if(response.code == 201){
            let responseData = response.data
            let sessionData = req.session.SSID
            req.session.regenerate(function(err){
                req.session.SSID = sessionData
                req.session.lendings = encryptSession(JSON.stringify({
                    responseData
                }))
            })
            res.render('solicitudes', {url: '/cobrador/solicitudes', user: "cobrador", data: response.data})
        }else{
            res.redirect('/')
        }
    }
})

router.get('/cobrador/cobro', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{

        let response = await getActiveLendings(req.session.SSID)
        if(response.code == 201){
            response.data.forEach( item =>{
                item.name = decryptAPI(item.name)
                item.apat = decryptAPI(item.apat)
                item.amat = decryptAPI(item.amat)
                item.curp = decryptAPI(item.curp)
            })
            res.render('cobro', {url: '/cobrador/cobro', user: "cobrador", data: response.data, type: "cobro"})
        }else{
            res.redirect('/')
        }
    }
})

router.get('/cobrador/nuevo_cliente', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('nuevo_cliente', {url: '/cobrador/nuevo_cliente', user: "cobrador"})
})

router.get('/cobrador/renovaciones', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getActiveLendings(req.session.SSID)
        if(response.code == 201){
            response.data.forEach( client => {
                client.name = decryptAPI(client.name)
                client.apat = decryptAPI(client.apat)
                client.amat = decryptAPI(client.amat)
            })
            res.render('renovaciones', {url: '/cobrador/renovaciones', user: "cobrador", data: response.data})
        }else{
            res.redirect("/")
        }
    }
})

router.get('/cobrador/ver_cobros', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{

        let response = await getAssigned(req.session.SSID)
        if(response.code == 201){
            response.data.forEach( item =>{
                item.id = decryptAPI(item.id)
                item.name = decryptAPI(item.name)
                item.cel = decryptAPI(item.cel)
                item.tel = decryptAPI(item.tel)
                item.dom = decryptAPI(item.dom)
            })
            res.render('cobro', {url: '/cobrador/ver_cobros', user: "cobrador", data: response.data, type: "ver_cobros"})
        }else{
            res.redirect('/')
        }
    }
})

module.exports = router