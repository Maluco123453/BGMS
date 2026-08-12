document.addEventListener("DOMContentLoaded", function() {

    if (document.body.classList.contains("menu-principal")) {

        const botao = document.querySelector(".botão1");

        botao.addEventListener("click", function() {
            window.location.href = "novo-jogo.html";
        });

    }

});
