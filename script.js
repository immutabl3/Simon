$(document).ready(function() {
  let count = 1;
  let compPicks = [];
  let playerMoves = [];
  let playerTurn = false;
  let strict = false;
  var audio = [];
  audio[0] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  audio[1] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
  audio[2] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
  audio[3] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

  // pick a random button and then animate the light up sequence to follow
  function computerMove() {
    let randomPick = Math.ceil(Math.random() * 4);
    compPicks.push(randomPick);
    showSequence();
  }

  // check the player's last press to either let them continue, end the game, or add another step to the sequence
  function checkMove() {
    let tempArr = compPicks.slice(0, playerMoves.length);

    // if the player's button presses match the sequence so far
    if (playerMoves.toString() === tempArr.toString()) {
      // when the player is done with the correct sequence
      if (playerMoves.length === compPicks.length) {
        // end the game if the player gets up to 20
        if (count === 20) {
          $("#display").html("You Completed Level 20!");
          playerTurn = false;
          $(".colorButton").css("pointer-events", "none");
          setTimeout(function() {
            $("#display").html("You Win!");
          }, 2000);
        } else {
          $(".colorButton").css("pointer-events", "none");
          playerTurn = false;
          playerMoves = [];
          computerMove();
          setTimeout(function() {
            count++;
            $("#display").html(`Count: ${count}`);
          }, 500);
        }
      }
      // if strict and the player makes a mistake, end the game, otherwise replay the sequence
    } else if (playerMoves.toString() !== tempArr.toString()) {
      if (strict === false) {
        playerTurn = false;
        playerMoves = [];
        $(".colorButton").css("pointer-events", "none");
        $("#display").html("Whoops!");
        setTimeout(function() {
          $("#display").html("One More Time");
          showSequence();
        }, 1500);
      } else if (strict === true) {
        playerTurn = false;
        $(".colorButton").css("pointer-events", "none");
        $("#display").html("Game Over");
        $(".colorButton").addClass("pressAnimation");
        setTimeout(function() {
          $(".colorButton").removeClass("pressAnimation");
        }, 2000);
      }
    }
  }

  function showSequence() {
    $(".colorButton").css("pointer-events", "none");
    playerTurn = false;
    let counter = 0;
    let timer = setInterval(function() {
      let button = compPicks[counter];

      if (counter >= compPicks.length) {
        playerTurn = true;
        clearInterval(timer);
      } else if (counter < compPicks.length) {
        $(`.colorButton:nth-child(${button})`).addClass("pressAnimation");
        audio[button - 1].play();
        setTimeout(function() {
          $(`.colorButton:nth-child(${button})`).removeClass("pressAnimation");
          counter++;
        }, 500);
      }
    }, 1000);

    // won't turn the player mouse back on until the sequence is done
    let timeOut = compPicks.length * 1000 + 1000;
    setTimeout(function() {
      $(".colorButton").css("pointer-events", "auto");
      $("#display").html(`Count: ${count}`);
    }, timeOut);
  } // end of showSequence()

  $(".colorButton").on("click touch", function() {
    if (playerTurn === true) {
      playerMoves.push($(".colorButton").index($(this)) + 1);
      audio[$(this).index()].play();
    }
    checkMove();
  });

  // animate the buttons on touch so the mobile users can see where they are pressing
  $(".colorButton").on("touchstart", function() {
    let temp = $(this).index() + 1;
    $(`.colorButton:nth-child(${temp})`).addClass("pressAnimation");
    setTimeout(function() {
      $(`.colorButton:nth-child(${temp})`).removeClass("pressAnimation");
    }, 100);
  });

  $("#start").click(function() {
    let counter = 0;
    let startAnimation = setInterval(function() {
      if (counter === 11) {
        $(".colorButton").addClass("pressAnimation");
        setTimeout(function() {
          $(".colorButton").removeClass("pressAnimation");
          let displayCounter = 0;
          let displayAnimation = setInterval(function() {
            if (displayCounter === 7) {
              clearInterval(displayAnimation);
            } else if (displayCounter % 2 === 0) {
              $("#display").css("visibility", "visible");
              displayCounter++;
            } else {
              $("#display").css("visibility", "hidden");
              displayCounter++;
            }
          }, 200);
        }, 750);
        clearInterval(startAnimation);
      } else if (counter >= 6) {
        let childCounter = counter - 5;
        $(`.colorButton:nth-child(${childCounter})`).addClass("pressAnimation");
        $(`.colorButton:nth-child(${childCounter - 1})`).removeClass(
          "pressAnimation"
        );
        counter++;
      } else if (counter % 2 === 0) {
        $(".colorButton").addClass("pressAnimation");
        counter++;
      } else if (counter % 2 !== 0) {
        $(".colorButton").removeClass("pressAnimation");
        counter++;
      }
    }, 200);
    setTimeout(computerMove, 5000);
    $("#controls").css("pointer-events", "none");
    $("#restart").css("pointer-events", "auto");
  }); // end of #start.click()

  $(".controlButton").click(function() {
    if ($(this).attr("id") === "normal") {
      $("#normal").addClass("selected");
      $("#strict").removeClass("selected");
      strict = false;
    } else if ($(this).attr("id") === "strict") {
      $("#normal").removeClass("selected");
      $("#strict").addClass("selected");
      strict = true;
    } else if ($(this).attr("id") === "restart") {
      history.go(0);
      location.reload(true);
    }
  });
}); //end of document.ready()
