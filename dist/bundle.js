const label = document.querySelector(".label");

const getData = async () => {
  const uri = "http://localhost:3000/data";
  const response = await fetch(uri);
  const data = await response.json();

  const profiles = Object.values(data);
  console.log(profiles);
  const profile = profiles[0];

  profile.groups.forEach((group, index) => {

    console.log(group.label);
    let menu = `
            <p class="order">${index + 1}. ${group.label}</p>
        `;
    label.innerHTML += menu;
  });

  //   profiles.forEach((instance, index) => {
  //     console.log(instance.groups[index]);

  //     if (index <= 8) {
  //       console.log(index);

  //       const group = [];
  //       group.push(instance.groups[index]);

  //       group.forEach(value => {
  //         console.log(value.label);
  //       });

  //     }
  //   });

  // console.log(data);
};

window.addEventListener("DOMContentLoaded", () => getData());
