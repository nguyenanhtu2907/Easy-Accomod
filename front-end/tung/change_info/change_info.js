
    //preview image
    var loader = function (evt){
        let file = evt.target.files;
        let output = document.getElementById("selector");
        if(file[0].type.match("image")) { 
            let reader = new FileReader();
            reader.addEventListener("load", function(e) {
                let data = e.target.result;
                let image = document.createElement("img");
                image.src = data;
                output.innerHTML = "";
                output.insertBefore(image,null);
                output.classList.add("image")
            });
            reader.readAsDataURL(file[0]);
        }
    }
    let fileInput = document.getElementById("avatar");
    fileInput.addEventListener("change", loader);


    function getSelectedOption(sel) {
      var opt;
      for ( var i = 0, len = sel.options.length; i < len; i++ ) {
          opt = sel.options[i];
          if ( opt.selected === true ) {
              break;
          }
      }
      return opt;
    }

//fetch province 
var ProvinceSel = document.getElementById('province')
var x = getSelectedOption(ProvinceSel)
// console.log(x)
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
    .then( res => res.json() )
    .then(posts => {
        
       
         var htmls = posts.data.map(function(post){
             return ` <option value="${post.ProvinceName}" title="${post.ProvinceID}">
             ${post.ProvinceName}
             </option>`
              

          })
          // console.log(posts);
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
        var x = getSelectedOption(ProvinceSel)
        
        // console.log(ProvinceValue);
        var provinceValue =  x.title;
        
        // console.log(typeof (provinceValue));
        var htmls = posts.data.map(function(post){
          // console.log(typeof(post.DistrictID))
          // console.log(post.ProvinceID == Number(provinceValue))
            if(post.ProvinceID == Number(provinceValue)){
              return ` <option value="${post.DistrictName}" title="${post.DistrictID}">
                   ${post.DistrictName}
                  </option>`
            }
          })
          
          
      //  console.log(posts)
      htmls.join('');
      var a=`<option selected  value="" disabled >Quận huyện </option>`;
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
      districtInput.onchange = function(){
        var x = getSelectedOption(DistrictSel)
        var districtValue = x.title;
        // console.log(typeof (provinceValue));
        var htmls = posts.data.map(function(post){
          // console.log(typeof(post.DistrictID))
          // console.log(post.ProvinceID == Number(provinceValue))
            if(post.DistrictID == Number(districtValue)){
              return ` <option value="${post.WardName}">
                   ${post.WardName}
                  </option>`
            }
          })
          
          
      //  console.log(posts)
      htmls.join('');
      document.getElementById('ward').innerHTML = htmls;
}
                 
                      
              
          
          
})