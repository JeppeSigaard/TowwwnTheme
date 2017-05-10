


// Neuron
class Neuron {

    /* ---- Constructor ---- */
    constructor( inputElems,
                 genome ) {

        this.weights = [ ]; this.output = 0;
        for ( let iter = 0; iter < inputElems.length; iter++ ) {
            if ( genome != null && genome[ iter ] != null )
                this.weights.push( genome[ iter ] );
            else this.weights.push( 0 );
        }
    }

    /* ---- Activate ---- */
    invoke( inputs,
            spectrum ) {

        // Param type error
        if ( inputs.constructor.name !== 'Array' ) {
            throw 'Output Neuron, invoke: Params need to be of type array';
            return 0;
        }

        // This parts actually does stuff:))
        spectrum = spectrum != null ? spectrum : 1; this.output = 0;
        for ( let iter = 0; iter < inputs.length; iter++ ) {
            this.output += inputs[ iter ] * this.weights[ iter ];
        } return this.output > 0;

    }

} module.exports = Neuron;
