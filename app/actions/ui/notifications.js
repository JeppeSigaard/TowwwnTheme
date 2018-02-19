

// Add Notification
const addNotification = (( text ) => {
  return {
    type : "ADD_NOTIFICATION",
    payload : { text }
  };
});

// Exports
export { addNotification };