const game = () => {
  let pScore = 0;
  let cScore = 0;

  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");
    const audioClick = document.querySelector(".audio-click");
    const bgAudio = document.querySelector(".bg-audio");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
      audioClick.play();
      bgAudio.play();
    });
  };
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    const computerOptions = ["rock", "paper", "scissors"];
    const audioClick = document.querySelector(".audio-click");
    options.forEach((option) => {
      option.addEventListener("click", function () {
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];
        audioClick.play();

        setTimeout(() => {
          compareHands(this.textContent, computerChoice);

          playerHand.src = `./images/${this.textContent}.png`;
          computerHand.src = `./images/${computerChoice}.png`;
        }, 2000);

        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    const winner = document.querySelector(".winner");

    playerScore.textContent = pScore;
    console.log(pScore);

    computerScore.textContent = cScore;
  };

  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");
    const audioWinner = document.querySelector(".audio-winner");
    const audioLoser = document.querySelector(".audio-lose");
    const match = document.querySelector(".match");
    const score = document.querySelector(".score");
    const options = document.querySelector(".options");
    const bgAudio = document.querySelector(".bg-audio");

    if (pScore || cScore == 5) {
      winner.textContent =
        pScore == 5 ? `You are the Real Winner` : `Computer is the Real Winner`;
      match.classList.add("fadeOut");
      score.classList.add("fadeOut");
      options.classList.add("fadeOut");
      bgAudio.pause();
    } else {
      if (playerChoice === computerChoice) {
        winner.textContent = `It's a tie`;
        return;
      }

      if (playerChoice === "rock") {
        if (computerChoice === "scissors") {
          winner.textContent = `Player Wins`;
          pScore++;
          updateScore();
          audioWinner.play();
          return;
        } else {
          winner.textContent = `Computer Wins`;
          cScore++;
          updateScore();
          audioLoser.play();
          return;
        }
      }
      if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
          winner.textContent = `Computer Wins`;
          cScore++;
          updateScore();
          audioLoser.play();
          return;
        } else {
          winner.textContent = `Player Wins`;
          pScore++;
          updateScore();
          audioWinner.play();
          return;
        }
      }
      if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
          winner.textContent = `Computer Wins`;
          cScore++;
          updateScore();
          audioLoser.play();
          return;
        } else {
          winner.textContent = `Player Wins`;
          pScore++;
          updateScore();
          audioWinner.play();
          return;
        }
      }
    }
  };
  startGame();
  playMatch();
};

game();
