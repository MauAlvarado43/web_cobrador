import {Router} from 'express'
import { decryptFront, encryptFront, encryptSession, decryptSession, decryptAPI } from '../utils/cipher'
import { loginUser, registerClient, getClients, getActiveLendings, getClientsWithLendingRevision, getSucursalTotal, registerEntry , registerEgress, getClientRevision, responseLending } from '../config/api'

const router = Router()

router.get('/gerente', (req, res) => {
    let nameUser = JSON.parse(decryptSession(req.session.SSID)).name + " " +  JSON.parse(decryptSession(req.session.SSID)).app
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('user_index', {url: '/gerente', user: "gerente", name: nameUser})
})

router.get('/gerente/solicitudes', async (req, res) => {

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
            res.render('solicitudes', {url: '/gerente/solicitudes', user: "gerente", data: response.data})
        }else{
            res.send(response);
        }
    }

})

router.get('/gerente/cobro', async (req, res) => {
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
            res.render('cobro', {url: '/gerente/cobro', user: "gerente", data: response.data})
        }else{
            res.send(response);
        }
    }
})

router.get('/gerente/renovaciones', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('renovaciones', {url: '/gerente/renovaciones', user: "gerente"})
})

router.get('/gerente/nuevo_cliente', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('nuevo_cliente', {url: '/gerente/nuevo_cliente', user: "gerente"})
})

router.post('/registerClient', async (req, res) =>{
    
    let password = JSON.parse(decryptSession(req.session.SSID)).password;
    let rfc = JSON.parse(decryptSession(req.session.SSID)).rfc;
    let id = JSON.parse(decryptSession(req.session.SSID)).id;
    let type = JSON.parse(decryptSession(req.session.SSID)).type;
    let token = JSON.parse(decryptSession(req.session.SSID)).token;

    let name = decryptFront(req.body.name)
	let apat = decryptFront(req.body.apat)
	let amat = decryptFront(req.body.amat)
	let curp = decryptFront(req.body.curp)
	let tel = decryptFront(req.body.tel)
	let cel = decryptFront(req.body.cel)
	let est = decryptFront(req.body.est)
	let mun = decryptFront(req.body.mun)
	let col = decryptFront(req.body.col)
	let st = decryptFront(req.body.st)
	let cp = decryptFront(req.body.cp)
	let ext = decryptFront(req.body.ext)
	let _int = decryptFront(req.body.int)
	let client = decryptFront(req.body.client)
	let cdom = decryptFront(req.body.cdom)
	let ine = decryptFront(req.body.ine)

    let response = await registerClient(password, rfc, id, type, token, name, apat, amat, curp, tel, cel, est, mun, col, st, cp, ext, _int, client, cdom, ine)

    if(response.code == 201){

        res.send({code: 201, data: 'peticion con exitó'})

    }else{
        res.send(response)
    }

})

router.get('/gerente/caja', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getSucursalTotal(req.session.SSID)
        if(response.code == 201){
            res.render('caja', {url: '/gerente/caja', user: "gerente", amount: response.data.amount})
        }else{
            res.send(response)
        }
    }
})

router.get('/gerente/autorizacion', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getClientsWithLendingRevision(req.session.SSID)
        if(response.code == 201){
            response.data.forEach( client => {
                client.name = decryptAPI(client.name)
                client.apat = decryptAPI(client.apat)
                client.amat = decryptAPI(client.amat)
                client.curp = decryptAPI(client.curp)
            })
            res.render('autorizacion', {url: '/gerente/autorizacion', user: "gerente", data: response.data})
        }else{
            res.send(response)
        }
    }
})

router.post('/getClientRevision', async (req, res)=> {
    if(!req.session.SSID){
        res.redirect('/')
    }else{

        let response = await getClientRevision(req.session.SSID, decryptFront(req.body.curp))

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
            response.data.amount = encryptFront(decryptAPI(response.data.amount))
            response.data.date = encryptFront(decryptAPI(response.data.date))
            response.data.comments = encryptFront(decryptAPI(response.data.comments))

            res.send(response)

        }else{
            res.send(response)
        }

    }
})

router.post('/responseLending', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await responseLending(req.session.SSID, req.body.accept, decryptFront(req.body.curp))
        res.send(response)
    }    
})

router.post('/registerEntry', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await registerEntry(req.session.SSID, decryptFront(req.body.amount))
        res.send(response)
    }
})

router.post('/registerEgress', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await registerEgress(req.session.SSID, decryptFront(req.body.amount))
        res.send(response)
    }
})

module.exports = router