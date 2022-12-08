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
  },
  USD: {
    KRW: 1318.97,
    USD: 1,
    VND: 23805.0,
    CNY: 6.97,
    JPY: 136.84,
    THB: 34.77,
    unit: "달러",
  },
  VND: {
    KRW: 0.055,
    USD: 0.000042,
    VND: 1,
    CNY: 0.00029,
    JPY: 0.0057,
    THB: 0.0015,
    unit: "동",
  },
  CNY: {
    KRW: 189.29,
    USD: 0.14,
    VND: 3415.5,
    CNY: 1,
    JPY: 19.63,
    THB: 4.99,
    unit: "위안",
  },
  JPY: {
    KRW: 9.64,
    USD: 0.0073,
    VND: 174.01,
    CNY: 0.051,
    JPY: 1,
    THB: 0.25,
    unit: "엔",
  },
  THB: {
    KRW: 37.96,
    USD: 0.029,
    VND: 685.01,
    CNY: 0.2,
    JPY: 3.94,
    THB: 1,
    unit: "바트",
  },
};
let unitWords = ["", "만", "억", "조", "경"];
let splitUnit = 10000;
let fromCurrency = "USD";
let toCurrency = "USD";

// from 버튼에 클릭이벤트 걸어주기
document.querySelectorAll("#from-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    // 1. 버튼 가져오기
    // 2. 버튼의 값 바꾸기
    document.getElementById("from-button").textContent = this.textContent;
    // 3. 선택된 currency값을 변수에 저장하기
    fromCurrency = this.textContent;
    convert();
  })
);

// to 버튼에 클릭이벤트 걸어주기
document.querySelectorAll("#to-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    // 1. 버튼 가져오기
    // 2. 버튼의 값 바꾸기
    document.getElementById("to-button").textContent = this.textContent;
    // 3. 선택된 currency값을 변수에 저장하기
    toCurrency = this.textContent;
    convert();
  })
);

// 1. 키를 입력하는 순간 환전이 되서 환전된 값이 보인다.
function convert() {
  // 1. 환전 => 얼마를 환전? 가지고 있는 돈이 뭔지, 바꾸고자하는 돈이 뭔지
  // 2. 돈 * 환율 = 환전 금액
  let amount = document.getElementById("from-input").value;
  let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];

  document.getElementById("to-input").value = convertedAmount;
}

// 1. 드랍다운 리스트에 값이 바뀔때 마다 => 환전을 다시한다.
