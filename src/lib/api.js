// Utilities for calling backend apis

export function postJSON(url, data) {
  return new Promise((resolve, reject) => {
    let opts = {
      method: 'post',
      headers: {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json'
      },
      body: JSON.stringify( data )
    };
    window.fetch(url, opts)
          .then(res => {
            if (res.ok) {
              res.json().then(resolve).catch(reject)
            } else {
              res.text().then((text) => reject({status: res.status, message: text || res.statusText, statusText: res.statusText, responseText: text})).catch( reject );
            }
          })
          .catch(reject)
  });
}

const queryParams = (params) => {
  return Object.keys(params)
               .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
               .join('&');
}

export function getJSON(url, params) {
  return new Promise((resolve, reject) => {
    let opts = {
      method: 'get',
      headers: {
	'Accept': 'application/json, text/plain, */*',
      }
    };
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams( params );
    window.fetch(url, opts)
          .then(res => {
            if (res.ok) {
              res.json().then(resolve).catch(reject)
            } else {
              res.text().then((text) => reject({status: res.status, message: text || res.statusText, statusText: res.statusText, responseText: text})).catch( reject );
            }
          })
          .catch(reject)
  });
}

