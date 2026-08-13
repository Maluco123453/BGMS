document.addEventListener("DOMContentLoaded", function () {

    const botaoNovoJogo = document.querySelector(".botão1");

    if (botaoNovoJogo) {
        botaoNovoJogo.addEventListener("click", function () {
            window.location.href = "novo-jogo.html";
        });
    }

    const times = document.querySelectorAll(".time");
    let timeSelecionado = null;

    times.forEach(function (time) {

        time.addEventListener("click", function () {

            times.forEach(function (outroTime) {
                outroTime.classList.remove("selecionado");
            });

            time.classList.add("selecionado");
            timeSelecionado = time.dataset.time;

        });

    });

    const botaoComecar = document.querySelector(".começar-jogo");

    if (botaoComecar) {

        botaoComecar.addEventListener("click", function () {

            if (!timeSelecionado) {
                alert("Escolha um time primeiro!");
                return;
            }

            const ano = document.getElementById("ano-inicio").value;

            localStorage.setItem("timeEscolhido", timeSelecionado);
            localStorage.setItem("anoEscolhido", ano);

            criarCalendario(timeSelecionado, Number(ano));

            window.location.href = "menu-jogo.html";

        });

    }

    carregarMenu();

});


function criarCalendario(timeEscolhido, ano) {

    const times = [
        "Storm",
        "Wolves",
        "Titans",
        "Knights",
        "Dragons",
        "Falcons",
        "Bulls",
        "Hawks",
        "Raptors",
        "Vipers",
        "Eagles",
        "Giants",
        "Cobras",
        "Panthers",
        "Lions",
        "Mustangs",
        "Apaches",
        "Nomads",
        "Inferno",
        "Jaguars",
        "United",
        "Yellow Jackets",
        "Zephyrs",
        "Quakes",
        "Outlaws",
        "Xtreme",
        "Rebels",
        "Sharks",
        "Voyagers",
        "Wildcats"
    ];

    const adversarios = times.filter(function (time) {
        return time !== timeEscolhido;
    });

    for (let i = adversarios.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        const temp = adversarios[i];
        adversarios[i] = adversarios[j];
        adversarios[j] = temp;

    }

    const calendario = [];

    let data = new Date(ano, 9, 1);

    adversarios.forEach(function (adversario, indice) {

        const jogo = {
            numero: indice + 1,
            data: new Date(data),
            casa: Math.random() < 0.5,
            adversario: adversario
        };

        if (jogo.casa) {
            jogo.casaTime = timeEscolhido;
            jogo.foraTime = adversario;
        } else {
            jogo.casaTime = adversario;
            jogo.foraTime = timeEscolhido;
        }

        calendario.push(jogo);

        data.setDate(data.getDate() + Math.floor(Math.random() * 4) + 2);

    });

    localStorage.setItem("calendario", JSON.stringify(calendario));
}


function carregarMenu() {

    if (!document.body.classList.contains("menu-jogo")) {
        return;
    }

    const time = localStorage.getItem("timeEscolhido");
    const ano = localStorage.getItem("anoEscolhido");

    if (!time) {
        return;
    }

    document.getElementById("nome-time").textContent = time;
    document.getElementById("nome-time-painel").textContent = time;
    document.getElementById("time-casa").textContent = time;

    document.getElementById("ano-time").textContent = ano;

    document.getElementById("logo-time").textContent = time.charAt(0);

    const calendario = JSON.parse(localStorage.getItem("calendario"));

    if (calendario && calendario.length > 0) {

        const proximo = calendario[0];

        document.getElementById("time-casa").textContent = proximo.casaTime;
        document.getElementById("time-adversario").textContent = proximo.foraTime;

        const data = new Date(proximo.data);

        document.getElementById("data-jogo").textContent =
            data.getDate() + "/" +
            (data.getMonth() + 1) + "/" +
            data.getFullYear();

    }

}
