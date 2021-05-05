const login = async (e) => {

    document.body.style.cursor = 'progress'

    let msgInterval

    e.preventDefault()

    let response = await fetch('/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            rfc: encrypt(document.getElementById('rfc').value),
            password: encrypt(document.getElementById('password').value),
            session: document.getElementById('session').checked
        })
    })

    let json = await response.json()

    document.body.style.cursor = 'auto'

    if(json.code != 201) {

        if(document.getElementById('alert')){
            clearTimeout(msgInterval)
            document.body.removeChild(document.getElementById('alert'))
        }

        let alert = document.createElement("div");
        alert.id = 'alert';
        alert.innerHTML = `
            <div class="msg alert alert-danger mb-0 alert-dismissible alert-absolute fade show " id="alert" role="alert" data-mdb-color="secondary">
                ${codes[json.code]}
                <button type="button" class="btn-close ms-2" data-mdb-dismiss="alert" aria-label="Close" onclick="document.body.removeChild(document.getElementById('alert'))"></button>
            </div>
        `
        document.body.appendChild(alert);
        msgInterval = setTimeout(() => {
            document.body.removeChild(document.getElementById('alert'))
        }, 6000)

    }
    else {
        window.location.href = json.data.url
    }
        
}

const changeVisibilityPassword = () => {
    if(document.getElementById('password').type  == 'password') {
        document.getElementById('eye-close').style.visibility = 'hidden'
        document.getElementById('eye-open').style.visibility = 'visible'
    
        document.getElementById('eye-close').style.display = 'none'
        document.getElementById('eye-open').style.display = 'inline'
    
        document.getElementById('password').type = 'text'
    }
    else{
        document.getElementById('eye-close').style.visibility = 'visible'
        document.getElementById('eye-open').style.visibility = 'hidden'
    
        document.getElementById('eye-close').style.display = 'inline'
        document.getElementById('eye-open').style.display = 'none'
    
        document.getElementById('password').type = 'password'
    }
}

const encrypt = txt => {
    let cipher = new JSEncrypt()
    cipher.setPublicKey(publicKeyuser) 
    return cipher.encrypt(txt)
}

const decrypt = (txt) =>{
    var cipher = new JSEncrypt()
    cipher.setPrivateKey(privateKeyUser)
    return cipher.decrypt(txt)
}

const privateKeyUser = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA5+FDZnywh94Psvwe8oMKmfBFFXXt7olCxft/NCm5m5Z40qsP
dlfbgqu598k3t9Lbqf+/9SWGnT4pUMylqJXetgL4UIJLvvbm0tqhJ1MGQHDbhlTG
DPiX5LMU6o8nbySqZrhjOgtXnpBKaXGz9ibXHu3BwV0eDgJqxsGU8h1dZCRLL852
fQkZA8uQgyX6LkYuknYFFXMhCu1Z/MP+JrHRdzSNq9/ZNs8AEXfdQB8rszhIcqIb
zQFdV4rtepP1V7jVh8O4T47G42iw3REgduhBqgaYLUtJl43iBPgAMxE+LbNBAIlN
sdXI0+ELg6VPp1O1JhzzYieTLCguZtj1k7HlzQIDAQABAoIBAQC+28x1dBZ9jssP
QLRcWn4EXR8P3gScvYAno619CwcKSJ1kkYZlm0VD1gN5L7db6AQEdkzTBDM8BClP
p1KHY+xvlhw7cDPWmDU/wtK4on7X1czrUaW+kXO8u6Zwtqn3so9Lg2OxKBrTmeKV
zhAZgLi6bWp4tSOC1nx64mWtr3vqauAdjwRICpHn13uy/rYuqxMFxl4tYuW5z0nh
9XffVGe3pcgcVV5SmPpoOHyHeL8LjNvjRGTdUZLqAiQZHpNqFKqu8quZpnFqQhEl
+VjiyPC4mEMyLUA/a02Uq0Stzzk5ujkF7eKsPKaY4Bq1tkHni+935qwPH50SUo/M
X9rgvclFAoGBAPSKXk1WmkNLalR2oNHgf+5XzmfRlSAOGlxR8gtJnlXsXR0UKnmn
rEQ/3h9RX8YMB4Yt3TX82LC++gshMpHy5u8r16gDj3o5f/LgI/XJXxe89QwFVAG6
ktDpU1qGmvzCgXiudG0r1KdGaa+2c9c+yl9RMmCx3tzhfRpERnVvaJxDAoGBAPK/
Ayk+qSQxqkTjUgHEOiTBtlJV63BEb/751c7KxnHRbDhg733KKqi3VoxMCJadE+Xb
PcV2c9/PMHRsDnaWV2iNEnpYCEONpCPw1PgC+W+zRSddIWWxGokwmKrQHgIWQL4G
wLB3qA8R9aKvV7ais33giu/UZWAflo1+YWUj7VyvAoGBAOPDsPvVqs79Aidzamyw
7lcff4chJQV7PUA5rvimdAxRn5SDAODYtFHJLuj6kPrUn3lxZHVxcJ6G8jvFiuV3
WXLw4eeCkXNk9PBRpgy6p5BjldXBbLJDhZWBjPpnHxpHS/IMgzJfvayjn7JifNjB
ihpndUWsxgfzGeOKLhoZT1UjAoGBAOcusUUDjzSQNDfdQsm55yIAdrIdb9eA5iSw
LUb/aVUWfPmIoC1tb4k06jE9bGR8fmnHjiHT+PEqslv+WRvpfJ9u0y0/T8d+SteL
0lfNBV+zHOYrVNYzgDEt3ge3owybwtb3OWYW3zBTC1v/oAqpE0aLpeZYop+UFd71
gK5BNBqzAoGAcvuq2IG3z9VenMewZUZzkuWIRIZ92m9F2dQH91J9ITvgf4y/bvmF
h7MCgFdaIm4e867MihRXNrYa40v3g9SojeDP3Iou50ervBS3/Wrc1MDdxv4HpzLA
E0G7COn7Ojc7IXbmB2jJO/6n+ojlGUpL6el4qEODJ+ASpwYz1tLV3u0=
-----END RSA PRIVATE KEY-----
`

const publicKeyuser = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1mCZSbGSHJgRsQCTUJad
Q6ZC0kWMedOlHOjLuurmeMVYKnKvsAsvgA2JQj88jdK59fUV7RHpaVGGztkd7hzm
EB8uXgk1Tehk9MOAPJVxL3F+VvVLXkST4qHcU42UohWrOlvkc/J5SEl5m0H/+6Kj
jMJacYXZdkvl0gC599BtlpjmehYzY2qgdIew36iMFBY1wIySuk2CRkdTKVUa64lD
5ZBMKBSrGmihsYTtitc7Kv9GeWjiZpvssm1QIYYPLz/HDKhNtDkCmCjKW6ksSO9t
/BeTEJ32tODDTmsFjNmZPJdvx5j7JVboPocm5TJ8bHzyfeyjYNu3JbBjCRwjjaRB
HwIDAQAB
-----END PUBLIC KEY-----
`

const codes = {
    "201": "Inicio de sesión exitoso!",
    "301": "RFC y/o contraseña incorrectos!"
}