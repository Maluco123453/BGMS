document.addEventListener("DOMContentLoaded", function () {

    const botaoNovoJogo = document.querySelector(".botão1");

    if (botaoNovoJogo) {
        botaoNovoJogo.addEventListener("click", function () {
            window.location.href = "novo-jogo.html";
        });
    }

    const times = document.querySelectorAll(".time");

    times.forEach(function (time) {
        time.addEventListener("click", function () {

            times.forEach(function (outroTime) {
                outroTime.classList.remove("selecionado");
            });

            time.classList.add("selecionado");

            localStorage.setItem(
                "timeSelecionado",
                time.dataset.time
            );
        });
    });

    const botaoComecar = document.querySelector(".começar-jogo");

    if (botaoComecar) {
        botaoComecar.addEventListener("click", function () {

            const timeSelecionado =
                localStorage.getItem("timeSelecionado");

            const campoAno =
                document.getElementById("ano-inicio");

            const ano = campoAno ? campoAno.value : "";

            if (!timeSelecionado) {
                alert("Escolha um time primeiro.");
                return;
            }

            if (!ano || Number(ano) < 2000) {
                alert("Escolha um ano válido.");
                return;
            }

            criarJogo(timeSelecionado, Number(ano));

            window.location.href = "menu-jogo.html";
        });
    }

    carregarMenuJogo();
    carregarElenco();
    carregarCalendario();
    carregarLiga();

    const botoesMenu = document.querySelectorAll(".menu-item");

    botoesMenu.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const pagina = botao.dataset.pagina;

            if (pagina === "inicio") {
                window.location.href = "menu-jogo.html";
            }

            if (pagina === "elenco") {
                // Limpa qualquer time de terceiros que estava sendo
                // visualizado, pra sempre abrir o elenco do próprio
                // time do jogador quando vem pelo menu de baixo.
                localStorage.removeItem("timeVisualizado");
                window.location.href = "elenco.html";
            }

            if (pagina === "jogos") {
                window.location.href = "calendario.html";
            }

            if (pagina === "liga") {
                window.location.href = "liga.html";
            }

            if (pagina === "mais") {
                window.location.href = "configuracoes.html";
            }

        });

    });

    const salvarConfig =
        document.getElementById("salvar-config");

    if (salvarConfig) {
        salvarConfig.addEventListener("click", function () {

            const dificuldade =
                document.getElementById("dificuldade");

            const lesoes =
                document.getElementById("lesoes");

            const trade =
                document.getElementById("trade");

            if (dificuldade) {
                localStorage.setItem(
                    "dificuldade",
                    dificuldade.value
                );
            }

            if (lesoes) {
                localStorage.setItem(
                    "lesoes",
                    lesoes.value
                );
            }

            if (trade) {
                localStorage.setItem(
                    "trade",
                    trade.value
                );
            }

            alert("Configurações salvas.");
        });
    }

    const pular1 = document.getElementById("pular-1");
    const pular7 = document.getElementById("pular-7");
    const pularDeadline =
        document.getElementById("pular-deadline");
    const pularAllStar =
        document.getElementById("pular-allstar");
    const pularFim =
        document.getElementById("pular-fim");

    if (pular1) {
        pular1.addEventListener("click", function () {
            avancarDias(1);
        });
    }

    if (pular7) {
        pular7.addEventListener("click", function () {
            avancarDias(7);
        });
    }

    if (pularDeadline) {
        pularDeadline.addEventListener("click", function () {
            pularPara(60);
        });
    }

    if (pularAllStar) {
        pularAllStar.addEventListener("click", function () {
            pularPara(90);
        });
    }

    if (pularFim) {
        pularFim.addEventListener("click", function () {
            pularPara(180);
        });
    }

});


