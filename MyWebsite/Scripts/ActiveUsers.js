function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
document.addEventListener('DOMContentLoaded', async () => {

    const random_start = 4; // От какого генерировать
    const random_end = 30; // До какого генерировать

    let allCycles = 23;

    let array = [];

    for(i=random_start;i<=random_end;i++){
        array.push(i)
    }

    for(countCycles=1;countCycles<=allCycles;countCycles++){
        console.log(array.splice(Math.random()*array.length,1)[0])
    }

    let urls = [
        'https://jsonplaceholder.org/users/1',
        'https://jsonplaceholder.org/users/2',
        'https://jsonplaceholder.org/users/3',
    ];
    for (i=0; i<array.length; i++){
        urls.push("https://jsonplaceholder.org/users/" + array[i]);
    }

    let results = [];
    for (let i = 0; i < urls.length; i++) {

        let resp = await fetch(urls[i]).catch(err => console.log(err));

        if ((typeof resp) === 'undefined') {
            results.push(null)
        }
        else {
            results.push(await resp.json());
        }
    }

    for (let i = 0; i < results.length; i++) {
        if (results[i] == null){
            let toInsert = document.createElement("li")
            toInsert.className = "error"
            toInsert.textContent = "⚠ Что-то пошло не так, этот пользователь не прогрузился"
            document.getElementById("most_active_users_list").appendChild(toInsert);
        }
        else {
            let toInsert = document.createElement("li")
            toInsert.className = "user"
            let paragraph = document.createElement("p")
            paragraph.innerText = results[i].firstname + " " + results[i].lastname + "\n" + results[i].email + "\n" + results[i].website;
            toInsert.appendChild(paragraph)
            document.getElementById("most_active_users_list").appendChild(toInsert);
        }
        document.getElementById("preloader").style.display = "none";
    }
});