const TRANSITION_LENGTH = 2000;

let goldCount = 150;
let paperMoney = 0;
let foodSupplies = 300;
let healthBar = 100;
let distance = 0;
let arrows = 50;

let isPlaying = 0;
let isStarving = 0;

let pastCities = 0;
let lastCity = "";

const cityFoodItems = {
  Hami: "SWEET MELONS",
  Kaifeng: "FOOD",
  Yangzhou: "PLUMS",
};

const cityCurrency = {
  Hami: "GOLD",
  Kaifeng: "PAPER MONEY",
  Yangzhou: "PAPER MONEY",
}

const actualGame = document.getElementById("actual-game");
const huntingGame = document.getElementById("hunting-game");
const caravanScreen = document.getElementById("caravan-screen");

const goldCounter = document.getElementById("gold-counter");
const paperMoneyCounter = document.getElementById("paper-money-counter");
const foodCounter = document.getElementById("food-counter");
const healthStatus = document.getElementById("health-status");
const distanceCounter = document.getElementById("distance-counter");
const arrowCount = document.getElementById("arrow-count");
const travelStatus = document.getElementById("travel-status");

const cityStops = document.getElementById("city-stops");
const cityStop1 = document.getElementById("citystop1");
const book = document.getElementById("book");
const cityStop2 = document.getElementById("citystop2");
const cityStop3 = document.getElementById("citystop3");

const tradeButton = document.getElementById("trade-button");
const continueButton = document.getElementById("continue-button");

const tradingCenter = document.getElementById("trading-center");
const quitTradingButton = document.getElementById("quit-trading");
const tradeForFoodButton = document.getElementById("trade-for-food");
const tradeForGoldButton = document.getElementById("trade-for-gold");
const tradeForArrowsButton = document.getElementById("trade-for-arrows");
const convertToPaperButton = document.getElementById("convert-to-paper");

const huntButton = document.getElementById("hunt-btn");
const huntChanceButton = document.getElementById("hunt-chance-button");
const huntStatus = document.getElementById("hunt-status");
const quitHuntingButton = document.getElementById("quit-hunting-button");

const caravanButton = document.getElementById("caravan-btn");
const quitCaravanButton = document.getElementById("quit-caravan");
const restButton = document.getElementById("rest-btn");

const causaMortis = document.getElementById("causa-mortis");
const retryButton = document.getElementById("retry-button");
const realDeath = document.getElementById("death-screen");

const endScreen = document.getElementById("end-screen");
const profitCount = document.getElementById("profit-count");
const gluttonCount = document.getElementById("glutton-count");
const doctorCount = document.getElementById("doctor-count");
const endRetry = document.getElementById("end-retry");

function deathScreen (causaMortem) {
  goldCount = 150;
  foodSupplies = 300;
  healthBar = 100;
  distance = 0;
  arrows = 50;

  isPlaying = 0;
  isStarving = 0;
  huntStatus.innerText = "";
  causaMortis.innerText = causaMortem;

  actualGame.style.display = "none";
  realDeath.style.display = "block";
}

retryButton.onclick = function() {
  realDeath.style.display = "none";
  actualGame.style.display = "block";
  isPlaying = 1;
}

endRetry.onclick = function () {
  goldCount = 150;
  foodSupplies = 300;
  healthBar = 100;
  distance = 0;
  arrows = 50;

  isPlaying = 0;
  isStarving = 0;
  huntStatus.innerText = "";

  endScreen.style.display = "none";
  actualGame.style.display = "block";
  isPlaying = 1;
}

let isResting = 0;
restButton.onclick = function () {
  switch (isResting) {
    case 1:
      return false;
  }
  
  if (healthBar < 100) {
    if (foodSupplies < 30) {
      travelStatus.innerText = "Not enough food to rest.";
      clearTravelStatus();
    }

    else {
      foodSupplies -= 30;
      healthBar += 10;
      travelStatus.innerText = "Rested for one day.";

      isResting = 1;
      clearTravelStatus();

      setTimeout(function () {
        isResting = 0;
      }, 6000);
    }
  }

  else {
    travelStatus.innerText = "There's no need to rest.";
    clearTravelStatus();
  }
}

caravanButton.onclick = function() {
  actualGame.style.display = "none";
  caravanScreen.style.display = "block";
  isPlaying = 0;
}

quitCaravanButton.onclick = function() {
  caravanScreen.style.display = "none";
  actualGame.style.display = "block";
  isPlaying = 1;
}

huntButton.onclick = function() {
  actualGame.style.display = "none";
  huntingGame.style.display = "block";
  isPlaying = 0;
}

