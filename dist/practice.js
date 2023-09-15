const labels = document.querySelector(".label");
const images = document.querySelector(".pictures");
const heading = document.querySelector(".heading");
const form = document.querySelector("form");
const input = document.querySelector("input");

let profiles;
let selectedProfile;
let selectedGroup;
let selectedOption;

let currentGroupIndex = 0;
// let previousGroupIndex = 0;

let currentGroupLabel = "";
let renderGroupLabel = "";

let arr = new Array();
let groupLabel;
let texts;

// ------------------ main Function -------------------
async function main() {
   const res = await fetch("http://localhost:3000/data");
   const data = await res.json();
   profiles = Object.values(data);
   console.log(profiles);
   selectedProfile = profiles[0];
   groupLabel = selectedProfile.groups[currentGroupIndex].label;

   // console.log(selectedProfile);
   renderSideBar();
   renderProfileImages();
}

// --------------------- rendring groups of current profile -----------------------
const renderSideBar = () => {
   labels.innerHTML = "";
   console.log(groupLabel);
   selectedProfile.groups.forEach((group, index) => {
      let labling = {
         label: group.options[0].label,
         labelId: group.options[0].labelId,
      };
      arr[group.label] = labling;

      let groupButton = document.createElement("button");
      groupButton.innerHTML = `
         <div class="renderGroups">
            <p class="renderGroupLabel"> ${
               group.label === groupLabel
                  ? `<strong class='textColor'> ${index + 1}. ${
                       group.label
                    } </strong>`
                  : `${index + 1}.  ${group.label}`
            }</p>
            <img src="pictures/Vector.svg"></img><p class="renderImgLabel"> ${
               arr[group.label].label
            }  (${arr[group.label].labelId})</p>
         </div>
      `;
      selectedGroup = group.label;
      groupButton.addEventListener("click", () => {
         console.log(groupLabel);
         currentGroupIndex = index;
         renderGroupImages();
         console.log(currentGroupIndex);
         updateSidebar(groupLabel, currentGroupIndex);
      });
      labels.appendChild(groupButton);
      groupButton.classList.add("groupButton");
      renderGroupLabel = document.querySelectorAll(".renderGroupLabel");
   });
   updateSidebar(groupLabel, currentGroupIndex);
};



// ----------------------- rendring current profile images -------------------------
const renderProfileImages = () => {
   groupLabel = selectedProfile.groups[currentGroupIndex].label;
   profiles.forEach((profile) => {
      const profileImage = {
         image: profile.groups[0].options[0].configMediaId,
         label: profile.groups[0].options[0].label,
         labelId: profile.groups[0].options[0].labelId,
      };

      let imageButton = document.createElement("button");

      imageButton.innerHTML += `
         <button class="icon"><i class="fa fa-search"></i></button>
         <img class="img" src="pictures/Frame.png"></img>
         <div class="text">${profileImage.label} (${profileImage.labelId})</div>
      `;
      imageButton.addEventListener("click", (e) => {
         renderGroupImages();
         updateProfile(profileImage.labelId);
      });
      imageButton.classList.add("imgButton");
      images.appendChild(imageButton);
   });
   texts = document.querySelectorAll(".imgButton");
};



// ------------------------ update clikced profile --------------------
const updateProfile = (labelId) => {
   selectedProfile = profiles.find((profile) => {
      return profile.groups[0].options[0].labelId === labelId;
   });

   console.log("selected", selectedProfile)
   renderSideBar();
   currentGroupIndex++;
   renderGroupImages();
};

// ---------------------- rendring all group images -----------------------
const renderGroupImages = () => {
   images.innerHTML = "";

   if (currentGroupIndex == 0) {
      renderProfileImages();
      console.log("raazi");
      return;
   }

   groupLabel = selectedProfile.groups[currentGroupIndex].label;
   console.log(selectedProfile.groups[currentGroupIndex].label);

   renderSideBar();
   selectedProfile.groups[currentGroupIndex].options.forEach((option) => {
      const groupImage = {
         image: option.configMediaId,
         label: option.label,
         labelId: option.labelId,
      };

      let imageButton = document.createElement("button");
      imageButton.innerHTML = `
               <button class="icon"><i class="fa fa-search"></i></button>
               <img class="img" src="pictures/zebra.jpg"><img>
               <div class="text">${groupImage.label} (${groupImage.labelId})</div> 
         `;
      imageButton.addEventListener("click", (e) => {
         if (currentGroupIndex === selectedProfile.groups.length - 1) return;
         currentGroupIndex++;
         renderGroupImages();
         renderImglabels();
      });
      imageButton.classList.add("imgButton");
      images.appendChild(imageButton);
   });
};

// ------------------------- update group name & highlight it ----------------------

function updateSidebar(groupLabel, currentGroupIndex) {
   heading.innerHTML = `${currentGroupIndex + 1}. ${groupLabel} wahlen`;
   input.placeholder = `Nach ${groupLabel} suchen`;
}



input.addEventListener("keyup", () => {
   // console.log(term);
   let term = input.value.trim().toLowerCase();
   console.log(term);
   searchBar(term);
});

const searchBar = (term) => {
   // console.log(images);
   Array.from(images.children)
      .filter(text => !text.innerText.toLowerCase().includes(term))
      .forEach(text => text.classList.add('displayNone'))
};

main();
