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
    const newNews = document.createElement("div");
    newNews.innerHTML = `
        <button class="buttons" onclick="loadNews(${category.category_id})">${category.category_name}</button>
    `;
    categoryContainer.appendChild(newNews);
  });
};

loadCategories();
