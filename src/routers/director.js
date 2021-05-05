import {Router} from 'express'
import { decryptFront, encryptFront, encryptSession } from '../utils/cipher'
import { loginUser } from '../config/api'

const router = Router()

router.get('/director', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('user_index', {url: '/director', user: "director"})
})

router.get('/director/cuadres', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('cuadres', {url: '/director/cuadres', user: "director"})
})

router.get('/director/pagos_sucursales', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('pagos_sucursales', {url: '/director/pagos_sucursales', user: "director"})
})

router.get('/director/validacion_clientes', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('validacion_clientes', {url: '/director/validacion_clientes', user: "director"})
})

router.get('/director/autorizacion', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('autorizacion', {url: '/director/autorizacion', user: "director"})
})

router.get('/director/reportes', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('reportes_es', {url: '/director/reportes', user: "director"})
})

router.get('/director/estados', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('estados_cuenta', {url: '/director/estados', user: "director"})
})

module.exports = router