const newsCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category)
    }
    catch (error){
        console.log(error)
    }
}



const displayCategory = (categorys) => {
    const getCategoryDiv = document.getElementById('navbar-items');

    for (const category of categorys) {
        const createCategoryList = document.createElement('ul');
        createCategoryList.classList.add('nav')
        createCategoryList.classList.add('nav-pills')
        createCategoryList.classList.add('nav-fill')
        createCategoryList.innerHTML = `
            <li class="list-gruop nav-item" onclick="loadNews(${category.category_id})"> 
            <a class="nav-link" href="#">${category.category_name}</a>  
            </li>
        `;
        getCategoryDiv.appendChild(createCategoryList)
    }
}

newsCategory()
// category js ends here 

// display news starts 
const loadNews = async (newss) => {
    toggleSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/0${newss}`
    try {
        const res = await fetch(url)

        const data = await res.json()
        displayNews(data.data)
        displayInput(data.data)
    }
    catch (error) {
        console.log(error)
    }
};
const displayInput = input => {
    const displayFeild = document.getElementById('input-feild')
    displayFeild.innerText = `
    ${input.length} items found for this category 
    `;
}


const displayNews = (newss) => {
    const getNewsDiv = document.getElementById('news-section');

    getNewsDiv.textContent = '';
    newss.forEach(news => {
        const createNewsDiv = document.createElement('div');
        createNewsDiv.classList.add('card')
        createNewsDiv.classList.add('mb-3')
        createNewsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 250)} ...</p>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex justify-content-between">
                        <img src="${news.author.img}" class=" img-name rounded-circle">
                        <div class="repoter">
                        <h4 class="card-text">${news.author.name ? news.author.name : 'author'}</h4>
                        <p>${news.author.published_date}</p>
                        </div>
                        
                        </div>
                        <p class="text-muted"><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : 0}</p>
                        <p class="text-muted">${news.rating.number}</p>


                        <button class="btn btn-primary" onclick="loadDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">More Details</button>
                        
                    </div>
                    
                </div>
            </div>
        </div>
        
        `;
        getNewsDiv.appendChild(createNewsDiv)
    })
    toggleSpinner(false)
    // for (const news of newss) {


    //     const createNewsDiv = document.createElement('div');
    //     createNewsDiv.classList.add('card')
    //     createNewsDiv.classList.add('mb-3')
    //     createNewsDiv.innerHTML = `
    //     <div class="row g-0">
    //         <div class="col-md-4">
    //             <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
    //         </div>
    //         <div class="col-md-8">
    //             <div class="card-body">
    //                 <h5 class="card-title">${news.title}</h5>
    //                 <p class="card-text">${news.details.slice(0, 250)} ...</p>
    //                 <div class="d-flex align-items-center justify-content-between">
    //                     <div class="d-flex justify-content-between">
    //                     <img src="${news.author.img}" class=" img-name rounded-circle">
    //                     <div class="repoter">
    //                     <h4 class="card-text">${news.author.name ? news.author.name : 'author'}</h4>
    //                     <p>${news.author.published_date}</p>
    //                     </div>
                        
    //                     </div>
    //                     <p class="text-muted"><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : 0}</p>
    //                     <p class="text-muted">${news.rating.number}</p>


    //                     <button class="btn btn-primary" onclick="loadDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">More Details</button>
                        
    //                 </div>
                    
    //             </div>
    //         </div>
    //     </div>
        
    //     `;
    //     getNewsDiv.appendChild(createNewsDiv)
    //     // const points = news.total_view;
    //     // points.sort(function(a, b){return b - a});

    // }
    // toggleSpinner(false)
}

const toggleSpinner = isLoading => {
    const loadSection = document.getElementById('loader');
    if (isLoading) {
        loadSection.classList.remove('d-none')
    }
    else {
        loadSection.classList.add('d-none')
    }
}


loadNews()

const loadDetails = id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
        .catch(error => console.log(error))
}

const displayDetails = details => {
    const getModalDiv = document.getElementById('modal-details');
    getModalDiv.textContent = ''
    for (const detail of details) {

        const headerModal = document.getElementById('exampleModalLabel');
        headerModal.innerText = detail.title;

        const createDetailsDiv = document.createElement('div');

        createDetailsDiv.innerHTML = `
    <div class="">
         <img src="${detail.image_url}" class="img-fluid rounded-start" alt="...">
    </div>
                    <p class="card-text">${detail.details}</p>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex justify-content-between">
                        
                        <div class="repoter">
                        <h4 class="card-text">${detail.author.name ? detail.author.name : 'no data available'}</h4>
                        <p>${detail.author.published_date}</p>
                        </div>
                        
                        </div>
                        <p class="text-muted"><i class="fa-solid fa-eye"></i>  ${detail.total_view ? detail.total_view : 0}</p>
                        <p class="text-muted">${detail.rating.number}</p>
                        
                    </div>
    `
        getModalDiv.appendChild(createDetailsDiv)
    }

}

loadDetails()