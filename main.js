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

//Slideshow code//
const slideshow = document.querySelector(".slideshow");
const items = new Map();
//creating the items template for all items
// const item1 = document.createElement("div");
// item1.classList.add("item");
// const imageDiv = document.createElement("div");
// imageDiv.classList.add("image");
// const img = document.createElement("img");
// img.src = "imgs/basketball.png";
// img.alt = "basketball";
// img.title = "Image by master1305 on Freepik";
// const moreBtn = document.createElement("div");
// moreBtn.innerHTML = "Read More";
// moreBtn.classList.add("more-btn");
// imageDiv.appendChild(img);
// item1.appendChild(imageDiv);
// item1.appendChild(moreBtn);
//template end

const item1 = document.querySelector(".slideshow .item");

const item2 = item1.cloneNode(true);
const item3 = item1.cloneNode(true);
item2.querySelector("img").src = "imgs/football.png";
item2.querySelector("img").alt = "football";
item3.querySelector("img").src = "imgs/volleyball.png";
item3.querySelector("img").alt = "volleyball";
