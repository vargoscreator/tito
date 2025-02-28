AOS.init({
    duration: 700
});

document.addEventListener("DOMContentLoaded", function () {
    let buySlider = new Swiper(".buy__slider", {
        loop: false,
        spaceBetween: 11,
        slidesPerView: 1,
        breakpoints: {
            480: {
                spaceBetween: 15,
                slidesPerView: 1.8,
            },
            768: {
                spaceBetween: 20,
                slidesPerView: 3.2,
            },
            1000: {
                spaceBetween: 20,
                slidesPerView: 4,
            },
        },
    });

    const langSelected = document.querySelector(".header__lang-selected");
    const langBlock = document.querySelector(".header__lang");
    langSelected.addEventListener("click", () => {
        langBlock.classList.toggle("active");
    });
    document.addEventListener("click", (event) => {
        if (!langBlock.contains(event.target) && !langSelected.contains(event.target)) {
            langBlock.classList.remove("active");
        }
    });

    const adressBlock = document.querySelector('.hero__adress');
    const adressElement = document.querySelector('.hero__adress-adress');
    adressBlock.addEventListener('click', function() {
        const adressText = adressElement.dataset.adress;
        navigator.clipboard.writeText(adressText);
        adressBlock.classList.add('active');
        setTimeout(() => {
            adressBlock.classList.remove('active');
        }, 2000);
    });
});

let isAnimating = false;
let isMobile = window.innerWidth < 480;
const imageClasses = [
    { selector: ".hero-icon-1", speed: 0.09 },
    { selector: ".hero-icon-2", speed: 0.01 },
    { selector: ".hero-icon-3", speed: 0.06 },
    { selector: ".hero-icon-4", speed: 0.1 },
    { selector: ".roadmap-icon-1", speed: 0.05 },
    { selector: ".roadmap-icon-2 img", speed: 0.03 },
    { selector: ".cryptonomics__image img", speed: 0.05 },
    { selector: ".cryptonomics-icon", speed: 0.03 },
    { selector: ".verify-icon", speed: 0.03 },
    { selector: ".playlist-icon-1", speed: 0.09 },
    { selector: ".playlist-icon-2", speed: 0.01 },
    { selector: ".playlist-icon-3", speed: 0.07 },
    { selector: ".playlist-icon-4", speed: 0.03 },
    { selector: ".playlist-icon-5", speed: 0.13 },
];
function resetTransforms() {
    imageClasses.forEach(({ selector }) => {
        document.querySelectorAll(selector).forEach((img) => {
            img.style.transform = 'translate(0px, 0px)';
        });
    });

    document.querySelectorAll('.icon-image-bg').forEach(image => {
        image.style.transform = 'translate(0px, 0px)';
    });

    document.querySelectorAll('.icon-hieroglyph-bg').forEach(bg => {
        bg.style.transform = 'translate(0px, 0px)';
    });
}
function checkScreenWidth() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth < 480;
    if (isMobile && !wasMobile) {
        resetTransforms();
    }
}
function animateElements(e) {
    if (isMobile) return;

    if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(() => {
            const { clientX: x, clientY: y } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            imageClasses.forEach(({ selector, speed }) => {
                document.querySelectorAll(selector).forEach((img) => {
                    const offsetX = (x - centerX) * speed;
                    const offsetY = (y - centerY) * speed;
                    img.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                });
            });

            const images = document.querySelectorAll('.icon-image-bg');
            const bgs = document.querySelectorAll('.icon-hieroglyph-bg');
            const mouseX = x - window.innerWidth / 2;
            const mouseY = y - window.innerHeight / 2;
            const imageSpeed = 0.02;
            const bgSpeed = -0.02;

            images.forEach(image => {
                const imageX = mouseX * imageSpeed;
                const imageY = mouseY * imageSpeed;
                image.style.transform = `translate(${imageX}px, ${imageY}px)`;
            });

            bgs.forEach(bg => {
                const bgX = mouseX * bgSpeed;
                const bgY = mouseY * bgSpeed;
                bg.style.transform = `translate(${bgX}px, ${bgY}px)`;
            });

            isAnimating = false;
        });
    }
}
window.addEventListener('resize', checkScreenWidth);
document.addEventListener("mousemove", animateElements);
checkScreenWidth();



