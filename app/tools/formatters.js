

// Imports
import React from 'react';
import { XmlEntities } from 'html-entities';

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

// Decode Entities
const decodeEntities = (( text ) => {
  return text = (new XmlEntities()).decode(text);
});

// NL2P
const nl2p = (( text ) => {
  let paras = text.split( /[\r\n]+/g ), resp = [];
  for ( let iter = 0; iter < paras.length; iter++ ) {
      resp.push( <p key={ 'esvpara-' + iter } >{ paras[iter] }</p> );
  } return resp;
});

// Render dynamic open times
const renderDynamicOpenTimes = (( val ) => {

  // Gets the json from val and creates a dat
  let json = JSON.parse( val );
  let date = new Date();

  // Comparisons dates
  let comparisonDate_from = new Date();
  let comparisonDate_to = new Date();

  // Sets a constant of days
  const days = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];

  // No hours found at all, they're closed.
  if ( json.constructor.name === 'Array' &&
       json.length == 0 ) { return '-'; }

  // Gets todays data
  let todaysdata = json[days[date.getDay()]];
  if ( todaysdata == null ) { return <span className="red">{'Lukket for idag'}</span>; }

  // Gets from and to
  let from_text = json[days[date.getDay()]][0];
  let to_text   = json[days[date.getDay()]][1];

  // From hours and minutes
  let from_hours   = parseInt(from_text.slice(0,2));
  let from_minutes = parseInt(from_text.slice(3,5));

  // To hours and minutes
  let to_hours   = parseInt(to_text.slice(0,2));
  let to_minutes = parseInt(to_text.slice(3,5));

  // Sets from comparison date
  comparisonDate_from.setHours(from_hours);
  comparisonDate_from.setMinutes(from_minutes);

  // Sets to comparison date
  comparisonDate_to.setHours(to_hours);
  comparisonDate_to.setMinutes(to_hours);

  // Edge case, to is next morning.
  if ( comparisonDate_from.getTime() > comparisonDate_to.getTime() ) {
    comparisonDate_to.setTime( comparisonDate_to.getTime() + ( 1000*60*60*24 ) );
  }

  // Gets time
  let now  = date.getTime();
  let from = comparisonDate_from.getTime();
  let to   = comparisonDate_to.getTime();

  // Returns
  if ( now >= to ) { return <span className="red">{'Lukket for idag'}</span>; }
  else if ( now < from ) { return 'Åbent senere ' + from_text + ' - ' + to_text; }
  else { return <span className="green">{'Åbent ' + from_text + ' - ' + to_text}</span>; }

});

// Exports
export { formatDate, decodeEntities, nl2p, renderDynamicOpenTimes };
