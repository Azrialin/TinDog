let loinBtn = document.querySelector('.loginBtn');
let signupBtn = document.querySelector('.signupBtn');
let informBox = document.querySelector('.inform-box');
let loginContainer = document.querySelector('.login-container');

signupBtn.onclick = function(){
    informBox.classList.add('switch');
    loginContainer.classList.add('switch');
}

loinBtn.onclick = function(){
    informBox.classList.remove('switch');
    loginContainer.classList.remove('switch');
}