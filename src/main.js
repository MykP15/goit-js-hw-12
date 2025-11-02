import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = form.querySelector("input[name='search-text']");
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
const perPage = 15;
let totalHits = 0;
let loadedImages = 0;

form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query!",
      position: "topRight",
    });
    return;
  }

  page = 1;
  loadedImages = 0;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    totalHits = data.totalHits;
    loadedImages = data.hits.length;

    if (data.hits.length === 0) {
      iziToast.info({
        title: "No results",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

    createGallery(data.hits);

    if (loadedImages < totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong! Please try again later.",
      position: "topRight",
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;

 
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    createGallery(data.hits);
    loadedImages += data.hits.length;

    const { height: cardHeight } = document
      .querySelector(".gallery li")
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    if (loadedImages >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
      
    } else {
      showLoadMoreButton(); 
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong! Please try again later.",
      position: "topRight",
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

function showLoadMoreButton() {
  loadMoreBtn.classList.remove("is-hidden");
}

function hideLoadMoreButton() {
  loadMoreBtn.classList.add("is-hidden");
}
