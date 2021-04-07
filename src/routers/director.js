import fetch from 'node-fetch'
import {Router} from 'express'
import { decryptFront, encryptFront, encryptSession, decryptSession, decryptAPI } from '../utils/cipher'
import { getEntriesEgress, getPaymentsSucursal, deleteReport, getAccountStatus, getClientsWithLendingRevision, getReportsName, getReport, downloadReport } from '../config/api'

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
        let response = await getEntriesEgress(req.session.SSID)
        if(response.code == 201){
            res.render('cuadres', {url: '/director/cuadres', user: "director", data: response.data})
        }else{
            res.send(response)
        }
    }
})

router.get('/director/pagos_sucursales', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getPaymentsSucursal(req.session.SSID)
        if(response.code == 201){
            response.data.forEach( payment => {
                payment.name =  decryptAPI(payment.name)
                payment.fec_pag = new Date(payment.fec_pag).toLocaleDateString()
            })
            res.render('pagos_sucursales', {url: '/director/pagos_sucursales', user: "director", data: response.data})
        }else{
            res.send(response)
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
        let response = await getReport(req.session.SSID, decryptFront(req.body.file))
        response.data.forEach( item => {
            item.name = encryptFront(decryptAPI(item.name))
        })
        res.send(response)
    }
})

router.get('/downloadReport', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{

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

router.post('/getAccountStatus', async (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        let response = await getAccountStatus(req.session.SSID, decryptFront(req.body.lapse))
        res.send(response) 
    }
})

router.get('/director/estados', (req, res) => {
    if(!req.session.SSID){
        res.redirect('/')
    }else{
        res.render('estados_cuenta', {url: '/director/estados', user: "director"})
    }
})

module.exports = router