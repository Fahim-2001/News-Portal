//Loading Categories
const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

//Display catagories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    const newCategory = document.createElement("div");
    newCategory.innerHTML = `
        <button class="buttons" onclick="loadNews(${category.category_id})">${category.category_name}</button>
    `;
    categoryContainer.appendChild(newCategory);
  });
};

//Loading News
const loadNews = async (id) => {
  const url = `
    https://openapi.programming-hero.com/api/news/category/0${id}
    `;
  const res = await fetch(url);
  const data = await res.json();
  displayNewses(data.data);
};

// Display News
const displayNewses = (newses) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  newses.forEach((news) => {
    console.log(news);
    const newDiv = document.createElement("div");
    newDiv.classList.add("col");
    newDiv.innerHTML = `
          <div class="card">
                        <img src="${
                          news.thumbnail_url
                        }" class="card-img-top h-50" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.slice(
                              0,
                              300
                            )}...</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-around">
                          <div class="d-flex">
                              <img src="${
                                news.author.img
                              }" alt="" class="image mx-2">
                              <div>
                                  <p>${news.author.name} <br>${
      news.author.published_date
    }</p>
                              </div>
                          </div>
                          <div class="d-flex">
                              <i class="fa-regular fa-eye pt-1 me-1"></i>
                              <p>${news.total_view}</p>
                          </div>
                        </div>
            </div>
    `;
    newsContainer.appendChild(newDiv);
  });
};
// loadNews();
loadCategories();
