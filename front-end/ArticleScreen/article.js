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
/**
 * CÁC ĐẦU VÀO
 */
const inner = {
  id: "1231gfddf",
  avatarUrl:
    "https://plantationhomes.com.au/cms_uploads/images/15861_six-stages-of-building-a-home.jpg",
  name: "Anh Tú",
};
const owner = {
  id: "5fksdksndfkdsfosdkfodsfod",
  avatarUrl:
    "https://plantationhomes.com.au/cms_uploads/images/15861_six-stages-of-building-a-home.jpg",
  name: "Thu Thủy",
  date: "1/11/2020",
  phone: "0984946177",
};
const article = {
  _id: "asddsvj21mk12312",
  address: {
    city: "TP Hà Nội",
    district: "Quận Nam Từ Liêm",
    ward: "Phường Nam Từ Liêm ",
  },
  nearby: "Vị trí nằm ngay trường chinh thuận tiện đi lại, ...",
  description: "Phòng mới xây mới 10 ...",
  rentcost: "2.800.000",
  electric: "4000",
  water: "80000",
  roomtype: "Nhà nguyên căn",
  area: "25",
  infoOwner: "Không chung chủ",
  thumbnail: "",
  images: [
    "https://plantationhomes.com.au/cms_uploads/images/15861_six-stages-of-building-a-home.jpg",
    "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1026205392%2F0x0.jpg",
    "https://cloud.mogi.vn/images/2020/10/28/282/23e3aed4d0a34705b6f769c4fd30bec6.jpg",
    "https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg",
  ],
  comments: [
    {
      id: "123sdfdfbfghtrt",
      avatar:
        "https://plantationhomes.com.au/cms_uploads/images/15861_six-stages-of-building-a-home.jpg",
      name: "Anh Tú",
      star_voted: 4,
      content: "...",
      date: "26/12/2020 15:36",
    },
    {
      id: "123sdfdfbfgfbfkbfhtrt",
      avatar:
        "https://plantationhomes.com.au/cms_uploads/images/15861_six-stages-of-building-a-home.jpg",
      name: "Anh Tú",
      star_voted: 4,
      content: "123123",
      date: "26/12/2020 15:36",
    },
  ],
  availabletime: 0,
  saved: 1,
  viewed: 0,
  statusrent: false,
  checked: 1,
  rates: [],
  key: "Pham Van Bach Vi Tri nam ngay Truowng chinh",
  title: "Phòng trọ giá rẻ mới xây có gác, thang máy, bảo vệ 24/7 gần sân bay",
  owner: "5fksdksndfkdsfosdkfodsfod",
  equipments: {
    airconditional: "Có",
    bathroom: "Có",
    freazer: "Có",
    hottank: "Có",
    closed: "Có",
    washingmachine: "Có",
    balcony: "Có",
    kitchen: "Được nấu ăn",
    wc: "1",
    bedroom: "1",
    floors: "5",
    floor: "4",
  },
  createdAt: "20/12/2020",
  updateAt: "20/12/2020",
};
/**
 * KHAI TRIỂN
 */
const top_bar = document.querySelector(".left-top-bar > ul");
top_bar.innerHTML = `
  <li><a href="" class="li-top-bar" style="margin-left:0px">${
    article.address.city
  }</a></li>
  <li>&#10148; <a href="" class="li-top-bar">${
    article.address.district
  }</a></li>
  <li>&#10148; <a href="" class="li-top-bar">${article.address.ward}</a></li>
  <li>&#10148; <span class="li-top-bar" style="font-weight:bold">${formatTitle(
    article.title
  )}</span></li>
`;
const images = document.querySelector(".images");
var listImages = ``;
article.images.forEach((url) => {
  listImages += `<img class="image" src=${url} />`;
});
images.innerHTML = `${listImages}`;

const introduce_article = document.querySelector(".introduce-article");
introduce_article.innerHTML = `
  <p class="title-intro">${article.title}</p>
  <div style=" display: flex; justify-content: space-between;">
    <span class="address-intro">${article.address.city} - ${article.address.district} - ${article.address.ward}</span>
  </div>
  <p class="price-intro">${article.rentcost} VNĐ</p>
  `;
const rent_status = document.querySelector(".rent-status");
rent_status.innerHTML = `${
  article.statusrent ? "Đã cho thuê" : "Vẫn còn phòng"
}`;
const left_main = document.querySelector(".left-main");
left_main.innerHTML = `
  <li class="date-post"><span>Ngày đăng</span>: ${article.createdAt}</li>
  <li><span>Giá</span>: ${article.rentcost} VNĐ</li>
  <li><span>Diện tích</span>: ${article.area} m<sup>2</sup></li>
  <li><span>Giá điện</span>: ${formatNumber(article.electric)} VNĐ</li>
  <li><span>Giá nước</span>: ${formatNumber(article.water)} VNĐ</li>
  <li><span>Chung chủ</span>: ${article.infoOwner}</li>
  <li><span>Khép kín</span>: ${article.equipments.closed}</li>
  <li><span>Tầng thứ</span>: ${article.equipments.floor}</li>
  <li><span>Tổng số tầng</span>: ${article.equipments.floors}</li>
  `;
