const swiper = new Swiper('.main__slider-block', {
    loop: true,
    navigation: {
      nextEl: '.main__text-block__arrow.swiper-button-next',
      prevEl: '.main__text-block__arrow.swiper-button-prev',
    },
  });


  // Таби 
const tabNavItems = document.querySelectorAll(".best-deals__tabs-button");
const tabItems = document.querySelectorAll(".item-tabs");

document.addEventListener("click", function(e) {
  const targetElement = e.target;
  let currentActiveIndex = null;
  let newActiveIndex = null;
  if (targetElement.closest(".best-deals__tabs-button")) {
    tabNavItems.forEach((tabNavItem, index) => {
      if (tabNavItem.classList.contains("_active")) {
        currentActiveIndex = index;
        tabNavItem.classList.remove("_active");
      }
      if (tabNavItem === targetElement) {
        newActiveIndex = index;
      }
      
    });
    targetElement.classList.add("_active");
    tabItems[currentActiveIndex].classList.remove("_active");
    tabItems[newActiveIndex].classList.add("_active");
  }
});