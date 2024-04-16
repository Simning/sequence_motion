/*
  [동적으로 DOM 생성]
  부모요소.innerHTML= "집어넣을 태그를 문자열"
  > 기존 부모 안 쪽의 자식요소를 모두 제거하고 새로 생성

  부모요소.append(DOM node);
  > 인수로 생성할 태그의 문자열이 아닌 노드를 생성해서 삽입

  새로운 DOM노드 생성방법
  document.createElement('dom이름')
*/

const main = document.querySelector('main'); // main 요소를 변수에 할당
const loading = document.querySelector('aside'); // aside 요소를 변수에 할당
const logo = document.querySelector('p img'); // p 태그 아래의 이미지 요소를 변수에 할당

// 200개의 이미지 요소를 생성하여 main 요소에 추가
for(let i=0; i<200; i++){
  const imgNode = document.createElement('img'); // img 요소 생성
  imgNode.setAttribute('src', `/img/pic${i}.jpg`); // 생성한 img 요소에 src 속성 추가
  main.append(imgNode); // main 요소에 img 요소 추가
}

imgLoaded(); // imgLoaded 함수 호출

// 마우스 이동 시 로고 이미지를 움직이는 이벤트 핸들러 추가
window.addEventListener('mousemove', e=>{
  let x = e.pageX; // 마우스의 x좌표
  let y = e.pageY; // 마우스의 y좌표
  let cx = x/10; // 로고의 x축 이동 거리
  let cy = y/10; // 로고의 y축 이동 거리

  // 로고에 transform 속성 적용하여 마우스 이동에 따라 이동하도록 설정
  logo.style.transform = `translate(${cx}px, ${cy}px)`

  let wid = window.innerWidth; // 브라우저의 가로 길이
  let percent = parseInt((x/wid)*200); // 마우스의 x좌표를 퍼센트로 변환하여 이미지 배열 인덱스로 사용
  const imgs = document.querySelectorAll('main img'); // main 요소 아래의 모든 img 요소 선택

  // 모든 이미지 숨기기
  for(let img of imgs) img.style.display = 'none';
  // 해당 퍼센트 위치의 이미지만 보이도록 설정
  imgs[percent].style.display = 'block';
})

// 이미지 로딩 상태를 확인하고 완료되면 메인 콘텐츠 표시
function imgLoaded(){
  const imgs = document.querySelectorAll('img'); // 모든 이미지 요소 선택
  const len = (imgs.length)-1; // 이미지 요소의 총 개수
  let total = 0; // 로딩된 이미지 수
  let percent = 0; // 로딩 진행 상태 퍼센트

  // 각 이미지 요소에 로딩 완료 이벤트 핸들러 추가
  imgs.forEach(img=>{
    img.addEventListener('load',()=>{
      total++; // 로딩된 이미지 수 증가
      percent = parseInt((total/len)*100) // 로딩 진행 상태 업데이트
      loading.innerText = `${total} / ${len} (${percent}%)`; // 로딩 진행 상태를 화면에 표시
  
      // 모든 이미지가 로딩되면 메인 콘텐츠 표시 및 로딩 UI 제거
      if(total === len){
        main.classList.add('on'); // 메인 콘텐츠 표시
        loading.classList.add('off'); // 로딩 UI 제거
  
        // 일정 시간 후 로딩 UI 제거
        setTimeout(()=>{
          loading.remove(); // 로딩 UI 제거
        },convertSpeed(loading))
      }
    })
  })
}

// CSS transition 속도를 밀리초 단위로 변환하는 함수
function convertSpeed(el){
  let speed = getComputedStyle(el).transitionDuration; // CSS 속성값 가져오기
  speed = parseFloat(speed)*1000; // 초 단위를 밀리초 단위로 변환
  
  return speed; // 변환된 속도 반환
}