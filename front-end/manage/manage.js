function showOption(e) {
    let listInner = e.target.parentNode.querySelector('.list-inner');
    listInner.classList.toggle('drop-down-option');
}
document.addEventListener('mouseup', function (e) {
    var filter = document.querySelector('.title-option');
    if (!filter.contains(e.target)) {
        document.querySelector('.title-option ul').classList.add('none')
    }
});
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

function chooseOption(title, bigOption, innerOption) {
    //bigOption: option to: quản lý bài viết, tài khoản, chat, thống kê
    //innerOption: các option nhỏ trong bigOption
    var bigOptions = Array.from(document.querySelectorAll('.content .list-side .tab-option'))
    let url = '';

    bigOptions.forEach((option, index) => {
        //option: tab-option
        if (index != bigOption && !option.classList.contains('none')) {
            option.classList.add('none')
        } else if (index == bigOption) {
            option.classList.remove('none')
            option.querySelector('.title h1').innerText = title;
            switch (innerOption) {
                case 0: {
                    document.querySelector('.title-option').classList.remove('none')
                    // option.querySelector('.title h1').innerText += do dai cua mang du lieu
                    option.querySelector('.list-items thead tr').innerHTML = `
                        <th>Tên đăng nhập</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                    `;
                    option.querySelector('.detail-side').innerHTML = `
                    <h1>Thông tin tài khoản</h1>
                    <ul>
                        <li>
                            <b>ID người dùng</b> <span>: 1234</span>
                        </li>
                        <li>
                            <b>Tên đăng nhập </b> <span>: 1234</span>
                        </li>
                        <li>
                            <b>Họ và tên </b> <span>: Nguyễn Anh Tú</span>
                        </li>
                        <li>
                            <b>Giới tính </b> <span>: Nam</span>
                        </li>
                        <li>
                            <b>Số điện thoại </b> <span>: 0123456789</span>
                        </li>
                        <li>
                            <b>Email </b> <span>: 123@gmail.com</span>
                        </li>
                        <li>
                            <b>CCCD/CMND </b> <span>: 1234456789</span>
                        </li>
                        <li>
                            <b>Địa chỉ </b> <span>: Xuy Xá, Mỹ Đức, Hà Nội</span>
                        </li>
                    </ul>
                    <div class="button-admin">
                        <div class="button accept disabled">
                            <span>Duyệt</span>
                        </div>
                        <div class="button reject">
                            <span>Từ chối</span>
                        </div>
                    </div>
                    `
                    option.querySelector('.list-items table').scrollIntoView();
                    break;
                } case 1: {
                    document.querySelector('.title-option').classList.add('none')
                    // option.querySelector('.title h1').innerText += do dai cua mang du lieu
                    option.querySelector('.list-items thead tr').innerHTML = `
                        <th>Tên đăng nhập</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                    `;
                    option.querySelector('.detail-side').innerHTML = `
                    <h1>Thông tin tài khoản</h1>
                    <ul>
                        <li>
                            <b>ID người dùng</b> <span>: 1234</span>
                        </li>
                        <li>
                            <b>Tên đăng nhập </b> <span>: 1234</span>
                        </li>
                        <li>
                            <b>Họ và tên </b> <span>: Nguyễn Anh Tú</span>
                        </li>
                        <li>
                            <b>Giới tính </b> <span>: Nam</span>
                        </li>
                        <li>
                            <b>Số điện thoại </b> <span>: 0123456789</span>
                        </li>
                        <li>
                            <b>Email </b> <span>: 123@gmail.com</span>
                        </li>
                        <li>
                            <b>CCCD/CMND </b> <span>: 1234456789</span>
                        </li>
                        <li>
                            <b>Địa chỉ </b> <span>: Xuy Xá, Mỹ Đức, Hà Nội</span>
                        </li>
                    </ul>
                    `
                    option.querySelector('.list-items table').scrollIntoView();

                    break;
                }case 2: {
                    document.querySelector('.title-option').classList.add('none')
                    // option.querySelector('.title h1').innerText += do dai cua mang du lieu
                    option.querySelector('.list-items thead tr').innerHTML = `
                        <th>Tên đăng nhập</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                    `;
                    option.querySelector('.detail-side').innerHTML = `
                    <h1>Thông tin tài khoản</h1>
                    <ul>
                        <li>
                            <b>ID người dùng</b> <span>: 1234</span>
                        </li>
                        <li>
                            <b>Tên đăng nhập </b> <span>: 1234</span>
                        </li>
                        <li>
                            <b>Họ và tên </b> <span>: Nguyễn Anh Tú</span>
                        </li>
                        <li>
                            <b>Giới tính </b> <span>: Nam</span>
                        </li>
                        <li>
                            <b>Số điện thoại </b> <span>: 0123456789</span>
                        </li>
                        <li>
                            <b>Email </b> <span>: 123@gmail.com</span>
                        </li>
                        <li>
                            <b>CCCD/CMND </b> <span>: 1234456789</span>
                        </li>
                        <li>
                            <b>Địa chỉ </b> <span>: Xuy Xá, Mỹ Đức, Hà Nội</span>
                        </li>
                        <div class="button-admin">
                            <div class="button accept disabled">
                                <span>Khôi phục</span>
                            </div>
                        </div>
                    </ul>
                    `
                    option.querySelector('.list-items table').scrollIntoView();

                    break;
                }case 3: {
                    document.querySelector('.title-option').classList.add('none')
                    // option.querySelector('.title h1').innerText += do dai cua mang du lieu
                    option.querySelector('.list-items thead tr').innerHTML = `
                        <th>Tên đăng nhập</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                    `;
                    option.querySelector('.detail-side').innerHTML = `
                    <h1>Thông tin tài khoản</h1>
                    <ul>
                        <li>
                            <b>ID người dùng</b> <span>: 1234</span>
                        </li>
                        <li>
                            <b>Tên đăng nhập </b> <span>: 1234</span>
                        </li>
                        <li>
                            <b>Họ và tên </b> <span>: Nguyễn Anh Tú</span>
                        </li>
                        <li>
                            <b>Giới tính </b> <span>: Nam</span>
                        </li>
                        <li>
                            <b>Số điện thoại </b> <span>: 0123456789</span>
                        </li>
                        <li>
                            <b>Email </b> <span>: 123@gmail.com</span>
                        </li>
                        <li>
                            <b>CCCD/CMND </b> <span>: 1234456789</span>
                        </li>
                        <li>
                            <b>Địa chỉ </b> <span>: Xuy Xá, Mỹ Đức, Hà Nội</span>
                        </li>
                    </ul>
                    `
                    option.querySelector('.list-items table').scrollIntoView();

                    break;
                } case 4: {
                    document.querySelector('.title-option').classList.add('none')
                    // option.querySelector('.title h1').innerText += do dai cua mang du lieu
                    option.querySelector('.list-items thead tr').innerHTML = `
                        <th>ID bài viết</th>
                        <th>Tiêu đề</th>
                        <th>Người đăng</th>
                        <th>Liên hệ</th>
                        <th>Thời gian tạo</th>
                    `;
                    option.querySelector('.detail-side').innerHTML = `
                    <h1>Thông tin bài viết</h1>
                    <ul>
                        <li>
                            <b>ID bài viết </b> <span>: 1234</span>
                        </li>
                        <li>
                            <b>Người viết </b> <span>: Nguyễn Anh Tú</span>
                        </li>
                        <li>
                            <b>Tiêu đề </b> <span>: Một chiếc tiêu đề nho nhỏ, đủ dài để xuống dòng</span>
                        </li>
                        <li>
                            <b>Vị trí </b> <span>: Số 0 Xuân Thủy, Cầu Giấy, Hà Nội</span>
                        </li>
                        <li>
                            <b>Liên hệ </b> <span>: 0123456789</span>
                        </li>
                        <li>
                            <b>Thời gian tạo </b> <span>: 08/12/2020</span>
                        </li>
                        <li>
                            <b>Giá tiền </b> <span>: 3 triệu</span>
                        </li>
                        <li>
                            <b>Loại trọ </b> <span>: Chung cư mini</span>
                        </li>
                        <li>
                            <b>Diện tích </b> <span>: 50 m<sup>2</sup></span>
                        </li>
                        <li>
                            <b>Trang thiết bị </b> <span>: Ti vi, Tủ lạnh, Điều hòa, Nóng lạnh,...</span>
                        </li>
                    </ul>
                    <div class="button-admin">
                        <div class="button accept disabled">
                            <span>Duyệt</span>
                        </div>
                        <div class="button reject">
                            <span>Từ chối</span>
                        </div>
                    </div>
                    `
                    option.querySelector('.list-items table').scrollIntoView();

                    break;
                } case 5: {
                    document.querySelector('.title-option').classList.add('none')
                    // option.querySelector('.title h1').innerText += do dai cua mang du lieu
                    option.querySelector('.list-items thead tr').innerHTML = `
                    <th>ID bài viết</th>
                    <th>Tiêu đề</th>
                    <th>Người đăng</th>
                    <th>Liên hệ</th>
                    <th>Thời gian tạo</th>
                    `;
                    option.querySelector('.detail-side').innerHTML = `
                    <h1>Thông tin bài viết</h1>
                    <ul>
                        <li>
                            <b>ID bài viết </b> <span>: 1234</span>
                        </li>
                        <li>
                            <b>Người viết </b> <span>: Nguyễn Anh Tú</span>
                        </li>
                        <li>
                            <b>Tiêu đề </b> <span>: Một chiếc tiêu đề nho nhỏ, đủ dài để xuống dòng</span>
                        </li>
                        <li>
                            <b>Vị trí </b> <span>: Số 0 Xuân Thủy, Cầu Giấy, Hà Nội</span>
                        </li>
                        <li>
                            <b>Liên hệ </b> <span>: 0123456789</span>
                        </li>
                        <li>
                            <b>Thời gian tạo </b> <span>: 08/12/2020</span>
                        </li>
                        <li>
                            <b>Giá tiền </b> <span>: 3 triệu</span>
                        </li>
                        <li>
                            <b>Loại trọ </b> <span>: Chung cư mini</span>
                        </li>
                        <li>
                            <b>Diện tích </b> <span>: 50 m<sup>2</sup></span>
                        </li>
                        <li>
                            <b>Trang thiết bị </b> <span>: Ti vi, Tủ lạnh, Điều hòa, Nóng lạnh,...</span>
                        </li>
                    </ul>
                    `
                    option.querySelector('.list-items table').scrollIntoView();

                    break;
                } case 6: {
                    document.querySelector('.title-option').classList.add('none')
                    // option.querySelector('.title h1').innerText += do dai cua mang du lieu
                    option.querySelector('.list-items thead tr').innerHTML = `
                    <th>ID bài viết</th>
                    <th>Tiêu đề</th>
                    <th>Người đăng</th>
                    <th>Liên hệ</th>
                    <th>Thời gian tạo</th>
                    `;
                    option.querySelector('.detail-side').innerHTML = `
                    <h1>Thông tin bài viết</h1>
                    <ul>
                        <li>
                            <b>ID bài viết </b> <span>: 1234</span>
                        </li>
                        <li>
                            <b>Người viết </b> <span>: Nguyễn Anh Tú</span>
                        </li>
                        <li>
                            <b>Tiêu đề </b> <span>: Một chiếc tiêu đề nho nhỏ, đủ dài để xuống dòng</span>
                        </li>
                        <li>
                            <b>Vị trí </b> <span>: Số 0 Xuân Thủy, Cầu Giấy, Hà Nội</span>
                        </li>
                        <li>
                            <b>Liên hệ </b> <span>: 0123456789</span>
                        </li>
                        <li>
                            <b>Thời gian tạo </b> <span>: 08/12/2020</span>
                        </li>
                        <li>
                            <b>Giá tiền </b> <span>: 3 triệu</span>
                        </li>
                        <li>
                            <b>Loại trọ </b> <span>: Chung cư mini</span>
                        </li>
                        <li>
                            <b>Diện tích </b> <span>: 50 m<sup>2</sup></span>
                        </li>
                        <li>
                            <b>Trang thiết bị </b> <span>: Ti vi, Tủ lạnh, Điều hòa, Nóng lạnh,...</span>
                        </li>
                    </ul>
                    <div class="button-admin">
                        <div class="button accept disabled">
                            <span>Khôi phục</span>
                        </div>
                    </div>
                    `
                    option.querySelector('.list-items table').scrollIntoView();

                    break;
                } case 7: {
                    document.querySelector('.title-option').classList.remove('none')
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
                    document.querySelector('.title-option').classList.add('none')
                    document.querySelector('.chat-area').scrollTop = document.querySelector('.chat-area').scrollHeight;
                    break;
                }
            }
        }
    })
    // console.log(bigOptions)
}
chooseOption('Danh sách chủ trọ chờ phê duyệt', 0, 0)
function getEnter(e) {
    let chatArea = document.querySelector('.chat-area');
    if (e.key == 'Enter') {
        document.querySelector('.chat-area ul').innerHTML += `
            <li >
                <div class="a-message admin-message"><span > ${e.target.value}</span></div> 
            </li>
        `
        chatArea.scrollTop = chatArea.scrollHeight;
        chatArea.parentNode.querySelector('.input-chat input').value = '';
    }
}
function submitMessage(e) {
    let chatArea = document.querySelector('.chat-area');
    document.querySelector('.chat-area ul').innerHTML += `
            <li >
                <div class="a-message admin-message"><span > ${chatArea.parentNode.querySelector('.input-chat input').value}</span></div> 
            </li>
        `
    chatArea.scrollTop = chatArea.scrollHeight;
    chatArea.parentNode.querySelector('.input-chat input').value = '';
}