const nomesPorNacionalidade = {

    USA: [
        "James Carter",
        "Michael Brooks",
        "Anthony Johnson",
        "Marcus Williams",
        "Daniel Harris",
        "Chris Anderson",
        "Jordan Miller",
        "Kevin Thomas",
        "Ryan Jackson",
        "Jason Wilson",
        "Tyler Harris",
        "Brandon Martin",
        "Cameron White",
        "Derrick Thompson",
        "Justin Moore",
        "Malcolm Davis",
        "Isaiah Brown",
        "Jalen Robinson",
        "Devin Scott",
        "Caleb Walker",
        "Trevor Adams",
        "Darius Mitchell",
        "Jayden Turner",
        "Andre Washington",
        "Miles Richardson",
        "Damian Clark",
        "Terrence Lewis",
        "Kendrick Moore",
        "Jaylen Cooper",
        "Dylan Foster",
        "Marcus Reed",
        "Jamal Washington",
        "Chris Porter",
        "Isaac Coleman",
        "Malik Johnson",
        "Derrick Evans",
        "Aaron Mitchell",
        "Cameron Jackson",
        "DeAndre Williams",
        "Quentin Brown"
    ],

    CAN: [
        "Liam Bennett",
        "Ethan Campbell",
        "Noah Mitchell",
        "Lucas Anderson",
        "Owen Parker",
        "Mason Thompson",
        "Logan Wright",
        "Carter Wilson",
        "Jack Morrison",
        "Nathan Brooks",
        "Connor Davis",
        "Ryan Campbell",
        "Cole Bennett",
        "Brayden Scott",
        "Matthew Clarke",
        "Jacob Turner",
        "Hudson Martin",
        "Tyler McKenzie"
    ],

    FRA: [
        "Lucas Martin",
        "Hugo Bernard",
        "Louis Dubois",
        "Arthur Moreau",
        "Gabriel Laurent",
        "Mathis Leroy",
        "Theo Fontaine",
        "Jules Rousseau",
        "Antoine Mercier",
        "Maxime Blanc",
        "Adrien Girard",
        "Baptiste Fournier",
        "Pierre Dupont",
        "Nathan Lefevre",
        "Romain Chevalier"
    ],

    ESP: [
        "Alejandro Garcia",
        "Carlos Martinez",
        "Javier Lopez",
        "Daniel Fernandez",
        "Miguel Sanchez",
        "Pablo Torres",
        "Diego Navarro",
        "Sergio Romero",
        "Adrian Castillo",
        "Hector Ramos",
        "Alvaro Ruiz",
        "Jorge Morales",
        "Mario Ortega",
        "Raul Jimenez",
        "Ivan Herrera"
    ],

    BRA: [
        "Joao Silva",
        "Lucas Santos",
        "Gabriel Oliveira",
        "Matheus Costa",
        "Pedro Almeida",
        "Rafael Souza",
        "Gustavo Pereira",
        "Felipe Rodrigues",
        "Bruno Carvalho",
        "Andre Lima",
        "Vinicius Barbosa",
        "Caio Ferreira",
        "Thiago Martins",
        "Leonardo Alves",
        "Arthur Mendes"
    ],

    ARG: [
        "Mateo Gonzalez",
        "Santiago Rodriguez",
        "Thiago Fernandez",
        "Tomas Martinez",
        "Nicolas Lopez",
        "Franco Diaz",
        "Agustin Romero",
        "Facundo Perez",
        "Lautaro Silva",
        "Valentin Castro",
        "Martin Acosta",
        "Emiliano Torres"
    ],

    SRB: [
        "Nikola Petrovic",
        "Marko Jovanovic",
        "Luka Milic",
        "Stefan Nikolic",
        "Milan Stojanovic",
        "Dusan Markovic",
        "Vuk Radovic",
        "Filip Pavlovic",
        "Aleksa Ilic",
        "Bogdan Kovacevic"
    ],

    AUS: [
        "Jack Williams",
        "Lachlan Smith",
        "Cooper Jones",
        "Oliver Brown",
        "Noah Wilson",
        "Liam Taylor",
        "Ethan Walker",
        "Mason Clarke",
        "Harry Mitchell",
        "Callum Davis",
        "Ben Anderson"
    ],

    GER: [
        "Lukas Schmidt",
        "Leon Muller",
        "Felix Weber",
        "Jonas Wagner",
        "Max Fischer",
        "Paul Becker",
        "Niklas Hoffmann",
        "Julian Keller",
        "Tim Schneider",
        "Moritz Bauer"
    ],

    ITA: [
        "Lorenzo Rossi",
        "Marco Romano",
        "Matteo Conti",
        "Andrea Ricci",
        "Alessandro Moretti",
        "Luca Ferrari",
        "Davide Esposito",
        "Francesco Marino",
        "Giovanni Rizzo",
        "Simone Gallo"
    ],

    LTU: [
        "Jonas Kazlauskas",
        "Mantas Petrauskas",
        "Domantas Jankauskas",
        "Tomas Valaitis",
        "Lukas Sabonis",
        "Arnas Vaitkus",
        "Dovydas Stankevicius",
        "Rokas Butkus",
        "Karolis Zukauskas"
    ],

    NGA: [
        "Chinedu Okafor",
        "Emeka Nwosu",
        "Kelechi Obi",
        "Chukwudi Eze",
        "Ifeanyi Okoro",
        "Obinna Nnamani",
        "Amadi Uche",
        "Chukwuemeka Ibe",
        "Nnamdi Eze",
        "Oluwaseun Adeyemi"
    ]
};