huntChanceButton.onclick = function() {
  if (arrows < 1) {
    huntStatus.innerText = "No arrows left.";
    return false;
  }

  let randHunt = Math.floor(Math.random() * 9);
  arrows -= 1;

  switch (randHunt) {
    default:
      huntStatus.innerText = "Nothing caught.";
      break;
    case 0:
    case 1:
    case 2:
      huntStatus.innerText = "Caught a morsel.";
      foodSupplies += 10;
      isStarving = 0;
      break;
    case 3:
      huntStatus.innerText = "Caught a lot.";
      foodSupplies += 60;
      isStarving = 0;
      break;
  }
}

quitHuntingButton.onclick = function() {
  huntingGame.style.display = "none";
  actualGame.style.display = "block";
  isPlaying = 1;
}

let healthTemp = "";
let healthColorTemp = "";
setInterval(function() {
  goldCounter.innerText = goldCount;
  paperMoneyCounter.innerText = paperMoney;
  foodCounter.innerText = foodSupplies;
  arrowCount.innerText = arrows;

  switch (isStarving) {
    case 1:
      healthBar -= 1;

      if (healthBar < 1) {
        switch (isPlaying) {
          case 1:
            deathScreen("STARVATION");
            break;
        }
      }
      break;
  }

  if (healthBar > 66) {
    healthTemp = "Good";
    healthColorTemp = "#12b500";
  }

  else if (healthBar > 33 && healthBar < 66) {
    healthTemp = "Fair";
    healthColorTemp = "#ada617";
  }

  else {
    healthTemp = "Poor";
    healthColorTemp = "#ad1717";
  }
  healthStatus.innerHTML = `<span style="color: ${healthColorTemp}">${healthTemp}</span>`;

  switch (isPlaying) {
    case 1:
      distance += 13;
      if (distance >= 500 && pastCities == 0) {
        isPlaying = 0;
        cityStops.style.display = "block";
        cityStop1.style.display = "block";
        cityStop2.style.display = "none";
        cityStop3.style.display = "none";
        actualGame.style.display = "none";
        lastCity = "Hami";
        ++pastCities;
      } else if (distance >= 1000 && pastCities == 1) {
        isPlaying = 0;
        cityStops.style.display = "block";
        cityStop1.style.display = "none";
        cityStop2.style.display = "block";
        cityStop3.style.display = "none";
        actualGame.style.display = "none";
        lastCity = "Kaifeng";
        ++pastCities;
        if (Math.random() < 0.25 || goldCount >= 175) {
          travelStatus.innerText = "You manage to get your hands on a boat! Switching to canal route.";
          clearTravelStatus();
          distance += 40;
        }
      } else if (distance >= 1500 && pastCities == 2) {
        isPlaying = 0;
        cityStops.style.display = "block";
        cityStop1.style.display = "none";
        cityStop2.style.display = "none";
        cityStop3.style.display = "block";
        actualGame.style.display = "none";
        lastCity = "Yangzhou";
        ++pastCities;
      } else if (distance >= 2000 && pastCities == 3) {
        isPlaying = 0;
        actualGame.style.display = "none";
        endScreen.style.display = "block";

        let profitPlayed = goldCount - 150;
        profitCount.innerText = profitPlayed;

        if (profitPlayed < 1) {
          profitCount.style.color = "red";
        }

        else {
          profitCount.style.color = "darkgreen"; 
        }

        gluttonCount.innerText = foodSupplies;
        doctorCount.innerText = healthStatus.innerText;
        doctorCount.style.color = healthStatus.style.color;
        isPlaying = 0;
      }
      break;
  }
  distanceCounter.innerText = distance;
}, 1000);

function clearTravelStatus() {
  setTimeout(function() {
    travelStatus.innerText = "";
  }, 6000);
}

setInterval(function() {
  switch (isPlaying) {
    case 1:
      foodSupplies -= 33;
      if (foodSupplies < 1) {
        isStarving = 1;
        foodSupplies = 0;
      }

      let randomTravelChance = 0;
      randomTravelChance = Math.floor(Math.random() * 14);

      switch (randomTravelChance) {
        case 0:
          travelStatus.innerText = "Bad storms. Forced to find alternate route.";
          distance -= 50;

          if (distance < 0) {
            distance = 0;
          }
          clearTravelStatus();
          break;
        case 1:
          travelStatus.innerText = "Bandits on the trail. ";
          let lostGold = 0;
          if (arrows > 0) {
            lostGold = Math.floor(Math.random() * 50);
          }

          else {
            lostGold = Math.floor(Math.random() * 40) + 30;
          }

          travelStatus.innerText += " Lost " + lostGold + " gold.";
          goldCount -= lostGold;

          if (goldCount < 1) {
            goldCount = 0;
          }
          clearTravelStatus();
          break;
        case 2:
          travelStatus.innerText = "Heat spoiled some food. ";
          let lostFood = Math.floor(Math.random() * 50) + 1;
          travelStatus.innerText += " Lost " + lostFood + " food.";
          foodSupplies -= lostFood;

          if (foodSupplies < 1) {
            isStarving = 1;
          }
          clearTravelStatus();
          break;
        case 3:
          travelStatus.innerText = "One of the donkeys was injured. Forced to slow down.";
          distance = Math.max(0, distance - 80);
          clearTravelStatus();
          break;
        case 4:
          let lostHealth = Math.min(Math.floor(Math.random() * 30) + 1, health + 1);
          travelStatus.innerText = "Black Plague. Lost " + lostHealth + " health.";
          healthBar -= lostHealth;

          if (lostHealth < 1) {
            deathScreen("The Black Plague");
          }
          clearTravelStatus();
          break;
      }
      break;
  }
}, 8000);

