import {Router} from 'express'
import { decryptFront, encryptFront, encryptSession } from '../utils/cipher'
import { loginUser } from '../config/api'

const router = Router()

router.get('/gerente', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('user_index', {url: '/gerente', user: "gerente"})
})

router.get('/gerente/solicitudes', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('solicitudes', {url: '/gerente/solicitudes', user: "gerente"})
})

router.get('/gerente/cobro', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('cobro', {url: '/gerente/cobro', user: "gerente"})
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

router.get('/gerente/caja', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('caja', {url: '/gerente/caja', user: "gerente"})
})

router.get('/gerente/autorizacion', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('autorizacion', {url: '/gerente/autorizacion', user: "gerente"})
})

module.exports = router