$(document).ready(function () {

  // Number to guess
  var targetNumber = 0;

  // Total points of player
  var totalPoints = 0;

  // Total game wins
  var gameWins = 0;

  // Total game losses
  var gameLosses = 0;

  // Crystal values
  var crystalValues = [];

  // Game win sound
  var audioWin = document.createElement("audio");
  audioWin.setAttribute("src", "assets/audio/fake_applause.mp3")

  // Game lose sound
  var audioLose = document.createElement("audio");
  audioLose.setAttribute("src", "assets/audio/crowd_boo.mp3")

  // Function to call when document loads or when player wins/losses.
  function initialization() {
    targetNumber = getRandomNumber(19, 120);
    totalPoints = 0;
    crystalValues = [];

    // Don't allow the same crystal value for multiple crystals.
    // Make it fair for the user!
    // Hard stop at 10 attempts to prevent the small possibility of infinite loops.
    var tmpCrystalValue = 0;
    var tmpCrystalAttribute = "";
    for (var crystalLoop = 0; crystalLoop < 4; crystalLoop++) {
      tmpCrystalValue = getRandomNumber(1, 12);
      switch (crystalLoop) {
        case 0:
          tmpCrystalAttribute = $("#crystalOne");
          break;
        case 1:
          tmpCrystalAttribute = $("#crystalTwo");
          break;
        case 2:
          tmpCrystalAttribute = $("#crystalThree");
          break;
        case 3:
          tmpCrystalAttribute = $("#crystalFour");
          break;
      }
      for (var i = 0; i < 10; i++) {
        if (crystalValues.length > 0 && crystalValues.includes(tmpCrystalValue)) {
          tmpCrystalValue = getRandomNumber(1, 12);
        } else {
          break;
        }
      }
      crystalValues.push(tmpCrystalValue);
      tmpCrystalAttribute.attr("crystalValue", tmpCrystalValue);
    }

    $("#gameNumber").text("Target Number: " + targetNumber);
    $("#winsLosses").text("Wins: " + gameWins + " Losses: " + gameLosses);
    $("#totalScore").text("Total Points: " + totalPoints);
  }

  // Array of images.
  var imageArray = {
    crystalOne: {
      imgHtml: "assets/images/green.jpg"
    },
    crystalTwo: {
      imgHtml: "assets/images/purple.jpg"
    },
    crystalThree: {
      imgHtml: "assets/images/red.jpg"
    },
    crystalFour: {
      imgHtml: "assets/images/yellow.jpg"
    }
  }

  // Given a min and max value, return a whole number in that range.
  function getRandomNumber(minValue, maxValue) {
    return (Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
  }

  // Clicking a crystal image changes our score.
  $(".crystalClicking").on("click", function () {

    var currentValue = parseInt($(this).attr("crystalValue"));
    totalPoints += currentValue;

    $("#totalScore").text("Total Points: " + totalPoints);

    if (totalPoints === targetNumber) {
      gameWins++;
      audioWin.play();
      $("#winsLosses").text("Wins: " + gameWins + " Losses: " + gameLosses);
      initialization();
    } else if (totalPoints > targetNumber) {
      gameLosses++;
      audioLose.play();
      $("#winsLosses").text("Wins: " + gameWins + " Losses: " + gameLosses);
      initialization();
    }

  })

  // Call our initialization function and display the crystal images.
  initialization();
  $("#crystalOne").attr("src", imageArray.crystalOne.imgHtml);
  $("#crystalTwo").attr("src", imageArray.crystalTwo.imgHtml);
  $("#crystalThree").attr("src", imageArray.crystalThree.imgHtml);
  $("#crystalFour").attr("src", imageArray.crystalFour.imgHtml);

})

