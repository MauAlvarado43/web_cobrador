const getClients = async () => {

    let response = await fetch('/getClients', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer'
    })

    let json = await response.json()

}

const getActiveLendings = async () => {

  let response = await fetch('/getActiveLendings', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer'
  })

  let json = await response.json()

}