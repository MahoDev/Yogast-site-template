////reusable code start////

//slidshow code start//
function addSideItemAtDirection(directon, allItems, activeItem) {
  const activeItemIndex = allItems.indexOf(activeItem);
  let newItemToAdd = null;
  if (directon === "left") {
    let newItemIndex = activeItemIndex - 1;
    /*if we've reached the end of element in left
    direction, then go to the end of the loop in
    the right direction
    */
    if (newItemIndex < 0) {
      newItemIndex = allItems.length - 1;
    }
    newItemToAdd = allItems[newItemIndex];
    //make sure there are no placement classe before adding
    //fixes bug when going through items from end
    newItemToAdd.style.visibility = "hidden";
    newItemToAdd.classList.remove("right");
    newItemToAdd.classList.add("left");
    newItemToAdd.style.visibility = "visible";
  } else {
    let newItemIndex = activeItemIndex + 1;
    /*if we've reached the end of element in right
    direction, then go to the start of the loop in
    the left direction
    */
    if (newItemIndex === allItems.length) {
      newItemIndex = 0;
    }
    newItemToAdd = allItems[newItemIndex];
    //make sure there are no placement classes before adding.
    //fixes bug when going through items from start
    newItemToAdd.style.visibility = "hidden";
    newItemToAdd.classList.remove("left");
    newItemToAdd.classList.add("right");
    newItemToAdd.style.visibility = "visible";
  }
  activeItem.parentElement.insertBefore(
    newItemToAdd,
    activeItem.parentElement.lastElementChild //.right-arr element
  );

  return newItemToAdd;
}

// when i click an arrow, the current shown item moves to the
// oposite direction of the arrow and the left/right item
// replaces its position

function moveActiveItemToDirection(activeItem, direction) {
  activeItem.classList.replace("active", direction);
}

//makes the item on left or right active.
//i.e it moves it from its direction to the center of the
//slideshow by removing the displacement class left/right
function makeSideItemActive(sideItem, direction) {
  sideItem.classList.replace(direction, "active");
}

async function leftSlide(allItems, activeItem) {
  if (!isItemSliding) {
    preventClick();
    let addedItem = addSideItemAtDirection("left", allItems, activeItem);
    moveActiveItemToDirection(activeItem, "right");
    // give time for the browser to register the property change
    // for the animation to work.
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 50);
    });
    makeSideItemActive(addedItem, "left");
  }
}

async function rightSlide(allItems, activeItem) {
  if (!isItemSliding) {
    preventClick();
    let addedItem = addSideItemAtDirection("right", allItems, activeItem);
    moveActiveItemToDirection(activeItem, "left");
    // give time for the browser to register the property change
    // for the animation to work.
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 50);
    });

    makeSideItemActive(addedItem, "right");
  }
}

let isItemSliding = false;
async function preventClick() {
  isItemSliding = true;
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 800);
  });
  isItemSliding = false;
}
//slidshow code start end//

////reusable code end////

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

//Hero section slideshow code start//
const heroSlideshow = document.querySelector(".hero-section .slideshow");
const heroLeftArr = document.querySelector(".hero-section .left-arr");
const heroRightArr = document.querySelector(".hero-section  .right-arr");

const heroItem1 = document.querySelector(".hero-section .slideshow .item");
const heroItem2 = heroItem1.cloneNode(true);
const heroItem3 = heroItem1.cloneNode(true);
heroItem2.querySelector("img").src = "imgs/hero section/football.png";
heroItem2.querySelector("img").alt = "football";
heroItem2.querySelector("img").title = "Photo by bella lac on Unsplash";
heroItem3.querySelector("img").src = "imgs/hero section/volleyball.png";
heroItem3.querySelector("img").alt = "volleyball";
heroItem3.querySelector("img").title = "";

//added later to avoid being cloned
heroItem1.classList.add("active");
let heroSectionItems = [heroItem1, heroItem2, heroItem3];

heroLeftArr.onclick = async () => {
  leftSlide(
    heroSectionItems,
    document.querySelector(".hero-section .item.active")
  );
};
heroRightArr.onclick = async () => {
  rightSlide(
    heroSectionItems,
    document.querySelector(".hero-section .item.active")
  );
};

//Slideshow code end//

// about section start//
let thumbnailContainer = document.querySelector(".about-section .thumbnail");
let overlay = thumbnailContainer.children[0];
let img = thumbnailContainer.children[1];
let playBtn = thumbnailContainer.children[2];

let isPlaying = false;
playBtn.onclick = () => {
  if (isPlaying === false) {
    playBtn.classList.add("hide");
    overlay.classList.add("hide");
    img.src =
      "https://media.tenor.com/hbx5w449JhYAAAAC/nfl-american-football.gif";
    isPlaying = true;
  } else {
    playBtn.classList.remove("hide");
    overlay.classList.remove("hide");
    img.src = "imgs/about section/team.jpg";
    isPlaying = false;
  }
};

//about section end//

//trainer section start//

//trainer section end//
