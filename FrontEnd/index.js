let works = null;

async function fetchAndDisplayWorks(url, category) {
  try {
    let worksFiltered = null;
    const response = await fetch(url);
    works = await response.json();

    // console.log(works);
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    //filtre les projets en fonction de la catégorie sélectionnée.Mieux par ID
    if (category) {
      worksFiltered = works.filter((el) => el.category.id === category);
    } else {
      worksFiltered = works
    }
    //La boucle for parcourt chaque projet filtré pour les afficher dans la galerie.

    for (const work of worksFiltered) {
      const newFigureElement = document.createElement('figure');

      const image = document.createElement('img');
      image.src = work.imageUrl;
      image.alt = work.title;

      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.innerText = work.title;


      newFigureElement.appendChild(image);
      newFigureElement.appendChild(figcaptionElement);

      gallery.appendChild(newFigureElement);
    }

  } catch (error) {
    console.error("Error fetching works:", error);
  }
}


async function addButtonFilter() {
  const filtreContainer = document.getElementById("category-filters");
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  const newButtonTous = document.createElement('button');
  newButtonTous.innerText = 'Tous';
  filtreContainer.appendChild(newButtonTous);
  newButtonTous.addEventListener("click", (e) => {
    fetchAndDisplayWorks("http://localhost:5678/api/works");
  });


  categories.forEach(category => {
    const newButton = document.createElement('button');
    newButton.innerText = category.name;
    filtreContainer.appendChild(newButton);
    newButton.addEventListener("click", (e) => {
      fetchAndDisplayWorks("http://localhost:5678/api/works", category.id);
    });


  });

}


addButtonFilter();
fetchAndDisplayWorks("http://localhost:5678/api/works");





