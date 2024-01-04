const labels = document.querySelector(".label");
const images = document.querySelector(".pictures");
const heading = document.querySelector(".heading");
const form = document.querySelector("form");
const input = document.querySelector("input");
const secondButton = document.querySelector(".button2");
const backButton = document.querySelector(".back");
const mainContent = document.querySelector('.mainContent');

let profiles;
let selectedProfile;
let selectedGroup;
let currentGroupIndex = 0;
let arr = new Array();
let groupLabel;
let texts;

let renderGroupLabel;
let renderOptionLabel;

let renderGroups;
let arrays = new Array();

let optionLabel;
let optionLabelId;





// ------------------ main Function -------------------
async function main() {
   const res = await fetch("http://localhost:3000/data");
   const data = await res.json();
   profiles = Object.values(data);
   console.log(profiles);
   selectedProfile = profiles[0];
   groupLabel = selectedProfile.groups[currentGroupIndex].label;

   // renderSideBar();
   renderProfileImages();
}



// --------------------- rendring groups of current profile -----------------------
const renderSideBar = () => {
   groupLabel = selectedProfile.groups[currentGroupIndex].label;
   labels.innerHTML = "";
   selectedProfile.groups.forEach((group, index) => {
      let groupButton = document.createElement("button");
      groupButton.innerHTML = `
         <li class="renderGroups">
            <p class="renderGroupLabel"> ${
               groupLabel === group.label
                  ? `<strong class='textColor'> ${index + 1}. ${
                       group.label
                    } </strong>`
                  : `${index + 1}.  ${group.label}`
            }</p>
            
            ${group.options.forEach((option) => {
               if (option.label === optionLabel  && option.labelId === optionLabelId){
                     console.log(option.label + "(" + option.labelId + ")");
                     `<p class="renderOptionLabel">${option.label} ( ${option.labelId} )</p>`;
               }
                else {
                  `<p class="renderOptionLabel">hellonnnnnnnnnn</p>`;
               }
            })}
            
         </li>
      `;
      groupButton.addEventListener("click", () => {
         currentGroupIndex = index;
         renderGroupImages();
         updateSidebar(groupLabel, currentGroupIndex);
      });
      labels.appendChild(groupButton);
      groupButton.classList.add("groupButton");
   });
   updateSidebar(groupLabel, currentGroupIndex);
   renderOptionLabel = document.querySelectorAll(".renderOptionLabel");
};



// ----------------------- rendring current profile images -------------------------
const renderProfileImages = () => {
   profiles.forEach((profile) => {
      const profileImage = {
         label: profile.groups[0].options[0].label,
         labelId: profile.groups[0].options[0].labelId,
      };

      let imageButton = document.createElement("button");

      let iconImage = document.createElement('button');

      iconImage.innerHTML = ` <img class="large" src="pictures/Shape.svg"></img>`;
      
      imageButton.innerHTML += `
      <img class="img" src="pictures/Frame.png"></img>
      <div class="text">${profileImage.label} (${profileImage.labelId})</div>
      `;
      imageButton.addEventListener("click", (e) => {
         updateProfile(profileImage.labelId);
         optionLabel = profileImage.label;
         optionLabelId = profileImage.labelId;
         renderSideBar();
      });


      images.appendChild(imageButton);
      imageButton.classList.add("imgButton");
      images.appendChild(iconImage);
      iconImage.classList.add('icon')

      let icon  = document.querySelector('.img');
      iconImage.addEventListener('click', () => {
         console.log('hello bro how are you');
         icon.classList.add('large');
         // mainContent.style.background = 'red';
      })

   });
   texts = document.querySelectorAll(".imgButton");
   

   renderSideBar();
};



// ------------------------ update clikced profile --------------------
const updateProfile = (labelId) => {
   selectedProfile = profiles.find((profile) => {
      return profile.groups[0].options[0].labelId === labelId;
   });
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
   selectedProfile.groups[currentGroupIndex].options.forEach((option) => {
      const groupImage = {
         label: option.label,
         labelId: option.labelId,
      };
      let imageButton = document.createElement("button");
      let iconImage = document.createElement('button');

      iconImage.innerHTML = ` <img src="pictures/Shape.svg"></img>`;

      imageButton.innerHTML = `
         
         <img class="img" src="pictures/zebra.jpg"><img>
         <div class="text">${groupImage.label} (${groupImage.labelId})</div> 
      `;
      imageButton.addEventListener("click", (e) => {
         optionLabel = groupImage.label;
         optionLabelId = groupImage.labelId;

         // console.log(`${groupImage.label} (${groupImage.labelId})`);
         if (currentGroupIndex === selectedProfile.groups.length - 1) {
            return;
         }
         currentGroupIndex++;
         renderGroupImages();
      });

      iconImage.addEventListener('click', () => {
         console.log('hello bro how are you');
      })

      images.appendChild(imageButton);
      imageButton.classList.add("imgButton");
   
      images.appendChild(iconImage);
      iconImage.classList.add('icon')

      let icon  = document.querySelector('.img');
      iconImage.addEventListener('click', () => {
         console.log('hello bro how are you');
         icon.classList.add('large');
         // mainContent.style.background = 'red';
      })

   });
   renderSideBar();
};



// ------------------------- update heading and searchBar ----------------------
function updateSidebar(groupLabel, currentGroupIndex) {
   heading.innerHTML = `${currentGroupIndex + 1}. ${groupLabel} wahlen`;
   input.placeholder = `Nach ${groupLabel} suchen`;
   secondButton.innerHTML = `Weiter mit ${groupLabel}`;
   if(currentGroupIndex === 1){
      backButton.innerHTML = 'Ein Schritt zurück ';
   }
}

backButton.addEventListener('click', () => {
   if(currentGroupIndex > 0){
      currentGroupIndex--;
      renderGroupImages();
   }

})






// --------------- add eventListner on input Field -------------
input.addEventListener("keyup", () => {
   // console.log(term);
   let term = input.value.trim().toLowerCase();
   searchBar(term);
});



// ----------------- method for search bar --------------
const searchBar = (term) => {
   let options = Array.from(images.children);
   let filteredOptions = options;
   filteredOptions.forEach((text) => text.classList.remove("displayNone"));

   filteredOptions = options.filter((text) => {
      return !text.innerText.toLowerCase().includes(term)
   });
   filteredOptions.forEach((text) => text.classList.add("displayNone"));
};






main();