function escolherNacionalidade() {

    const paises = [
        "USA",
        "USA",
        "USA",
        "USA",
        "USA",
        "USA",
        "USA",
        "USA",
        "USA",
        "USA",
        "CAN",
        "CAN",
        "FRA",
        "ESP",
        "BRA",
        "ARG",
        "SRB",
        "AUS",
        "GER",
        "ITA",
        "LTU",
        "NGA"
    ];

    return paises[
        Math.floor(Math.random() * paises.length)
    ];
}


function criarJogo(time, ano) {

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

    // Gera o elenco de TODOS os 30 times (não só o do jogador), para
    // que o OVR médio de cada time possa influenciar o resultado dos
    // jogos simulados.
    const elencos = {};

    times.forEach(function (nomeTime) {
        elencos[nomeTime] = gerarElenco();
    });

    const elenco = elencos[time];

    // OVR médio de cada time, calculado uma vez e guardado, para não
    // precisar recalcular a cada jogo simulado.
    const ovrMedios = {};

    times.forEach(function (nomeTime) {
        ovrMedios[nomeTime] = calcularOvrMedio(elencos[nomeTime]);
    });

    // Temporada da liga inteira: todos os 30 times jogam,
    // um jogo por time por dia, 82 dias.
    const temporada = gerarTemporadaLiga(times);

    const classificacao = {};

    times.forEach(function (nomeTime) {
        classificacao[nomeTime] = {
            vitorias: 0,
            derrotas: 0
        };
    });

    const jogo = {
        time: time,
        ano: ano,
        // Começa em 0: o primeiro avancarDias() leva ao dia 1,
        // que é quando o dia 1 do calendário é de fato jogado.
        dia: 0,
        vitorias: 0,
        derrotas: 0,
        elenco: elenco,
        elencos: elencos,
        ovrMedios: ovrMedios,
        temporada: temporada,
        classificacao: classificacao
    };

    salvarJogo(jogo);
}


function gerarElenco() {

    const posicoes = [
        "PG",
        "SG",
        "SF",
        "PF",
        "C"
    ];

    const jogadores = [];
    const nomesUsados = new Set();

    for (let i = 0; i < 15; i++) {

        let nome;
        let nacionalidade;

        do {

            nacionalidade = escolherNacionalidade();

            const nomes =
                nomesPorNacionalidade[nacionalidade];

            nome =
                nomes[
                    Math.floor(
                        Math.random() * nomes.length
                    )
                ];

        } while (nomesUsados.has(nome));

        nomesUsados.add(nome);

        jogadores.push({
            nome: nome,
            ovr: Math.floor(Math.random() * 31) + 60,
            posicao: posicoes[i % 5],
            nacionalidade: nacionalidade
        });
    }

    return jogadores;
}


// Calcula o OVR médio de um elenco (usado pra decidir a força do
// time nas simulações de jogo).
function calcularOvrMedio(elenco) {

    const soma = elenco.reduce(function (acumulado, jogador) {
        return acumulado + jogador.ovr;
    }, 0);

    return soma / elenco.length;
}


