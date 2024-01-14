fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const galleryElement = document.getElementById('gallery');
    const filterForm = document.getElementById('filterForm');

    function updateGallery(selectedCategoryId) {
      console.log("Selected Category ID:", selectedCategoryId);

      galleryElement.innerHTML = ''; // Supprimer tous les éléments de la galerie

      data.forEach(work => {
        const categoryId = work.category.id;

        if (
          selectedCategoryId === 'tous' ||
          selectedCategoryId === 'objets' && categoryId === 1 ||
          selectedCategoryId === 'appartements' && categoryId === 2 ||
          selectedCategoryId === 'hotels-restaurants' && categoryId === 3
        ) {
          const figureElement = document.createElement('figure');
          figureElement.setAttribute('data-category-id', categoryId);

          const imgElement = document.createElement('img');
          imgElement.src = work.imageUrl;
          imgElement.alt = work.title;

          const figcaptionElement = document.createElement('figcaption');
          figcaptionElement.textContent = work.title;

          figureElement.appendChild(imgElement);
          figureElement.appendChild(figcaptionElement);

          galleryElement.appendChild(figureElement);
        }
      });

      console.log("Gallery updated with:", galleryElement.innerHTML);
    }

    function handleCategoryClick(event) {
      const categoryElements = filterForm.querySelectorAll('h2');
      categoryElements.forEach(element => {
        element.classList.remove('selected');
      });

      const clickedElement = event.target;
      clickedElement.classList.add('selected');

      const selectedCategoryId = clickedElement.getAttribute('data-category');
      console.log("Clicked Category:", selectedCategoryId);
      updateGallery(selectedCategoryId);
    }

    const categoryElements = filterForm.querySelectorAll('h2');
    categoryElements.forEach(element => {
      element.addEventListener('click', handleCategoryClick);
    });

    updateGallery('tous'); // Afficher tous les éléments par défaut
  })
  .catch(error => {
    console.error(error);
  });


  document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const modifierButton = document.getElementById('modifier-button');
    const modifierButtonmain = document.getElementById('modifier-button_main');
    const loginLink = document.querySelector('nav ul li:nth-child(3)');
    const logoutLink = document.querySelector('nav ul li:nth-child(4)');
    const editorDiv = document.getElementById('editor'); // Sélectionnez la div de l'éditeur
    const header = document.querySelector('header');

    if (token) {
        // L'utilisateur est connecté, afficher le bouton "modifier" et masquer le lien de connexion
        modifierButton.style.display = 'block';
        modifierButtonmain.style.display = 'block';
        loginLink.style.display = 'none';
        logoutLink.style.display = 'block';
        editorDiv.style.display = 'flex'; // Afficher la div de l'éditeur
        header.style.marginTop = '8%';
    } else {
        // L'utilisateur n'est pas connecté, masquer le bouton "modifier" et afficher le lien de connexion
        modifierButton.style.display = 'none';
        modifierButtonmain.style.display = 'none';
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';
        editorDiv.style.display = 'none'; // Masquer la div de l'éditeur
        header.style.marginTop = '0';
    }

    logoutLink.addEventListener('click', function() {
      logout(); // Appel de la fonction de déconnexion lorsque le lien "logout" est cliqué
  });

});


function logout() {
  // Supprimer le token du local storage
  localStorage.removeItem('token');
  
  // Rediriger l'utilisateur vers la page de connexion (ou une autre page appropriée)
  window.location.href = 'login.html'; // Remplacez par l'URL de votre page de connexion
}