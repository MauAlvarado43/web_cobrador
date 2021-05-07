import {Router} from 'express'
import { decryptFront, encryptFront, encryptSession, decryptSession, decryptAPI } from '../utils/cipher'
import { getClientsWithLendingRevision, getSucursals, getEntriesEgress, getPaymentsSucursal, generateReportLendings } from '../config/api'
import { validateLapseReport, validateSucursal } from '../utils/validate'

const router = Router()

router.get('/contador', (req, res) => {
    let nameUser = JSON.parse(decryptSession(req.session.SSID)).name + " " +  JSON.parse(decryptSession(req.session.SSID)).app
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('user_index', {url: '/contador', user: "contador", name: nameUser})
})

router.get('/contador/cuadres', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getSucursals(req.session.SSID)
        if(response.code == 201){
            response.data.forEach((sucursal)=>{
                sucursal.name = decryptAPI(sucursal.name)
            })
            res.render('cuadres', {url: '/contador/cuadres', user: "contador", data: response.data})
        }else{
            res.send(response);
        }
    }
})

router.post('/getEntriesEgress', async (req,res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let validate = validateSucursal(decryptFront(req.body.name))
        if(validate.code == 500){
            res.send(validate)
        }else{
            let response = await getEntriesEgress(req.session.SSID, decryptFront(req.body.name))
            res.send(response);
        }
    }    
})

router.get('/contador/pagos_sucursales', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{

        let response = await getSucursals(req.session.SSID)
        if(response.code == 201){
            response.data.forEach((sucursal)=>{
                sucursal.name = decryptAPI(sucursal.name)
            })
            res.render('pagos_sucursales', {url: '/contador/pagos_sucursales', user: "contador", data: response.data})
        }else{
            res.send(response);
        }
    }
})

router.post('/getPaymentsSucursal', async (req,res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let validate = validateSucursal(decryptFront(req.body.name))
        if(validate.code == 500){
            res.send(validate)
        }else{
            let response = await getPaymentsSucursal(req.session.SSID, decryptFront(req.body.name))
            if(response.code == 201){
                response.data.forEach((item) => {
                    item.name = encryptFront(decryptAPI(item.name))
                })
            }
            res.send(response)
        }
    }  
})

router.get('/contador/validacion_clientes', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('validacion_clientes', {url: '/contador/validacion_clientes', user: "contador"})
})

router.post('/generateReportLendings', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let validate = validateLapseReport(decryptFront(req.body.lapse))
        let validateSuc = validateSucursal(decryptFront(req.body.name))
        if(validate.code == 500){
            res.send(validate)
        }else if(validateSuc.code == 500){
            res.send(validateSuc)
        }else{
            let response = await generateReportLendings(req.session.SSID, req.body.save, decryptFront(req.body.lapse), decryptFront(req.body.name))
            if(response.code == 201){
                response.data.forEach( item => {
                    item.name = encryptFront(decryptAPI(item.name))
                })
            }
            res.send(response)
        }
    }    
})

router.get('/contador/registrar_sucursal', (req,res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        res.render('registrar_sucursal', {url: '/contador/registrar_sucursal', user: "contador"})
    }
})

router.get('/contador/autorizacion', async (req, res) => {
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
            res.render('autorizacion', {url: '/contador/autorizacion', user: "contador", data: response.data})
        }else{
            res.send(response)
        }
    }
})

router.get('/contador/reportes', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getSucursals(req.session.SSID)
        if(response.code == 201){
            response.data.forEach((sucursal)=>{
                sucursal.name = decryptAPI(sucursal.name)
            })
            res.render('reportes_es', {url: '/contador/reportes', user: "contador", data: response.data})
        }else{
            res.send(response);
        }
    }
})

router.get('/contador/registrar_empleado', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getSucursals(req.session.SSID)
        if(response.code == 201){
            response.data.forEach((sucursal)=>{
                sucursal.name = decryptAPI(sucursal.name)
            })
            res.render('registrar_empleado', {url: '/contador/registrar_empleado', user: "contador", data: response.data})
        }else{
            res.send(response);
        }
    }
})

module.exports = router