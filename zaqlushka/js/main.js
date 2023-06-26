const modalShowBtn = document.querySelectorAll(".modal-show-btn")
const modal = document.querySelectorAll(".modal")
const feedbackModal = document.querySelector(".feedback-modal")
const successModal = document.querySelector(".success-modal")
const errorModal = document.querySelector(".error-modal")
let modalAnimSpd = 500
let paddingValue = window.innerWidth > 325 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
function windoOnResize() {
  paddingValue = window.innerWidth > 325 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
}
window.addEventListener("resize", windoOnResize)
window.addEventListener('orientationchange', windoOnResize);

function Marquee(parentSelector, speed) {
  const clone = parentSelector.innerHTML;
  const firstElement = parentSelector.children[0];
  let i = 0;
  parentSelector.insertAdjacentHTML('beforeend', clone);
  parentSelector.insertAdjacentHTML('beforeend', clone);

  setInterval(function () {
    firstElement.style.marginLeft = `-${i}px`;
    if (i > firstElement.clientWidth) {
      i = 0;
    }
    i = i + speed;
  }, 0);
}

//after window is completed load
//1 class selector for marquee
//2 marquee speed 0.2
const marquees = document.querySelectorAll('.marquee')

if (marquees.length != 0) {
  marquees.forEach((marquee) => {
    window.addEventListener('load', Marquee(marquee, 0.2))
  })
}
Fancybox.defaults = {
  loop: false,
  idle: false,
  compact: false,
  Hash: false,
  Toolbar: {
    display: {
      left: ["infobar"],
      middle: [],
      right: ["close"],
    },
  },
}
if (document.querySelector(".swiper-aparts")) {
  let thumbsSwiper
  let mainSwiperMob
  let mainSwiperDesk
  function mainSwiperInit() {
    if (window.innerWidth <= 991) {
      if (mainSwiperDesk) {
        mainSwiperDesk.destroy()
        thumbsSwiper.destroy()
      }
      if (!mainSwiperMob || mainSwiperMob.destroyed) {
        mainSwiperMob = new Swiper(".swiper-aparts__main", {
          slidesPerView: 1.2,
          observer: true,
          observeParents: true,
          spaceBetween: 20,
          autoplay: {
            delay: 3500,
          },
          speed: 800
        })
      }
      Fancybox.bind('[data-fancybox="gallery-mobile"]', {
        Thumbs: {
          showOnStart: false,
        },
      });
    } else {
      if (mainSwiperMob) mainSwiperMob.destroy()
      if (!mainSwiperDesk || mainSwiperDesk.destroyed) {
        thumbsSwiper = new Swiper(".swiper-aparts__thumbs", {
          slidesPerView: 4,
          spaceBetween: 20,
          direction: 'vertical',
          observer: true,
          observeParents: true,
          freeMode: true,
          speed: 800,
        })
        mainSwiperDesk = new Swiper(".swiper-aparts__main", {
          slidesPerView: 1,
          observer: true,
          observeParents: true,
          effect: 'fade',
          autoplay: {
            delay: 3500,
          },
          thumbs: {
            swiper: thumbsSwiper,
          },
          speed: 300
        })
        Fancybox.unbind('[data-fancybox="gallery-mobile"]')
        Fancybox.bind('[data-fancybox="gallery-desktop"]', { 
          Thumbs: {
            type: 'modern',
            autoStart: true,   // Display thumbnails on opening
            hideOnClose: true     // Hide thumbnail grid when closing animation starts
          },
          on: {
            close: (fancybox, slide) => {
              mainSwiperDesk.slideTo(fancybox.getSlide().index)
              thumbsSwiper.slideTo(fancybox.getSlide().index)
            },
          },
        });
      }
    }
  }
  mainSwiperInit()
  window.addEventListener("resize",() => mainSwiperInit())
  window.addEventListener("orientationchange",() => mainSwiperInit())
}
// show feedback modal
modalShowBtn.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault()
    let href = btn.getAttribute("href")
    openModal(document.querySelector(href))
  })
})
//show modal
function openModal(modal) {
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("no-scroll");
  modal.classList.add("open")
  setTimeout(() => {
    modal.querySelector(".modal__overlay").classList.add("open")
  }, 30)
}
// unshow modal
function closeModal(modal) {
  modal.querySelector(".modal__overlay").classList.remove("open")
  setTimeout(() => {
    document.body.style.paddingRight = '0px'
    document.body.classList.remove("no-scroll")
    modal.classList.remove("open")
  }, modalAnimSpd)
}
// unshow modal when clicked outside or close-btn
modal.forEach(item => {
  const modalContent = item.querySelector(".modal__content");
  let formCloseBtn = item.querySelector(".modal__close")
  formCloseBtn.addEventListener("click", e => {
    closeModal(item)
  })
  item.addEventListener("click", e => {
    if (!modalContent.contains(e.target)) {
      closeModal(item)
    }
  })
})
//form onsubmit
function formSuccess(form) {
  form.querySelectorAll("input").forEach(inp => {
    if (inp.type != "hidden") {
      inp.value = ""
    }
  })
  form.querySelectorAll(".form__placeholder").forEach(item => item.style.display = "block")
  let modal = document.querySelector(".modal.open")
  if (modal) {
    modal.querySelector(".modal__overlay").classList.remove("open")
    modal.classList.remove("open")
  }
  openModal(successModal)
}

//input[type=tel] mask
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
  inp.forEach(item => {
    item.addEventListener("focus", () => {
      item.parentNode.querySelector(".form__placeholder").style.display = "none"
    })
    item.addEventListener("blur", () => {
      if (item.value.length === 0) item.parentNode.querySelector(".form__placeholder").style.display = "block"
    })
    Inputmask({ "mask": "+7 999 999-99-99" }).mask(item);
  })
}

let im = document.querySelector(".img")
im.addEventListener("mousemove", e => {
  let mouseX = e.pageX - im.offsetLeft - im.clientWidth / 2;
  let mouseY = e.pageY - im.offsetTop - im.clientHeight / 2;
  let mousePX = mouseX / im.clientWidth;
  let mousePY =  mouseY / im.clientHeight;
  //const rX = mousePX * 30;
  const rX = mousePX * 20;
 // const rY = mousePY * -30;
 const rY = mousePY * -20;
  const tX = mousePX * -40;
  const tY = mousePY * -40;
 // im.style.transform  = `translateX(${tX}px) translateY(${tY}px) rotateY(${rX}deg) rotateX(${rY}deg) translateZ(100px)`
  im.style.transform  = `rotateY(${rX}deg) rotateX(${rY}deg) translateZ(150px)`
})
im.addEventListener("mouseleave", e => {
  im.style.transform  = `translateX(0px) translateY(0px) rotateY(0deg) rotateX(0deg) translateZ(150px)`
})
