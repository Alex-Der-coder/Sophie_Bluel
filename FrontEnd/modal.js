function handleCategoryClick(event) {
    // Retirer la classe 'selected' de tous les éléments de filtre
    categoryElements.forEach(element => {
      element.classList.remove('selected');
    });

    // Ajouter la classe 'selected' à l'élément de catégorie cliqué
    const clickedElement = event.target;
    clickedElement.classList.add('selected');

    updateGallery();
  }

document.addEventListener("DOMContentLoaded", function () {
    const galleryElement = document.getElementById('Container_gallery');
    const filterForm = document.getElementById('filterForm');
    const miniGallery = document.getElementById('mini_gallery');
    const modifierButton = document.getElementById('modifier-button'); // The "Modifier" button
    const modal = document.getElementById('myModal');
    const closeButton = document.querySelector('.close');
    let tokenValue = localStorage.getItem('token');

 

    // Fetch and populate the main gallery
    function loadMainGallery() {
        // Fetch and populate the main gallery content here
        // ...
    }

    // Fetch and populate the mini gallery
    function loadMiniGallery() {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                miniGallery.innerHTML = '';

                // Loop through the data retrieved from the API
                data.forEach(work => {
                    const thumbnail = document.createElement('div');
                    thumbnail.classList.add('thumbnail');

                    const imgElement = document.createElement('img');
                    imgElement.src = work.imageUrl;
                    imgElement.alt = work.title;

                    const editLink = document.createElement('button'); // Créer un lien "Éditer"
                    // Créez l'élément img pour l'image SVG
const svgImage = document.createElement('img');

// Définissez l'attribut src avec l'emplacement de votre fichier SVG
svgImage.src = './assets/icons/Delete_item.svg';

// Définissez une description pour l'image (optionnel, mais recommandé pour l'accessibilité)
svgImage.alt = 'Icône de supprimer';

editLink.appendChild(svgImage);

editLink.classList.add('btn_del');

                    editLink.addEventListener('click', () => deletework(work.id)); // Appeler la fonction d'édition au clic
                    thumbnail.appendChild(imgElement);
                    thumbnail.appendChild(editLink); // Ajouter le lien "Éditer" à la div thumbnail
                    miniGallery.appendChild(thumbnail);
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    function deletework(workId) {
        console.log(localStorage.getItem('token'))
        console.log('deletework')
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${tokenValue}`
            }
        })
        .then(response => {
            if (response.ok) {
                console.log(`Work with ID ${workId} has been deleted.`);
                // Mettre à jour la galerie après la suppression réussie
                loadMiniGallery();
            } else {
                console.error(`Failed to delete work with ID ${workId}.`);
                console.log(tokenValue);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    

    // Load the main gallery when the page loads
    loadMainGallery();



    // Add an event listener to the "Modifier" button to show the modal
    modifierButton.addEventListener('click', function () {
        modal.style.display = 'block';
        const addForm = document.getElementById('addPhotoForm');
        loadMiniGallery(); // Load the mini gallery when the modal is shown

    });
       


    // Add an event listener to the close button to hide the modal
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
        loadMainGallery(); // Load the main gallery when the modal is closed
    });

/*
    const closeArrow = document.querySelector('.close_arrow');

    closeArrow.addEventListener('click', () => {
        containerFormPicture.style.display = 'none';
        containerGallery.style.display = 'block'; // ou 'flex', en fonction de votre mise en page
    });
*/
    const modalFonctionSpans = document.querySelectorAll('.modal_fonction');
 
    modalFonctionSpans.forEach(span => {
        span.addEventListener('click', () => {
            containerFormPicture.style.display = 'block';
            containerGallery.style.display = 'none'; // or 'flex', depending on your layout
        });
    });
    
    const addPictureButton = document.getElementById('add-picture-button');

    addPictureButton.addEventListener('click', () => {
        containerFormPicture.style.display = 'block';
        containerGallery.style.display = 'none'; // ou 'flex', en fonction de votre mise en page
    });

    // Add event listeners to filter elements (if needed)
    const categoryElements = filterForm.querySelectorAll('h2');
    categoryElements.forEach(element => {
        element.addEventListener('click', handleCategoryClick);
    });


    
    function showGallery() {
        document.getElementById("Container_form_picture").style.display = "none";
        galleryElement.style.display = "block";
        loadMainGallery(); // Load the main gallery when showing the main content
    }
    document.getElementById("nav-button").addEventListener("click", showGallery);

    const addPhotoButton = document.getElementById('add-picture-button');

    // Gérer l'ouverture/fermeture du modal
    addPhotoButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Chargez la galerie au chargement de la page
    loadMiniGallery();
});

// navigation

document.addEventListener("DOMContentLoaded", function() {
    const modalFonctionSpans = document.querySelectorAll('.modal_fonction');
    const containerFormPicture = document.getElementById('Container_form_picture');
    const containerGallery = document.getElementById('Container_gallery');
    const Modal = document.getElementById('myModal');
    navForm = document.querySelectorAll('.close');


    modalFonctionSpans.forEach(span => {
        span.addEventListener('click', () => {
            containerFormPicture.style.display = 'block';
            containerGallery.style.display = 'none'; // or 'flex', depending on your layout
        });
    });

    navForm.forEach(img => {
        img.addEventListener('click', () => {
            containerFormPicture.style.display = 'none';
            containerGallery.style.display = 'block'; // or 'flex', depending on your layout
        });
    });

    // Close modal functionality
    const closeModalButtons = document.querySelectorAll('.close_modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            Modal.style.display = 'none'; 
        });
    });
});


// formulaire ajout photo


document.addEventListener("DOMContentLoaded", function() {
    const addForm = document.getElementById('addPhotoForm');

    addForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const photoInput = document.getElementById('photo');
        const titleInput = document.getElementById('title');
        const categoryInput = document.getElementById('category');


        const photo = photoInput.files[0];
        const title = titleInput.value;
        let category=0
        if (categoryInput.value=='objets') {
            category=1
        }
        if (categoryInput.value=='appartements') {
            category=2
        }
        if (categoryInput.value=='hotels-restaurants') {
            category=3
        }
        console.log(categoryInput.value)    
        console.log(category)    
            // Vous n'avez pas besoin de convertir ici

        const formData = new FormData();
        formData.append('image', photo);
        formData.append('title', title);
        formData.append('category', category);
    
        console.log(localStorage.getItem('token'))
        console.log('postework')
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (response.ok) {
                console.log(`Image poster`);
                // Mettre à jour la galerie après la suppression réussie
                loadMiniGallery();
            } else {
                console.error(`Failed to post`);
            }
        })
        .catch(error => {
            console.error(error);
        });
    });

    // Autres parties de votre code...
});
