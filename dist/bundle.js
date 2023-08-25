// const { forEach } = require("neo-async");

const labels = document.querySelector(".label");
const images = document.querySelector(".pictures");
const button = document.querySelector(".icon");
const heading = document.querySelector('.heading')

let profiles;
// let profile;

const getData = async () => {
   const uri = "http://localhost:3000/data";
   const response = await fetch(uri);
   const data = await response.json();
   //-------> converting all profile's (object) into array (in data rsource)
   profiles = Object.values(data);
   // console.log(profiles);
   return profiles;
};

// ----------- fetching labels of groups existing 1st profile
const firstProfileGroups = (profiles) => {
   let byDefaultGroups = "";
   profiles[0].groups.forEach((group, index) => {
      byDefaultGroups += `
         <button class="mainMenu">
         <p class="order">${index + 1}. ${group.label}</p>
         </button>
      `;
   });
   labels.innerHTML = byDefaultGroups;
   let groupButton = document.querySelectorAll(".mainMenu");
   groupButton.forEach((labelbutton) => {
      labelbutton.addEventListener("click", (e) => {
         console.log(e.target.innerText);
      });
   });
};






const renderImages = (profiles) => {
   /* ----------> creating buttons for each picture */
   profiles.forEach((profile) => {
      let profileImage = {
         pic: profile.groups[0].options[0].configMediaId,
         label: profile.groups[0].options[0].label,
         labelId: profile.groups[0].options[0].labelId,
      };

      let picture = document.createElement("button");
      if (profileImage.pic == null) {
         picture.innerHTML += `
            <div class="pic">
            <button class="icon"><i class="fa fa-search "></i></button>
            <img class="img" src="pictures/Frame.png"></img>
            <div class="text">${profileImage.label} (${profileImage.labelId})</div>         
            </div>
         `;
      } else {
         picture.innerHTML += `
            <div class="pic">
            <button class="icon"><i class="fa fa-search "></i></button>
            <img class="img" src="${profileImage.pic}"></img>
            <div class="text">${profileImage.label} (${profileImage.labelId})</div>       
            </div>
         `;
      }




      picture.addEventListener("click", () => {
         images.innerHTML = null;
         console.log(profile.groups[1]);
         profile.groups[1].options.forEach((option) => {
            let optionImages = {
               pic: option.configMediaId,
               labelId: option.labelId,
               label: option.label,
               description: option.description,
            };
            //----------- adding option images 
            let optionPics = document.createElement("button");
            if (optionImages.pic == null) {
                  optionPics.innerHTML += `
                     <div class="pic">
                     <button class="icon"><i class="fa fa-search "></i></button>
                     <img class="img" src="pictures/Frame.png"></img>
                     <div class="text">${optionImages.label} (${optionImages.labelId})</div>         
                     </div>
                  `;
            } else {
               optionPics.innerHTML += `
                     <div class="pic">
                     <button class="icon"><i class="fa fa-search "></i></button>
                     <img class="img" src="${optionImages.pic}"></img>
                     <div class="text">${optionImages.label} (${profileImages.labelId})</div>       
                     </div>
                  `;
            }
            images.appendChild(optionPics);
            optionPics.classList.add("imgButton");
            
         });
      
         console.log("mohsin");
         profileGroupLabels(profile);
      });






      images.appendChild(picture);
      picture.classList.add("imgButton"); 
   });
};




   //-----------Function for showing labelContent
   const profileGroupLabels = (profile) => {
      let groupLabelContent = "";
      profile.groups.forEach((group, index) => {
         groupLabelContent += `
            <button class="mainMenu">
             <p class="order">${index + 1}. ${group.label}</p>
             </button>
         `;
      });
      labels.innerHTML = groupLabelContent;
      const groupButton = document.querySelectorAll(".mainMenu");
      groupButton.forEach((subMenu) => {
         subMenu.addEventListener("click", (e) => {
            console.log(e.target.textContent);
         });
      });
   };

   



const mainFunction = () => {
   getData()
      .catch((error) => console.warn(error))
      .then((profiles) => {
         console.log(profiles);
         firstProfileGroups(profiles);
         renderImages(profiles);
      });
};

//------------ Calling main function
mainFunction();
