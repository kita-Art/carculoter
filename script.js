//DOM 요소 연결 시켜여줘야한다
const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button")
//document.querySelector(); => 태그 한개만 가지고와서 변수에 담는다
//document.querySelectorAll => 태그여러개를 리스트형 

let currentinput = "";

const operatorRegex = /^(\d+|\*\*|[+\-*/])$/; // 사칙연산자(+,-,*,/)를 구별하게 해주는 정규표현식
//연산자 구별정규식
//숫자 구별 정규식

const numberRegex = /[0-9]/g; // 숫자를 구별해주는 정규표현식

//input 태그 화면에 숫자 또는 연산자를 추가하는 함수
function appendToScreen(value){
  screen.value += value;

}

//화면 초기화 함수
function clearScreen(){
  screen.value = "";
  //빈인풋값
}

//연산 수행 함수
function calculate(operator,numbers){
  const[num1,num2] = numbers.map(Number);
  //numbers에다가 배열로 된 데이터들을 넣을거임(숫자와연산자.)
  //numbers.map(Number)안에 있는 배열데이터들을 전부 숫자화시켜달라

  switch(operator){
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !==0 ? num1/num2 : "Error";
      //삼항조건식
      //num2가 0이 아닌게 true 이면 num1/num2
    default:
      return "";
  }

}

function handleButtonClick(event){
  event.preventDefault();
  //새로고침되는게 방지가 된다.
  const buttonText = event.target.innerText;

  if(numberRegex.test(buttonText)==true){
    appendToScreen(buttonText);
  }else if(operatorRegex.test(buttonText) == true){
    appendToScreen(buttonText);
  }

}

//버튼 클릭 이벤트 리스너 등록 함수
function initializeButtonListeners(){
  buttons.forEach((button)=>{
   button.addEventListener("click",handleButtonClick);
  })
}

function handleResultClick(){
 const screenValue = screen.value;

 if(screenValue.includes("+")){
  const [num1,num2] = screenValue.split("+");
  screen.value = calculate("+",[num1,num2]);
 }else if(screenValue.includes("-")){
  const [num1,num2] = screenValue.split("-");
  screen.value = calculate("-",[num1,num2]);
 }else if(screenValue.includes("*")){
   const [num1,num2] = screenValue.split("*");
  screen.value = calculate("*",[num1,num2]);
 }else if(screenValue.includes("/")){
   const [num1,num2] = screenValue.split("/");
   screen.value = calculate("/",[num1,num2]);
 }
}

//초기화 버튼 클릭시 화면을 초기화 

document.getElementById("resetButton").addEventListener("click",function(){
  clearScreen();
})

//"=" 버튼 클릭시 계산실행
document.getElementById("result").addEventListener("click",handleResultClick);

//계산기 기능실행
initializeButtonListeners();
