const queryServer = (config, suffUrl, method, body, promise) =>  {
    let fetchContent =''
    switch (method) {
        case 'GET':
        case 'DELETE':
            case 'PUT':    
            fetchContent = {
                method: method,
                headers: config.headers}
                break;    
        case 'PATCH':
        case 'POST':
            fetchContent = {
                method: method,
                headers: config.headers,
                body: JSON.stringify(body)}
            break;        
    };
    return fetch(`${config.baseUrl}/${suffUrl}`, fetchContent)
    .then(res => {
        if (res.ok) {
          return res.json();
        }
          return Promise.reject(`код ошибки: ${res.status}`);
      });
  }; 


export {queryServer};

