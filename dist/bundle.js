// const { forEach } = require("neo-async");

const labels = document.querySelector(".label");
const images = document.querySelector(".pictures");
const button = document.querySelector(".icon");
const heading = document.querySelector(".heading");
const form = document.querySelector('form');

let profiles;
let selectedProfile;
let currentGroupIndex = 0;



async function main(term) {
  let url = "http://localhost:3000/data";
  if(term){
    url += `&q=${term}`;
  }
  const res = await fetch(url);
  profiles = Object.values(await res.json());
  selectedProfile = profiles[0];
  renderSideBar();
  renderProfileImages();

}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // let term = form.term.value;
  main(form.term.value.trim());
  console.log(form.term.value.trim());
  
})




const renderSideBar = () => {
  labels.innerHTML = "";
  selectedProfile.groups.forEach((group, index) => {
    let groupButton = document.createElement("button");
    groupButton.innerHTML += `
      <p class="order">${group.label}</p>
    `;
    groupButton.addEventListener("click", () => {
      currentGroupIndex = index;
      renderGroupImages();
    });
    labels.appendChild(groupButton);
  });
};




const renderProfileImages = () => {
  profiles.forEach((profile) => {
    const profileImage = {
      image: profile.groups[0].options[0].configMediaId,
      label: profile.groups[0].options[0].label,
      labelId: profile.groups[0].options[0].labelId,
    };

    let imageButton = document.createElement("button");
    if (profileImage.image == null) {
      imageButton.innerHTML += `
            <div class="pics">
            <button class="icon"><i class="fa fa-search"></i></button>
            <img class="img" src="pictures/Frame.png"></img>
            <div class="text">${profileImage.label} (${profileImage.labelId})</div>                   

         `;
    } else {
      imageButton.innerHTML += `
            <div class="pics">
            <button class="icon"><i class="fa fa-search "></i></button>
            <img class="img" src="${profileImage.image}"></img>
            <div class="text">${profileImage.label} (${profileImage.labelId})</div>       
            </div>
         `;
    }
    imageButton.addEventListener("click", () =>
      updateProfile(profileImage.labelId)
    );
    imageButton.classList.add("imgButton");
    images.appendChild(imageButton);
  });
};




const updateProfile = (labelId) => {
  selectedProfile = profiles.find((profile) => {
    return profile.groups[0].options[0].labelId === labelId;
  });
  currentGroupIndex++;
  renderSideBar();
  renderGroupImages();
};




const renderGroupImages = () => {
  images.innerHTML = "";

  if (currentGroupIndex == 0) {
    renderProfileImages();
    return;
  }
  console.log(selectedProfile);
  selectedProfile.groups[currentGroupIndex].options.forEach((option) => {
    const groupImage = {
      image: option.configMediaId,
      label: option.label,
      labelId: option.labelId,
    };

    let imageButton = document.createElement("button");
    if (groupImage.image == null) {
      imageButton.innerHTML += `
            <div class="pic">
            <button class="icon"><i class="fa fa-search "></i></button>
            <img class="img" src="pictures/zebra.jpg"></img>
            <div class="text">${groupImage.label} (${groupImage.labelId})</div>     
            </div>
         `;
    } else {
      imageButton.innerHTML += `
            <div class="pic">
            <button class="icon"><i class="fa fa-search "></i></button>
            <img class="img" src="${groupImage.image}"></img>
            <div class="text">${groupImage.label} (${groupImage.labelId})</div>       
            </div>
         `;
    }
    imageButton.addEventListener("click", () => {
      if (currentGroupIndex == selectedProfile.groups.length - 1)
       return;
      currentGroupIndex++;
      renderGroupImages();
    });
    imageButton.classList.add("imgButton");
    images.appendChild(imageButton);
  });
};



main();
