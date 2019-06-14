const washingMachine = (socksToWash, noOfWashesLeft, 
  uniqueCleanSockCount, uniqueDirtySockCount
) => {
  let shouldStillWashThisSockType = false;

  // check if there are dirty socks to wash
  if (uniqueDirtySockCount[socksToWash]) { 
    uniqueCleanSockCount[socksToWash] += 1;
    uniqueDirtySockCount[socksToWash] -= 1;
    noOfWashesLeft -= 1;
  }

  // check if it can still wash
  if ((uniqueCleanSockCount[socksToWash] % 2) === 0 &&
    uniqueDirtySockCount[socksToWash] > 1 &&
    noOfWashesLeft > 1
  ) {
    shouldStillWashThisSockType = true;
  }

  if ((uniqueCleanSockCount[socksToWash] % 2) === 1 && 
    uniqueDirtySockCount[socksToWash] &&
    noOfWashesLeft
  ) {
    shouldStillWashThisSockType = true;
  } 

  return {
    noOfWashesLeft,
    uniqueCleanSockCount,
    uniqueDirtySockCount,
    shouldStillWashThisSockType
  }
}

const checkIfToWashSock = (sock, {
  noOfWashesLeft,
  uniqueCleanSockCount,
  uniqueDirtySockCount
}) => {
  let washSock = false;

  if (uniqueDirtySockCount[sock] && noOfWashesLeft) {
    washSock = true;
  }
  
  if (washSock && 
      (uniqueCleanSockCount[sock] % 2) === 0 &&
      uniqueDirtySockCount[sock] > 1 &&
      noOfWashesLeft > 1
  ) {
    washSock = true;
  } else if (washSock && 
    (uniqueCleanSockCount[sock] % 2) === 1 &&
    uniqueDirtySockCount[sock] >= 1 &&
    noOfWashesLeft >= 1 
  ) {
    washSock = true;
  } else {
    washSock = false;
  }

  return washSock;
}

const countSocks = (cleanPile = [], dirtyPile = []) => {
  const reducer = (accum, curr) => {
    if (typeof accum[curr] === 'undefined') {
      accum[curr] = 1;
    } else {
      accum[curr] += 1;
    }

    return accum;
  }

  const uniqueCleanSockCount = cleanPile.reduce(reducer, {});
  const uniqueDirtySockCount = dirtyPile.reduce(reducer, {});
console.log(uniqueCleanSockCount, uniqueDirtySockCount)
  return {
    uniqueCleanSockCount,
    uniqueDirtySockCount
  }
}

const getMaxNumberOfSockPair = (uniqueCleanSockCount) => {
  const maxNumberOfSockPair = Object.keys(uniqueCleanSockCount).reduce((accum, curr) => {
    accum += Math.floor(uniqueCleanSockCount[curr] / 2);

    return accum;
  }, 0);

  return maxNumberOfSockPair;
}

const washByCleanLaundry = (laundry) => {
  Object.keys(laundry.uniqueCleanSockCount).forEach((sock) => {
      const washSock = checkIfToWashSock(sock, laundry);
      if (!washSock) {
        return;
      }

      let shouldStillWashThisSockType = true;
    
      while(shouldStillWashThisSockType) {
        const doneLaundry = washingMachine(
                              sock, 
                              laundry.noOfWashesLeft,
                              laundry.uniqueCleanSockCount,
                              laundry.uniqueDirtySockCount
                            );
        laundry.uniqueCleanSockCount = doneLaundry.uniqueCleanSockCount;
        laundry.uniqueDirtySockCount = doneLaundry.uniqueDirtySockCount;
        laundry.noOfWashesLeft = doneLaundry.noOfWashesLeft;
        shouldStillWashThisSockType = doneLaundry.shouldStillWashThisSockType;
      }
  });

  return laundry;
}

const washByDirtyLaundry = (laundry) => {
  Object.keys(laundry.uniqueDirtySockCount).forEach((sock) => {
    if (laundry.uniqueDirtySockCount[sock] <= 1 ||
        laundry.noOfWashesLeft <= 1) {
        return;
    }

    if (laundry.noOfWashesLeft >= laundry.uniqueDirtySockCount[sock]) {
      laundry.uniqueCleanSockCount[sock] = laundry.uniqueDirtySockCount[sock];
      laundry.noOfWashesLeft -= laundry.uniqueDirtySockCount[sock];
      laundry.uniqueDirtySockCount[sock] = 0;
      return;
    }

    if (laundry.noOfWashesLeft < laundry.uniqueDirtySockCount[sock]) {
      const aPairOfSocks = 2;

      const maxPairWash = Math.floor(laundry.noOfWashesLeft / aPairOfSocks);
      laundry.uniqueCleanSockCount[sock] = maxPairWash * aPairOfSocks;
      laundry.uniqueDirtySockCount[sock] -= laundry.uniqueCleanSockCount[sock];
      laundry.noOfWashesLeft -= laundry.uniqueCleanSockCount[sock];
      return;
    }
  });

  return laundry;
}

const washLaundry = (
  noOfWashes, uniqueCleanSockCount, uniqueDirtySockCount
) => {
  let laundry = {
    noOfWashesLeft: noOfWashes,
    uniqueCleanSockCount,
    uniqueDirtySockCount
  };

  laundry = washByCleanLaundry(laundry);
  laundry = washByDirtyLaundry(laundry);

  return laundry;
}

const doLaundry = ({ noOfWashes, cleanPile, dirtyPile }) => {
  const { 
    uniqueCleanSockCount,
    uniqueDirtySockCount 
  } = countSocks(cleanPile, dirtyPile);

  const laundry = washLaundry(noOfWashes, uniqueCleanSockCount, uniqueDirtySockCount);

  laundry.maxNumberOfSockPair = getMaxNumberOfSockPair(
    laundry.uniqueCleanSockCount);

  return laundry;
}

laundryy = {
  noOfWashes: 10,
  cleanPile: [1, 2, 1, 1, 4, 5, 4, 6, 8, 0, 5, 5, 5,],
  dirtyPile: [1, 4, 3, 2, 4, 4, 5, 8, 8]
};

laundry = {
  noOfWashes: 20,
  cleanPile: [1, 2, 1, 1],
  dirtyPile: [1, 4, 3, 2, 4],
};