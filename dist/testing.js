const getData = async () => {
    const response = await fetch('http://localhost:3000/data');
    const data = response.json();
    return data;
};

getData().then(data => {
    console.log("data ", data);

    const profiles = Object.values(data);
    console.log(profiles);
});