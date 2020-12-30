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

$(document).ready(function () {
  Array.from(document.querySelectorAll('.stars')).forEach(star => {
    let number = star.innerHTML * 1;
    let html = '';
    if (number != 0) {
      for (var i = 1; i <= 5; i++) {
        if (i <= number) {
          html += '<i class="fas fa-star" style="color: lightseagreen"></i>'
        } else {
          html += '<i class="fas fa-star" ></i>'
        }
      }
    }
    star.innerHTML = html;
  })
});

document.querySelector('.list-comment').scrollTop = document.querySelector('.list-comment').scrollHeight;
const input_comment = document.querySelector(".input-comment");
const send = () => {
  let date = new Date();
  let commentInput = input_comment.value.trim();
  if (commentInput) {
    if (document.querySelector('.show-info-option>ul>li>a')) {
      let comment = {
        star_voted: stars > 0 ? stars : false,
        content: commentInput,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
      };
      fetch(window.location.pathname + '/add-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      })
        .then(comments => comments.json())
        .then(comments => {
          let lastComment = comments.pop();
          let html = ''
          html += `
            <div class="comments">
                <img class="avatar-renter" src=${lastComment.authorAvatar} />
                <div class="comment">
                    <div class="header-comment">
                        <h4 class="name-renter">${lastComment.authorName}</h4>
                        <div class="stars">`
          if (lastComment.star != 0) {
            for (var i = 1; i <= 5; i++) {
              if (i <= lastComment.star) {
                html += '<i class="fas fa-star" style="color: lightseagreen"></i>'
              } else {
                html += '<i class="fas fa-star" ></i>'
              }
            }
          }

          html += `
                        </div>
                    </div>
                    <p class="content-comment">${lastComment.content}</p>
                    <p class="date-comment">${lastComment.date}</p>
                </div>
            </div>
          `
          document.querySelector('.list-comment').innerHTML += html;
          document.querySelector('.list-comment').scrollTop = document.querySelector('.list-comment').scrollHeight;
        })
    }
    input_comment.value = ''
    rate(0);

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
  //FETCH REPORT TO SEVER
  if (report) {
    fetch(window.location.pathname + '/report')
  };
  content_reported.forEach((content) => {
    content.querySelector("input").checked = false;
  });
};

var extendedTime = 0;
const chuyendoi = (e) => {
  extendedTime = e.target.value;
  document.querySelector('.money-extended').innerText = `${e.target.value * 25000} VNĐ`
};
const extendArticle = () => {
  if (extendedTime >= 7) {
    alert(`Gia hạn bài viết thành công ${extendedTime} ngày`)
    fetch(window.location.pathname + '/extend?days=' + extendedTime)
  } else {
    alert(`Số ngày gia hạn phải lớn hơn 7 ngày`)
  }

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
document.addEventListener('mouseup', function (e) {
  var options = document.querySelector('.more-option');
  if (!options.contains(e.target)) {
    document.querySelector('.options').classList.add('none')
  }
});

const deleteArticle = ()=>{
  window.location.href='http://localhost:3000'+window.location.pathname+'/delete'
}