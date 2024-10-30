let before_loadTime = new Date().getTime();
window.onload = PageLoadTime;
function PageLoadTime() {
    let after_loadTime = new Date().getTime();
    let pageLoadTime = (after_loadTime - before_loadTime) / 1000

    document.getElementById("loadtime").innerHTML = "Page load time is " + pageLoadTime + " Seconds";
}