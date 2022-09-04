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
        <button class="buttons" onclick="loadNews('${category.category_id}')">${category.category_name}</button>
    `;
    categoryContainer.appendChild(newCategory);
  });
};

//Loading News
const loadNews = async (id) => {
  const url = `
    https://openapi.programming-hero.com/api/news/category/${id}
    `;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNewses(data.data);
  } catch (error) {
    console.log(error);
  }
};

// Display News
const displayNewses = (newses) => {
  newses
    .sort((a, b) => {
      return a.total_view - b.total_view;
    })
    .reverse();

  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  const newsLength = newses.length;
  const numberOfNews = document.getElementById("number-of-news");
  if (newsLength === 0) {
    numberOfNews.innerHTML = `
            <h3 class="text-center bg-warning text-danger p-4">0 items found in this category</h3>
      `;
  } else {
    numberOfNews.innerHTML = `
            <h3 class="text-center text">${newses.length} items found in this category</h3>
      `;
  }

  newses.forEach((news) => {
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
                                  <p>${
                                    news.author.name
                                      ? news.author.name
                                      : "No Author Found"
                                  } <br>${
      news.author.published_date ? news.author.published_date : "No Date Found"
    }</p>
                              </div>
                          </div>
                          <div class="d-flex">
                              <i class="fa-regular fa-eye pt-1 me-1"></i>
                              <p>${
                                news.total_view ? news.total_view : "0 views"
                              }</p>
                          </div>
                        </div>
                        <button onclick="loadDetails('${
                          news._id
                        }')" class="button-per-news" data-bs-toggle="modal" data-bs-target="#exampleModal">See Details</button>
            </div>
    `;
    newsContainer.appendChild(newDiv);
  });
};

//Loading Details Of News
const loadDetails = async (newsId) => {
  const url = `
  https://openapi.programming-hero.com/api/news/${newsId}
  `;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayDetailsInModal(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};

//Modal to show detail news
const displayDetailsInModal = (data) => {
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.innerText = data.title;

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
        <img src="${
          data.image_url ? data.image_url : "No Picture Found"
        }" class="w-100" alt="">
        <p>${data.details}</p>
        <div class="d-flex align-items-center justify-content-between">
                          <div class="d-flex">
                              <img src="${
                                data.author.img
                              }" alt="" class="image mx-2">
                              <div>
                                  <p>${
                                    data.author.name
                                      ? data.author.name
                                      : "No Author Found"
                                  } <br>${
    data.author.published_date ? data.author.published_date : "No Date Found"
  }</p>
                              </div>
                          </div>
                          <div class="d-flex">
                              <i class="fa-regular fa-eye pt-1 me-1"></i>
                              <p>${
                                data.total_view ? data.total_view : "0 views"
                              }</p>
                          </div>
                        </div>
  `;
};
loadCategories();
