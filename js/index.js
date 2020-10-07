import galleryItems from "./data/gallery-items.js";

const refs = {
  gallery: document.querySelector("ul.js-gallery"),
  lightBox: document.querySelector(".js-lightbox"),
  lightBoxImg: document.querySelector(".lightbox__image"),
  closeLightBoxBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightBoxOverlay: document.querySelector(".lightbox__overlay"),
};

const imgCount = galleryItems.length;
let current = 0;

function createGalleryItemsMarkup(items) {
  return items
    .map(
      ({ preview, original, description }, index) => `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
        />
    </a> 
</li>`
    )
    .join("");
}

refs.gallery.innerHTML = createGalleryItemsMarkup(galleryItems);

function showLightBox(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  window.addEventListener("keydown", onKeyPressHandler);
  refs.lightBox.classList.add("is-open");
  refs.lightBoxImg.src = e.target.dataset.source;
  refs.lightBoxImg.alt = e.target.alt;
  current = e.target.dataset.index;
}

function onKeyPressHandler(e) {
  if (e.code === "Escape") {
    closeLightBox();
  }
  if (e.code === "ArrowRight") onRightKeyPress();
  if (e.code === "ArrowLeft") onLeftKeyPress();
  refs.lightBoxImg.src = galleryItems[current].original;
}

function closeLightBox() {
  window.removeEventListener("keydown", onKeyPressHandler);
  refs.lightBox.classList.remove("is-open");
  refs.lightBoxImg.src = "";
}

function onRightKeyPress() {
  current += 1;
  if (current >= imgCount) {
    current = 0;
  }
}

function onLeftKeyPress() {
  current -= 1;
  if (current < 0) {
    current = imgCount - 1;
  }
}

refs.gallery.addEventListener("click", showLightBox);
refs.lightBoxOverlay.addEventListener("click", closeLightBox);
refs.closeLightBoxBtn.addEventListener("click", closeLightBox);
