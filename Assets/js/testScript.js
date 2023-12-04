/* Door Marcel Bos ITC deeltijd leerjaar 3

Testfunctie om het spel te testen, is even uitgezet in de code */
function testgewonnen() {

    for (var i = 0; i < kaarten.length; i++) {
        kaarten[i].classList.remove('gesloten');
        kaarten[i].classList.add('gevonden');


    }
    ControleSpeelbordvol()

}

//Automatische test met Computer speler:
function flipKaartpc(Kaart) {


    achterkant = Kaart.querySelector('#achterkant');
    voorkant = Kaart.querySelector('#voorkant');

    if (Kaart.classList.contains('open') || (Kaart.classList.contains('gevonden'))) {
        console.log("Kaart is al geopend of gevonden, ik doe niks");
    }
    else {
        //als leegmaken op 1 staat dan de twee (alle kaarten) weer terugdraaien.
        if (leegmaken == 1) {
            for (var i = 0; i < kaarten.length; i++) {

                if (kaarten[i].classList.contains('open')) {

                    kaartenAchterkant[i].style.display = 'none';
                    kaarten[i].classList.remove('open');
                    kaarten[i].classList.add('gesloten');
                    kaartenVoorkant[i].style.display = 'block';

                }
            }
            leegmaken = 0; // Weer naar 0 zetten, anders voert hij nogmaals de if uit bij het draaien.
        }
        achterkant.style.display = 'block';
        Kaart.classList.add('flip');
        Kaart.classList.remove('gesloten');
        Kaart.classList.add('open');
        setTimeout(unflip, 50);
        voorkant.style.display = 'none';

        const huidigeLetter = achterkant.innerHTML;
        // console.log("huidige letter is:" + huidigeLetter);
        // console.log("vorige letter is:" + vorigeLetter);
        // console.log("Tot nu toe: "+ paren);
        // console.log("twee kaarten blauw?" + leegmaken);

        //onderstaande nog aanpassen naar vorige letter string.
        // if (paren.includes(huidigeLetter)) {
        if (huidigeLetter === vorigeLetter) {
            console.log('yes ' + huidigeLetter);
            Kaart.classList.remove('open');
            Kaart.classList.add('gevonden');
            //andere opzoeken die zelfde letter heeft en die dan op gevonden zetten.
            for (var i = 0; i < kaarten.length; i++) {

                if (kaartenAchterkant[i].innerHTML == huidigeLetter) {

                    kaarten[i].classList.remove('open');
                    kaarten[i].classList.add('gevonden');
                    kaartenAchterkant[i].style.display = 'block';

                }

            }
            //nu even controleren of het speelbord al vol is en anders weer verder
            ControleSpeelbordvol();

        }
        else {
            //als er twee blauw zijn deze weer sluiten met leegmaken bool na klikken op nieuwe kaart
            var count = 0;
            //console.log("hallo ik ben erdd");
            for (var i = 0; i < kaarten.length; i++) {

                if (kaarten[i].classList.contains('open')) {
                    count++;
                    //console.log("hallo ik ben er" +count);
                }
                if (count == 2) {
                    leegmaken = 1;
                    break;
                }

            }



        }

        vorigeLetter = huidigeLetter;
        paren.push(huidigeLetter);

    }
}

function computerMove() {

    var geslotenKaarten = Array.from(document.querySelectorAll('.Kaart.gesloten:not(.gevonden)'));
    var randomIndex = Math.floor(Math.random() * geslotenKaarten.length);
    var randomKaart = geslotenKaarten[randomIndex];
    flipKaartpc(randomKaart);

}

function simulatieComputerMoves() {
    var interval = setInterval(function () {
        if (ControleSpeelbordvol()) {
            clearInterval(interval);
        } else {
            computerMove();
        }
    }, 100);
}

async function StartTestGame() {
    verwijderInstellingen();
    // test opties
    await Voegplaatjetoe(kattenUrl);

    document.getElementById('test').innerHTML = "Stop test";
    document.getElementById('start').style.display = "none";
    document.getElementById('test').removeEventListener('click', function () {
        StartTestGame();
    });
    document.getElementById('test').addEventListener('click', () => {
        location.reload(true);
    });


    Maakklikactie();

    simulatieComputerMoves();

}

// Testen even uitgezet

  // Roep de functies aan bij het starten van het spel en verander de tekst en kleur van de knop
//document.getElementById('test').addEventListener('click', function() {
//  StartTestGame();
//});