

// Imports
import React from 'react';
import { postAjax } from '../tools/ajax.js';

// Contact form component (Factory function, for funsies)
class ContactForm extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {

      // Sended
      sending : false,

      // Fields
      fields : [
        { name : 'name', label : 'Navn', type : 'text' },
        { name : 'mail', label : 'Email', type : 'email' },
      ],

      // Field Values
      fieldValues : {
        'name' : '',
        'mail' : '',
      }

    };
  }

  // Render
  render() {
    return (
      <div className="contact-form">

        {/* Logo, title, subtitle, etc. */}
        <div className="contact-form-text">

          <div className="logo">
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#towwwn-logo-17">
              </use>
            </svg>
          </div>

          <div className="title">
            Kontakt holdet bag Towwwn
          </div>

          <div className="text">
            Kan du ikke finde dit sted på Towwwn,
            er du interreset i at reklamere på siden,
            eller vil du ligge en anden besked til holdet bag?
            Så indtast dine informationer under, og vi kontakter dig.
          </div>

        </div>

        {/* Actual form */}
        <form className="contact-form-body">

          { this.state.fields.map(this.renderField.bind(this)) }

          { !this.state.sending &&
            <input type="submit" value="indsend" onClick={this.processSubmit.bind(this)} />
          }

          { this.state.sending &&
            <div class="submit-sending">Sender...</div>
          }

        </form>

      </div>
    );
  }

  // Render field
  renderField( val ) {
    return (
      <div className="contact-form-field" key={ 'contact-form-field#'+val.name } >

        <input type={ val.type } id={ 'contact-form-field#'+val.name }
          onChange={ this.onFieldChange.bind(this, val.name) }
          ref={ 'contact-form-field#'+val.name } required />

        <label htmlFor={ 'contact-form-field#'+val.name }>{ val.label }</label>

      </div>
    );
  }

  // On field change
  onFieldChange( name ) {

    // Extracts data
    let field = this.refs['contact-form-field#'+name];

    // Adds or removes active class
    if ( field.value !== '' ) { field.classList.add( 'active' ); }
    else { field.classList.remove( 'active' ); }

    // Updates the field values in state
    let new_state = { fieldValues : this.state.fieldValues };
    new_state.fieldValues[name] = field.value;
    this.setState( new_state );

  }

  // Process Submit
  processSubmit( e ) {

    // Prevents default behaviour
    // and sets sending part of state
    e.preventDefault();
    this.setState({ sending : true });

    // Extracts data
    let name = this.state.fieldValues.name;
    let mail = this.state.fieldValues.mail;

    // Formats data to towwwn
    let to  = 'aske@towwwn.com';
    let sub = 'Towwwn - Contact';
    let msg = 'A user, by the name '+name+', is trying to reach you through Towwwn.\n'+
              'You can reach '+name+' on the mail: '+mail;

    // Sends email to towwwn staff
    this.sendMail( to, sub, msg )
      .then((r) => { this.setState({ sending : false }); })
      .then(( ) => { if ( this.props.onSend != null ) {
        this.props.onSend(); }
      });

    // Formats data to user
    to  = mail;
    sub = 'Towwwn - Informations received';
    msg = 'Hi '+name+', thanks for contacting us.\n\n'+
          'Were currently proccesing your request, and will be in touch soon.\n'+
          'Looking forward to talking to you.\n\n'+
          '// The Towwwn Team';

    // Sends mail to user
    this.sendMail( to, sub, msg )
      .then(( r ) => { this.setState({ sending : false }) })
      .then(( ) => { if ( this.props.onSend != null ) {
        this.props.onSend(); }
      });;

  }

  // Send mail
  sendMail( to, sub, msg ) {
    return postAjax( 'mail', {
      to, sub, msg
    });
  }

}

// Exports
export default ContactForm;
