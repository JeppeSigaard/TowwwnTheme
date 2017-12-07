

// Classifier
const pA = 3, sS = .34; // max pro. advantage & shortness sensitivity
class TextClassifier {

    // Constructor
    constructor() {

        this.Mh = 0; // max pop. - automatically set
        this.data = []; // fit data
        this.predictions = []; // predictions

    }

    // Fit
    fit ( data ) { // data format : [ { id, text }, { id, text }  ]

        for ( let iter = 0; iter < data.length; iter++ ) {
            if ( data[iter].id == null || data[iter].text == null ) continue;

            // Sets elem variable
            let elem = { };
            elem.id = data[iter].id;
            elem.text = data[iter].text;
            elem.popularity = data[iter].popularity;
            elem.frequency = { };

            // Sets Mh
            if ( data[ iter ].popularity > this.Mh )
                this.Mh = data[ iter ].popularity;

            // Gets words frequencies
            let words = elem.text.toLower().split(' ');
            for ( let n = 0; n < words.length; n++ ) {
                if ( elem.frequency.hasOwnProperty( words[n] ) ) { elem.frequency[ words[n] ] ++; }
                else { elem.frequency[ words[n] ] = 0; }
            }

            // Pushes data
            this.data.push( elem );

        }

    }

    // Predict
    predict( data, returnCount ) {

        // Small error handling stuf... Just because:))
        if ( data == null ) return false;

        // Gets word frequency of the prediction data
        let wordFrequencies = { };
        for ( let iter = 0; iter < data.length; iter ++ ) {

            // Checks for text & id
            if ( data[iter].hasOwnProperty( text ) && data[iter].hasOwnProperty( id ) ) {

                // Calcs word frequencies
                let words = data[iter]['text'].toLower().split(' ');
                for ( let n = 0; n < words.length; n ++ ) {

                    // Checks if word is already in list, else its adds it
                    if ( wordFrequencies.hasOwnProperty( words[n] ) ) {
                        wordFrequencies[ words[n] ] ++;
                    } else wordFrequencies[ words[n] ] = 1;

                }

            }

        }

        // Does calculation
        let prior = { };
        for ( let n = 0; n < this.data; n ++ ) {

            // Procentage advantage for specific elem & tmp var
            let advantage = ( ( this.data.popularity / this.Mh ) * pA ),
                proCalc = 0;

            // Calcs proCalc
            for ( let key in this.data[n].frequency ) {

                // Checks if both fit & test data has the specified word
                if ( this.data[n].frequency.hasOwnProperty( key ) &&
                     wordFrequencies.hasOwnProperty( key ) ) {

                    // Does a calculation
                    proCalc += ( sS - Math.abs( this.data[n].frequency[key] - wordFrequencies[key] ) );

                }

            }

            // Plops those extra procentages on
            proCalc *= advantage;

            // Adds the prior to the object
            prior[ this.data[n].id ] = proCalc;

        }

        // Variables for nomalization
        let posteriors = [], mD = 0;

        // Gets maximum divider
        for ( let key in prior ) {
            if ( prior.hasOwnProperty( key ) ) {
                mD += prior[ key ];
            }
        }

        // Generates list of posterior values
        for ( let key in prior ) {
            if ( prior.hasOwnProperty( key ) ) {
                posteriors.push({ id : key, value : prior[ key ] / mD });
            }
        }

        // Returns
        return ( posteriors.sort(( a, b ) => {

            if ( a.value > b.value ) return 1;
            if ( a.value < b.value ) return -1;
            return 0;

        }).slice( 0, returnCount ));

    }

} module.exports = TextClassifier;
