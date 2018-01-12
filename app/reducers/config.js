

// Init state
const initState = {
  city : null,
};

// Config reducer
const configReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Set city --- */
    case "CONFIG_SET_CITY": {
      return Object.assign({}, state, {
        city : action.payload.id,
      });
    }

    /* ---- Default case ---- */
    default: { return state; }

  }
});

// Exports
export default configReducer;
