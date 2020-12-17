const formatNumber = (value) => {
  const str = value.toString();
  var money = "",
    length = str.length;
  // for (var i = length - 1; i >= 0; i -= 3) {
  //   for (var j = i; j < i + 3; j++) {
  //     if (str[j]) money += str[j];
  //   }
  //   money += ".";
  // }
  return money + str;
};

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("image");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}

const address = {
  city: "TP Hà Nội",
  dictrict: "Quận Nam Từ Liêm",
  ward: "Phường Nam Từ Liêm ",
};
const room = {
  enquipments: {
    airCondition: false,
    fridge: false,
    heater: false,
    bathRoom: false,
    bedRoom: 1,
    toilet: 1,
    floors: 5,
    floor: 3,
  },
  rencost: 2500000,
  area: 25,
  water: 80000,
  electric: 3800,
  infoOwner: false,
  datePost: "12/10/2020",
};
const article = {
  title: "Cho thuê trọ giá rẻ ...",
  address: address.city + " - " + address.dictrict + " - " + address.ward,
  content: `Chính chủ cần bán căn hộ Topaz Homes 2, đường 154, P Tân Phú, Q9<br />Vị
    trí : góc mt đg 154 - đg 138, gần Xa lộ HN, S Tiên, BX Miền Đông
    mới<br />Căn xã hội 56m2, 2PN, 1WC. Block B1 tầng 7, view SG,
    Landmark 81...<br />Đã thanh toán hết, nhận bàn giao nhà<br />Tiện
    ích nội khu đầy đủ ( hồ bơi, công viên, siêu thị ...), đang hoàn
    thiện, tham khảo trên web<br />LH 0916567732 chính chủ
  `,
};
const top_bar = document.querySelector(".left-top-bar > ul");
top_bar.innerHTML = `
  <li><a href="" class="li-top-bar">Mogi</a></li>
  <li>&#10148; <a href="" class="li-top-bar">${address.city}</a></li>
  <li>&#10148; <a href="" class="li-top-bar">${address.dictrict}</a></li>
  <li>&#10148; <a href="" class="li-top-bar">${address.ward}</a></li>
  <li>&#10148; <span class="li-top-bar" style="font-weight:bold">${article.title}</span></li>
  `;
const introduce_article = document.querySelector(".introduce-article");
introduce_article.innerHTML = `
  <p class="title-intro">${article.title}</p>
  <p class="address-intro">${article.address}</p>
  <p class="price-intro">${formatNumber(room.rencost)} VNĐ</p>
  `;
const left_main = document.querySelector(".left-main");
left_main.innerHTML = `
  <li><span>Giá</span>: ${room.rencost} VNĐ</li>
  <li><span>Diện tích</span>: ${room.area} m<sup>2</sup></li>
  <li><span>Giá điện</span>: ${room.electric} VNĐ</li>
  <li><span>Giá nước</span>: ${room.water} VNĐ</li>
  <li><span>Chung chủ</span>: ${room.infoOwner ? "Có" : "Không"}</li>
  <li class="date-post"><span>Ngày đăng</span>: ${room.datePost}</li>
  `;
const right_main = document.querySelector(".right-main");
right_main.innerHTML = `
  <li><span>Điều hòa</span>: ${
    room.enquipments.airCondition ? "Có" : "Không"
  }</li>
  <li><span>Tủ lạnh</span>: ${room.enquipments.fridge ? "Có" : "Không"}</li>
  <li><span>Nóng lạnh</span>: ${room.enquipments.heater ? "Có" : "Không"}</li>
  <li><span>Phòng tắm</span>: ${room.enquipments.bathRoom ? "Có" : "Không"}</li>
  <li><span>Phòng ngủ</span>: ${
    room.enquipments.bedRoom ? room.enquipments.bedRoom : 0
  }</li>
  <li><span>Nhà vệ sinh</span>: ${
    room.enquipments.toilet ? room.enquipments.toilet : 0
  }</li>
  <li><span>Tổng số tầng</span>: ${room.enquipments.floors}</li>
  <li><span>Tầng thứ</span>: ${room.enquipments.floor}</li>
  `;
const content_description = document.querySelector(".content-description");
content_description.innerHTML = `${article.content}`;