// Converte a diferença de OVR entre mandante e visitante numa
// probabilidade de vitória do mandante, no estilo de rating Elo.
// Times parecidos em OVR ficam perto de 50%; quanto maior a
// diferença, maior a chance do time mais forte vencer — mas nunca
// menos de 5% nem mais de 95%, pra sempre deixar espaço pra zebra.
function calcularProbabilidadeCasa(ovrMandante, ovrVisitante) {

    // Pequena vantagem por jogar em casa, equivalente a alguns
    // pontos de OVR.
    const vantagemCasa = 2;

    const diferenca =
        (ovrMandante + vantagemCasa) - ovrVisitante;

    const probabilidade =
        1 / (1 + Math.pow(10, -diferenca / 12));

    return Math.min(0.95, Math.max(0.05, probabilidade));
}


// ------------------------------------------------------------------
// TEMPORADA DA LIGA
//
// Regras:
// - 30 times, 82 dias, sempre em ordem sequencial (dia 1 a 82).
// - Em cada dia, TODOS os 30 times jogam (15 jogos por dia), não só
//   o time do jogador — assim a classificação de todos os times
//   evolui de verdade, jogo a jogo.
// - Cada time termina a temporada com 82 jogos: 41 em casa e 41 fora.
// - Os confrontos usam o "método do círculo" de rodízio, para
//   garantir que cada time enfrente adversários diferentes de forma
//   equilibrada (2 ciclos completos de 29 rodadas + 24 rodadas
//   extras, com mando de campo balanceado dinamicamente).
// ------------------------------------------------------------------

function gerarRodadasRoundRobin(times) {

    const arr = times.slice();
    const n = arr.length;
    const rounds = [];

    const fixo = arr[0];
    let resto = arr.slice(1);

    for (let r = 0; r < n - 1; r++) {

        const atual = [fixo].concat(resto);
        const rodada = [];

        for (let i = 0; i < n / 2; i++) {
            rodada.push({
                home: atual[i],
                away: atual[n - 1 - i]
            });
        }

        rounds.push(rodada);

        // Gira a lista de adversários (mantendo o time fixo parado).
        resto.unshift(resto.pop());
    }

    return rounds;
}


function criarPartidaLiga(mandante, visitante) {

    return {
        mandante: mandante,
        visitante: visitante,
        jogado: false,
        vencedor: null
    };
}


function gerarTemporadaLiga(timesOriginais) {

    const times = embaralhar(timesOriginais);

    // 29 rodadas, cada uma com 15 confrontos (todos os times jogam
    // uma vez por rodada, cada par de times se enfrenta 1 vez no
    // ciclo completo).
    const rounds = gerarRodadasRoundRobin(times);

    const contadorCasa = {};

    times.forEach(function (t) {
        contadorCasa[t] = 0;
    });

    const temporada = [];

    // Ciclo 1: 29 dias, mando de campo conforme o rodízio.
    rounds.forEach(function (rodada) {

        const dia = rodada.map(function (confronto) {
            contadorCasa[confronto.home]++;
            return criarPartidaLiga(confronto.home, confronto.away);
        });

        temporada.push(dia);
    });

    // Ciclo 2: mais 29 dias, espelhando o mando de campo do ciclo 1
    // (quem jogou em casa agora joga fora, e vice-versa). Ao final
    // dos dois ciclos, cada time tem exatamente 29 jogos em casa e
    // 29 fora, contra todos os outros 29 times, duas vezes.
    rounds.forEach(function (rodada) {

        const dia = rodada.map(function (confronto) {
            contadorCasa[confronto.away]++;
            return criarPartidaLiga(confronto.away, confronto.home);
        });

        temporada.push(dia);
    });

    // Ciclo 3: 24 dias extras (29 + 29 + 24 = 82), reaproveitando as
    // 24 primeiras rodadas do rodízio. Aqui o mando de campo é
    // decidido dinamicamente: quem tiver menos jogos em casa até o
    // momento joga em casa, para fechar a temporada em 41 em casa e
    // 41 fora para cada time.
    for (let r = 0; r < 24; r++) {

        const rodada = rounds[r];

        const dia = rodada.map(function (confronto) {

            let mandante;
            let visitante;

            if (contadorCasa[confronto.home] <= contadorCasa[confronto.away]) {
                mandante = confronto.home;
                visitante = confronto.away;
            } else {
                mandante = confronto.away;
                visitante = confronto.home;
            }

            contadorCasa[mandante]++;

            return criarPartidaLiga(mandante, visitante);
        });

        temporada.push(dia);
    }

    // Ajuste fino: o ciclo 3 aproxima o mando de campo de 41/41, mas
    // pode deixar alguns times com 39, 40, 42 ou 43 jogos em casa.
    // Aqui trocamos o mando de campo em jogos específicos (sem mexer
    // em quem joga contra quem, nem em qual dia) até todo time
    // fechar a temporada com exatamente 41 em casa e 41 fora.
    let ajustou = true;
    let tentativas = 0;

    while (ajustou && tentativas < 2000) {

        ajustou = false;
        tentativas++;

        temporada.forEach(function (dia) {
            dia.forEach(function (partida) {

                const casaMandante = contadorCasa[partida.mandante];
                const casaVisitante = contadorCasa[partida.visitante];

                if (casaMandante > 41 && casaVisitante < 41) {

                    const temp = partida.mandante;
                    partida.mandante = partida.visitante;
                    partida.visitante = temp;

                    contadorCasa[partida.mandante]++;
                    contadorCasa[partida.visitante]--;

                    ajustou = true;
                }
            });
        });
    }

    // temporada.length === 82 (29 + 29 + 24), dias em ordem 1..82.
    return temporada;
}


