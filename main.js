//Stripe
document
    .getElementById("checkoutButton")
    .addEventListener("click", function () {
        window.open(
            "https://buy.stripe.com/4gweXo9Nd7B7fJu7ss",
            "_blank",
            "noopener,noreferrer"
        );
    });

//Carousel
const swiper = new Swiper(".swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    scrollbar: {
        el: ".swiper-scrollbar",
    },
});

// Modal Carousel
const screenshots = document.querySelectorAll(".screenshot");

const modalContainer = document.createElement("div");
modalContainer.id = "modal-container";
modalContainer.innerHTML = `
    <div id="modal-content" class="relative bg-white rounded-lg shadow-lg max-w-3/4 max-h-3/4 w-3/4 h-3/4 mx-auto my-12 overflow-hidden">
      <div class="swiper modal-swiper">
        <div class="swiper-wrapper">
          <!-- Images will be dynamically inserted here -->
        </div>
        <!-- Swiper controls inside modal -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  `;
document.body.appendChild(modalContainer);

const modal = new PlainModal(modalContainer, {
    overlay: true,
    duration: 300,
});

const imageUrls = Array.from(screenshots).map((screenshot) => screenshot.src);
let modalSwiper;
screenshots.forEach((screenshot, index) => {
    screenshot.addEventListener("click", () => {
        loadImagesIntoSwiper(index);
        swiper.autoplay.stop(); //TODO:TD Resume loop on close
        modal.open();
    });
});

function loadImagesIntoSwiper(activeIndex) {
    const swiperWrapper = document.querySelector(".modal-swiper .swiper-wrapper");
    swiperWrapper.innerHTML = "";

    imageUrls.forEach((url) => {
        swiperWrapper.innerHTML += `
        <div class="swiper-slide flex justify-center items-center">
          <img src="${url}" alt="Screenshot" class="max-w-full max-h-[90%] mx-auto rounded-lg shadow-lg" />
        </div>`;
    });

    if (modalSwiper) {
        modalSwiper.destroy();
    }

    modalSwiper = new Swiper(".modal-swiper", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    modalSwiper.slideTo(activeIndex);
}
