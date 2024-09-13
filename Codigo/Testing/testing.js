let userlogged = null;

function userUpdate(data){
    if(data.id === null){
        userlogged = data.id;
        document.getElementById("resultado").innerHTML = userlogged
        console.log(userlogged);
    } else{
        userlogged = data.id;
        document.getElementById("resultado").innerHTML = userlogged
        console.log(userlogged);
    }
    
}

function register(){
    postData("register", {name:document.getElementById("username").value, password:document.getElementById("password").value}, userUpdate)
}

function login(){
    postData("login", {name:document.getElementById("username").value, password:document.getElementById("password").value}, userUpdate)
}