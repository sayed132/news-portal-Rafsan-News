const newsCatagory = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.news_category)
}

// const displayCatagory = (catagorys) =>{
//     const navContent = document.getElementById('navbar-items')
//     catagorys.forEach(catagory => {
//         const createCatagoryUl = document.createElement('ul');
//         createCatagoryUl.classList.add('nav nav-pills nav-fill');
//         createCatagoryUl.innerHTML = `
//         <li class="nav-item">
//           <a class="nav-link active" aria-current="page" href="#">${catagory.category_name}</a>
//         </li>
//         `
//     })
//     navContent.appendChild(createCatagoryUl)
// }

newsCatagory()