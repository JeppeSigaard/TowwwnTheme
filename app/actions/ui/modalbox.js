

// Enable modal box
const enableModalBox = (( content, title, headless, borderless, closeable, onClose ) => {
  return {
    type : "ENABLE_MODALBOX",
    payload : {
      content, title, headless,
      borderless, closeable, onClose
    }
  };
});

// Disable modal box
const disableModalBox = (() => {
  return {
    type : "DISABLE_MODALBOX",
  };
});

// Exports
export { enableModalBox, disableModalBox };