


// Neural Network
const Neuron = require( './neuron.js' );
class NeuralNetwork {
    
    /* ---- Constructor ---- */
    constructor( inputNodes, 
                 outputSize, 
                 weightMax, 
                 weightMin,
                 genome ) {
        
        this.inputNodes = inputNodes;
        this.outputNeurons = [ ];
        for ( let iter = 0; iter < outputSize; iter++ ) {
            if ( genome != null && genome[ iter ] != null )
                this.outputNeurons.push( new Neuron( inputNodes, genome[ iter ] ) );
            else this.outputNeurons.push( new Neuron( inputNodes ) );
        }
        
//        for ( let layer = 0; layer < layers; layer++ ) {
//            let layerArr = [];
//            for ( let neuron = 0; neuron < layerSize; neuron++ ) {
//                let prevLayerSize = layer == 0 ? inputNodes : layerSize;
//                    neuron = new Neuron( prevLayerSize, weightMax, weightMin );
//                layerArr.push( neuron );
//            } this.neurons.push( layerArr );
//        }
    }
    
    /* ---- Process Data ---- */
    processData( catRelatedClicks, 
                 catRelatedTimes ) {
        
        // Natural logarithm
        const e = 2.718281828459;
        
        // Param Type Error
        if ( catRelatedClicks.constructor.name !== 'Object' ||
             catRelatedTimes.constructor.name !== 'Object' ) {
            throw 'NeuralNetwork, processData: All params need to be of type Object';
            return null;
        }
        
        // Fields
        let response = [ ], highestKey = 0,
            largestElem = Object.keys( catRelatedClicks ).length >= 
                Object.keys( catRelatedTimes ).length ?
                catRelatedClicks : catRelatedTimes;
        
        // Gets highestkey, used to fill out 'holes'.
        for ( let key of Object.keys( largestElem ) ) {
            if ( typeof key !== 'number' ) key = parseInt( key );
            if ( key > highestKey ) highestKey = key;
        }
        
        // Avg catrelatedtimes
        let avg = 0;
        for ( let key of Object.keys( catRelatedTimes ) ) {
            avg += catRelatedTimes[ key ];
        } avg /= Object.keys( catRelatedTimes ).length;
        
        // Sigmoid
        let sigmoid = (( val, spec ) => {
            return ;
        });
        
        // Does the actual calculation
        for ( let iter = 0; iter <= highestKey; iter++ ) {
            let elem = 0;
            if ( catRelatedClicks[ iter ] == null ||
                 catRelatedTimes[ iter ] == null ) {
                response.push( elem ); continue;   
            }
            
            // Calc
            response[ iter ] = catRelatedClicks[ iter ] * 
                1 / ( 1 + Math.pow( e, -( catRelatedTimes[ iter ] )));
            
        } return response;
        
    }
    
    /* ---- Activate ---- */
    /* ---- Form: ( activate( processData(p1, p2) ) ) ---- */
    activate( inputs ) {
        if ( inputs == null ) return false;
        
    }
    
} module.exports = NeuralNetwork;