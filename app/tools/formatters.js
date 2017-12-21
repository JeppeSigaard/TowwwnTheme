

// Imports
import React from 'react';

// Format date
const formatDate = (( date, year ) => {

  // Date sjiz
  let days = [ 'Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag' ];
  let resp = days[date.getDay()]+' d. '+date.getDate()+'/'+(date.getMonth()+1);
  if ( year ) { resp += ' - ' + date.getFullYear() + ' - '; }

  // Double digit function & adds time
  let doubleDigit = (( val ) => String(val).length<2?'0'+String(val):String(val));
  resp += ' Kl. '+doubleDigit(date.getHours())+':'+doubleDigit(date.getMinutes());

  // Returns
  return resp;

});

// NL2P
const nl2p = (( text ) => {
  let paras = text.split( /[\r\n]+/g ), resp = [];
  for ( let iter = 0; iter < paras.length; iter++ ) {
      resp.push( <p key={ 'esvpara-' + iter } >{ paras[iter] }</p> );
  } return resp;
});

// Exports
export { formatDate, nl2p };
