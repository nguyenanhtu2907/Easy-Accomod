var cities; // cac thanh pho
var iCity; // index city duoc click
var iDistrict; //index district duoc click
fetch('http://localhost:3000/searchResult/local.json')
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
        if (!e.target.classList.contains('back')) {
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
    if (step == 2 && status != 0) {
        if (!e.target.classList.contains('back')) {
            iDistrict = Array.from(e.target.parentNode.querySelectorAll('li')).indexOf(e.target)
        }
        let html = '<li class="back" onclick="showAddress(event, 1, -1)"><div class="fa fa-angle-left"></div>Quay lại </li>';
        cities[iCity].districts[iDistrict - 1].wards.forEach(ward => {
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
document.addEventListener('mouseup', function (e) {
    var address = document.querySelector('.address');
    if (!address.contains(e.target)) {
        Array.from(document.querySelectorAll('.address .option')).forEach(option => {
            if (!option.classList.contains('none')) {
                option.classList.add('none');
            }
        })
    }
});
document.addEventListener('mouseup', function (e) {
    var price = document.querySelector('.price');
    if (!price.contains(e.target)) {
        document.querySelector('.price .option').classList.add('none')
    }
});
document.addEventListener('mouseup', function (e) {
    var price = document.querySelector('.sort');
    if (!price.contains(e.target)) {
        document.querySelector('.sort .sort-option').classList.add('none')
    }
});
var min = 0;
var max;
function showList(e, element) {
    document.querySelector(element).classList.toggle('none');
}
function checkPrice(e) {
    let text = '';
    if (e.target.name == 'min') {
        min = e.target;
    } else {
        max = e.target;
        if (min.value * 1 <= max.value * 1) {
            text = min.parentNode.innerText + ' - ' + max.parentNode.innerText;
            document.querySelector('.minPrice').value = min.value;
            document.querySelector('.maxPrice').value = max.value;
        } else {
            text = max.parentNode.innerText + ' - ' + min.parentNode.innerText;
            document.querySelector('.maxPrice').value = min.value;
            document.querySelector('.minPrice').value = max.value;
        }
        document.querySelector('.price>span').innerText = text;
        document.querySelector('.price>span').innerHTML += '<div class="fa fa-angle-down"></div>'
        document.querySelector('.price .option').classList.add('none');
    }
}


var filterText = '';

function showFilter(e) {
    e.preventDefault();
    document.querySelector('.filter .option-filter').classList.toggle('none')
    document.querySelector('.background-filter').classList.toggle('none')
    if (e.target.classList.contains('filter-btn-inner')) {
        let equi = '';
        Array.from(document.querySelectorAll('.filter input[type=text]')).forEach(input => {
            equi += input.value.trim() + ' '
        })
        document.querySelector('input[name=advanced]').value = equi;
    }
}
function nextFilter(e) {
    var options = Array.from(e.target.parentNode.querySelectorAll('li'))
    var lists = Array.from(document.querySelectorAll('.filter .option-filter .list-option'))
    lists[options.indexOf(e.target)].classList.remove('none')
    lists[0].classList.add('none')
}
function backFilter(e) {
    // console.log()
    e.target.parentNode.classList.add('none')
    var lists = Array.from(document.querySelectorAll('.filter .option-filter .list-option'))
    lists[0].classList.remove('none')
    if (e.target.parentNode.querySelector('input[type=checkbox]')) {
        let equi = '';
        Array.from(e.target.parentNode.querySelectorAll('input[type=checkbox]')).forEach(input => {
            if (input.checked) {
                equi += input.value + ' '
            }
        })
        e.target.parentNode.querySelector('input[type=text]').value = equi;

    } else if (e.target.parentNode.querySelector('input[type=text]')) {
        e.target.parentNode.querySelector('input[type=text]').value = e.target.innerText
    }
}
document.addEventListener('mouseup', function (e) {
    var filter = document.querySelector('.filter');
    if (!filter.contains(e.target)) {
        document.querySelector('.filter .option-filter').classList.add('none')
        document.querySelector('.background-filter').classList.add('none')
    }
});

function resetFilter(e){
    document.querySelector('.address>span').innerText = 'Chọn khu vực';
    document.querySelector('.address>span').innerHTML += '<div class="fa fa-angle-down"></div>';
    document.querySelector('.price>span').innerText = ' Chọn khoảng giá (tháng)';
    document.querySelector('.price>span').innerHTML += '<div class="fa fa-angle-down"></div>';


    Array.from(document.querySelectorAll('input')).forEach(input =>{
        if(input.type=='text'){
            input.value='';
        }else if(input.type == 'checkbox'){
            input.checked=false;
        }else if(input.type == 'radio'){
            input.checked=false;
        }
    })
}

function routePage(e) {
    e.preventDefault()
    let ulClicked = e.target.parentNode.parentNode;
    let liClicked = e.target.parentNode;
    let page = 1;
    if (liClicked.id === '1' || e.target.innerText * 1 === 1) {
        let k = 1;
        ulClicked.querySelectorAll('.num').forEach(item => {
            item.children[0].innerText = k + '';
            k++;
        });
        ulClicked.querySelector('.last').classList.remove('disabled')
        document.getElementById('1').classList.add('disabled')
        ulClicked.querySelectorAll('.num').forEach(num => {
            num.classList.remove('active')
        })
        if (liClicked.id === '1') {
            ulClicked.querySelector('#pre').classList.add('active');
            page = liClicked.id * 1;
        } else {
            liClicked.classList.add('active');
            page = e.target.innerText * 1;
        }
    } else if (liClicked.classList.contains('last') || e.target.innerText * 1 === ulClicked.querySelector('.last').id * 1) {
        let k = ulClicked.querySelector('.last').id * 1 - 2;
        ulClicked.querySelectorAll('.num').forEach(item => {
            item.children[0].innerText = k;
            k++;
        });
        ulClicked.querySelector('.last').classList.add('disabled')
        document.getElementById('1').classList.remove('disabled')
        ulClicked.querySelectorAll('.num').forEach(num => {
            num.classList.remove('active')
        })
        if (liClicked.classList.contains('last')) {
            ulClicked.querySelector('#next').classList.add('active');
            page = liClicked.id * 1;
        } else {
            liClicked.classList.add('active');
            page = e.target.innerText * 1;
        }
    } else {
        let k = e.target.innerText * 1 - 1;
        page = e.target.innerText * 1;
        ulClicked.querySelectorAll('.num').forEach(item => {
            item.children[0].innerText = k;
            k++;
        });
        ulClicked.querySelectorAll('.num').forEach(num => {
            num.classList.remove('active')
        })
        ulClicked.querySelector('#current').classList.add('active')
        ulClicked.querySelector('.last').classList.remove('disabled')
        document.getElementById('1').classList.remove('disabled')
    }


    if (ulClicked.querySelector('.last').id == 1 || ulClicked.querySelector('.last').id == 2 || page == ulClicked.querySelector('.last').id * 1 - 1) {
        ulClicked.querySelector('.last').classList.add('disabled')
    }
    if (page == 2) {
        document.getElementById('1').classList.add('disabled')
    }

    // console.log(window.location.pathname+ '/nav?page='+(page-1))
    // fetch(window.location.pathname + '/nav?page=' + (page - 1))
    //     .then(res => res.json())
    //     .then(data => {
    //         var html = '';
    //         data.forEach(function (item) {
    //             html += `
    //             <li class="recipes_item">
    //                 <div class="cook_link">
    //                     <div class="recipes_item-main">
    //                         <a href="/account/${item.author}" class="link">
    //                             <img class="recipes_item-nick--image" src="${item.authorAvatar}" alt="">
    //                             <span class="nick_name">${item.authorName}</span>
    //                         </a>
    //                         <a href="/post/${item.slug}" class="title link">
    //                             <h3 class="title_text">${item.title}</h3>
    //                         </a>
    //                         <div class="time_and_ration">
    //                 `
    //             if (item.timecook) {
    //                 html += `
    //                         <span class="time"><i class="fas fa-stopwatch time_icon"></i>
    //                             ${item.timecook} phút
    //                         </span>
    //                         `
    //             }
    //             if (item.ration) {
    //                 html += `
    //                         <span class="ration"><i class="fas fa-user ration_icon"></i>
    //                             ${item.ration}</span>
    //                         `
    //             }
    //             html += `
    //                     </div>
    //                     <div class="description">
    //                         <p class="description_info"> ${item.ingredients}
    //                         </p>
    //                     </div>
    //                 </div>
    //                 <div class="cook_image">
    //                     <img class="recipes_item-main--image" src="${item.thumbnail}" alt="">
    //                 </div>
    //             </div>
    //         </li>
    //         `
    //         })
    //         ulClicked.parentNode.parentNode.querySelector('.recipes_list').innerHTML = html;
    //         window.scrollTo(0,0)
    //     })



}