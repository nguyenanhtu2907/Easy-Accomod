function showOption(e) {
    let listInner = e.target.parentNode.querySelector('.list-inner');
    listInner.classList.toggle('drop-down-option');
}
var trs = Array.from(document.querySelectorAll('.list-items tbody tr'));
trs.forEach(tr => {
    tr.addEventListener('click', function (e) {
        console.log(1);
        //tim Địa chỉ/index của tr trong trs
        //chiếu sang mảng dữ liệu vừa fetch từ server và thay đổi dữ liệu bên detail-side
    });
})
function changeList(e, element) {
    document.querySelector('.title-option span').innerText = e.target.innerText;
    document.querySelector('.title-option span').innerHTML += '<div class="fa fa-angle-down"></div>'
    document.querySelector('.title-option ul').classList.add('none');
}
var keyDetail=''
function showInfo(e, type, element) {
    let items = e.target.parentNode;
    let url = '';
    if (type == 0) {
        url = `/account/get-info?key=${items.querySelectorAll('td')[0].innerText}`
        fetch(url)
            .then(res => res.json())
            .then(user => {
                let spans = document.querySelectorAll(element + ' li span');
                spans[0].innerText = user._id;
                spans[1].innerText = user.username;
                spans[2].innerText = user.fullname;
                spans[3].innerText = user.gender;
                spans[4].innerText = user.phone;
                spans[5].innerText = user.email;
                spans[6].innerText = user.identity;
                spans[7].innerText = user.address;
                keyDetail=`/account/${user._id}`
            })
    } else if (type == 1) {
        url = `/post/get-info?key=${items.querySelectorAll('td')[0].innerText}`
        fetch(url)
            .then(res => res.json())
            .then(post => {
                let spans = document.querySelectorAll(element + ' li span');
                spans[0].innerText = post._id;
                spans[1].innerText = post.authorName;
                spans[2].innerText = post.title.length > 50 ? post.title.slice(0, 51) + '...' : post.title;
                spans[3].innerText = post.address.detail + ', ' + post.address.ward + ', ' + post.address.district + ', ' + post.address.province;
                spans[4].innerText = post.contact;
                spans[5].innerText = post.createdDate;
                spans[6].innerText = post.rentcost;
                spans[7].innerText = post.roomtype;
                spans[8].innerText = post.area;
                spans[9].innerText = post.availabletime * 25000;
                spans[10].innerText = post.owner;
                keyDetail=`/post/${post.slug}`
            })
    } else {
        let li = e.target;
        while (li.tagName != 'LI') {
            li = li.parentNode;
        }
        Array.from(li.parentNode.querySelectorAll('li')).forEach((ele, index) => {
            if (li === ele) {
                li.classList.add('chosen')
                if (li.classList.contains('bolder')) {
                    li.classList.remove('bolder')
                    fetch('/account/seen-message/' + index, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(() => { })
                        .catch(() => { })
                }

            } else {
                ele.classList.remove('chosen')
            }
        });

        url = `/account/get-info?key=${li.querySelector('.info-chat span').innerText}`
        fetch(url)
            .then(res => res.json())
            .then(user => {
                let spans = document.querySelectorAll(element + ' li span');
                spans[0].innerText = user._id;
                spans[1].innerText = user.username;
                spans[2].innerText = user.fullname;
                spans[3].innerText = user.gender;
                spans[4].innerText = user.phone;
                spans[5].innerText = user.email;
                spans[6].innerText = user.identity;
                spans[7].innerText = user.address;
                keyDetail=`/account/${user._id}`
                let chatHtml = '';
                user.messages.forEach(message => {
                    chatHtml += `
                        <li>
                            <div class="a-message ${message.author == 'admin' ? 'admin-message' : ''}"><span> ${message.message}</span></div>
                        </li>
                    `
                })
                document.querySelector('.chat-area ul').innerHTML = chatHtml;
                document.querySelector('.chat-area').scrollTop = document.querySelector('.chat-area').scrollHeight;
            })
    }
}
const detail = ()=>{
    if(keyDetail){
        window.location.href='http://localhost:3000'+keyDetail
    }
}
function chooseOption(bigOption, innerOption) {
    //bigOption: option to: quản lý bài viết, tài khoản, chat, thống kê
    //innerOption: các option nhỏ trong bigOption
    var bigOptions = Array.from(document.querySelectorAll('.content .list-side .tab-option'))
    let html = '';
    var data;
    //xac dinh url - fetch - co data - truyen vao dom

    bigOptions.forEach((option, index) => {
        //option: tab-option
        if (index != bigOption && !option.classList.contains('none')) {
            option.classList.add('none')
        } else if (index == bigOption) {
            option.classList.remove('none')
            switch (innerOption) {
                case 0: {
                    fetch(window.location.pathname + '?option=0')
                        .then(users => users.json())
                        .then(users => {
                            option.querySelector('.title h1').innerText = 'Danh sách chủ trọ chờ phê duyệt (' + users.length + ')';
                            option.querySelector('.list-items thead tr').innerHTML = `
                                <th>Tên đăng nhập</th>
                                <th>Họ và tên</th>
                                <th>Số điện thoại</th>
                                <th>Giới tính</th>
                                <th>Email</th>
                            `;
                            users.forEach(user => {
                                html += `
                                    <tr onclick="showInfo(event, 0, '#info-user')">
                                        <td>${user.username}</td>
                                        <td>${user.fullname}</td>
                                        <td>${user.phone}</td>
                                        <td>${user.gender}</td>
                                        <td>${user.email}</td>
                                    </tr>
                                `;
                            })
                            option.querySelector('.list-items tbody').innerHTML = html;
                            option.querySelector('.detail-side').innerHTML = `
                                <h1>Thông tin tài khoản</h1>
                                <ul id="info-user">
                                    <li>
                                        <b>ID người dùng</b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Tên đăng nhập </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Họ và tên </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Giới tính </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Số điện thoại </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Email </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>CCCD/CMND </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Địa chỉ </b>: <span></span>
                                    </li>
                                </ul>
                                <div class="button-admin">
                                    <div onclick="actionAdmin('user', 'accept', 0, 0)" class="button accept disabled">
                                        <span>Duyệt</span>
                                    </div>
                                    <div onclick="actionAdmin('user', 'reject', 0, 0)" class="button reject">
                                        <span>Từ chối</span>
                                    </div>
                                </div>
                            `;
                            option.querySelector('.list-items table').scrollIntoView();
                        })
                        .catch(() => { })
                    break;
                } case 1: {
                    fetch(window.location.pathname + '?option=1')
                        .then(users => users.json())
                        .then(users => {
                            option.querySelector('.title h1').innerText = 'Danh sách chủ trọ đã phê duyệt (' + users.length + ')';


                            option.querySelector('.list-items thead tr').innerHTML = `
                                <th>Tên đăng nhập</th>
                                <th>Họ và tên</th>
                                <th>Số điện thoại</th>
                                <th>Giới tính</th>
                                <th>Email</th>
                            `;
                            users.forEach(user => {
                                html += `
                                    <tr onclick="showInfo(event, 0, '#info-user')">
                                        <td>${user.username}</td>
                                        <td>${user.fullname}</td>
                                        <td>${user.phone}</td>
                                        <td>${user.gender}</td>
                                        <td>${user.email}</td>
                                    </tr>
                                `;
                            })
                            option.querySelector('.list-items tbody').innerHTML = html;
                            option.querySelector('.detail-side').innerHTML = `
                                <h1>Thông tin tài khoản</h1>
                                <ul id="info-user">
                                    <li>
                                        <b>ID người dùng</b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Tên đăng nhập </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Họ và tên </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Giới tính </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Số điện thoại </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Email </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>CCCD/CMND </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Địa chỉ </b>: <span></span>
                                    </li>
                                </ul>
                                <div class="button-admin">
                                    <div onclick="detail()" class="button accept disabled">
                                        <span>Chi tiết</span>
                                    </div>
                                </div>
                            `;
                            option.querySelector('.list-items table').scrollIntoView();
                        })
                        .catch(() => { })
                    break;
                } case 2: {
                    fetch(window.location.pathname + '?option=2')
                        .then(users => users.json())
                        .then(users => {
                            option.querySelector('.title h1').innerText = 'Danh sách chủ trọ đã từ chối (' + users.length + ')';
                            option.querySelector('.list-items thead tr').innerHTML = `
                                <th>Tên đăng nhập</th>
                                <th>Họ và tên</th>
                                <th>Số điện thoại</th>
                                <th>Giới tính</th>
                                <th>Email</th>
                            `;
                            users.forEach(user => {
                                html += `
                                    <tr onclick="showInfo(event, 0, '#info-user')">
                                        <td>${user.username}</td>
                                        <td>${user.fullname}</td>
                                        <td>${user.phone}</td>
                                        <td>${user.gender}</td>
                                        <td>${user.email}</td>
                                    </tr>
                                `;
                            });
                            option.querySelector('.list-items tbody').innerHTML = html;
                            option.querySelector('.detail-side').innerHTML = `
                                <h1>Thông tin tài khoản</h1>
                                <ul id="info-user">
                                    <li>
                                        <b>ID người dùng</b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Tên đăng nhập </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Họ và tên </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Giới tính </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Số điện thoại </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Email </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>CCCD/CMND </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Địa chỉ </b>: <span></span>
                                    </li>
                                    <div class="button-admin">
                                        <div onclick="actionAdmin('user', 'restore', 0, 2)" class="button accept disabled">
                                            <span>Khôi phục</span>
                                        </div>
                                    </div>
                                </ul>
                            `;
                            option.querySelector('.list-items table').scrollIntoView();
                        })
                        .catch(() => { })
                    break;
                } case 3: {
                    fetch(window.location.pathname + '?option=3')
                        .then(users => users.json())
                        .then(users => {
                            option.querySelector('.title h1').innerText = 'Danh sách người thuê trọ (' + users.length + ')';
                            option.querySelector('.list-items thead tr').innerHTML = `
                                <th>Tên đăng nhập</th>
                                <th>Họ và tên</th>
                                <th>Số điện thoại</th>
                                <th>Giới tính</th>
                                <th>Email</th>
                            `;
                            users.forEach(user => {
                                html += `
                                    <tr onclick="showInfo(event, 0, '#info-user')">
                                        <td>${user.username}</td>
                                        <td>${user.fullname}</td>
                                        <td>${user.phone}</td>
                                        <td>${user.gender}</td>
                                        <td>${user.email}</td>
                                    </tr>
                                `;
                            });
                            option.querySelector('.list-items tbody').innerHTML = html;
                            option.querySelector('.detail-side').innerHTML = `
                                <h1>Thông tin tài khoản</h1>
                                <ul id="info-user">
                                    <li>
                                        <b>ID người dùng</b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Tên đăng nhập </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Họ và tên </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Giới tính </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Số điện thoại </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Email </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>CCCD/CMND </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Địa chỉ </b>: <span></span>
                                    </li>
                                </ul>
                            `;
                            option.querySelector('.list-items table').scrollIntoView();
                        })
                        .catch(() => { })
                    break;
                } case 4: {
                    fetch(window.location.pathname + '?option=4')
                        .then(posts => posts.json())
                        .then(posts => {
                            option.querySelector('.title h1').innerText = 'Danh sách bài viết chờ duyệt (' + posts.length + ')';
                            option.querySelector('.list-items thead tr').innerHTML = `
                                <th>ID bài viết</th>
                                <th>Tiêu đề</th>
                                <th>Người đăng</th>
                                <th>Liên hệ</th>
                                <th>Thời gian tạo</th>
                            `;
                            posts.forEach(post => {
                                html += `
                                    <tr onclick="showInfo(event, 1, '#info-post')">
                                        <td>${post._id}</td>
                                        <td>${post.title.length > 50 ? post.title.slice(0, 51) + '...' : post.title}</td>
                                        <td>${post.authorName}</td>
                                        <td>${post.contact}</td>
                                        <td>${post.createdDate}</td>
                                    </tr>
                                `;
                            });
                            option.querySelector('.list-items tbody').innerHTML = html;
                            option.querySelector('.detail-side').innerHTML = `
                                <h1>Thông tin bài viết</h1>
                                <ul id="info-post">
                                    <li>
                                        <b>ID bài viết </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Người viết </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Tiêu đề </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Địa chỉ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Liên hệ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Thời gian tạo </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Giá tiền </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Loại trọ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Diện tích </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Phí đăng bài </b>: <span></span>
                                    </li>
                                    <li style="display:none">
                                        <b>ID chủ trọ </b>: <span></span>
                                    </li>
                                </ul>
                                <div class="button-admin">
                                    <div onclick="actionAdmin('post', 'accept', 0, 4)" class="button accept disabled">
                                        <span>Duyệt</span>
                                    </div>
                                    <div onclick="actionAdmin('post', 'reject', 0, 4)" class="button reject">
                                        <span>Từ chối</span>
                                    </div>
                                </div>
                            `;
                            option.querySelector('.list-items table').scrollIntoView();
                        })
                        .catch(() => { })
                    break;
                } case 5: {
                    fetch(window.location.pathname + '?option=5')
                        .then(posts => posts.json())
                        .then(posts => {
                            option.querySelector('.title h1').innerText = 'Danh sách bài viết đã duyệt (' + posts.length + ')';
                            option.querySelector('.list-items thead tr').innerHTML = `
                                <th>ID bài viết</th>
                                <th>Tiêu đề</th>
                                <th>Người đăng</th>
                                <th>Liên hệ</th>
                                <th>Thời gian cập nhật</th>
                            `;
                            posts.forEach(post => {
                                html += `
                                    <tr onclick="showInfo(event, 1, '#info-post')">
                                        <td>${post._id}</td>
                                        <td>${post.title.length > 50 ? post.title.slice(0, 51) + '...' : post.title}</td>
                                        <td>${post.authorName}</td>
                                        <td>${post.contact}</td>
                                        <td>${post.updatedTime}</td>
                                    </tr>
                                `;
                            });
                            option.querySelector('.list-items tbody').innerHTML = html;
                            option.querySelector('.detail-side').innerHTML = `
                                <h1>Thông tin bài viết</h1>
                                <ul id="info-post">
                                    <li>
                                        <b>ID bài viết </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Người viết </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Tiêu đề </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Địa chỉ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Liên hệ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Thời gian tạo </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Giá tiền </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Loại trọ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Diện tích </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Phí đăng bài </b>: <span></span>
                                    </li>
                                    <li style="display:none">
                                        <b>ID chủ trọ </b>: <span></span>
                                    </li>
                                </ul>
                                <div class="button-admin">
                                    <div onclick="detail()" class="button accept disabled">
                                        <span>Chi tiết</span>
                                    </div>
                                </div>
                            `;
                            option.querySelector('.list-items table').scrollIntoView();
                        })
                        .catch(() => { })
                    break;
                } case 6: {
                    fetch(window.location.pathname + '?option=6')
                        .then(posts => posts.json())
                        .then(posts => {
                            option.querySelector('.title h1').innerText = 'Danh sách bài viết đã từ chối (' + posts.length + ')';
                            option.querySelector('.list-items thead tr').innerHTML = `
                                <th>ID bài viết</th>
                                <th>Tiêu đề</th>
                                <th>Người đăng</th>
                                <th>Liên hệ</th>
                                <th>Thời gian tạo</th>
                            `;
                            posts.forEach(post => {
                                html += `
                                    <tr onclick="showInfo(event, 1, '#info-post')">
                                        <td>${post._id}</td>
                                        <td>${post.title.length > 50 ? post.title.slice(0, 51) + '...' : post.title}</td>
                                        <td>${post.authorName}</td>
                                        <td>${post.contact}</td>
                                        <td>${post.createdDate}</td>
                                    </tr>
                                `;
                            });
                            option.querySelector('.list-items tbody').innerHTML = html;
                            option.querySelector('.detail-side').innerHTML = `
                                <h1>Thông tin bài viết</h1>
                                <ul id="info-post">
                                    <li>
                                        <b>ID bài viết </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Người viết </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Tiêu đề </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Địa chỉ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Liên hệ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Thời gian tạo </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Giá tiền </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Loại trọ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Diện tích </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Phí đăng bài </b>: <span></span>
                                    </li>
                                    <li style="display:none">
                                        <b>ID chủ trọ </b>: <span></span>
                                    </li>
                                </ul>
                                <div class="button-admin">
                                    <div onclick="actionAdmin('post', 'restore', 0, 6)" class="button accept disabled">
                                        <span>Khôi phục</span>
                                    </div>
                                </div>
                            `;
                            option.querySelector('.list-items table').scrollIntoView();
                        })
                        .catch(() => { })
                    break;
                }
                case 7: {
                    fetch(window.location.pathname + '?option=7')
                        .then(data => data.json())
                        .then(data => {
                            option.querySelector('.title h1').innerText = 'Thống kê';
                            var htmlViewed = '';
                            data.viewedPosts.forEach(post => {
                                var address = post.address.detail + ', ' + post.address.ward + ', ' + post.address.district + ', ' + post.address.province;
                                htmlViewed += `
                                    <tr>
                                        <td><a href="/post/${post.slug}">${post.title.length > 20 ? post.title.slice(0, 20) + '...' : post.title}</a></td>
                                        <td><a href="/post/${post.slug}">${address.length > 20 ? address.slice(0, 20) + '...' : address}</a></td>
                                        <td><a href="/post/${post.slug}">${post.rentcost}</a></td>
                                        <td><a href="/post/${post.slug}">${post.viewed}</a></td>
                                    </tr>
                                `
                            })
                            document.querySelector('#rank-viewed table tbody').innerHTML = htmlViewed;

                            var htmlSaved = '';
                            data.savedPosts.forEach(post => {
                                var address = post.address.detail + ', ' + post.address.ward + ', ' + post.address.district + ', ' + post.address.province;
                                htmlSaved += `
                                    <tr>
                                        <td><a href="/post/${post.slug}">${post.title.length > 20 ? post.title.slice(0, 20) + '...' : post.title}</a></td>
                                        <td><a href="/post/${post.slug}">${address.length > 20 ? address.slice(0, 20) + '...' : address}</a></td>
                                        <td><a href="/post/${post.slug}">${post.rentcost}</a></td>
                                        <td><a href="/post/${post.slug}">${post.saved}</a></td>
                                    </tr>
                                `
                            })
                            document.querySelector('#rank-saved table tbody').innerHTML = htmlSaved;

                            var htmlRankOwner = '';
                            data.owners.forEach(owner => {
                                htmlRankOwner += `
                                    <tr>
                                        <td><a href="/account/${owner._id}">${owner.username}</a></td>
                                        <td><a href="/account/${owner._id}">${owner.fullname}</a></td>
                                        <td><a href="/account/${owner._id}">${owner.totalPost}</a></td>
                                    </tr>
                                `
                            })
                            document.querySelector('#rank-user table tbody').innerHTML = htmlRankOwner;

                            // option.querySelector('.list-items table').scrollIntoView();
                        })
                        .catch(() => { })

                    break;
                }
                case 9: {
                    fetch(window.location.pathname + '?option=9')
                        .then(posts => posts.json())
                        .then(posts => {
                            option.querySelector('.title h1').innerText = 'Danh sách bài viết bị báo cáo (' + posts.length + ')';
                            option.querySelector('.list-items thead tr').innerHTML = `
                                <th>ID bài viết</th>
                                <th>Tiêu đề</th>
                                <th>Người đăng</th>
                                <th>Liên hệ</th>
                                <th>Thời gian tạo</th>
                            `;
                            posts.forEach(post => {
                                html += `
                                    <tr onclick="showInfo(event, 1, '#info-post')">
                                        <td>${post._id}</td>
                                        <td>${post.title.length > 50 ? post.title.slice(0, 51) + '...' : post.title}</td>
                                        <td>${post.authorName}</td>
                                        <td>${post.contact}</td>
                                        <td>${post.createdDate}</td>
                                    </tr>
                                `;
                            });
                            option.querySelector('.list-items tbody').innerHTML = html;
                            option.querySelector('.detail-side').innerHTML = `
                                <h1>Thông tin bài viết</h1>
                                <ul id="info-post">
                                    <li>
                                        <b>ID bài viết </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Người viết </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Tiêu đề </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Địa chỉ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Liên hệ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Thời gian tạo </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Giá tiền </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Loại trọ </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Diện tích </b>: <span></span>
                                    </li>
                                    <li>
                                        <b>Phí đăng bài </b>: <span></span>
                                    </li>
                                    <li style="display:none">
                                        <b>ID chủ trọ </b>: <span></span>
                                    </li>
                                </ul>
                                <div class="button-admin">
                                    <div onclick="actionAdmin('post', 'accept', 0, 9)" class="button accept disabled">
                                        <span>Bỏ qua</span>
                                    </div>
                                    <div onclick="actionAdmin('post', 'reject', 0, 9)" class="button reject">
                                        <span>Ẩn bài viết</span>
                                    </div>
                                </div>
                            `;
                            option.querySelector('.list-items table').scrollIntoView();
                        })
                        .catch(() => { })
                    break;
                } default: {
                    option.querySelector('.title h1').innerText = 'Message';
                    document.querySelector('.chat-area').scrollTop = document.querySelector('.chat-area').scrollHeight;
                    option.querySelector('#info-chat').innerHTML = `
                        <li>
                            <b>ID người dùng</b>: <span></span>
                        </li>
                        <li>
                            <b>Tên đăng nhập </b>: <span></span>
                        </li>
                        <li>
                            <b>Họ và tên </b>: <span></span>
                        </li>
                        <li>
                            <b>Giới tính </b>: <span></span>
                        </li>
                        <li>
                            <b>Số điện thoại </b>: <span></span>
                        </li>
                        <li>
                            <b>Email </b>: <span></span>
                        </li>
                        <li>
                            <b>CCCD/CMND </b>: <span></span>
                        </li>
                        <li>
                            <b>Địa chỉ </b>: <span></span>
                        </li>
                        <div class="button-admin">
                            <div onclick="detail()" class="button accept disabled">
                                <span>Chi tiết</span>
                            </div>
                        </div>
                    `;
                    refreshListChat();
                    break;
                }
            }
        }
    })
}

chooseOption(0, 0)

function getEnter(e) {
    let chatArea = document.querySelector('.chat-area');
    let value = e.target.value;
    if (e.key == 'Enter' && value.trim()) {
        document.querySelector('.chat-area ul').innerHTML += `
            <li >
                <div class="a-message admin-message"><span > ${value}</span></div> 
            </li>
        `
        chatArea.scrollTop = chatArea.scrollHeight;
        submitMessageToDB(value, 'toOwner');

        chatArea.parentNode.querySelector('.input-chat input').value = '';
    }
}
function submitMessage(e) {
    let chatArea = document.querySelector('.chat-area');
    let value = chatArea.parentNode.querySelector('.input-chat input').value;
    if (value.trim()) {
        document.querySelector('.chat-area ul').innerHTML += `
                <li >
                    <div class="a-message admin-message"><span > ${value}</span></div> 
                </li>
            `
        chatArea.scrollTop = chatArea.scrollHeight;
        submitMessageToDB(value, 'toOwner');
    }

    chatArea.parentNode.querySelector('.input-chat input').value = '';
}

function refreshListChat() {
    var choosing;
    if (document.querySelector('.message-side .room-chat .accounts>ul>li.chosen .info-chat p')) {
        choosing = document.querySelector('.message-side .room-chat .accounts>ul>li.chosen .info-chat p').innerText;
    }
    fetch('/account/get-info?key=admin')
        .then(admin => admin.json())
        .then(admin => {
            let html = '';
            admin.messages.forEach(message => {
                html += `
                <li class="${message.seen == false ? 'bolder' : ''}" >
                    <div onclick="showInfo(event, 2, '#info-chat ')">
                        <div class="avatar-chat">
                            <img src="${message.avatar}" alt="">
                        </div>
                        <div class="info-chat">
                            <p>${message.fullname}</p>
                            <span>${message.username}</span>
                        </div>
                    </div>
                </li>
            `
            })
            document.querySelector('.message-side .room-chat .accounts>ul').innerHTML = html;
            if (document.querySelector('.message-side .room-chat .accounts>ul>li.bolder .info-chat p') && document.querySelector('.message-side .room-chat .accounts>ul>li.bolder .info-chat p').innerText == choosing) {
                document.querySelector('.message-side .room-chat .accounts>ul>li.bolder div').click();
            };
        })
}

socket.on(`5fb7e2f7662281052c43df98toAdmin`, data => {
    refreshListChat()
    document.querySelector('.fa-comment').classList.add('alerted')
})