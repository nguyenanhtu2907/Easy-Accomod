var cities; // cac thanh pho
var iCity; // index city duoc click
var iDistrict; //index district duoc click
fetch("http://127.0.0.1:5500/front-end/searchResult/local.json")
  .then((res) => res.json())
  .then((data) => {
    cities = data;
  })
  .catch();

const obj = [
  {
    src: "./images/ha-noi.jpg",
    title: "Bán chung cư mini ...",
    acreage: 40,
    bedroom: 1,
    toilet: 1,
  },
];

function getSelectedOption(sel) {
  var opt;
  for (var i = 0, len = sel.options.length; i < len; i++) {
    opt = sel.options[i];
    if (opt.selected === true) {
      break;
    }
  }
  return opt;
}

var ProvinceLink =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
var myheader = new Headers({
  "Content-Type": "application/json",
  Token: "7a07ad56-3965-11eb-b36a-0e2790f48b9c",
});
var Myobject = {
  method: "GET",
  headers: myheader,
};

fetch(ProvinceLink, Myobject)
  .then((res) => res.json())
  .then((posts) => {
    var htmls = posts.data.map(function (post) {
      return `<option value ="${post.ProvinceName}" title="${post.ProvinceID}">
    ${post.ProvinceName}
    </option>`;
      // console.log(post.ProvinceId)
    });
    htmls.join("");
    document.getElementById("city").innerHTML += htmls;
  });
var provinceInput = document.getElementById("province");

var districtApi =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";

var cityInput = document.getElementById("city");

fetch(districtApi, Myobject)
  .then((res) => res.json())
  .then((posts) => {
    cityInput.onchange = function () {
      var x = getSelectedOption(cityInput);

      // console.log(ProvinceValue);
      var provinceValue = x.title;

      // console.log(typeof (provinceValue));
      var htmls = posts.data.map(function (post) {
        // console.log(typeof(post.DistrictID))
        // console.log(post.ProvinceID == Number(provinceValue))
        if (post.ProvinceID == Number(provinceValue)) {
          return ` <option value="${post.DistrictName}" title="${post.DistrictID}">
                   ${post.DistrictName}
                  </option>`;
        }
      });

      //  console.log(posts)
      htmls.join("");
      var a = `<option selected  value="" disabled >Quận huyện </option>`;
      document.getElementById("district").innerHTML = a;
      document.getElementById("district").innerHTML += htmls;
    };
  });

function showAddress(e, step, status) {
  let steps = Array.from(document.querySelectorAll(".select .option"));
  let address = document.querySelector(".select>span");
  if (step == 0) {
    let html = "";
    cities.forEach((city) => {
      html += `
          <li class="li-option" onclick="showAddress(event, 1, 1)">${city.name}<div class="fa fa-angle-right"></div></li>
          `;
    });
    steps[step].querySelector(".list-option").innerHTML = html;
  }
  if (step == 1) {
    if (!e.target.classList.contains("back")) {
      iCity = Array.from(e.target.parentNode.querySelectorAll("li")).indexOf(
        e.target
      );
    }
    let html =
      '<li class="back" onclick="showAddress(event, 0, -1)"><div class="fa fa-angle-left"></div>Quay lại </li>';
    cities[iCity].districts.forEach((district) => {
      html += `
          <li class="li-option" onclick="showAddress(event, 2, 1)">${district.name}<div class="fa fa-angle-right"></div></li>
          `;
    });
    steps[step].querySelector(".list-option").innerHTML = html;
  }
  if (step == 2 && status != 0) {
    if (!e.target.classList.contains("back")) {
      iDistrict = Array.from(
        e.target.parentNode.querySelectorAll("li")
      ).indexOf(e.target);
    }
    let html =
      '<li class="back" onclick="showAddress(event, 1, -1)"><div class="fa fa-angle-left"></div>Quay lại </li>';
    cities[iCity].districts[iDistrict - 1].wards.forEach((ward) => {
      html += `
          <li class="li-option" onclick="showAddress(event, 2, 0)">${ward.name}<div class="fa fa-angle-right"></div></li>
          `;
    });
    steps[step].querySelector(".list-option").innerHTML = html;
  }
  if (
    e.target.classList.contains("back") ||
    e.target.classList.contains("fa-angle-down")
  ) {
    address.innerText = "Chọn khu vực";
    address.innerHTML += '<div class="fa fa-angle-down"></div>';
    steps[step].classList.remove("none");
    steps[step + 1].classList.add("none");
  } else {
    if (step == 0) {
      steps[step].classList.remove("none");
    } else {
      steps[step].classList.remove("none");
      steps[step - 1].classList.add("none");
    }
    address.innerText = e.target.innerText;
    address.innerHTML += '<div class="fa fa-angle-down"></div>';
  }
  if (step == 2 && status == 0) {
    steps.forEach((option, index) => {
      option.classList.add("none");
    });
  }
  if (step != 0) {
    e.target.parentNode.parentNode.querySelector("input").value =
      e.target.innerText;
  }
}
function showList(e, element) {
  document.querySelector(element).classList.toggle("none");
}

function checkPrice(e) {
  let text = "";
  if (e.target.name == "min") {
    min = e.target;
  } else {
    max = e.target;
    if (min.value * 1 <= max.value * 1) {
      text = min.parentNode.innerText + " - " + max.parentNode.innerText;
      document.querySelector(".minPrice").value = min.value;
      document.querySelector(".maxPrice").value = max.value;
    } else {
      text = max.parentNode.innerText + " - " + min.parentNode.innerText;
      document.querySelector(".maxPrice").value = min.value;
      document.querySelector(".minPrice").value = max.value;
    }
    document.querySelector(".price>span").innerText = text;
    document.querySelector(".price>span").innerHTML +=
      '<div class="fa fa-angle-down"></div>';
    document.querySelector(".price .option").classList.add("none");
  }
}
