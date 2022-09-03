const newsCategory = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category)
}

const displayCategory = (categorys) =>{
    const getCategoryDiv = document.getElementById('navbar-items');

    for (const category of categorys){
        const createCategoryList = document.createElement('ul');
        createCategoryList.classList.add('nav')
        createCategoryList.classList.add('nav-pills')
        createCategoryList.classList.add('nav-fill')
        createCategoryList.innerHTML =`
            <li class="list-gruop nav-item"> 
            <a class="nav-link" href="#">${category.category_name}</a>  
            </li>
        `;
        getCategoryDiv.appendChild(createCategoryList)
    }
}

newsCategory()