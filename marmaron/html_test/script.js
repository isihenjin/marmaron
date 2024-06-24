const boxesContainer = document.querySelector('.boxes-container'); // ボックスコンテナを取得
const boxes = document.querySelectorAll('.box'); // すべてのボックスを取得
const indicators = document.querySelectorAll('.indicator'); // すべてのインジケータを取得
const leftArrow = document.querySelector('.left-arrow'); // 左矢印を取得
const rightArrow = document.querySelector('.right-arrow'); // 右矢印を取得
let currentIndex = 1; // 初期インデックスを1に設定（左側にクローンがあるため）

// 初期化：左側と右側にクローンを追加
const firstClone = boxes[0].cloneNode(true);
const lastClone = boxes[boxes.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

boxesContainer.appendChild(firstClone);
boxesContainer.insertBefore(lastClone, boxes[0]);

// 初期位置を設定
boxesContainer.style.transform = `translateX(${-currentIndex * (100 / boxes.length)}%)`;

function updateCarousel() {
  boxesContainer.style.transition = 'transform 0.5s ease';
  boxesContainer.style.transform = `translateX(${-currentIndex * (100 / boxes.length)}%)`;

  if (currentIndex === 0) {
    setTimeout(() => {
      boxesContainer.style.transition = 'none';
      currentIndex = boxes.length;
      boxesContainer.style.transform = `translateX(${-currentIndex * (100 / boxes.length)}%)`;
    }, 500);
  }

  if (currentIndex === boxes.length + 1) {
    setTimeout(() => {
      boxesContainer.style.transition = 'none';
      currentIndex = 1;
      boxesContainer.style.transform = `translateX(${-currentIndex * (100 / boxes.length)}%)`;
    }, 500);
  }

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex - 1);
  });
}

leftArrow.addEventListener('click', () => {
  currentIndex--;
  updateCarousel();
});

rightArrow.addEventListener('click', () => {
  currentIndex++;
  updateCarousel();
});

// 初期状態のカルーセルを設定
updateCarousel();
