var cities; // cac thanh pho
var iCity; // index city duoc click
var iDistrict; //index district duoc click
fetch('http://127.0.0.1:5500/front-end/searchResult/local.json')
    .then(res => res.json())
    .then(data => {
        cities = data; 
    })
    .catch()

function showAddress(e, step, status) {
    let steps = Array.from(document.querySelectorAll('.select .option'));
    let address = document.querySelector('.select>span');
    if (step == 0) {
        let html = '';
        cities.forEach(city => {
            html += `
            <li class="li-option" onclick="showAddress(event, 1, 1)">${city.name}<div class="fa fa-angle-right"></div></li>
            `
        })
        steps[step].querySelector('.list-option').innerHTML = html;
    }
    if (step == 1) {
        if(!e.target.classList.contains('back')){
            iCity = Array.from(e.target.parentNode.querySelectorAll('li')).indexOf(e.target);
        }
        let html = '<li class="back" onclick="showAddress(event, 0, -1)"><div class="fa fa-angle-left"></div>Quay lại </li>';
        cities[iCity].districts.forEach(district => {
            html += `
            <li class="li-option" onclick="showAddress(event, 2, 1)">${district.name}<div class="fa fa-angle-right"></div></li>
            `
        })
        steps[step].querySelector('.list-option').innerHTML = html;
    }
    if (step == 2 && status!=0) {
        if(!e.target.classList.contains('back')){
            iDistrict = Array.from(e.target.parentNode.querySelectorAll('li')).indexOf(e.target)
        }
        let html = '<li class="back" onclick="showAddress(event, 1, -1)"><div class="fa fa-angle-left"></div>Quay lại </li>';
        cities[iCity].districts[iDistrict-1].wards.forEach(ward => {
            html += `
            <li class="li-option" onclick="showAddress(event, 2, 0)">${ward.name}<div class="fa fa-angle-right"></div></li>
            `
        })
        steps[step].querySelector('.list-option').innerHTML = html;
    }
    if (e.target.classList.contains('back') || e.target.classList.contains('fa-angle-down')) {
        address.innerText = 'Chọn khu vực';
        address.innerHTML += '<div class="fa fa-angle-down"></div>';
        steps[step].classList.remove('none');
        steps[step + 1].classList.add('none');
    }else {
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
document.addEventListener('mouseup', function(e) {
    var address = document.querySelector('.address');
    if (!address.contains(e.target)) {
        Array.from(document.querySelectorAll('.address .option')).forEach(option=>{
            if(!option.classList.contains('none')){
                option.classList.add('none');
            }
        })
    }
});
document.addEventListener('mouseup', function(e) {
    var price = document.querySelector('.price');
    if (!price.contains(e.target)) {
        document.querySelector('.price .option').classList.add('none')
    }
});
document.addEventListener('mouseup', function(e) {
    var price = document.querySelector('.sort');
    if (!price.contains(e.target)) {
        document.querySelector('.sort .sort-option').classList.add('none')
    }
});
var min = 0;
var max;
function showList(e, element){
    document.querySelector(element).classList.toggle('none');
}
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


var filterText='';

function showFilter(e) {
    e.preventDefault();
    document.querySelector('.filter .option-filter').classList.toggle('none')
    document.querySelector('.background-filter').classList.toggle('none')
    if(e.target.classList.contains('filter-btn-inner')){
        let equi = '';
        Array.from(document.querySelectorAll('.filter input[type=text]')).forEach(input =>{
            equi += input.value.trim() + ' '
        })
        document.querySelector('input[name=advanced]').value = equi; 
    }
}
function nextFilter(e){
    var options = Array.from(e.target.parentNode.querySelectorAll('li'))
    var lists = Array.from(document.querySelectorAll('.filter .option-filter .list-option'))
    lists[options.indexOf(e.target)].classList.remove('none')
    lists[0].classList.add('none')
}
function backFilter(e){
    // console.log()
    e.target.parentNode.classList.add('none')
    var lists = Array.from(document.querySelectorAll('.filter .option-filter .list-option'))
    lists[0].classList.remove('none')
    if(e.target.parentNode.querySelector('input[type=checkbox]')){
        let equi = '';
        Array.from(e.target.parentNode.querySelectorAll('input[type=checkbox]')).forEach(input =>{
            if(input.checked){
                equi += input.value + ' '
            }
        })
        e.target.parentNode.querySelector('input[type=text]').value = equi; 

    }else if(e.target.parentNode.querySelector('input[type=text]')){
        e.target.parentNode.querySelector('input[type=text]').value = e.target.innerText 
    }
}
document.addEventListener('mouseup', function(e) {
    var filter = document.querySelector('.filter');
    if (!filter.contains(e.target)) {
        document.querySelector('.filter .option-filter').classList.add('none')
        document.querySelector('.background-filter').classList.add('none')
       }
});