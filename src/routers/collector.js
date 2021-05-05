import { Router } from 'express'
import { decryptFront, encryptFront, encryptSession } from '../utils/cipher'
import { getUsers, getActiveLendings } from '../config/api'
import fetch from 'node-fetch'

const router = Router()

/* -------------------------------------------------
                    Requests
------------------------------------------------- */

router.get('/getClients', async (req, res) => {

    if(!req.session.SSID)
        res.send({
            code: 302, data: {}
        })

    let response = await getUsers(req.session.SSID)

    res.send({})

})

router.get('/getActiveLendings', async (req,res) => {

    if(!req.session.SSID)
        res.send({
            code: 302, data: {}
        })

    let response = await getActiveLendings(req.session.SSID)

    res.send({})

})

/* -------------------------------------------------
                    Rendering
------------------------------------------------- */

router.get('/cobrador', (req, res) => {
    if(!req.session.SSID) 
        res.redirect('/')
    else
        res.render('user_index', {url: '/cobrador', user: "cobrador"})
})

router.get('/cobrador/solicitudes', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('solicitudes', {url: '/cobrador/solicitudes', user: "cobrador"})
})

router.get('/cobrador/cobro', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('cobro', {url: '/cobrador/cobro', user: "cobrador"})
})

router.get('/cobrador/renovaciones', (req, res) => {
    if(!req.session.SSID)
        res.redirect('/')
    else
        res.render('renovaciones', {url: '/cobrador/renovaciones', user: "cobrador"})
})

module.exports = router