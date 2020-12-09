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
 
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
  
    return false;
    
  }
  showTab(currentTab);
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

number.addEventListener('input', updateValue);
function updateValue(e){
    
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

$(function() {
  // Multiple images preview
  var imagesPreview = function(input, placeToInsertImagePreview) {

      if (input.files) {
          var filesAmount = input.files.length;

          for (i = 0; i < filesAmount; i++) {
              var reader = new FileReader();

              reader.onload = function(event) {
                $(placeToInsertImagePreview).append('<li class="image_item">                <img src="' + event.target.result+'" alt="">                <span class="delete_button" onclick="delete_image(this)">                  <i class="fa fa-times-circle delete"></i>                </span>              </li>'
                )
              }
              

              reader.readAsDataURL(input.files[i]);
          }
      }

  };

  $('#images_input').on('change', function() {
      imagesPreview(this, '.image_list');
  });
});

function delete_image(e){
  var target =$(e).parent();
  target.remove();
}



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
    .then( res => res.json() )
    .then(posts => {
        
         var htmls = posts.data.map(function(post){
             return ` <option value="${post.ProvinceID}">
             ${post.ProvinceName}
             </option>`
              
          })
          // console.log(posts)
         htmls.join('');
         document.getElementById('province').innerHTML += htmls;
    })


//fetch district   
var provinceInput = document.getElementById('province')
  
    var districtApi =
"https://online-gateway.ghn.vn/shiip/public-api/master-data/district";

    
fetch(districtApi, object)
    .then(res=>res.json())
    .then(posts => {
      provinceInput.onchange = function(){
        var provinceValue = document.getElementById('province').value;
        // console.log(typeof (provinceValue));
        var htmls = posts.data.map(function(post){
          // console.log(typeof(post.DistrictID))
          // console.log(post.ProvinceID == Number(provinceValue))
            if(post.ProvinceID == Number(provinceValue)){
              return ` <option value="${post.DistrictID}">
                   ${post.DistrictName}
                  </option>`
            }
          })
          
          
      //  console.log(posts)
      htmls.join('');
      document.getElementById('district').innerHTML = htmls;
      }
         
    })
   