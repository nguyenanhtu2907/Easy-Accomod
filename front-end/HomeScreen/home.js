var cities = document.getElementsByName("city");
var districts = document.getElementsByName("districts");
var cost = document.getElementsByName("city");

const obj = [
  {
    src: "./images/ha-noi.jpg",
    title: "Bán chung cư mini ...",
    acreage: 40,
    bedroom: 1,
    toilet: 1,
  },
];

const getAPI = async () => {
  const response = await fetch(
    "https://dc.tintoc.net/app/api-customer/public/provinces"
  );
  const cities = response.json();
  try {
    let html = "";
    cities.then((city) => {
      city.forEach((data) => {
        html += `
        <option>${data.name}</option>
        `;
        document.querySelector("#city").innerHTML += html;
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getAPI_2 = async () => {
  const response_2 = await fetch(
    "https://dc.tintoc.net/app/api-customer/public/districts?provinceId.equals=50"
  );
  const districts = response_2.json();
  try {
    let html = "";
    districts.then((district) => {
      district.forEach((data) => {
        html += `
        <option>${data.name}</option>
        `;
        document.querySelector("#district").innerHTML += html;
      });
    });
  } catch (error) {
    console.log(error);
  }
};

getAPI();
getAPI_2();
