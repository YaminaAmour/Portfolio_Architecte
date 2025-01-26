
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".modal-close");
const openBtn = document.getElementById("edit-projets");

openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


//je récupère les projets depuis l'api
async function fetchProjets() {
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des projets");
        }

        const projets = await response.json();
        return projets;
    } catch (error) {
        console.error("Erreur : ", error);
        return [];
    }
}
//J'affiche les projets dans la modal
function displayProjets(projets) {
    const projectsContainer = document.querySelector(".list-projets");
    projectsContainer.innerHTML = "";

    projets.forEach((projet) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project-item");
        projectElement.innerHTML = `
            <img src="${projet.imageUrl}">
            <button class="delete-btn" data-id="${projet.id}">Supprimer</button>`;
        projectsContainer.appendChild(projectElement);
    });
    // Ajouter les événements pour supprimer
    const deleteButtons = projectsContainer.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            // je supprime un projet grâce à son id
            const projectId = btn.dataset.id;
            await deleteProjet(projectId);
            const updatedProjets = await fetchProjets();
            // Mise à jour de l'affichage des projets
            displayProjets(updatedProjets);
            fetchAndDisplayWorks("http://localhost:5678/api/works");
        });
    });
}

openBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    modal.style.display = "flex";

    const projets = await fetchProjets();
    displayProjets(projets);
});


// Supprime un projet via une requête à l'api
async function deleteProjet(id) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la suppression du projet");
        }

        console.log(`Projet ${id} supprimé avec succès.`);
        const projets = await fetchProjets();
    displayProjets(projets);
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
    }
}
