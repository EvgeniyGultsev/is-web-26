const sampleSlider = new Swiper('.sample-slider', {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 3000,
    },
    centeredSlides: true,
    keyboard: true,
})