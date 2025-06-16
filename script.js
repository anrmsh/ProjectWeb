
const toggleButton = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');

toggleButton.addEventListener('click', (event) => {
  event.stopPropagation(); // Остановить всплытие события
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Закрыть меню при клике вне его
window.addEventListener('click', (event) => {
  if (!toggleButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.style.display = 'none';
  }
});






document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const slideItems = document.querySelectorAll('.slides li');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  let currentIndex = 0;

  function showSlide(index) {
    const totalSlides = slideItems.length;

  
    if (index >= totalSlides) {
      currentIndex = 0; 
    } else if (index < 0) {
      currentIndex = totalSlides - 1; 
    } else {
      currentIndex = index; 
    }

    const offset = -currentIndex * 100; 
    slides.style.transform = `translateX(${offset}%)`;
  }

  prevButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  nextButton.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });


  showSlide(0);
});

