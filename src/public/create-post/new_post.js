var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
  } else {

    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("nextBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("submit_btn").style.display = "inline";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("submit_btn").style.display = "none";
  }
  fixStepIndicator(n)
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();

    return false;

  }
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].getElementsByTagName("select")
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  for (i = 0; i < z.length; i++) {
    // If a field is empty...
    if (z[i].value == "") {
      // add an "invalid" class to the field:

      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}




var number = document.querySelector('#price');
var log = document.querySelector('.price_total-result p');

number.addEventListener('input', updateValuePrice);
function updateValuePrice(e){
    
    log.textContent = convertToString(e.target.value);
    
}

function convertToString(e){
    var result = '';
    if(e.length == 0) result ='Chưa nhập giá';
    if(e.length >= 5 & e.length <=6 )
    result += e.slice(-e.length,-3) + ' Ngàn';
    else if(e.length >= 7  & e.length <= 9){
    result += e.slice(-e.length,-6) +' Triệu ' + e.slice(-6,-3)+ ' Ngàn ';
    }
    else if(e.length >= 10)
    result += e.slice(-e.length,-9) +' Tỷ ' + e.slice(-9,-6) + ' Triệu ' +e.slice(-6,-3) + ' Ngàn ';
    else result += e;
  return result;
}

var day = document.querySelector('#gia_han');
var target = document.querySelector('.post_price-result p');

day.addEventListener('input', updateValue);
function updateValue(e){
    
    target.textContent = price(e.target.value);
    
}


function price(e){
  var num = Number (e) *25000;
  var cost = (Number (e) *25000).toString();
  var result = '';
  if(num<0) result ="Làm gì có ngày âm bạn ơi";
  else if(num ==0) result ="Chưa nhập ngày";
  else if(num <21000 && num>0) result ="Cần thuê tối thiểu 7 ngày";
  else{
    if(cost.length == 1 || num ==0) result ='Chưa nhập ngày  ';
    if(cost.length >= 5 & cost.length <=6 )
    result += cost.slice(-cost.length,-3) + ' Ngàn Đồng';
    else if(cost.length >= 7  & cost.length <= 9){
    result += cost.slice(-cost.length,-6) +' Triệu ' + cost.slice(-6,-3)+ ' Ngàn Đồng';
    }
    else if(cost.length >= 10)
    result += cost.slice(-cost.length,-9) +' Tỷ ' + cost.slice(-9,-6) + ' Triệu ' +cost.slice(-6,-3) + ' Ngàn Đồng';
    // else result += cost;

  }
return result;
}

$(function () {
  // Multiple images preview
  var imagesPreview = function (input, placeToInsertImagePreview) {

    if (input.files) {
      var filesAmount = input.files.length;

      for (i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = function (event) {
          $(placeToInsertImagePreview).append('<li class="image_item">                <img src="' + event.target.result + '" alt=""> <input type="text" style="display: none;" name="images_room" value="' + event.target.result + '">                <span class="delete_button" onclick="delete_image(this)">                  <i class="fa fa-times-circle delete"></i>                </span>              </li>'
          )
        }


        reader.readAsDataURL(input.files[i]);
      }
    }

  };

  $('#images_input').on('change', function () {
    imagesPreview(this, '.image_list');
  });
});

function delete_image(e) {
  var target = $(e).parent();
  target.remove();
}

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
var ProvinceSel = document.getElementById('province')
var x = getSelectedOption(ProvinceSel)

var DistrictSel = document.getElementById('district')

//fetch province 
var provinceApi =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";

var myHeader = new Headers({

  'Content-Type': 'application/json',
  'Token': '7a07ad56-3965-11eb-b36a-0e2790f48b9c',
}

);

var object = {
  method: 'GET',
  headers: myHeader
}


fetch(provinceApi, object)
  .then(res => res.json())
  .then(posts => {


    var htmls = posts.data.map(function (post) {
      return ` <option value="${post.ProvinceName}" title="${post.ProvinceID}">
             ${post.ProvinceName}
             </option>`


    })
    htmls.join('');
    document.getElementById('province').innerHTML += htmls;
  })

//fetch district   
var provinceInput = document.getElementById('province')

var districtApi =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";


fetch(districtApi, object)
  .then(res => res.json())
  .then(posts => {

    provinceInput.onchange = function () {
      var x = getSelectedOption(ProvinceSel)
      var provinceValue = x.title;
      var htmls = posts.data.map(function (post) {
        if (post.ProvinceID == Number(provinceValue)) {
          return ` <option value="${post.DistrictName}" title="${post.DistrictID}">
                   ${post.DistrictName}
                  </option>`
        }
      })
      htmls.join('');
      var a = `<option selected  value="" disabled >Quận huyện </option>`;
      document.getElementById('district').innerHTML = a;
      document.getElementById('district').innerHTML += htmls;
    }

  })


//fetch ward
var districtInput = document.getElementById('district')

var wardApi = "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id";
fetch(wardApi, object)
  .then(res => res.json())
  .then(posts => {
    districtInput.onchange = function () {
      var x = getSelectedOption(DistrictSel)
      var districtValue = x.title;
      var htmls = posts.data.map(function (post) {
        if (post.DistrictID == Number(districtValue)) {
          return ` <option value="${post.WardName}">
                   ${post.WardName}
                  </option>`
        }
      })
      htmls.join('');
      document.getElementById('ward').innerHTML = htmls;
    }

  })
