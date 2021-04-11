import {Router} from 'express'
import { decryptFront, encryptFront, encryptSession } from '../utils/cipher'
import { loginUser } from '../config/api'

const router = Router()

router.get('/contador', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('user_index', {url: '/contador', user: "contador"})
})

router.get('/contador/cuadres', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('cuadres', {url: '/contador/cuadres', user: "contador"})
})

router.get('/contador/pagos_sucursales', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('pagos_sucursales', {url: '/contador/pagos_sucursales', user: "contador"})
})

router.get('/contador/validacion_clientes', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('validacion_clientes', {url: '/contador/validacion_clientes', user: "contador"})
})

router.get('/contador/autorizacion', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('autorizacion', {url: '/contador/autorizacion', user: "contador"})
})

router.get('/contador/reportes', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('reportes_es', {url: '/contador/reportes', user: "contador"})
})

module.exports = router