const right_main = document.querySelector(".right-main");
right_main.innerHTML = `
  <li><span>Điều hòa</span>: ${article.equipments.airconditional}</li>
  <li><span>Tủ lạnh</span>: ${article.equipments.freazer}</li>
  <li><span>Máy giặt</span>: ${article.equipments.washingmachine}</li>
  <li><span>Nóng lạnh</span>: ${article.equipments.hottank}</li>
  <li><span>Phòng tắm</span>: ${article.equipments.bathroom}</li>
  <li><span>Phòng bếp</span>: ${article.equipments.kitchen}</li>
  <li><span>Phòng ngủ</span>: ${article.equipments.bedroom}</li>
  <li><span>Nhà vệ sinh</span>: ${article.equipments.wc}</li>
  <li><span>Ban công</span>: ${article.equipments.balcony}</li>
  `;
const content_description = document.querySelector(".content-description");
content_description.innerHTML = `${article.nearby + " " + article.description}`;
const owner_description = document.querySelector(".owner-description");
owner_description.innerHTML = `
  <img
    class="avatar-owner"
    src=${owner.avatarUrl}
  />
  <div class="name-owner">
  <p style="font-size: 1.2rem; font-weight: bold; margin: 0px">
    ${owner.name}
  </p>
  <p style="font-size: 1rem; color: grey; margin: 0px">
    Đã tham gia: ${owner.date}
  </p>
  </div>
  <div class="contact-owner">
    <i
      class="fas fa-phone-alt"
      style="color: #009177; margin-right: 0.5rem"
    ></i>
    ${owner.phone}
  </div>
`;
const owner_article = document.querySelector(".owner-article");
owner_article.innerHTML = `
  <div class="owner-information">
      <div style="flex-direction: row; display: flex">
      <img
        class="avatar-owner"
        src=${owner.avatarUrl}
      />
      <div class="name-owner">
        <p style="font-size: 1.2rem; font-weight: bold; margin: 0px">
          ${owner.name}
        </p>
        <p style="font-size: 1rem; color: grey; margin: 0px;">
          Đã tham gia: ${owner.date}
        </p>
      </div>
    </div>
    <div class="owner-contact">
      <i
        class="fas fa-phone-alt"
        style="color: #009177; margin-right: 0.5rem"
      ></i>
      ${owner.phone}
    </div>
  </div>
`;
/**
 * BÌNH LUẬN VÀ ĐÁNH GIÁ
 */
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
  if (input_comment.value) {
    article.comments.push({
      id: inner.id,
      avatar: inner.avatarUrl,
      star_voted: stars > 0 ? stars : false,
      name: inner.name,
      content: input_comment.value,
      date: "26/12/2020 15:36",
    });
    input_comment.value = "";
    previous_comment = ``;
    for (let i = article.comments.length - 1; i >= 0; i--) {
      var vote = ``;
      if (article.comments[i].star_voted) {
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
  }
};
/**
 * BÁO CÁO BÀI VIẾT
 */
const content_reported = document.querySelectorAll(".content-reported");
const sendReport = () => {
  var report = "";
  content_reported.forEach((content) => {
    if (content.querySelector("input").checked) {
      report += content.querySelector("span").innerHTML + "/ ";
    }
  });
  if (report) console.log(report); // Gửi cho
  content_reported.forEach((content) => {
    content.querySelector("input").checked = false;
  });
};
var money = 0;
const chuyendoi = () => {
  const input_day_extended = document.querySelector(".input-day-extended");
  money = parseInt(input_day_extended.value);
  if (money < 7) {
    input_day_extended.value = "7";
    money = parseInt(input_day_extended.value);
  }
  if (money >= 7) {
    const money_extended = document.querySelector(".money-extended");
    money_extended.innerHTML = `${formatNumber(money * 100000)} VNĐ`;
  }
};
const extendArticle = () => {
  if (money >= 7)
    console.log(`Gửi yêu cầu cho admin gia hạn thêm ${money} ngày`);
};
/**
 * HÀM TẠO RA SLIDE IMAGE
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

/**
 * HÀM HIỆN THỊ CÁC OPTION
 */
const showMoreOption = (e, element) => {
  if (document.querySelector(element).classList.contains("none")) {
    document.querySelector(element).classList.remove("none");
  } else {
    document.querySelector(element).classList.add("none");
    Array.from(document.querySelectorAll(element + " .fa-circle")).forEach(
      (noti) => {
        if (!noti.classList.contains("hidden")) {
          noti.classList.add("hidden");
        }
      }
    );
  }
  if (e.target.classList.contains("alerted")) {
    e.target.classList.remove("alerted");
  }
};