continueButton.onclick = function() {
  cityStops.style.display = "none";
  actualGame.style.display = "block";
  isPlaying = 1;
}

tradeButton.onclick = function() {
  cityStops.style.display = "none";
  tradingCenter.style.display = "block";
  tradeForFoodButton.style.display = "block";
  tradeForGoldButton.style.display = "block";
  tradeForArrowsButton.style.display = "block";
  convertToPaperButton.style.display = lastCity == "Hami" ? "block" : "none";

  let foodRate = Math.round(((Math.random() * 1 - 0.5) + (50 / 12)) * 25);
  let arrowRate = Math.round(((Math.random() * 0.2 - 0.1) + (12 / 40)) * 50);

  tradeForFoodButton.innerText = `[ TRADE $25 WORTH OF ${cityCurrency[lastCity]} FOR ${foodRate} LB WORTH OF ${cityFoodItems[lastCity]} ]`;
  tradeForGoldButton.innerText = `[ TRADE ${foodRate} LB WORTH OF ${cityFoodItems[lastCity]} FOR $25 WORTH OF ${cityCurrency[lastCity]} ]`;
  tradeForArrowsButton.innerText = `[ TRADE $50 WORTH OF ${cityCurrency[lastCity]} FOR ${arrowRate} ARROWS ]`;

  tradeForFoodButton.onclick = function() {
    switch (cityCurrency[lastCity]) {
      case "GOLD":
        if (goldCount >= 25) {
          goldCount -= 25;

          if (Math.random() < 0.1) {
            travelStatus.innerText = "That bastard robbed you! No new food for you.";
            clearTravelStatus();
          } else {
            foodSupplies += foodRate;
          }
        }
        break;

      case "PAPER MONEY":
        if (paperMoney >= 25) {
            paperMoney -= 25;

          if (Math.random() < 0.1) {
            travelStatus.innerText = "That bastard robbed you! No new food for you.";
            clearTravelStatus();
          } else {
            foodSupplies += foodRate;
          }
        }
        break;
    }
    tradeForFoodButton.style.display = "none";
  }
  tradeForGoldButton.onclick = function() {
    foodSupplies -= foodRate;
    if (foodSupplies >= foodRate) {
      switch (cityCurrency[lastCity]) {
        case "GOLD":
          if (Math.random() < 0.1) {
            travelStatus.innerText = "That bastard robbed you! No new gold for you.";
            clearTravelStatus();
          } else {
            goldCount += 25;
          }
          break;

        case "PAPER MONEY":
          if (Math.random() < 0.1) {
            travelStatus.innerText = "That bastard robbed you! No new money for you.";
            clearTravelStatus();
          } else {
            paperMoney += 25;
          }
          break;
      }
    }
    tradeForGoldButton.style.display = "none";
  }
  tradeForArrowsButton.onclick = function () {
    switch (cityCurrency[lastCity]) {
      case "GOLD":
        if (goldCount >= 25) {
          goldCount -= 25;

          if (Math.random() < 0.1) {
            travelStatus.innerText = "That bastard robbed you! No new arrows for you.";
            clearTravelStatus();
          } else {
            arrows += arrowRate;
          }
        }
        break;

      case "PAPER MONEY":
        if (paperMoney >= 25) {
          paperMoney -= 25;

          if (Math.random() < 0.1) {
            travelStatus.innerText = "That bastard robbed you! No new arrows for you.";
            clearTravelStatus();
          } else {
            arrows += arrowRate;
          }
        }
        break;
    }
    tradeForArrowsButton.style.display = "none";
  }
}

convertToPaperButton.onclick = function () {
  paperMoney += Math.floor(goldCount * 0.95);
  goldCount = 0;
  convertToPaperButton.style.display = "none";
}

quitTradingButton.onclick = function () {
  cityStops.style.display = "none";
  tradingCenter.style.display = "none";
  actualGame.style.display = "block";
  isPlaying = 1;
}