document.querySelector('.cryptonomics__bottom-copy').addEventListener('click', function() {
    const addressElement = document.querySelector('.cryptonomics__bottom-adress');
    const address = addressElement.getAttribute('data-adress');
    navigator.clipboard.writeText(address);
    document.querySelector('.cryptonomics__bottom-content').classList.add('active');
    setTimeout(() => {
        document.querySelector('.cryptonomics__bottom-content').classList.remove('active');
    }, 2000);
});

const buyButtons = document.querySelectorAll('.buy__slide-btn');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupInner = document.querySelector('.popup__inner');
buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const price = button.getAttribute('data-price');
        popup.classList.add('show');        
        const priceSpan = popup.querySelector('.popup__price span:first-child');
        const hiddenInput = popup.querySelector('input[name="price"]');        
        priceSpan.textContent = `$${price}`;
        hiddenInput.value = price;
    });
});
popupClose.addEventListener('click', () => {
    popup.classList.remove('show');
});

document.addEventListener('click', (e) => {
    if (!popupInner.contains(e.target) && popup.classList.contains('show')) {
        if (!e.target.classList.contains('buy__slide-btn')) {
            popup.classList.remove('show');
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    function initScroll(containerSelector, blockSelector) {
        const scrollContainer = document.querySelector(containerSelector);
        const scrollBlock = document.querySelector(blockSelector);
        if (!scrollContainer || !scrollBlock) return;

        let isDown = false;
        let startX, startY;
        let translateX = 0;
        let prevTranslateX = 0;
        const mediaQuery = window.matchMedia("(max-width: 1279px)");

        function getClientX(e) {
            return e.touches ? e.touches[0].clientX : e.clientX;
        }

        function getClientY(e) {
            return e.touches ? e.touches[0].clientY : e.clientY;
        }

        function addScrollEvents() {
            scrollContainer.addEventListener("pointerdown", pointerDown);
            scrollContainer.addEventListener("pointermove", pointerMove);
            scrollContainer.addEventListener("pointerup", pointerUp);
            scrollContainer.addEventListener("pointerleave", pointerLeave);
            scrollContainer.addEventListener("touchstart", pointerDown);
            scrollContainer.addEventListener("touchmove", pointerMove, { passive: false });
            scrollContainer.addEventListener("touchend", pointerUp);
        }

        function removeScrollEvents() {
            scrollContainer.removeEventListener("pointerdown", pointerDown);
            scrollContainer.removeEventListener("pointermove", pointerMove);
            scrollContainer.removeEventListener("pointerup", pointerUp);
            scrollContainer.removeEventListener("pointerleave", pointerLeave);
            scrollContainer.removeEventListener("touchstart", pointerDown);
            scrollContainer.removeEventListener("touchmove", pointerMove);
            scrollContainer.removeEventListener("touchend", pointerUp);
            scrollBlock.style.transform = "translateX(0)";
            scrollContainer.style.cursor = "default";
        }

        function pointerDown(e) {
            isDown = true;
            startX = getClientX(e);
            startY = getClientY(e);
            prevTranslateX = translateX;
            scrollContainer.style.cursor = "grabbing";
        }

        function pointerMove(e) {
            if (!isDown) return;

            let moveX = getClientX(e) - startX;
            let moveY = getClientY(e) - startY;

            if (Math.abs(moveX) > Math.abs(moveY)) {
                e.preventDefault();

                translateX = prevTranslateX + moveX;
                const minTranslate = scrollContainer.offsetWidth - scrollBlock.offsetWidth;
                translateX = Math.min(0, Math.max(minTranslate, translateX));
                scrollBlock.style.transform = `translateX(${translateX}px)`;
            }
        }

        function pointerUp() {
            isDown = false;
            scrollContainer.style.cursor = "grab";
        }

        function pointerLeave() {
            isDown = false;
            scrollContainer.style.cursor = "grab";
        }

        if (mediaQuery.matches) {
            addScrollEvents();
        }

        mediaQuery.addEventListener("change", (e) => {
            if (e.matches) {
                addScrollEvents();
            } else {
                removeScrollEvents();
            }
        });
    }

    initScroll(".around__content", ".around__block");
    initScroll(".roadmap__content", ".roadmap__block");
});




document.querySelector('.footer__up').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".header__burger");
    const menu = document.querySelector(".header__menu");
    const closeBtn = document.querySelector(".header__menu-close");
    burger.addEventListener("click", () => {
        menu.classList.add("active");
    });
    closeBtn.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});


const anim = lottie.loadAnimation({
    container: document.getElementById('animation-container'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../animate.json' // Укажите путь к файлу
});