// Extrai, a partir da temporada completa da liga, só os jogos do
// time do jogador — na ordem dos dias, com resultado já resolvido.
function obterCalendarioTime(jogo) {

    const lista = [];

    jogo.temporada.forEach(function (jogosDoDia, indice) {

        const dia = indice + 1;

        const partida = jogosDoDia.find(function (p) {
            return (
                p.mandante === jogo.time ||
                p.visitante === jogo.time
            );
        });

        if (!partida) {
            return;
        }

        const casa = partida.mandante === jogo.time;
        const adversario = casa ? partida.visitante : partida.mandante;

        let resultado = null;

        if (partida.jogado) {
            resultado =
                partida.vencedor === jogo.time ? "W" : "L";
        }

        lista.push({
            dia: dia,
            adversario: adversario,
            casa: casa,
            jogado: partida.jogado,
            resultado: resultado
        });
    });

    return lista;
}


function embaralhar(array) {

    const novoArray = [...array];

    for (let i = novoArray.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        const temp = novoArray[i];

        novoArray[i] = novoArray[j];
        novoArray[j] = temp;
    }

    return novoArray;
}


function obterJogo() {

    const dados = localStorage.getItem("bgmsJogo");

    if (!dados) {
        return null;
    }

  
  return JSON.parse(dados);
}


function salvarJogo(jogo) {

    localStorage.setItem(
        "bgmsJogo",
        JSON.stringify(jogo)
    );
}


function avancarDias(dias) {

    const jogo = obterJogo();

    if (!jogo) {
        return;
    }

    if (!jogo.classificacao) {
        criarClassificacao(jogo);
    }

    for (let i = 0; i < dias; i++) {

        if (jogo.dia >= 180) {
            break;
        }

        jogo.dia++;

        // Só existem jogos programados nos dias 1 a 82 da temporada.
        if (jogo.dia < 1 || jogo.dia > 82) {
            continue;
        }

        const jogosDoDia = jogo.temporada[jogo.dia - 1];

        jogosDoDia.forEach(function (partida) {

            if (partida.jogado) {
                return;
            }

            partida.jogado = true;

            const ovrMandante =
                (jogo.ovrMedios && jogo.ovrMedios[partida.mandante]) || 75;

            const ovrVisitante =
                (jogo.ovrMedios && jogo.ovrMedios[partida.visitante]) || 75;

            const probabilidadeCasa =
                calcularProbabilidadeCasa(ovrMandante, ovrVisitante);

            const venceuMandante =
                Math.random() < probabilidadeCasa;

            partida.vencedor =
                venceuMandante ? partida.mandante : partida.visitante;

            if (!jogo.classificacao[partida.mandante]) {
                jogo.classificacao[partida.mandante] = {
                    vitorias: 0,
                    derrotas: 0
                };
            }

            if (!jogo.classificacao[partida.visitante]) {
                jogo.classificacao[partida.visitante] = {
                    vitorias: 0,
                    derrotas: 0
                };
            }

            if (venceuMandante) {
                jogo.classificacao[partida.mandante].vitorias++;
                jogo.classificacao[partida.visitante].derrotas++;
            } else {
                jogo.classificacao[partida.visitante].vitorias++;
                jogo.classificacao[partida.mandante].derrotas++;
            }

            // Se o time do jogador estava nesse confronto, atualiza
            // também o recorde exibido no menu do jogo.
            if (partida.mandante === jogo.time || partida.visitante === jogo.time) {

                const jogadorEraMandante =
                    partida.mandante === jogo.time;

                const jogadorVenceu =
                    jogadorEraMandante ? venceuMandante : !venceuMandante;

                if (jogadorVenceu) {
                    jogo.vitorias++;
                } else {
                    jogo.derrotas++;
                }
            }

        });

    }

    salvarJogo(jogo);

    carregarCalendario();
    carregarMenuJogo();
    carregarLiga();
}


