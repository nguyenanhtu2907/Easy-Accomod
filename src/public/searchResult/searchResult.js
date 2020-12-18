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
        for(city in cities){
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
        for(district in districts){
            if(districts[district].parent_code==iCity){html += `
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
        for(ward in wards){
            if(wards[ward].parent_code==iDistrict){
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
    document.querySelector('.posts .list-posts ul').innerHTML='';
    document.querySelector('.posts-area .text-result h4').innerText='Chúng tôi sẽ mang lại thông tin các phòng trọ phù hợp nhất với tiêu chí tìm trọ của bạn. Hãy nhập các lựa chọn ở bộ tìm kiếm nâng cao ở trên!!!'
    document.querySelectorAll('.posts-area .option-result b')[1].innerText=''
    url='';
    console.log(url)
    Array.from(document.querySelectorAll('input')).forEach(input =>{
        if(input.type=='text'){
            input.value='';
        }else if(input.type == 'checkbox'){
            input.checked=false;
        }else if(input.type == 'radio'){
            input.checked=false;
        }
    })
    // location.reload();
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
    } else if (liClicked.classList.contains('last') || e.target.innerText * 1 === ulClicked.querySelector('.last').id * 1 && liClicked.id!='current') {
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

    fetch(url + '&page=' + (page - 1))
        .then(res => res.json())
        .then(data => {
            var html = '';
            data.posts.forEach(function (post) {
                html += `
                <li class="line">
                    <a href="/post/${post.slug}" class="thumbnail">
                        <img src="${post.images[0]}" alt="">
                    </a>
                    <div class="props">
                        <p><a class="title" href="/post/${post.slug}">${post.title}</a></p>

                        <div class="text">${post.address.detail?post.address.detail+ ', ':'' + post.address.ward + ', ' + post.address.district + ', ' + post.address.province}</div>
                        <div class="equi">
                            <ul>
                                <li><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-textarea"
                                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                    </svg> ${post.area} m <sup>2</sup>
                                </li>
                                <li>
                                    <div class="fa fa-bed"></div>${post.equipments.bedroom}
                                </li>
                                ${post.equipments.hottank ? `<li>
                                    <div class="fa fa-tv"> 1</div>
                                </li>`: ''}
                                ${post.equipments.airconditional ? `<li> <img class="fa" src="/profile/air-conditioner.png" width="18px" height="18px"
                                alt=""> 1</li>`: ''}
                            </ul>
                        </div>
                        <h3 class="cost">${post.rentcost}vnđ</h3>
                        <div class="update text">Ngày đăng: ${post.updatedTime}</div>
                        <div class="contact">
                            <div class="phone">
                                <div class="fa fa-phone"></div>${post.contact}
                            </div>
                            <div id="${post._id}" class="fa fa-heart  ${data.saved && data.saved.indexOf(post._id) != -1 ? 'checked' : 'default'}" onclick="saved(event)"></div>
                        </div>
                    </div>
                </li>

                `
            })
            document.querySelector('.posts .list-posts ul').innerHTML=html;
            window.scrollTo(0,0)
        })



}
function saved(e) {
    e.preventDefault();
    if (document.querySelector('.header .menu .info-account')) {
        let btn = e.target;
        let urlUser = '';
        let urlPost = '';
        if (btn.classList.contains('default')) {
            btn.classList.add('checked')
            btn.classList.remove('default')
            urlUser = `/account/saved?post=${btn.id}&key=saved`
            urlPost = `/post/saved?post=${btn.id}&key=saved`
        } else {
            btn.classList.add('default')
            btn.classList.remove('checked')
            urlUser = `/account/saved?post=${btn.id}&key=unsaved`
            urlPost = `/post/saved?post=${btn.id}&key=unsaved`
        }
        fetch(urlPost)
        fetch(urlUser)
    }

}
var url;

$('.search-btn').click(function(event){
    event.preventDefault()
    url = '/post/searchResult?'+$('.search-inputs').serialize();
    searchFetch(url)
})

function sort(e, sortQuery){
    if(url){
        searchFetch(url+'&sort='+sortQuery)
    }
}
function redirect(e, roomType){
    e.preventDefault()
    url='/post/searchResult?roomType='+roomType
    searchFetch(url)
}
function searchFetch(url){
    fetch(url)
    .then(data=>data.json())
    .then(data=>{
        let html ='';
        data.posts.forEach(post=>{
            html+=`
            <li class="line">
                <a href="/post/${post.slug}" class="thumbnail">
                    <img src="${post.images[0]}" alt="">
                </a>
                <div class="props">
                    <p><a class="title" href="/post/${post.slug}">${post.title}</a></p>

                    <div class="text">${post.address.detail?post.address.detail+ ', ':'' + post.address.ward + ', ' + post.address.district + ', ' + post.address.province}</div>
                    <div class="equi">
                        <ul>
                            <li><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-textarea"
                                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg> ${post.area} m <sup>2</sup>
                            </li>
                            <li>
                                <div class="fa fa-bed"></div>${post.equipments.bedroom}
                            </li>
                            ${post.equipments.hottank ? `<li>
                                <div class="fa fa-tv"> 1</div>
                            </li>`: ''}
                            ${post.equipments.airconditional ? `<li> <img class="fa" src="/profile/air-conditioner.png" width="18px" height="18px"
                            alt=""> 1</li>`: ''}
                        </ul>
                    </div>
                    <h3 class="cost">${post.rentcost}vnđ</h3>
                    <div class="update text">Ngày đăng: ${post.updatedTime}</div>
                    <div class="contact">
                        <div class="phone">
                            <div class="fa fa-phone"></div>${post.contact}
                        </div>
                        <div id="${post._id}" class="fa fa-heart  ${data.saved && data.saved.indexOf(post._id) != -1 ? 'checked' : 'default'}" onclick="saved(event)"></div>
                    </div>
                </div>
            </li>
            `
            
        })
        document.querySelector('.posts .list-posts ul').innerHTML=html;
        let page = data.total > 10 ? Math.ceil(data.total / 10) : 1
        if(data.total>10){
            document.querySelector('.posts').innerHTML+=`
                <nav aria-label="page navigation example" class="next_page">
                    <ul class="pagination">
                        <li class="page-item disabled" id="1"><a class="page-link" href="#" onclick="routePage(event)"
                                aria-label="Previous"><span aria-hidden="true">&laquo;</span> Trang đầu</a></li>
                        <li class="page-item num active" id="pre"><a class="page-link" onclick="routePage(event)"
                                href="?page=1">1</a></li>
                        <li class="page-item num " id="current"><a class="page-link" onclick="routePage(event)"
                                href="?page=2">2</a></li>
                        <li class="page-item num ${page==1 || page ==2?'disabled':''}" id="next"><a class="page-link" onclick="routePage(event)"
                                href="?page=3">3</a></li>
                        <li class="page-item last ${page==1 || page ==2?'disabled':''}" id="${page}">
                            <a class="page-link " onclick="routePage(event)" href="#" aria-label="Next">
                                Trang cuối <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            `
        }

        if(data.total>0){
            document.querySelector('.posts-area .text-result h4').innerText='Kết quả tìm kiếm:'
            document.querySelectorAll('.posts-area .option-result b')[1].innerText=data.total
        }else{
            document.querySelector('.posts-area .text-result h4').innerText='Chúng tôi sẽ mang lại thông tin các phòng trọ phù hợp nhất với tiêu chí tìm trọ của bạn. Hãy nhập các lựa chọn ở bộ tìm kiếm nâng cao ở trên!!!'
            document.querySelectorAll('.posts-area .option-result b')[1].innerText=''
        }
    })
}