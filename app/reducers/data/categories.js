

// Init state
const initState = {
  fetching : false,
  fetched  : true,
  elements : { },
  sub_elements : { },
};

// Categories reducer
const CategoriesReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Categories fetching ---- */
    case "CATEGORIES_FETCHING": {
      return Object.assign({}, state, {
        fetching : true,
      });
    }

    /* ---- Categories fetched ---- */
    case "CATEGORIES_FETCHED": {

      // Error handling
      if ( action.payload.elements == null ||
           action.payload.elements.length <= 0 ) { return state; }

      // Formats data
      let formatteddata = { };
      for ( let n = 0; n < action.payload.elements.length; n++ ) {
        let elem = action.payload.elements[n];

        // Gets sub category count data
        let subcat_counter = 0;
        for ( let i = 0; i < action.payload.elements.length; i++ ) {
          let sub_elem = action.payload.elements[i];
          if ( elem.category_id === sub_elem.category_parent ) {
            subcat_counter ++;
          }
        }

        // Inserts sub category count data
        action.payload.elements[n].subcategory_count = subcat_counter;

        // Sets formatted data
        formatteddata[action.payload.elements[n].category_id] = elem;

      }

      // Combines the formatted data with previous state
      let resp = Object.assign( state.elements, formatteddata );

      // Returns
      return Object.assign({}, state, {
        fetching : false,
        fetched  : true,
        elements : resp,
      });

    }

    /* ---- Default ---- */
    default: { return state; }

  }
});

// Exports
export default CategoriesReducer;
