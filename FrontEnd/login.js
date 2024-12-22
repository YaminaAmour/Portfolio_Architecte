const loginform = document.querySelector(".login-form");

loginform.addEventListener("submit", async function(e){
    e.preventDefault();

   const loginData = {
    password : e.target.querySelector("#password").value,
    email: e.target.querySelector("#email").value
 };

 try{
    const chargeUtile = JSON.stringify(loginData);
    // Appel de la fonction fetch avec toutes les informations nécessaires
    const response = await fetch("http://localhost:5678/api/users/login", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: chargeUtile
   });
   if(response.ok){
    //j'extrais les données en format json
       const data = await response.json();
    //je stocke le token côté client
       localStorage.setItem("token", data.token);
    //Si c'est ok, je redirige vers la page d'accueil
       window.location.href="index.html";
       }else if(response.status === 404){
       alert("Your username or password is wrong.");
       }

 }
 catch(error){
    console.error("Erreur réseau:", error);
   }


});
