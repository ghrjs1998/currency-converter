// 1. 환율을 바꿀 박스 2개만들기
// 2. dropdown 리스트만들기
// 3. 환율정보 들고오기
// 4. dropdown 리스트에서 아이템 선택하면 아이템이 바뀜
// 5. 금액을 입력하면 환전이 된다.
// 6. 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위 기준으로 환전이 됨
// 7. 숫자를 한국어로 읽는법
// 8. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 환율이 적용이 된다.

let currencyRatio = {
  KRW: {
    KRW: 1,
    USD: 0.00076,
    VND: 18.04,
    CNY: 0.0053,
    JPY: 0.1,
    THB: 0.026,
    unit: "원",
    img: "/JS/flags/south-korea.png",
  },
  USD: {
    KRW: 1318.97,
    USD: 1,
    VND: 23805.0,
    CNY: 6.97,
    JPY: 136.84,
    THB: 34.77,
    unit: "달러",
    img: "/JS/flags/united-states.png",
  },
  VND: {
    KRW: 0.055,
    USD: 0.000042,
    VND: 1,
    CNY: 0.00029,
    JPY: 0.0057,
    THB: 0.0015,
    unit: "동",
    img: "/JS/flags/vietnam.png",
  },
  CNY: {
    KRW: 189.29,
    USD: 0.14,
    VND: 3415.5,
    CNY: 1,
    JPY: 19.63,
    THB: 4.99,
    unit: "위안",
    img: "/JS/flags/china.png",
  },
  JPY: {
    KRW: 9.64,
    USD: 0.0073,
    VND: 174.01,
    CNY: 0.051,
    JPY: 1,
    THB: 0.25,
    unit: "엔",
    img: "/JS/flags/japan.png",
  },
  THB: {
    KRW: 37.96,
    USD: 0.029,
    VND: 685.01,
    CNY: 0.2,
    JPY: 3.94,
    THB: 1,
    unit: "바트",
    img: "/JS/flags/thailand.png",
  },
};
let unitWords = ["", "만", "억", "조", "경", "해"];
let splitUnit = 10000;
let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");
let fromCurrency = "USD";
let toCurrency = "USD";

// from 버튼에 클릭이벤트 걸어주기
document.querySelectorAll("#from-currency-list li").forEach((item) =>
  item.addEventListener("click", function () {
    fromCurrency = this.id;
    fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
    convert("from");
  })
);

// to 버튼에 클릭이벤트 걸어주기
document.querySelectorAll("#to-currency-list li").forEach((item) =>
  item.addEventListener("click", function () {
    toCurrency = this.id;
    toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
    convert("from");
  })
);

// 1. 키를 입력하는 순간 환전이 되서 환전된 값이 보인다.
function convert(type) {
  let mount = 0;
  if (type === "from") {
    // 입력값 받기
    amount = document.getElementById("fromAmount").value;
    // 환전하기
    let convertAmount = amount * currencyRatio[fromCurrency][toCurrency];
    // 환전한값 보여주기
    document.getElementById("toAmount").value = convertAmount;
    // 환전한값 한국어로
    renderKoreanNumber(amount, convertAmount);
  } else {
    amount = document.getElementById("toAmount").value;
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
    document.getElementById("fromAmount").value = convertedAmount;
    renderKoreanNumber(convertedAmount, amount);
  }
}

function renderKoreanNumber(from, to) {
  document.getElementById("fromNumToKorea").textContent =
    readNum(from) + currencyRatio[fromCurrency].unit;
  document.getElementById("toNumToKorea").textContent =
    readNum(to) + currencyRatio[toCurrency].unit;
}

function readNum(num) {
  let resultString = "";
  let resultArray = [];
  for (let i = 0; i < unitWords.length; i++) {
    let unitResult =
      (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);

    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }
  return resultString;
}
