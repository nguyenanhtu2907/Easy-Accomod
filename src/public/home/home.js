var cities;
var districts;
var wards;
var iCity; // index city duoc click
var iDistrict; //index district duoc click
fetch('http://localhost:3000/api/province.json')
  .then(res => res.json())
  .then(data => {
    cities = data;
  })
  .catch()
fetch('http://localhost:3000/api/district.json')
  .then(res => res.json())
  .then(data => {
    districts = data;
  })
  .catch()
fetch('http://localhost:3000/api/ward.json')
  .then(res => res.json())
  .then(data => {
    wards = data;
  })
  .catch()


function showAddress(e, step, status) {
  let steps = Array.from(document.querySelectorAll('.select .option'));
  let address = document.querySelector('.select>span');
  if (step == 0) {
    let html = '';
    for (city in cities) {
      html += `
              <li class="li-option" id="${cities[city].code}" onclick="showAddress(event, 1, 1)">${cities[city].name}<div class="fa fa-angle-right"></div></li>
              `
    }
    steps[step].querySelector('.list-option').innerHTML = html;
  }
  if (step == 1) {
    if (!e.target.classList.contains('back')) {
      iCity = e.target.id;
    }
    let html = '<li class="back" onclick="showAddress(event, 0, -1)"><div class="fa fa-angle-left"></div>Quay lại </li>';
    for (district in districts) {
      if (districts[district].parent_code == iCity) {
        html += `
              <li class="li-option" id="${districts[district].code}" onclick="showAddress(event, 2, 1)">${districts[district].name}<div class="fa fa-angle-right"></div></li>
              `}
    }
    steps[step].querySelector('.list-option').innerHTML = html;
  }
  if (step == 2 && status != 0) {
    if (!e.target.classList.contains('back')) {
      iDistrict = e.target.id;
    }
    let html = '<li class="back" onclick="showAddress(event, 1, -1)"><div class="fa fa-angle-left"></div>Quay lại </li>';
    for (ward in wards) {
      if (wards[ward].parent_code == iDistrict) {
        html += `
                  <li class="li-option" id="${wards[ward].code}" onclick="showAddress(event, 2, 0)">${wards[ward].name}<div class="fa fa-angle-right"></div></li>
                  `
      }
    }
    steps[step].querySelector('.list-option').innerHTML = html;
  }
  if (e.target.classList.contains('back') || e.target.classList.contains('fa-angle-down')) {
    address.innerText = 'Chọn khu vực';
    address.innerHTML += '<div class="fa fa-angle-down"></div>';
    steps[step].classList.remove('none');
    steps[step + 1].classList.add('none');
  } else {
    if (step == 0) {
      steps[step].classList.remove('none');
    } else {
      steps[step].classList.remove('none');
      steps[step - 1].classList.add('none');
    }
    address.innerText = e.target.innerText;
    address.innerHTML += '<div class="fa fa-angle-down"></div>';
  }
  if (step == 2 && status == 0) {
    steps.forEach((option, index) => {
      option.classList.add('none')
    })

  }
  if (step != 0) {
    e.target.parentNode.parentNode.querySelector('input').value = e.target.innerText;
  }
}
document.addEventListener("mouseup", function (e) {
  var address = document.querySelector(".address");
  if (!address.contains(e.target)) {
    Array.from(document.querySelectorAll(".address .option")).forEach(
      (option) => {
        if (!option.classList.contains("none")) {
          option.classList.add("none");
        }
      }
    );
  }
});
document.addEventListener("mouseup", function (e) {
  var price = document.querySelector(".price");
  if (!price.contains(e.target)) {
    Array.from(document.querySelectorAll(".price .option")).forEach(
      (option) => {
        if (!option.classList.contains("none")) {
          option.classList.add("none");
        }
      }
    );
  }
});
function showList(e, element) {
  document.querySelector(element).classList.toggle("none");
}

function checkPrice(e) {
  let text = "";
  if (e.target.name == "min") {
    min = e.target;
  } else {
    max = e.target;
    if (min.value <= max.value) {
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
function search(e) {
  let query = ``
  let search = document.querySelector('.input-search-bar input').value.trim()
  if (search) {
    query += `search=${search}&`
  }
  let province = document.querySelector('input[name="province"').value
  if (province) {
    query += `province=${province}&`
  }
  let district = document.querySelector('input[name="district"').value
  if (district) {
    query += `district=${district}&`
  }
  let ward = document.querySelector('input[name="ward"').value
  if (ward) {
    query += `ward=${ward}&`
  }
  let minPrice = document.querySelector('input[name="minPrice"').value
  if (minPrice) {
    query += `minPrice=${minPrice}&`
  }
  let maxPrice = document.querySelector('input[name="maxPrice"').value
  if (maxPrice) {
    query += `maxPrice=${maxPrice}`
  }
  window.location.href = 'http://localhost:3000/post/search?' + query
}
