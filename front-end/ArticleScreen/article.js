const formatNumber = (value) => {
  const str = value.toString();
  var money = "",
    length = str.length;
  if (length % 3 === 1) {
    money += str.charAt(0) + ".";
    for (let i = 1; i < length; i++) {
      money += str.charAt(i);
      if (i % 3 === 0 && i !== length - 1) money += ".";
    }
  }
  if (length % 3 === 2) {
    money += str.charAt(0) + str.charAt(1) + ".";
    for (let i = 2; i < length; i++) {
      money += str.charAt(i);
      if ((i - 1) % 3 === 0 && i !== length - 1) money += ".";
    }
  }
  if (length % 3 === 0) {
    for (let i = 0; i < length; i++) {
      if (i % 3 === 0 && i !== length - 1 && i !== 0) money += ".";
      money += str.charAt(i);
    }
  }
  return money;
};
const formatTitle = (value) => {
  const length = value.length;
  var str = "",
    j = 0;
  for (let i = 0; i < length; i++) {
    if (value.charAt(i) === " ") j++;
    if (j === 3) break;
    str += value.charAt(i);
  }
  str += "...";
  return str;
};
const inner = {
  avatarUrl:
    "https://plantationhomes.com.au/cms_uploads/images/15861_six-stages-of-building-a-home.jpg",
  name: "Anh Tú",
};

const address = {
  city: "TP Hà Nội",
  district: "Quận Nam Từ Liêm",
  ward: "Phường Nam Từ Liêm ",
};
const host = {
  avatarUrl:
    "https://cdn.mogi.vn/upload/profile/thumb-avatar/201808/09/952/bcdb6603c3fd4a82b1987a9ef63311de.jpg",
  name: "Phương Minh",
  date: "12/10/2020",
  phone: "0984946177",
};
const room = {
  equipments: {
    airCondition: false,
    fridge: false,
    heater: false,
    bathRoom: false,
    bedRoom: 1,
    toilet: 1,
    floors: 5,
    floor: 3,
  },
  rentCost: 250000,
  area: 25,
  water: 80000,
  electric: 3800,
  infoOwner: false,
  datePost: "12/10/2020",
};
const article = {
  title: "Nhà SHR 60m2 2PN mặt tiền Hóc Môn, KCN cạnh chợ Bà Điểm 720tr/ full",
  address: address.city + " - " + address.district + " - " + address.ward,
  content: `Chính chủ cần bán căn hộ Topaz Homes 2, đường 154, P Tân Phú, Q9<br />Vị
    trí : góc mt đg 154 - đg 138, gần Xa lộ HN, S Tiên, BX Miền Đông
    mới<br />Căn xã hội 56m2, 2PN, 1WC. Block B1 tầng 7, view SG,
    Landmark 81...<br />Đã thanh toán hết, nhận bàn giao nhà<br />Tiện
    ích nội khu đầy đủ ( hồ bơi, công viên, siêu thị ...), đang hoàn
    thiện, tham khảo trên web<br />LH 0916567732 chính chủ
  `,
  imagesUrl: [
    "https://plantationhomes.com.au/cms_uploads/images/15861_six-stages-of-building-a-home.jpg",
    "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1026205392%2F0x0.jpg",
    "https://cloud.mogi.vn/images/2020/10/28/282/23e3aed4d0a34705b6f769c4fd30bec6.jpg",
    "https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg",
  ],
  comments: [
    {
      avatar:
        "https://plantationhomes.com.au/cms_uploads/images/15861_six-stages-of-building-a-home.jpg",
      name: "Anh Tú",
      star_voted: 4,
      content: "...",
      date: "26/12/2020 15:36",
    },
    {
      avatar:
        "https://plantationhomes.com.au/cms_uploads/images/15861_six-stages-of-building-a-home.jpg",
      name: "Anh Tú",
      star_voted: 4,
      content: "123123",
      date: "26/12/2020 15:36",
    },
  ],
};
const top_bar = document.querySelector(".left-top-bar > ul");
top_bar.innerHTML = `
  <li><a href="" class="li-top-bar" style="margin-left:0px">${
    address.city
  }</a></li>
  <li>&#10148; <a href="" class="li-top-bar">${address.district}</a></li>
  <li>&#10148; <a href="" class="li-top-bar">${address.ward}</a></li>
  <li>&#10148; <span class="li-top-bar" style="font-weight:bold">${formatTitle(
    article.title
  )}</span></li>
`;
const images = document.querySelector(".images");
var listImages = ``;
article.imagesUrl.forEach((url) => {
  listImages += `<img class="image" src=${url} />`;
});
console.log(listImages);
images.innerHTML = `${listImages}`;

const introduce_article = document.querySelector(".introduce-article");
introduce_article.innerHTML = `
  <p class="title-intro">${article.title}</p>
  <p class="address-intro">${article.address}</p>
  <p class="price-intro">${formatNumber(room.rentCost)} VNĐ</p>
  `;
const left_main = document.querySelector(".left-main");
left_main.innerHTML = `
  <li><span>Giá</span>: ${formatNumber(room.rentCost)} VNĐ</li>
  <li><span>Diện tích</span>: ${room.area} m<sup>2</sup></li>
  <li><span>Giá điện</span>: ${room.electric} VNĐ</li>
  <li><span>Giá nước</span>: ${room.water} VNĐ</li>
  <li><span>Chung chủ</span>: ${room.infoOwner ? "Có" : "Không"}</li>
  <li class="date-post"><span>Ngày đăng</span>: ${room.datePost}</li>
  `;