function pularPara(dia) {

    const jogo = obterJogo();

    if (!jogo) {
        return;
    }

    if (dia <= jogo.dia) {
        return;
    }

    avancarDias(dia - jogo.dia);
}


function criarClassificacao(jogo) {

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

    jogo.classificacao = {};

    times.forEach(function (time) {

        jogo.classificacao[time] = {
            vitorias: 0,
            derrotas: 0
        };

    });
}


function carregarMenuJogo() {

    const jogo = obterJogo();

    if (!jogo) {
        return;
    }

    const nome =
        document.getElementById("nome-time");

    const nomePainel =
        document.getElementById("nome-time-painel");

    const logo =
        document.getElementById("logo-time");

    const ano =
        document.getElementById("ano-time");

    const record =
        document.getElementById("record");

    const proximo =
        document.getElementById("time-adversario");

    const casa =
        document.getElementById("time-casa");

    const info =
        document.getElementById("info-proximo-jogo");

    if (nome) {
        nome.textContent = jogo.time;
    }

    if (nomePainel) {
        nomePainel.textContent = jogo.time;
    }

    if (logo) {
        logo.textContent =
            jogo.time.charAt(0);
    }

    if (ano) {
        ano.textContent = jogo.ano;
    }

    if (record) {
        record.textContent =
            jogo.vitorias + " - " + jogo.derrotas;
    }

    if (casa) {
        casa.textContent = jogo.time;
    }

    const calendarioTime = obterCalendarioTime(jogo);

    const proximoJogo =
        calendarioTime.find(function (partida) {
            return !partida.jogado;
        });

    if (proximoJogo) {

        if (proximo) {
            proximo.textContent =
                proximoJogo.adversario;
        }

        if (info) {
            info.textContent =
                "Dia " + proximoJogo.dia;
        }

    } else {

        if (proximo) {
            proximo.textContent = "-";
        }

        if (info) {
            info.textContent =
                "Temporada encerrada";
        }
    }
}


function carregarElenco() {

    const lista =
        document.getElementById("lista-jogadores");

    if (!lista) {
        return;
    }

    const jogo = obterJogo();

    if (!jogo) {
        return;
    }

    // Se algum time foi clicado na tabela da liga, mostra o elenco
    // dele. Caso contrário, mostra o elenco do próprio time do
    // jogador (comportamento padrão de antes).
    const timeVisualizado =
        localStorage.getItem("timeVisualizado");

    const nomeTime = timeVisualizado || jogo.time;

    const ehTimeDoJogador = nomeTime === jogo.time;

    const elenco =
        ehTimeDoJogador
            ? jogo.elenco
            : (jogo.elencos ? jogo.elencos[nomeTime] : null);

    const titulo =
        document.getElementById("elenco-time");

    if (titulo) {
        titulo.textContent = nomeTime;
    }

    lista.innerHTML = "";

    if (!elenco) {

        lista.innerHTML =
            '<p>Elenco não disponível para esse time.</p>';

        return;
    }

    elenco.forEach(function (jogador) {

        const div =
            document.createElement("div");

        div.className = "jogador";

        div.innerHTML =
            '<div class="jogador-logo">' +
            jogador.nome.charAt(0) +
            '</div>' +
            '<div class="jogador-dados">' +
            '<span class="jogador-nome">' +
            jogador.nome +
            '</span>' +
            '<span class="jogador-posicao">' +
            jogador.posicao +
            '</span>' +
            '</div>' +
            '<div class="jogador-ovr">' +
            jogador.ovr +
            '</div>';

        lista.appendChild(div);

    });
}


