function LS () {
    let home = document.getElementsByClassName("home-frame")[0];
    let userFrame = document.getElementsByClassName("user-frame")[0];

    let z = window.getComputedStyle(home).zIndex;

    // NO CAMBIA EL FUCKING Z-INDEX, INCLUSIVE ME FIJE EN COMENTARIOS DE HACE 15 AÑOS

    console.log(`antes ${home.style.zIndex}`)
    if (parseInt(z, 0) === 0) {
        home.style.z= "-1";
        userFrame.style.display = "flex";
    } else {
        home.style.z = "0";
    }
    console.log(`despues ${home.style.zIndex}`)
} document.getElementById("LS-SU").addEventListener("click", LS);