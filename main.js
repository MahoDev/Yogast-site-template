//Sidebar code start//
const menuIcon = document.querySelector(".icons .menu-icon");
const sidebar = document.querySelector(".sidebar");
const closeIcon = document.querySelector(".sidebar .close-icon");
menuIcon.onclick = () => {
  sidebar.classList.toggle("open");
};
closeIcon.onclick = () => {
  sidebar.classList.toggle("open");
};
//Sidebar code end//

//Slideshow code start//

const slideshow = document.querySelector(".slideshow");
const leftArr = document.querySelector(".left-arr");
const rightArr = document.querySelector(".right-arr");

const item1 = document.querySelector(".slideshow .item");
const item2 = item1.cloneNode(true);
const item3 = item1.cloneNode(true);
item2.querySelector("img").src = "imgs/hero section/football.png";
item2.querySelector("img").alt = "football";
item2.querySelector("img").title = "Photo by bella lac on Unsplash";
item3.querySelector("img").src = "imgs/hero section/volleyball.png";
item3.querySelector("img").alt = "volleyball";
item3.querySelector("img").title = "";

item1.classList.add("active");
let items = [item1, item2, item3];

// when i click an arrow, the current shown item moves to the
// oposite direction of the arrow and the left/right item
// replaces its position

function moveActiveItemToDirection(direction) {
  let activeItem = document.querySelector(".slideshow .item.active");
  activeItem.classList.replace("active", direction);
}

function addSideItemAtDirection(directon) {
  let activeItem = document.querySelector(".slideshow .item.active");
  const activeItemIndex = items.indexOf(activeItem);
  let newItemToAdd = null;
  if (directon === "left") {
    let newItemIndex = activeItemIndex - 1;
    /*if we've reached the end of element in left
    direction, then go to the end of the loop in
    the right direction
    */
    if (newItemIndex < 0) {
      newItemIndex = items.length - 1;
    }
    newItemToAdd = items[newItemIndex];
    //make sure there are no placement classe before adding
    //fixes bug when going through items from end
    newItemToAdd.style.visibility = "hidden";
    newItemToAdd.classList.remove("right");
    newItemToAdd.classList.add("left");
    newItemToAdd.style.visibility = "visible";
  } else {
    let newItemIndex = activeItemIndex + 1;
    /*if we've reached the end of element in right
    direction, then go to the end of the loop in
    the left direction
    */
    if (newItemIndex === items.length) {
      newItemIndex = 0;
    }
    newItemToAdd = items[newItemIndex];
    //make sure there are no placement classes before adding
    //fixes bug when going through items from start
    newItemToAdd.style.visibility = "hidden";
    newItemToAdd.classList.remove("left");
    newItemToAdd.classList.add("right");
    newItemToAdd.style.visibility = "visible";
  }
  slideshow.insertBefore(
    newItemToAdd,
    document.querySelector(".hero-section .right-arr")
  );

  return newItemToAdd;
}
//makes the item on left or right active.
//i.e it moves it from its direction to the center of the
//slideshow by removing the displacement class left/right
function makeSideItemActive(item, direction) {
  item.classList.replace(direction, "active");
}

let isItemSliding = false;
leftArr.onclick = async () => {
  if (!isItemSliding) {
    preventClick();
    let addedItem = addSideItemAtDirection("left");
    moveActiveItemToDirection("right");
    // give time for the browser to register the property change
    // for the animation to work.
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 50);
    });
    makeSideItemActive(addedItem, "left");
  }
};
rightArr.onclick = async () => {
  if (!isItemSliding) {
    preventClick();
    let addedItem = addSideItemAtDirection("right");
    moveActiveItemToDirection("left");
    // give time for the browser to register the property change
    // for the animation to work.
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 50);
    });

    makeSideItemActive(addedItem, "right");
  }
};

async function preventClick() {
  isItemSliding = true;
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
  isItemSliding = false;
}
//Slideshow code end//
