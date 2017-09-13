// Utilities for calling backend apis
import axios from 'axios';

export function postJSON(url, data) {
  return new Promise((resolve, reject) => {
    axios.post( url, data ).then( (response) => {
      resolve( response.data );
    }).catch( (err) => {
      if ( err.response )
	reject({ status: err.response.status, message: err.response.data || err.response.statusText });
      else
	reject({ status: 500, message: err.message });
    });
  });
}

export function getJSON(url, data) {
  return new Promise((resolve, reject) => {
    let qs;
    if ( data ) qs = { params: data };
    axios.get( url, qs ).then( (response) => {
      resolve( response.data );
    }).catch( (err) => {
      if ( err.response )
	reject({ status: err.response.status, message: err.response.data || err.response.statusText });
      else
	reject({ status: 500, message: err.message });
    });    
  });
}

