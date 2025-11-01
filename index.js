import{a as f,S as m,i as a}from"./assets/vendor-Bt_EzQve.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const y="https://pixabay.com/api/",g="52937189-e7de87ebecf7d1a373ae68931";async function h(i){const r={key:g,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await f.get(y,{params:r})).data}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),b=new m(".gallery a",{captionsData:"alt",captionDelay:250});function L(i){const r=i.map(({webformatURL:o,largeImageURL:s,tags:e,likes:t,views:n,comments:d,downloads:p})=>`
      <li class="gallery-item">
        <a href="${s}">
          <img class="galery-image" src="${o}" alt="${e}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${t}</p>
          <p><b>Views:</b> ${n}</p>
          <p><b>Comments:</b> ${d}</p>
          <p><b>Downloads:</b> ${p}</p>
        </div>
      </li>`).join("");c.insertAdjacentHTML("beforeend",r),b.refresh()}function S(){c.innerHTML=""}function w(){l.classList.remove("is-hidden")}function q(){l.classList.add("is-hidden")}const u=document.querySelector(".form"),v=u.querySelector("input[name='search-text']");u.addEventListener("submit",P);async function P(i){i.preventDefault();const r=v.value.trim();if(!r){a.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}S(),w();try{const o=await h(r);if(o.hits.length===0){a.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(o.hits)}catch(o){a.error({title:"Error",message:"Something went wrong! Please try again later.",position:"topRight"}),console.error(o)}finally{q()}}
//# sourceMappingURL=index.js.map
