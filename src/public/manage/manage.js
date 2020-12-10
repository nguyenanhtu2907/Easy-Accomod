function showOption(e) {
    let listInner = e.target.parentNode.querySelector('.list-inner');
    listInner.classList.toggle('drop-down-option');
}
var trs = Array.from(document.querySelectorAll('.list-items tbody tr'));
trs.forEach(tr => {
    tr.addEventListener('click', function (e) {
        console.log(1);
        //tim vỊ trí/index của tr trong trs
        //chiếu sang mảng dữ liệu vừa fetch từ server và thay đổi dữ liệu bên detail-side
    });
})
function changeList(e, element) {
    document.querySelector('.title-option span').innerText = e.target.innerText;
    document.querySelector('.title-option span').innerHTML += '<div class="fa fa-angle-down"></div>'
    document.querySelector('.title-option ul').classList.add('none');
}
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
            })
    } else if (type == 1) {
        url = `/post/get-info?key=${items.querySelectorAll('td')[0].innerText}`
        fetch(url)
            .then(res => res.json())
            .then(post => {
                let spans = document.querySelectorAll(element + ' li span');
                spans[0].innerText = user._id;
                spans[1].innerText = user.authorName;
                spans[2].innerText = user.title;
                spans[3].innerText = user.address;
                spans[4].innerText = user.contact;
                spans[5].innerText = user.createdDate;
                spans[6].innerText = user.rentcost;
                spans[7].innerText = user.roomtype;
                spans[8].innerText = user.area;
                spans[9].innerText = user.equiments.join(', ');
            })
    } else {
        console.log(items)
        // url = `/account/get-info?key=${items.querySelectorAll('td')[0].innerText}`
        // fetch(url)
        //     .then(res => res.json())
        //     .then(user => {
        //         let spans = document.querySelectorAll(element + ' li span');
        //         spans[0].innerText = user._id;
        //         spans[1].innerText = user.username;
        //         spans[2].innerText = user.fullname;
        //         spans[3].innerText = user.gender;
        //         spans[4].innerText = user.phone;
        //         spans[5].innerText = user.email;
        //         spans[6].innerText = user.identity;
        //         spans[7].innerText = user.address;
        //     })
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
                                        <td>${post.title}</td>
                                        <td>${post.authorName}</td>
                                        <td>${post.contact}</td>
                                        <td>${post.createDate}</td>
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
                                        <b>Vị trí </b>: <span></span>
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
                                        <b>Trang thiết bị </b>: <span></span>
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
                                <th>Thời gian tạo</th>
                            `;
                            posts.forEach(post => {
                                html += `
                                    <tr onclick="showInfo(event, 1, '#info-post')">
                                        <td>${post._id}</td>
                                        <td>${post.title}</td>
                                        <td>${post.authorName}</td>
                                        <td>${post.contact}</td>
                                        <td>${post.createDate}</td>
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
                                        <b>Vị trí </b>: <span></span>
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
                                        <b>Trang thiết bị </b>: <span></span>
                                    </li>
                                </ul>
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
                                        <td>${post.title}</td>
                                        <td>${post.authorName}</td>
                                        <td>${post.contact}</td>
                                        <td>${post.createDate}</td>
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
                                        <b>Vị trí </b>: <span></span>
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
                                        <b>Trang thiết bị </b>: <span></span>
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
                } case 7: {
                    option.querySelector('.title h1').innerText = 'Thống kê';
                    option.querySelector('.list-items thead tr').innerHTML = `
                    <th>ID bài viết</th>
                    <th>Tiêu đề</th>
                    <th>Người đăng</th>
                    <th>Liên hệ</th>
                    <th>Thời gian tạo</th>
                    `;
                    option.querySelector('.list-items table').scrollIntoView();

                    break;
                } default: {
                    fetch(window.location.pathname + '?option=8')
                        .then(messages => messages.json())
                        .then(messages => {
                            option.querySelector('.title h1').innerText = 'Message';
                            let html = '';
                            messages.forEach((message, index) => {
                                html += `
                                    <li class="${'chosen'}" onclick="showMessage(event)">
                                        <div class="avatar-chat">
                                            <img src="${message.avatar}" alt="">
                                        </div>
                                        <div class="info-chat">
                                            <p>${message.fullname}</p>
                                            <span>${message.username}</span>
                                        </div>
                                    </li>
                                `
                            })
                            document.querySelector('.message-side .room-chat .accounts>ul').innerHTML = html;
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
                            `;
                        })
                        .catch(()=>{})
                    break;
                }
            }
        }
    })
}

function showMessage(e){
    showInfo(e, 2, '#info-chat ')
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
        submitMessageToDB(value);
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
        submitMessageToDB(value);
    }
    chatArea.parentNode.querySelector('.input-chat input').value = '';
}
