const sampleSlider = new Swiper('.sample-slider', {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    speed: 1000,
    autoplay: {
        delay: 3000,
    },
    centeredSlides: true,
    keyboard: true,
})
document.addEventListener('DOMContentLoaded', async () => {
    let urls = [
        'https://jsonplaceholder.org/comments/1',
        'https://jsonplaceholder.org/comments/2',
        'https://jsonplaceholder.org/comments/3',
        'https://jsonplaceholder.org/comments/4',
    ];
    let results = [];
    for (let i = 0; i < 4; i++) {
        let resp = await fetch(urls[i]).catch(err => console.log(err));

        if ((typeof resp) === 'undefined') {
            results.push(null)
        } else {
            results.push(await resp.json());
        }
    }
    for (let i = 0; i < results.length; i++) {
        if (results[i] == null){
            let toInsert = document.createElement("p")
            toInsert.className = "error"
            toInsert.textContent = "⚠ Что-то пошло не так, этот пользователь не прогрузился"
            document.getElementsByClassName("swiper_content")[i].appendChild(toInsert);
        }
        else {
            let toInsert = document.createElement("p")
            toInsert.className = "user"
            let paragraph = document.createElement("p")
            paragraph.innerText = results[i].comment;
            toInsert.appendChild(paragraph)
            document.getElementsByClassName("swiper_content")[i].appendChild(toInsert);
        }
    }
})