function carregarCalendario() {

    const lista =
        document.getElementById("lista-calendario");

    if (!lista) {
        return;
    }

    const jogo = obterJogo();

    if (!jogo) {
        return;
    }

    lista.innerHTML = "";

    const calendarioTime = obterCalendarioTime(jogo);

    calendarioTime.forEach(function (partida) {

        const div =
            document.createElement("div");

        div.className = "jogo-calendario";

        const resultado =
            partida.jogado
                ? partida.resultado
                : "-";

        div.innerHTML =
            '<div class="data">Dia ' +
            partida.dia +
            '</div>' +
            '<div class="adversario">' +
            (partida.casa
                ? "vs. "
                : "@ ") +
            partida.adversario +
            '</div>' +
            '<div class="resultado">' +
            resultado +
            '</div>';

        lista.appendChild(div);

    });
}


function carregarLiga() {

    const leste =
        document.getElementById("liga-leste");

    const oeste =
        document.getElementById("liga-oeste");

    if (!leste || !oeste) {
        return;
    }

    const jogo = obterJogo();

    if (!jogo) {
        return;
    }

    if (!jogo.classificacao) {
        criarClassificacao(jogo);
        salvarJogo(jogo);
    }

    const timesLeste = [
        "Storm",
        "Titans",
        "Dragons",
        "Bulls",
        "Raptors",
        "Eagles",
        "Cobras",
        "Lions",
        "Apaches",
        "Inferno",
        "United",
        "Zephyrs",
        "Outlaws",
        "Rebels",
        "Voyagers"
    ];

    const timesOeste = [
        "Wolves",
        "Knights",
        "Falcons",
        "Hawks",
        "Vipers",
        "Giants",
        "Panthers",
        "Mustangs",
        "Nomads",
        "Jaguars",
        "Yellow Jackets",
        "Quakes",
        "Xtreme",
        "Sharks",
        "Wildcats"
    ];

    leste.innerHTML = "";
    oeste.innerHTML = "";

    criarTabelaLiga(
        timesLeste,
        jogo,
        leste
    );

    criarTabelaLiga(
        timesOeste,
        jogo,
        oeste
    );
}


function criarTabelaLiga(times, jogo, elemento) {

    const classificados = times.map(function (time) {

        const dados =
            jogo.classificacao[time] || {
                vitorias: 0,
                derrotas: 0
            };

        return {
            nome: time,
            vitorias: dados.vitorias,
            derrotas: dados.derrotas
        };

    });

    classificados.sort(function (a, b) {

        if (b.vitorias !== a.vitorias) {
            return b.vitorias - a.vitorias;
        }

        return a.derrotas - b.derrotas;

    });

    classificados.forEach(function (time, index) {

        const div =
            document.createElement("div");

        div.className =
            "classificacao-time";

        div.innerHTML =
            '<span class="posicao">' +
            (index + 1) +
            '</span>' +
            '<span class="nome">' +
            time.nome +
            '</span>' +
            '<span class="vitorias">' +
            time.vitorias +
            '</span>' +
            '<span class="derrotas">' +
            time.derrotas +
            '</span>';

        const nomeSpan =
            div.querySelector(".nome");

        if (nomeSpan) {

            nomeSpan.style.cursor = "pointer";
            nomeSpan.style.textDecoration = "underline";

            nomeSpan.addEventListener("click", function () {

                localStorage.setItem(
                    "timeVisualizado",
                    time.nome
                );

                window.location.href = "elenco.html";
            });
        }

        elemento.appendChild(div);

    });
              }
