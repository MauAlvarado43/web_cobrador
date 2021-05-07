import fetch from 'node-fetch'
import {Router} from 'express'
import { decryptFront, encryptFront, encryptSession, decryptSession, decryptAPI } from '../utils/cipher'
import { getSucursals, registerSucursal, getPaymentsSucursal, deleteReport, getAccountStatus, registerEmployee, getClientsWithLendingRevision, getReportsName, getReport, downloadReport } from '../config/api'
import { validateNameReport, validateDataSucursal, validateLapseReport, validateNewEmployee, validateSucursal } from '../utils/validate'

const router = Router()

router.get('/director', (req, res) => {
    let nameUser = JSON.parse(decryptSession(req.session.SSID)).name + " " +  JSON.parse(decryptSession(req.session.SSID)).app
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('user_index', {url: '/director', user: "director", name: nameUser})
})

router.get('/director/cuadres', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getSucursals(req.session.SSID)
        if(response.code == 201){
            response.data.forEach((sucursal)=>{
                sucursal.name = decryptAPI(sucursal.name)
            })
            res.render('cuadres', {url: '/director/cuadres', user: "director", data: response.data})
        }else{
            res.send(response);
        }
    }
})

router.get('/director/pagos_sucursales', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{

        let response = await getSucursals(req.session.SSID)
        if(response.code == 201){
            response.data.forEach((sucursal)=>{
                sucursal.name = decryptAPI(sucursal.name)
            })
            res.render('pagos_sucursales', {url: '/director/pagos_sucursales', user: "director", data: response.data})
        }else{
            res.send(response);
        }
    }
})

router.get('/director/validacion_clientes', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('validacion_clientes', {url: '/director/validacion_clientes', user: "director"})
})

router.get('/director/autorizacion', async (req, res) => {
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
            res.render('autorizacion', {url: '/director/autorizacion', user: "director", data: response.data})
        }else{
            res.send(response)
        }
    }
})

router.post('/getReport', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let validate = validateNameReport(decryptFront(req.body.file))
        if(validate.code == 500){
            res.send(validate)
        }else{
            let response = await getReport(req.session.SSID, decryptFront(req.body.file))
            response.data.forEach( item => {
                item.name = encryptFront(decryptAPI(item.name))
            })
            res.send(response)
        }
    }
})

router.post('/getUrlDownload', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let session = JSON.parse(decryptSession(req.session.SSID))
        if(session.type == 1){
            let file = decryptFront(req.body.file)
            let parameters = process.env.URL + `/downloadReport?id=${encryptAPI(session.id)}&type=${encryptAPI(session.type)}&token=${encryptAPI(session.token)}&rfc=${encryptAPI(session.rfc)}&password=${encryptAPI(session.password)}&file=${encryptAPI(file.replace('.json', '.csv'))}`
            res.send({code: 201, data: parameters})
        }else{
            res.send({code: 500, data: ""})
        }

    }    
})

router.post('/deleteReport', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await deleteReport(req.session.SSID, decryptFront(req.body.file))
        res.send(response)
    }
})

router.get('/director/reportes', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getReportsName(req.session.SSID)
        if(response.code == 201){
            res.render('reportes_es', {url: '/director/reportes', user: "director", data: response.data})
        }else{
           res.send(response) 
        }
    }
})

router.post('/registerEmployee', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let validate = validateNewEmployee(decryptFront(req.body.name), decryptFront(req.body.app), decryptFront(req.body.apm), decryptFront(req.body.rfc), decryptFront(req.body.type))
        let validateSuc = validateSucursal(decryptFront(req.body.suc))
        if(validate.code == 500){
            res.send(validate)
        }else if(validateSuc.code == 500){
            res.send(validateSuc)
        }else{
            let response = await registerEmployee(req.session.SSID, decryptFront(req.body.name), decryptFront(req.body.app), decryptFront(req.body.apm), decryptFront(req.body.rfc), decryptFront(req.body.type), decryptFront(req.body.suc))
            res.send(response)
        }
    }  
})

router.get('/director/registrar_empleado', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getSucursals(req.session.SSID)
        if(response.code == 201){
            response.data.forEach((sucursal)=>{
                sucursal.name = decryptAPI(sucursal.name)
            })
            res.render('registrar_empleado', {url: '/director/registrar_empleado', user: "director", data: response.data})
        }else{
            res.send(response);
        }
    }
})

router.get('/director/registrar_sucursal', (req,res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        res.render('registrar_sucursal', {url: '/director/registrar_sucursal', user: "director"})
    }
})

router.post('/registerSucursal', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let validate = validateDataSucursal(decryptFront(req.body.name), decryptFront(req.body.dom));
        if(validate.code == 500){
            res.send(validate)
        }else{
            let response = await registerSucursal(req.session.SSID, decryptFront(req.body.name), decryptFront(req.body.dom));
            res.send(response)
        }
    }
})

router.post('/getAccountStatus', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let validate = validateLapseReport(decryptFront(req.body.lapse))
        let validateSuc = validateSucursal(decryptFront(req.body.name))
        if(validate.code == 500){
            res.send(validate)
        }else if(validateSuc == 500){
            res.send(validateSuc)
        }else{
            let response = await getAccountStatus(req.session.SSID, decryptFront(req.body.lapse), decryptFront(req.body.name))
            res.send(response) 
        }

    }
})

router.get('/director/estados', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getSucursals(req.session.SSID)
        if(response.code == 201){
            response.data.forEach((sucursal)=>{
                sucursal.name = decryptAPI(sucursal.name)
            })
            res.render('estados_cuenta', {url: '/director/estados', user: "director", data: response.data})
        }else{
            res.send(response);
        }
    }
})

module.exports = router