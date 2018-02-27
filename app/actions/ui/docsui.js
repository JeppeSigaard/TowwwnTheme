

// Close docs
const close_docs = (() => {
  return ({
    type : 'SET_DOCS_VISIBLE',
    payload : { visible : false }
  });
});

// Open docs
const open_docs = (( index ) => {
  return ({
    type : 'SET_DOCS_VISIBLE',
    payload : { visible : true, index }
  });
});

// Exports
export {
  close_docs,
  open_docs
};