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
function saved(e) {
    e.preventDefault()
    let btn = e.target;
    if (btn.classList.contains('default')) {
        btn.classList.add('checked')
        btn.classList.remove('default')
        // fetch()
    } else {
        btn.classList.add('default')
        btn.classList.remove('checked')
        // fetch()
    }
    
}
