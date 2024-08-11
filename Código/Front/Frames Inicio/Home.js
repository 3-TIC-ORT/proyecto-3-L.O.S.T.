function LS () {
    let home = document.getElementsByClassName("home-frame")[0];
    let userFrame = document.getElementsByClassName("user-frame")[0];
    if (home.style.display = "block") {
        home.style.display = "none";
        userFrame.style.display = "flex";
    } else {
        home.style.display = "block";
    }
} document.getElementById("LS-SU").addEventListener("click", LS);