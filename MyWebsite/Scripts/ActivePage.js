let name = document.location.pathname.split("/").slice(-1)[0];

if (name === "index.html"){
    document.getElementById("navigation_list").children[0].className = "active_navigation_list_button_type"
}
else if (name === "MyFavouriteFilms.html"){
    document.getElementById("navigation_list").children[1].className = "active_navigation_list_button_type"
}
else if (name === "ToWatchInsertField.html"){
    document.getElementById("navigation_list").children[2].className = "active_navigation_list_button_type"
}
else if (name === "ActiveUsers.html"){
    document.getElementById("navigation_list").children[3].className = "active_navigation_list_button_type"
}