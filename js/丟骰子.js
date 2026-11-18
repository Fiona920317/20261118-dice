const dices = document.querySelectorAll(".dice");
const rollBtn = document.querySelector(".roll-the-dice");
const historyArea = document.querySelector(".history-area");
let historyArray = [[3, 2, 3]];

renderHistory(); //初始化

rollBtn.addEventListener("click", function (e) {
  //丟骰子
  let randomNum1 = Math.ceil(Math.random() * 6);
  let randomNum2 = Math.ceil(Math.random() * 6);
  let randomNum3 = Math.ceil(Math.random() * 6);
  // console.log(randomNum1, randomNum2, randomNum3);//檢查

  let currentRoll = [randomNum1, randomNum2, randomNum3];
  updateDiceUI(currentRoll);

  //儲存進historyArray
  if (historyArray.length >= 15) {
    //如果大於等於15筆，就刪掉第14個(最舊的那筆)
    historyArray.pop();
  }
  //然後將最新資料加在陣列最前面
  historyArray.unshift(currentRoll);
  // console.log(historyArray); //檢查
  renderHistory();
});

// 更新主畫面上骰子的函式
function updateDiceUI(rollResult) {
  dices.forEach((dice, index) => {
    // val = 當前處理的值
    let val = rollResult[index];
    //把val渲染到畫面上(放到dice裡面)
    dice.textContent = val;

    // 如果該數字在本次結果中出現大於等於2次，則isSame為true
    let isSame = rollResult.filter((num) => num === val).length >= 2;
    // 若isSame為true(val在此currentResult裡面有重複)，則加上 "same" class，否則移除
    if (isSame) {
      dice.classList.add("same");
    } else {
      dice.classList.remove("same");
    }
  });
}
// 渲染history-area的函式
function renderHistory() {
  // 保留標題 <h2>歷史紀錄</h2>，清空後面的歷史項目再重新組合
  let historyTitle = `<h2>歷史紀錄</h2>`;
  let historyItem = "";
  let miniDiceContent = "";

  for (let i = 0; i < historyArray.length; i++) {
    const history = historyArray[i];
    console.log(history);

    history.forEach((miniDice) => {
      let val = miniDice;
      let isSame = history.filter((num) => num === val).length >= 2;
      console.log(val, isSame);
      if (isSame) {
        miniDiceContent += `<div class="mini-dice same">${val}</div>`;
      } else {
        miniDiceContent += `<div class="mini-dice">${val}</div>`;
      }
    });
    historyItem += `<li class="history">
    <div class="mini-dice-group">
           ${miniDiceContent}
    </div>
           <div class="last-result ${i == 0 ? "active" : ""}">上次結果</div>
          </li>`;
    miniDiceContent = "";
    // console.log(historyItem);//檢查
  }

  historyArea.innerHTML = historyTitle + historyItem;
}
