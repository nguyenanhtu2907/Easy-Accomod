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

// const getAPI = async () => {
//   const response = await fetch(
//     "https://dc.tintoc.net/app/api-customer/public/provinces"
//   );
//   const cities = response.json();
//   try {
//     let html = "";
//     cities.then((city) => {
//       city.forEach((data) => {
//         html += `
//         <option>${data.name}</option>
//         `;
//         document.querySelector("#city").innerHTML += html;
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
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

var ProvinceLink ="https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
var myheader = new Headers({
  'Content-Type': 'application/json',
  'Token': '7a07ad56-3965-11eb-b36a-0e2790f48b9c',
})
 var Myobject ={
   method : 'GET',
   headers : myheader
  }
   
fetch(ProvinceLink, Myobject)
.then (res => res.json())
.then(posts => {
  var htmls = posts.data.map(function(post){
    return `<option value ="${post.ProvinceName}" title="${post.ProvinceID}">
    ${post.ProvinceName}
    </option>`
    // console.log(post.ProvinceId)
  })
  htmls.join('')
  document.getElementById('city').innerHTML +=htmls;
})
var provinceInput = document.getElementById('province')

var districtApi =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";

var cityInput = document.getElementById('city')

fetch(districtApi, Myobject)
  .then(res => res.json())
  .then(posts => {

    cityInput.onchange = function () {
      var x = getSelectedOption(cityInput)

      // console.log(ProvinceValue);
      var provinceValue = x.title;

      // console.log(typeof (provinceValue));
      var htmls = posts.data.map(function (post) {
        // console.log(typeof(post.DistrictID))
        // console.log(post.ProvinceID == Number(provinceValue))
        if (post.ProvinceID == Number(provinceValue)) {
          return ` <option value="${post.DistrictName}" title="${post.DistrictID}">
                   ${post.DistrictName}
                  </option>`
        }
      })


      //  console.log(posts)
      htmls.join('');
      var a = `<option selected  value="" disabled >Quận huyện </option>`;
      document.getElementById('district').innerHTML = a;
      document.getElementById('district').innerHTML += htmls;
    }

  })



function showList(e, element){
  document.querySelector(element).classList.toggle('none');
}

// function switchNum(a, b){
//   a = tmp;
//   a=b;
//   b=tmp;
// }

function checkPrice(e){
  let text = '';
  if(e.target.name == 'min'){
      min = e.target;
  }else{
      max = e.target;
      if(min.value*1 <= max.value*1){
          text = min.parentNode.innerText + ' - ' + max.parentNode.innerText;
          document.querySelector('.minPrice').value=min.value;
          document.querySelector('.maxPrice').value=max.value;
      }else{
          text = max.parentNode.innerText + ' - ' + min.parentNode.innerText;
          document.querySelector('.maxPrice').value=min.value;
          document.querySelector('.minPrice').value=max.value;
      }
      document.querySelector('.price>span').innerText = text;
      document.querySelector('.price>span').innerHTML += '<div class="fa fa-angle-down"></div>'
      document.querySelector('.price .option').classList.add('none');
  }
}

// const getAPI_2 = async () => {
//   const response_2 = await fetch(
//     "https://dc.tintoc.net/app/api-customer/public/districts?provinceId.equals=50"
//   );
//   const districts = response_2.json();
//   try {
//     let html = "";
//     districts.then((district) => {
//       district.forEach((data) => {
//         html += `
//         <option>${data.name}</option>
//         `;
//         document.querySelector("#district").innerHTML += html;
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// getAPI();
// getAPI_2();
