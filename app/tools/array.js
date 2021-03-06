

// Shuffle
const shuffle = (( arr ) => {

  // Extracts and sets data
  let currentIndex = arr.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while ( 0 !== currentIndex ) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;

  }

  // Returns
  return arr;

});

// Exports
export { shuffle };