const right_main = document.querySelector(".right-main");
right_main.innerHTML = `
  <li><span>Điều hòa</span>: ${
    room.equipments.airCondition ? "Có" : "Không"
  }</li>
  <li><span>Tủ lạnh</span>: ${room.equipments.fridge ? "Có" : "Không"}</li>
  <li><span>Nóng lạnh</span>: ${room.equipments.heater ? "Có" : "Không"}</li>
  <li><span>Phòng tắm</span>: ${room.equipments.bathRoom ? "Có" : "Không"}</li>
  <li><span>Phòng ngủ</span>: ${
    room.equipments.bedRoom ? room.equipments.bedRoom : 0
  }</li>
  <li><span>Nhà vệ sinh</span>: ${
    room.equipments.toilet ? room.equipments.toilet : 0
  }</li>
  <li><span>Tổng số tầng</span>: ${room.equipments.floors}</li>
  <li><span>Tầng thứ</span>: ${room.equipments.floor}</li>
  `;
const content_description = document.querySelector(".content-description");
content_description.innerHTML = `${article.content}`;
const host_description = document.querySelector(".host-description");
host_description.innerHTML = `
  <img
    class="avatar-host"
    src=${host.avatarUrl}
  />
  <div class="name-host">
  <p style="font-size: 1.2rem; font-weight: bold; margin: 0px">
    ${host.name}
  </p>
  <p style="font-size: 1rem; color: grey; margin: 0px">
    Đã tham gia: ${host.date}
  </p>
  </div>
  <div class="contact-host">
    <i
      class="fas fa-phone-alt"
      style="color: #009177; margin-right: 0.5rem"
    ></i>
    ${host.phone}
  </div>
`;
const host_article = document.querySelector(".host-article");
host_article.innerHTML = `
  <div class="host-information">
      <div style="flex-direction: row; display: flex">
      <img
        class="avatar-host"
        src=${host.avatarUrl}
      />
      <div class="name-host">
        <p style="font-size: 1.2rem; font-weight: bold; margin: 0px">
          ${host.name}
        </p>
        <p style="font-size: 1rem; color: grey; margin: 0px;">
          Đã tham gia: ${host.date}
        </p>
      </div>
    </div>
    <div class="host-contact">
      <i
        class="fas fa-phone-alt"
        style="color: #009177; margin-right: 0.5rem"
      ></i>
      ${host.phone}
    </div>
  </div>
`;
const rate_star = document.querySelector(".rate-star");
var stars = 0;
const rate = (star) => {
  stars = star;
  var html = ``;
  for (let i = 1; i <= star; i++) {
    html += `
    <i class="fas fa-star" style="color: lightseagreen" onclick="rate(${i})"></i>
    `;
  }
  for (let i = star + 1; i <= 5; i++) {
    html += `
    <i class="far fa-star" onclick="rate(${i})"></i>
    `;
  }
  rate_star.innerHTML = html;
};

const list_comment = document.querySelector(".list-comment");
var previous_comment = ``;
for (let i = article.comments.length - 1; i >= 0; i--) {
  var vote = ``;
  for (let j = 1; j <= article.comments[i].star_voted; j++) {
    vote += `
    <i class="fas fa-star" style="color: lightseagreen"></i>
    `;
  }
  for (let j = article.comments[i].star_voted + 1; j <= 5; j++) {
    vote += `
    <i class="far fa-star"></i>
    `;
  }
  previous_comment += `
  <div class="comments">
    <img
      class="avatar-renter"
      src=${article.comments[i].avatar}
    />
    <div class="comment">
    <div class="header-comment">
      <h4 class="name-renter">${article.comments[i].name}</h4>
      <div class="stars">${vote}</div>
    </div>
    <p class="content-comment">${article.comments[i].content}</p>
    <p class="date-comment">${article.comments[i].date}</p>
    </div>
  </div>
  `;
}
list_comment.innerHTML = previous_comment;

const input_comment = document.querySelector(".input-comment");
const send = () => {
  article.comments.push({
    avatar: inner.avatarUrl,
    star_voted: stars,
    name: inner.name,
    content: input_comment.value,
    date: "26/12/2020 15:36",
  });
  input_comment.value = "";
  previous_comment = ``;
  for (let i = article.comments.length - 1; i >= 0; i--) {
    var vote = ``;
    for (let j = 1; j <= article.comments[i].star_voted; j++) {
      vote += `
    <i class="fas fa-star" style="color: lightseagreen"></i>
    `;
    }
    for (let j = article.comments[i].star_voted + 1; j <= 5; j++) {
      vote += `
    <i class="far fa-star"></i>
    `;
    }
    previous_comment += `
  <div class="comments">
    <img
      class="avatar-renter"
      src=${article.comments[i].avatar}
    />
    <div class="comment">
    <div class="header-comment">
      <h4 class="name-renter">${article.comments[i].name}</h4>
      <div class="stars">${vote}</div>
    </div>
    <p class="content-comment">${article.comments[i].content}</p>
    <p class="date-comment">${article.comments[i].date}</p>
    </div>
  </div>
  `;
  }
  rate(0);
  list_comment.innerHTML = previous_comment;
};
/*
funcion slide image
*/
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
