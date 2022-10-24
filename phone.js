const contents= document.querySelectorAll('.phoneUi');
const listItems= document.querySelectorAll('.phoneNav ul li');

listItems.forEach((item,idx)=>{
    item.addEventListener('click',()=>{
        hideAllContents()
        hideAllItems()

        item.classList.add('active')
        contents[idx].classList.add('show')
    })
})

function hideAllContents(){
    contents.forEach(content => content.classList.remove('show'))
}

function hideAllItems(){
    listItems.forEach(item => item.classList.remove('active'))
}