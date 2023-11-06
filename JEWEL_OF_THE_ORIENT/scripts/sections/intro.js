const introBegin = document.getElementById("intro-begin");
const introNextButton = document.getElementById("intro-next-button");
const gotItButton = document.getElementById("got-it-button");

const introWindow = document.getElementById("intro-window");
const introInfo = document.getElementById("intro-info");

// intro info slides
const infoSlideOne = document.getElementById("infoslide1");
const infoSlideTwo = document.getElementById("infoslide2");
const infoSlideThree = document.getElementById("infoslide3");

introBegin.onclick = function () {
  switch (isClicked) {
    case 1:
      return false;
  }

  $(introWindow).fadeOut(TRANSITION_LENGTH);
  setTimeout(function () {
    $(introInfo).fadeIn(TRANSITION_LENGTH);
    setTimeout(function () {
      releaseClick();
    }, TRANSITION_LENGTH);
  }, TRANSITION_LENGTH);
}

gotItButton.onclick = function () {
  switch (isClicked) {
    case 1:
      return false;
  }

  $(introInfo).fadeOut(TRANSITION_LENGTH);
  setTimeout(function () {
    $(actualGame).fadeIn(TRANSITION_LENGTH);
    isPlaying = 1;
    setTimeout(function () {
      releaseClick();
    }, TRANSITION_LENGTH);
  }, TRANSITION_LENGTH);
}

let introSlideOrder = 0;
introNextButton.onclick = function () {
  introSlideOrder += 1;
  if (introSlideOrder > 2) {
    introSlideOrder = 0;
  }

  switch (introSlideOrder) {
    case 0:
      infoSlideOne.style.display = "flex";
      infoSlideThree.style.display = "none";
      break;
    case 1:
      infoSlideTwo.style.display = "flex";
      infoSlideOne.style.display = "none";
      break;
    case 2:
      infoSlideThree.style.display = "flex";
      infoSlideTwo.style.display = "none";
      break;
  }
}