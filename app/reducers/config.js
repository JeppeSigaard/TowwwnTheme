

// Init state
const initState = {
  city : 2,
};

// Config reducer
const configReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Set city --- */
    case "CONFIG_SET_CITY": {
      return Object.assign({}, state, {
        id : action.payload.id,
      });
    }

    /* ---- Default case ---- */
    default: { return state; }

  }
});

// Exports
export default configReducer;
