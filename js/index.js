import galleryItems from "./data/gallery-items.js";

const galleryOriginalImages = galleryItems.map((item) => item.original);
const galleryRef = document.querySelector("ul.js-gallery");
const lightBoxRef = document.querySelector(".js-lightbox");
const lightBoxImgRef = document.querySelector(".lightbox__image");
const lightBoxCloseBtnRef = document.querySelector(
  '[data-action="close-lightbox"]'
);

const lightBoxOverlay = document.querySelector(".lightbox__overlay");

const createGalleryItemsMarkup = (items) =>
  items
    .map(
      ({ preview, original, description }) => `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a> 
</li>`
    )
    .join("");

galleryRef.innerHTML = createGalleryItemsMarkup(galleryItems);

function showLightBox(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  window.addEventListener("keydown", onEscPress);
  lightBoxRef.classList.add("is-open");
  lightBoxImgRef.src = event.target.dataset.source;
  lightBoxImgRef.alt = event.target.alt;
}

function closeLightBox() {
  window.removeEventListener("keydown", onEscPress);
  lightBoxRef.classList.remove("is-open");
  lightBoxImgRef.src = "";
}

function onEscPress(event) {
  if (event.code === "Escape") {
    closeLightBox();
  }
  onRightBtnPress(event);
  onLeftBtnPress(event);
}

function onRightBtnPress(event) {
  if (!(event.code === "ArrowRight")) {
    return;
  }
  let next = galleryOriginalImages.indexOf(lightBoxImgRef.src) + 1;
  if (next === galleryOriginalImages.length) {
    next = 0;
  } else {
    next += 1;
  }
  lightBoxImgRef.src = galleryOriginalImages[next];
}

function onLeftBtnPress(event) {
  if (!(event.code === "ArrowLeft")) {
    return;
  }
  let prev = galleryOriginalImages.indexOf(lightBoxImgRef.src);
  if (prev === 0) {
    prev = galleryOriginalImages.length - 1;
  } else {
    prev -= 1;
  }
  lightBoxImgRef.src = galleryOriginalImages[prev];
}

galleryRef.addEventListener("click", showLightBox);
lightBoxCloseBtnRef.addEventListener("click", closeLightBox);
lightBoxOverlay.addEventListener("click", closeLightBox);
