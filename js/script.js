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


// Rating 


const ratings = document.querySelectorAll(".rating");

if (ratings.length > 0) {
  initRatings();
}


  // Main function
function initRatings() {
  let ratingActive, ratingValue;
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }

  // init specific rating
  function initRating(rating) {
    initRatingVars(rating);

    setRatingActiveWidth();

    if (rating.classList.contains("rating_set")) {
      setRating(rating);
    }
  }

  // init rating vars
  function initRatingVars(rating) {
    ratingActive = rating.querySelector(".rating__active");
    ratingValue = rating.querySelector(".rating__value");
  }

  // change width active star
  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  // ability to rate
  function setRating(rating) {
    const ratingItems = rating.querySelectorAll(".rating__item");
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener("mouseenter", function (e) {
        // update vars
        initRatingVars(rating);
        // update active stars
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", function (e) {
        // Update active stars
        setRatingActiveWidth();
      });
      ratingItem.addEventListener("click", function (e) {
        // update vars
        initRatingVars(rating);

        if (rating.dataset.ajax) {
          // send to server
          setRatingValue(ratingItem.value, rating);
        } else {
          // show current rating 
          ratingValue.innerHTML = index + 1;
          setRatingActiveWidth();
        }
      })
    }
  }

  async function setRatingValue(value, rating) {
    console.log(rating.classList.contains("rating_sending"));
    if (!rating.classList.contains("rating_sending")) {
      rating.classList.add("rating_sending");

      // sending data (value) to the server
      let response = await fetch("rating.json", {
        method: "GET",

        // body: JSON.stringify({
        //   userRating: value,
        // }),
        // headers: {
        //   "content-type: "application/json"
        // }
      });
      if (response.ok) {
        const result = await response.json();

        //getting new rating
        const newRating = result.newRating;

        //Showing new avg rating result
        ratingValue.innerHTML = newRating;
        
        //Updating active stars
        setRatingActiveWidth();

        // rating.classList.remove("rating_sending");
      }  else {
        alert("Error");

        rating.classList.remove("rating_sending");
      }
    }
  }

}