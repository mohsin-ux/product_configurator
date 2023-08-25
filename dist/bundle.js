// const { forEach } = require("neo-async");

const labels = document.querySelector(".label");
const images = document.querySelector(".pictures");
const button = document.querySelector(".icon");
const heading = document.querySelector(".heading");

let profiles;
let selectedProfile;
let currentGroupIndex = 0;

async function main() {
  const res = await fetch("http://localhost:3000/data");
  profiles = Object.values(await res.json());
  selectedProfile = profiles[0];
  renderSideBar();
  renderProfileImages();
}

const getData = async () => {
  const uri = "http://localhost:3000/data";
  const response = await fetch(uri);
  const data = await response.json();
  //-------> converting all profile's (object) into array (in data rsource)
  profiles = Object.values(data);
  // console.log(profiles);
  return profiles;
};

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

// // ----------- fetching labels of groups existing 1st profile
// const firstProfileGroups = (profiles) => {
//   let byDefaultGroups = "";
//   profiles[0].groups.forEach((group, index) => {
//     byDefaultGroups += `
//          <button class="mainMenu">
//          <p class="order">${index + 1}. ${group.label}</p>
//          </button>
//       `;
//   });
//   labels.innerHTML = byDefaultGroups;
//   let groupButton = document.querySelectorAll(".mainMenu");
//   groupButton.forEach((labelbutton) => {
//     labelbutton.addEventListener("click", (e) => {
//       console.log(e.target.innerText);
//     });
//   });
// };

const renderProfileImages = () => {
  /* ----------> creating buttons for each picture */
  profiles.forEach((profile) => {
    const profileImage = {
      image: profile.groups[0].options[0].configMediaId,
      label: profile.groups[0].options[0].label,
      labelId: profile.groups[0].options[0].labelId,
    };

    let imageButton = document.createElement("button");
    if (profileImage.image == null) {
      imageButton.innerHTML += `
            <div class="pic">
            <button class="icon"><i class="fa fa-search "></i></button>
            <img class="img" src="pictures/Frame.png"></img>
            <div class="text">${profileImage.label} (${profileImage.labelId})</div>                     </div>
         `;
    } else {
      imageButton.innerHTML += `
            <div class="pic">
            <button class="icon"><i class="fa fa-search "></i></button>
            <img class="img" src="${profileImage.pic}"></img>
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
            <img class="img" src="pictures/Frame.png"></img>
            <div class="text">${groupImage.label} (${groupImage.labelId})</div>         
            </div>
         `;
    } else {
      imageButton.innerHTML += `
            <div class="pic">
            <button class="icon"><i class="fa fa-search "></i></button>
            <img class="img" src="${groupImage.pic}"></img>
            <div class="text">${groupImage.label} (${groupImage.labelId})</div>       
            </div>
         `;
    }
    imageButton.addEventListener("click", () => {
      if (currentGroupIndex == selectedProfile.groups.length - 1) return;
      currentGroupIndex++;
      renderGroupImages();
    });
    imageButton.classList.add("imgButton");
    images.appendChild(imageButton);
  });
};

//-----------Function for showing labelContent
// const profileGroupLabels = (profile) => {
//   let groupLabelContent = "";
//   profile.groups.forEach((group, index) => {
//     groupLabelContent += `
//             <button class="mainMenu">
//              <p class="order">${index + 1}. ${group.label}</p>
//              </button>
//          `;
//   });
//   labels.innerHTML = groupLabelContent;
//   const groupButton = document.querySelectorAll(".mainMenu");
//   groupButton.forEach((subMenu) => {
//     subMenu.addEventListener("click", (e) => {
//       console.log(e.target.textContent);
//     });
//   });
// };

// const mainFunction = () => {
//   getData()
//     .catch((error) => console.warn(error))
//     .then((profiles) => {
//       console.log(profiles);
//       firstProfileGroups(profiles);
//       renderImages(profiles);
//     });
// };

//------------ Calling main function
// mainFunction();
main();
