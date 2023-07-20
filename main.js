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
  activeItem.parentElement.appendChild(newItemToAdd);

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
  if (
    !activeItem.parentElement.parentElement.classList.contains(
      "clicks-unallowed"
    )
  ) {
    preventQuickClicks(activeItem);
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
  if (
    !activeItem.parentElement.parentElement.classList.contains(
      "clicks-unallowed"
    )
  ) {
    preventQuickClicks(activeItem);
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

async function preventQuickClicks(activeItem) {
  const ancestor = activeItem.parentElement.parentElement;
  ancestor.classList.add("clicks-unallowed");
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 800);
  });
  ancestor.classList.remove("clicks-unallowed");
}

function startAutomaticSliding(slideshow) {
  setInterval(() => {
    slideshow.querySelector(".right-arr").click();
  }, 5000);
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

heroLeftArr.onclick = () => {
  leftSlide(
    heroSectionItems,
    document.querySelector(".hero-section .item.active")
  );
};
heroRightArr.onclick = () => {
  rightSlide(
    heroSectionItems,
    document.querySelector(".hero-section .item.active")
  );
};

startAutomaticSliding(heroSlideshow);
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
const trainerSlideshow = document.querySelector(".trainer-section .slideshow");
const trainerLeftArr = document.querySelector(".trainer-section .left-arr");
const trainerRightArr = document.querySelector(".trainer-section .right-arr");
const trainerItem1 = document.querySelector(".trainer-section .item");

const trainerItem2 = trainerItem1.cloneNode(true);
trainerItem2.querySelector("img").src = "imgs/trainer section/trainer2.jpg";
trainerItem2.querySelector("img").alt = "trainer2";
trainerItem2.querySelector("img").title = "Photo by Albert Dera on Unsplash";
trainerItem2.querySelector(".name").innerText = "Albert Dara";

trainerItem1.classList.add("active");
const trainerSectionItems = [trainerItem1, trainerItem2];

trainerLeftArr.onclick = () => {
  leftSlide(
    trainerSectionItems,
    document.querySelector(".trainer-section .item.active")
  );
};
trainerRightArr.onclick = () => {
  rightSlide(
    trainerSectionItems,
    document.querySelector(".trainer-section .item.active")
  );
};

startAutomaticSliding(trainerSlideshow);
//trainer section end//
