const dices = document.querySelectorAll(".dice");
const rollBtn = document.querySelector(".roll-the-dice");
let historyArray = [];

rollBtn.addEventListener("click", function (e) {
  //丟骰子
  let randomNum1 = Math.ceil(Math.random() * 6);
  let randomNum2 = Math.ceil(Math.random() * 6);
  let randomNum3 = Math.ceil(Math.random() * 6);
  console.log(randomNum1, randomNum2, randomNum3);

  //儲存進historyArray
  if (historyArray.length >= 15) {
    //如果大於等於15筆，就刪掉第0個(最舊的那筆)
    historyArray.shift();
  }
  //將最新資料push進去
  historyArray.push({ randomNum1, randomNum2, randomNum3 });
  console.log(historyArray); //檢查
});
