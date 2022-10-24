const output = document.querySelector(".pop-output");
const show = document.querySelector(".pop-show");
const close = document.querySelectorAll(".pop-close");
const images = document.querySelectorAll(".pop img");

// console.log(images);

images.forEach(function(e){
    e.addEventListener("click", popImage);
})

close.forEach(function(e){
    e.addEventListener("click", function(){
        show.classList.add("pop-hide");
    })
})

function popImage(e){
    console.log(this.src);
    output.querySelector("img").setAttribute("src",this.src);
    show.classList.remove("pop-hide");
}