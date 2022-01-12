const cursor = document.querySelector(".cursor");
const slider = document.querySelector(".items");

let isDown = false;
let mousePosPct = undefined;

const windowWidth = window.innerWidth;
const itemWidth = slider.getBoundingClientRect().width;

document.addEventListener("mousedown", (e) => {
  isDown = true;
  cursor.classList.add('pushMouse');
});

document.addEventListener("mouseleave", () => {
  isDown = false;
});

document.addEventListener("mouseup", () => {
  isDown = false;
  cursor.classList.remove('pushMouse');

});

document.addEventListener("mousemove", (e) => {

  cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;

  if (!isDown) return;

  cursor.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;

  mousePosPct = ((e.clientX - (windowWidth / 2)) / windowWidth) * 2;

  console.log(mousePosPct)

  render()
});

document.addEventListener('wheel', e => {
  const increment = 0.08

  if (mousePosPct === undefined) mousePosPct = 0;
  if (mousePosPct > 0) mousePosPct = mousePosPct - 1;

  if (e.deltaY > 0) {
    if (mousePosPct - increment > -1) {
      mousePosPct = mousePosPct - increment;
    } else {
      mousePosPct = -1;
    }
  } else {
    console.log('up', increment)
    if (mousePosPct + increment < 0) {
      mousePosPct = mousePosPct + increment;
    } else {
      mousePosPct = 0;
    }
  }

  render();
})

function render() {
  const mousePosPx = mousePosPct * (itemWidth - windowWidth);

  if (mousePosPct > 0) {
    slider.style.transform = `translateX(0px)`;
  } else if (mousePosPct < -1) {
    slider.style.transform = `translateX(${itemWidth * -1 - windowWidth * -1}px)`;
  } else {
    slider.style.transform = `translateX(${mousePosPx}px)`;
  }
}