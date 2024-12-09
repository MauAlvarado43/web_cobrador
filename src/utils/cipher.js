import crypto from 'crypto'
import CryptoJS from 'crypto-js'

const CIPHER_KEY = ""

const encryptSession = plainText => {

    try{

        global.navigator = {appName: 'nodejs'}
        global.window = {}
        const JSEncrypt = require ('./JSEncrypt').default

        const cipher = new JSEncrypt ()
        cipher.setPublicKey(publicKeySession)
        return cipher.encrypt(plainText)

    }catch(err){
        if(err) console.log(err)
        return null
	}
	
}

const decryptSession = cryptedText => {

	try{

        global.navigator = {appName: 'nodejs'}
        global.window = {}
        const JSEncrypt = require ('./JSEncrypt').default

        const cipher = new JSEncrypt ()
        cipher.setPrivateKey(privateKeySession)
        return cipher.decrypt(cryptedText).toString('utf8')

    }catch(err){

        if(err) console.log(err)
		return null
		
	}
	
}

const encryptFront = plainText => {

    try{

        global.navigator = {appName: 'nodejs'}
        global.window = {}
        const JSEncrypt = require ('./JSEncrypt').default

        const cipher = new JSEncrypt ()
        cipher.setPublicKey(publicKeyServer)
        return cipher.encrypt(plainText)

    }catch(err){
        if(err) console.log(err)
        return null
	}
	
}


const decryptFront = cryptedText => {

	try{

        global.navigator = {appName: 'nodejs'}
        global.window = {}
        const JSEncrypt = require ('./JSEncrypt').default

        const cipher = new JSEncrypt ()
        cipher.setPrivateKey(privateKeyServer)
        return cipher.decrypt(cryptedText).toString('utf8')

    }catch(err){

        if(err) console.log(err)
		return null
		
	}
	
}

const encryptAPI = (plainText) => {
	var cipherText = CryptoJS.AES.encrypt(plainText, CIPHER_KEY).toString()
	
	return cipherText
}

const decryptAPI = (ciphertext) => {
	var bytes  = CryptoJS.AES.decrypt(ciphertext, CIPHER_KEY)
	var originalText = bytes.toString(CryptoJS.enc.Utf8)
	
	return originalText
}

const privateKeySession = `
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----
`

const publicKeySession = `
-----BEGIN PUBLIC KEY-----
-----END PUBLIC KEY-----
`

const privateKeyServer = `
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----
`

const publicKeyServer = `
-----BEGIN PUBLIC KEY-----
-----END PUBLIC KEY-----
`

export { encryptFront, decryptFront, encryptAPI, decryptAPI, encryptSession, decryptSession }