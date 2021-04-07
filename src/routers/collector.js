import { Router } from 'express'
import { decryptFront, encryptFront, encryptSession, decryptSession, decryptAPI } from '../utils/cipher'
import { getClients, getActiveLendings, getClient, requestLending, getPayments, requestPayment} from '../config/api'
import fetch from 'node-fetch'

const router = Router()

/* -------------------------------------------------
                    Requests
------------------------------------------------- */

router.post('/requestPayment', async (req, res)=>{
    if(!req.session.SSID){
        res.send({code: 302, data: {}})
    }else{
        
        let response = await requestPayment(req.session.SSID, decryptFront(req.body.curp), decryptFront(req.body.amount))
        res.send(response)
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
            response.data.name = encryptFront(decryptAPI(response.data.name))
            response.data.apat = encryptFront(decryptAPI(response.data.apat))
            response.data.amat = encryptFront(decryptAPI(response.data.amat))
            response.data.curp = encryptFront(decryptAPI(response.data.curp))
            response.data.tel = encryptFront(decryptAPI(response.data.tel))
            response.data.cel = encryptFront(decryptAPI(response.data.cel))
            response.data.est = encryptFront(decryptAPI(response.data.est))
            response.data.mun = encryptFront(decryptAPI(response.data.mun))
            response.data.col = encryptFront(decryptAPI(response.data.col))
            response.data.cp = encryptFront(decryptAPI(response.data.cp))
            response.data.st = encryptFront(decryptAPI(response.data.st))
            response.data.ext = encryptFront(decryptAPI(response.data.ext))
            response.data._int = encryptFront(decryptAPI(response.data._int))
            response.data.ine = encryptFront(decryptAPI(response.data.ine))
            response.data.fot = encryptFront(decryptAPI(response.data.fot))
            response.data.cdom = encryptFront(decryptAPI(response.data.cdom))
            res.send(response)
        }else{
            res.send(response)
        }
    }
})

router.post('/registerLending', async (req,res) =>{
    if(!req.session.SSID){
        res.send({code: 302, data: {}})
    }else{
        let response = await requestLending(req.session.SSID, decryptFront(req.body.curp), decryptFront(req.body.amount), decryptFront(req.body.comments), decryptFront(req.body.lapse))
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
            res.render('solicitudes', {url: '/cobrador/solicitudes', user: "cobrador", data: response.data})
        }else{
            res.send(response);
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
            res.render('cobro', {url: '/cobrador/cobro', user: "cobrador", data: response.data})
        }else{
            res.send(response);
        }
    }
})

router.get('/cobrador/renovaciones', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('renovaciones', {url: '/cobrador/renovaciones', user: "cobrador"})
})

module.exports = router