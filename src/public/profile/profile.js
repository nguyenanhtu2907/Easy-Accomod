function routePage(e, id) {
    e.preventDefault()
    let ulClicked = e.target.parentNode.parentNode;
    let liClicked = e.target.parentNode;
    let page = 1;
    if (liClicked.id.slice(-1) === '1' || e.target.innerText * 1 === 1) {
        let k = 1;
        ulClicked.querySelectorAll('#' + id + ' .num').forEach(item => {
            item.children[0].innerText = k + '';
            k++;
        });
        ulClicked.querySelector('.last').classList.remove('disabled')
        document.getElementById(id + '1').classList.add('disabled')
        ulClicked.querySelectorAll('#' + id + ' .num').forEach(num => {
            num.classList.remove('active')
        })
        if (liClicked.id.slice(-1) === '1') {
            ulClicked.querySelector('#' + id + ' .pre').classList.add('active');
            page = liClicked.id.slice(-1) * 1;
        } else {
            liClicked.classList.add('active');
            page = e.target.innerText * 1;
        }
    } else if (liClicked.classList.contains('last') || (e.target.innerText * 1 === ulClicked.querySelector('.last').value * 1) && !liClicked.classList.contains('current')) {
        let k = ulClicked.querySelector('.last').value * 1 - 2;
        ulClicked.querySelectorAll('#' + id + ' .num').forEach(item => {
            item.children[0].innerText = k;
            k++;
        });
        ulClicked.querySelector('.last').classList.add('disabled')
        document.getElementById(id + '1').classList.remove('disabled')
        ulClicked.querySelectorAll('#' + id + ' .num').forEach(num => {
            num.classList.remove('active')
        })
        if (liClicked.classList.contains('last')) {
            ulClicked.querySelector('#next').classList.add('active');
            page = liClicked.value * 1;
        } else {
            liClicked.classList.add('active');
            page = e.target.innerText * 1;
        }


    } else {
        let k = e.target.innerText * 1 - 1;
        page = e.target.innerText * 1;
        ulClicked.querySelectorAll('#' + id + ' .num').forEach(item => {
            item.children[0].innerText = k;
            k++;
        });
        ulClicked.querySelectorAll('#' + id + ' .num').forEach(num => {
            num.classList.remove('active')
        })
        ulClicked.querySelector('#' + id + ' .current').classList.add('active')
        ulClicked.querySelector('#' + id + ' .last').classList.remove('disabled')
        document.getElementById(id + '1').classList.remove('disabled')
    }


    if (ulClicked.querySelector('.last').value == 1 || ulClicked.querySelector('.last').value == 2 || page == ulClicked.querySelector('.last').value * 1 - 1) {
        ulClicked.querySelector('.last').classList.add('disabled')
    }
    if (page == 2) {
        document.getElementById(id + '1').classList.add('disabled')
    }

    // console.log(window.location.pathname+ '/nav?page='+(page-1))
    fetch(window.location.pathname + '/nav?tab=' + id + '&page=' + (page - 1))
        .then(res => res.json())
        .then(data => {
            var html = '';
            data.posts.forEach(post => {
                html += `
                <li class="line">
                    <a href="/post/${post.slug}" class="thumbnail">
                        <img src="${post.images[0]}" alt="">
                    </a>
                    <div class="props">
                        <p><a class="title" href="/post/${post.slug}">${post.title}</a></p>

                        <div class="text">${post.address.detail + ', ' + post.address.ward + ', ' + post.address.district + ', ' + post.address.province}</div>
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
                            <div id="${post._id}" class="fa fa-heart  ${data.saved.indexOf(post._id) != -1 ? 'checked' : 'default'}" onclick="saved(event)"></div>
                        </div>
                    </div>
                </li>
                `
            })
            document.querySelector('#' + id + ' .list-posts ul').innerHTML = html ? html : '<h3>Không có bài viết nào ở đây</h3>';
            Array.from(document.querySelectorAll('.tab-pane .list-posts .props .title')).forEach(title => {
                if (title.innerText.length > 65) {
                    title.innerText = title.innerText.slice(0, 65) + '...'
                }
            })
            window.scrollTo(0, 0)
        })

    history.pushState({ page: 1 }, "title 1", `?tab=${id}&page=${page}`)

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

function showTab(e, tab) {
    //fetch lay du lieu, ghep vao dom cho cac tab /account/:id/nav?tab=...&page=...

    var id = window.location.pathname.slice(9);
    var url = '';
    if (tab == 'posted') {
        url = window.location.pathname + `/nav`
    } else {
        url = window.location.pathname + `/nav?tab=${tab}`
    }
    fetch(url)
        .then(data => data.json())
        .then(data => {
            var html = '';
            if (Array.isArray(data.posts)) {
                data.posts.forEach(post => {
                    html += `
                    <li class="line">
                        <a href="/post/${post.slug}" class="thumbnail">
                            <img src="${post.images[0]}" alt="">
                        </a>
                        <div class="props">
                            <p><a class="title" href="/post/${post.slug}">${post.title}</a></p>

                            <div class="text">${post.address.detail + ', ' + post.address.ward + ', ' + post.address.district + ', ' + post.address.province}</div>
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
                                        <div class="fa fa-tv"> </div>
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
                                <div id="${post._id}" class="fa fa-heart  ${data.saved.indexOf(post._id) != -1 ? 'checked' : 'default'}" onclick="saved(event)"></div>
                            </div>
                        </div>
                    </li>
                    `
                })
            }
            document.querySelector('#' + tab + ' .list-posts ul').innerHTML = html ? html : '<h3>Không có bài viết nào ở đây</h3>';
            Array.from(document.querySelectorAll('.tab-pane .list-posts .props .title')).forEach(title => {
                if (title.innerText.length > 65) {
                    title.innerText = title.innerText.slice(0, 65) + '...'
                }
            })
        })
    history.pushState({ page: 1 }, "title 1", `?tab=${tab}`)
}
