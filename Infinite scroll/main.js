const dataContainer = document.getElementById("data-container");
const loader = document.getElementById("loader");
const endMessage = document.getElementById("end-message"); 
let page = 1;
let loading = false;
let endOfData = false;

const fetchData = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );
  const data = await response.json();

  return data;
};

const appendDataToContainer = (data) => {
  data.forEach((item) => {
    const post = document.createElement("div");
    post.className = "post";
    post.textContent = item.title;
    dataContainer.appendChild(post);
  });
};

const loadMoreData = async () => {
  if (loading || endOfData) return;

  loading = true;
  loader.style.display = "block";

  const data = await fetchData();
  appendDataToContainer(data);

  loader.style.display = "none";
  page++;
  loading = false;

  if (data.length === 0) {
    endOfData = true;
    endMessage.style.display = "block";
  }
};

loadMoreData();

window.addEventListener("scroll", () => {
  if (endOfData) return;

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadMoreData();
  }
});
