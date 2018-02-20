

// Close docs
const close_docs = (() => {
  return ({
    type : 'SET_DOCS_VISIBLE',
    payload : { visible : false }
  });
});

// Open docs
const open_docs = (() => {
  return ({
    type : 'SET_DOCS_VISIBLE',
    payload : { visible : true }
  });
});

// Exports
export {
  close_docs,
  open_docs
};