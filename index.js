const listElement = document.querySelector("#list");
const paginationElement = document.getElementById("pagination");
let currentPage = 1;
let row = 15;
let number = document.querySelectorAll(".item");

console.log(number);
let inputData = "";

const displayList = function (items, wrapper, cardsPerPage, page) {
  //displayList(mapResult, listElement, row, currentPage);
  wrapper.innerHTML = "";
  page--;
  let start = cardsPerPage * page;
  let end = start + cardsPerPage;
  let paginatedItem = items.slice(start, end);
  for (let i = 0; i < paginatedItem.length; i++) {
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
    `;
    wrapper.insertAdjacentHTML("afterbegin", html);
  }
};

function paginationButton(page, items) {
  let button = document.createElement("button");
  button.classList = "buttons";
  button.innerText = page;
  if (currentPage == page) button.classList.add("active");
  button.addEventListener("click", () => {
    console.log(page);
    currentPage = page;
    displayList(items, listElement, row, currentPage);

    let currentButton = document.querySelector(".pagenumbers .active");
    currentButton.classList.remove("active");
    button.classList.add("active");
  });
  //console.log(button);
  return button;
}

function setUpPagination(items, wrapper, cardsPerPage) {
  //setUpPagination(mapResult, paginationElement, row);
  wrapper.innerHTML = "";
  let pageCount = Math.ceil(items.length / cardsPerPage);

  for (let i = 1; i < pageCount + 1; i++) {
    let btn = paginationButton(i, items);
    wrapper.appendChild(btn);
  }

  let previous = document.getElementById("back");
  previous.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      let currentButton = document.querySelector(".pagenumbers .active");
      currentButton.classList.remove("active");
      const but = document.querySelectorAll(".buttons");
      but.forEach((item) =>
        item.innerText == currentPage ? item.classList.add("active") : ""
      );
    }
    displayList(items, listElement, row, currentPage);
  });

  let forward = document.getElementById("forword");
  forward.addEventListener("click", () => {
    if (currentPage < pageCount) {
      currentPage++;
      let currentButton = document.querySelector(".pagenumbers .active");
      currentButton.classList.remove("active");
      const but = document.querySelectorAll(".buttons");
      but.forEach((item) =>
        item.innerText == currentPage ? item.classList.add("active") : ""
      );
    }
    displayList(items, listElement, row, currentPage);
  });
}

let arr = fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags")
  .then((result) => result.json())
  .then((result) => {
    displayList(result, listElement, row, currentPage);
    setUpPagination(result, paginationElement, row);
  });

let searchFilter = () => {
  let Input = document
    .getElementById("searchPopularResult")
    .value.toUpperCase();
  let arr = fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,flags"
  )
    .then((result) => result.json())
    .then((result) => {
      if (Input !== "") {
        listElement.innerHTML = "";
        let filterResult = result.filter((item) =>
          item.name.common.toUpperCase().includes(Input)
        );
        filterResult.forEach((item) => {
          let html = `
            <div class = "item">
                <div class = "name">
                    <p class= "one">Name:<p/>
                    <p class= "country-name">${item.name.common}<p/>
                </div>
                <div class = "name">
                    <p class = "one">Capital:<p/>
                    <p>${item.capital[0]}<p/>
                </div>
                <div class = "flag">
                    <img src= "${item.flags.svg}"/>
                </div>
    
            <div/>
        `;
          listElement.insertAdjacentHTML("afterbegin", html);
        });
      } else {
        let arr = fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,flags"
        )
          .then((result) => result.json())
          .then((result) => {
            let smt = result.map((result) => result);
            displayList(smt, listElement, row, currentPage);
            setUpPagination(smt, paginationElement, row);
          });
      }
    });
};

//The end

//if (Input !== "") {
//     listElement.innerHTML = "";
//   } else {
//     let arr = fetch(
//       "https://restcountries.com/v3.1/all?fields=name,capital,flags"
//     )
//       .then((result) => result.json())
//       .then((result) => {
//         let smt = result.map((result) => result);
//         displayList(smt, listElement, row, currentPage);
//         setUpPagination(smt, paginationElement, row);
//         for (let res of result) {
//         }
//       });
//   }

//const displayList1 = function (items, wrapper, cardsPerPage, page) {
//   for (let i = 0; i < result.length; i++) {
// let html = `
//     <div class = "item">
//         <div class = "name">
//             <p class= "one">Name:<p/>
//             <p class= "country-name">${result[i].name.common}<p/>
//         </div>
//         <div class = "name">
//             <p class = "one">Capital:<p/>
//             <p>${result[i].capital[0]}<p/>
//         </div>
//         <div class = "flag">
//             <img src= "${result[i].flags.svg}"/>
//         </div>

//     <div/>
// `;
// wrapper.insertAdjacentHTML("afterbegin", html);
//   }
//   let li = listElement.querySelectorAll(".item");
//   for (let i = 0; i < li.length; i++) {
//     const el = li[i].getElementsByClassName("country-name")[0];
//     let textValue = el.textContent || el.innerText;
//     if (textValue.toUpperCase().indexOf(Input.toUpperCase()) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// };
//let smt = result.map((result) => result);
//displayList1(smt, listElement, row, currentPage);
