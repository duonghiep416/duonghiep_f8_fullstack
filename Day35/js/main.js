import { config } from "./config.js";
import { client } from "./client.js";
const pageLoading = document.querySelector(".page-loading");
const postsEl = document.querySelector(".posts");

let isLoading = false;
let page = 1;

const getPosts = async (query = {}, isLoadMore = false) => {
    const queryString = new URLSearchParams(query).toString();
    const { response, data } = await client.get(`/posts?${queryString}`);
    pageLoading.style.display = "none";
    if (!isLoadMore) {
        render(data);
    }
    return data;
};
const limitPostInPage = 3;
getPosts({ _limit: limitPostInPage, _page: 1 });

const render = (posts) => {
    if (posts.length) {
        posts.forEach(
            ({ id, name, title, excerpt, content, thumbnail_url }) => {
                const postItem = document.createElement("div");
                postItem.classList.add("post-item");
                const h2 = document.createElement("h2");
                h2.innerText = title;
                postItem.append(h2);
                const h3 = document.createElement("h3");
                h3.innerText = name;
                postItem.append(h3);
                const divContent = document.createElement("div");
                const htmlContent = marked.parse(content);
                divContent.innerHTML = htmlContent;
                const separate = document.createElement("div");
                separate.style.width = "100%";
                separate.style.height = "10px";
                separate.style.background = "red";
                divContent.append(separate);

                postItem.append(divContent);
                postsEl.append(postItem);
            }
        );
    }
};

function fetchMoreData() {
    if (isLoading) {
        return;
    }
    isLoading = true;
    const loadMoreText = document.createElement("p");
    loadMoreText.innerText = "Loading...";
    postsEl.append(loadMoreText);
    getPosts({}, true).then((data) => {
        page++;
        getPosts({ _limit: limitPostInPage, _page: page });
        if (page > data.length / limitPostInPage) {
            page = 0;
        }
        isLoading = false;
        loadMoreText.remove();
    });
}

window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 300) {
        fetchMoreData();
    }
});
