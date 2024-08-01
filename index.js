const listElement = document.querySelector('#list');
console.log(listElement);
const paginationElement = document.getElementById('pagination');
let currentPage = 1;
let row = 15;
let number = document.querySelectorAll('.item');
console.log(number);
let inputData = ""

const displayList = function(items, wrapper, cardsPerPage, page){
    wrapper.innerHTML = "";
    page--;
    let start = cardsPerPage * page; //5 * 0
    let end = start + cardsPerPage
    let paginatedItem = items.slice(start, end);
    for (let i = 0; i < paginatedItem.length; i++){
        let html = `
            <div class = "item">
                <div class = "name">
                    <p class= "one">Name:<p/>
                    <p>${paginatedItem[i].name.common}<p/>
                </div>
                <div class = "name">
                    <p class = "one">Capital:<p/>
                    <p>${paginatedItem[i].capital[0]}<p/>
                </div>
                <div class = "flag">
                    <img src= "${paginatedItem[i].flags.svg}"/>
                </div>

            <div/>
        `
        wrapper.insertAdjacentHTML('afterbegin', html);
    }
    
}

function setUpPagination(items, wrapper, cardsPerPage) {
    wrapper.innerHTML = '';
    let pageCount = Math.ceil(items.length/cardsPerPage);
    for (let i = 1; i < pageCount + 1; i++){
        let btn = paginationButton(i, items)
        wrapper.appendChild(btn)
    }

    let previous = document.getElementById('back')
    previous.addEventListener('click', ()=>{
        if(currentPage > 1){
            currentPage--
        }
        displayList(items, listElement, row, currentPage)
    })

    let forward = document.getElementById('forword')
    forward.addEventListener('click', ()=>{
        if(currentPage >= 1){
            currentPage++
        }
        displayList(items, listElement, row, currentPage)
    })
}
function paginationButton(page,items){
    let button = document.createElement('button')
    button.innerText = page;
    if(currentPage == page) button.classList.add('active')
    button.addEventListener('click', ()=>{
        currentPage = page;
        displayList(items, listElement, row, currentPage)

        let currentButton = document.querySelector('.pagenumbers .active');
        currentButton.classList.remove('active');
        button.classList.add('active');
    })
    return button
};

let arr = fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags")
.then(result=>result.json())
.then(result=> {
    let smt = result.map(result=> result);
    displayList(smt, listElement, row, currentPage);
    setUpPagination(smt, paginationElement,row);
});

let searchFilter = () => {
    let Input = document.getElementById('searchPopularResult').value
    if(Input!==""){
        listElement.innerHTML= ""
    } else{
        let arr = fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags")
        .then(result=>result.json())
        .then(result=> {
            let smt = result.map(result=> result);
            displayList(smt, listElement, row, currentPage);
            setUpPagination(smt, paginationElement,row);
            for (let res of result){
        }
        });
    }
    let arr = fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags")
        .then(result=>result.json())
        .then(result=> {
            if(Input!==""){
                const displayList1 = function(items, wrapper, cardsPerPage, page){
                    for (let i = 0; i < result.length; i++){
                        let html = `
                            <div class = "item">
                                <div class = "name">
                                    <p class= "one">Name:<p/>
                                    <p class= "country-name">${result[i].name.common}<p/>
                                </div>
                                <div class = "name">
                                    <p class = "one">Capital:<p/>
                                    <p>${result[i].capital[0]}<p/>
                                </div>
                                <div class = "flag">
                                    <img src= "${result[i].flags.svg}"/>
                                </div>
                
                            <div/>
                        `
                        wrapper.insertAdjacentHTML('afterbegin', html);
                    }
                    // let li = listElement.querySelectorAll('.item');
                    // for (let l of li){
                    //     const el = l.getElementsByClassName('country-name')[0];
                    //     let textValue = el.textContent || a.innerText;
                    //     if (textValue.toUpperCase().indexOf(input) > -1) {
                    //         l.style.display = "";
                    //     } else {
                    //         l.style.display = "none";
                    //     }
                    // }
                    let li = listElement.querySelectorAll('.item');
                    for (let i = 0; i < li.length; i++) {
                        //const el = li[i].getElementsByTagName('h3')[0];
                        const el = li[i].getElementsByClassName('country-name')[0]
                        let textValue = el.textContent || el.innerText;
                        if (textValue.toUpperCase().indexOf(Input.toUpperCase()) > -1) {
                            li[i].style.display = "";
                        } 
                        else {
                            li[i].style.display = "none";
                        }
                    }; 
                    
                }
                let smt = result.map(result=> result);
                displayList1(smt, listElement, row, currentPage);
            }else{
                let arr = fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags")
                .then(result=>result.json())
                .then(result=> {
                    let smt = result.map(result=> result);
                    displayList(smt, listElement, row, currentPage);
                    setUpPagination(smt, paginationElement,row);
                });
            }


            // let input = document.getElementById('searchPopularResult').value.toUpperCase();
            // let li = listElement.querySelectorAll('item');
            // for (let i = 0; i < li.length; i++) {
            //     const el = li[i].getElementsByTagName('h3')[0];
            //     let textValue = el.textContent || a.innerText;
            //     if (textValue.toUpperCase().indexOf(input) > -1) {
            //         li[i].style.display = "";
            //     } else {
            //         li[i].style.display = "none";
            //     }
            // }; 
                
            // }
            // let smt = result.map(result=> result);
            // displayList1(smt, listElement, row, currentPage);
        });

};




// const prev = ()=>{
//     let previous = document.getElementById('back')
//         // let link = document.getElementsByClassName('item')
//         previous.addEventListener('click', (e)=>{
//         let activeB = document.querySelector('.active')
//         if(currentPage > 1){
//             currentPage--;
            
//         };
//         return previous;
//     })

// }