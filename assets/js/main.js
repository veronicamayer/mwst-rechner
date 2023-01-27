// Variablen 
const betragInput = document.getElementById("betragInput");
const submitForm = document.querySelector("form");
const ergebnisDiv = document.getElementById("ergebnis");
let price, vat, betrag;


//Trigger 
submitForm.addEventListener("submit", calculatePrice); // triggert anschließend auch currencyConverter
betragInput.addEventListener("keyup", getBetrag); 

//Funktionen
function getBetrag() {
    betrag = document.getElementById("betragInput").value.replace(",", ".");
    console.log("Aktueller Betrag: " + betrag);
}

// 1. Steuern berechnen
function calculatePrice() {
    const nettoBrutto = document.getElementById('aufschlagen').checked;
    const steuersatz = parseFloat(document.querySelector('input[name="steuersatz"]:checked').value);

    switch (nettoBrutto) {
        case true:
            console.log("============ Berechnung netto zu brutto (aufschlagen) gestartet mit einem aktuellen Betrag von: " + betrag + " und einem Steuersatz von: " + steuersatz);
            
            price = parseInt(betrag) + betrag * (steuersatz / 100);
            vat = (betrag * (steuersatz / 100));   
            document.getElementById('labelEndpreis').innerHTML = "Bruttobetrag (Endpreis)";
            
            console.log("Ergebnis: Steuerbetrag = " + vat + " Bruttobetrag = " + price);
            
            currencyConverter(price, vat);
            return;

        case false:
            console.log("============ Berechnung brutto zu netto (abziehen) gestartet mit einem aktuellen Betrag von: " + betrag + " und einem Steuersatz von: " + steuersatz);
            
            price = betrag / (1 + (steuersatz / 100));
            vat = betrag - (betrag / (1 + (steuersatz / 100)));
            document.getElementById('labelEndpreis').innerHTML = "Nettobetrag";    

            console.log("Ergebnis: Steuerbetrag = " + vat + " Nettobetrag = " + price);

            currencyConverter(price, vat); 
    };
};

// 2. Zahlen in Währung formatieren 
function currencyConverter(price, vat) {
    // Pattern das unten für verschiedene Variablen verwendet werden kann
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    });

    // Fomatiert den Wert im Eingabefeld
    let betragValue = formatter.format(betrag);
    betragInput.value = betragValue;
    console.log("Eingabefeld formatiert: " + betragValue);

    // Fomatiert die Werte im Ergebnisbereich und gibt sie im HTML aus
    vat = formatter.format(vat);
    price = formatter.format(price);

    document.getElementById('endsteuer').innerHTML = vat;  
    document.getElementById('endpreis').innerHTML = price;
    console.log("Ergebnisbereich formatiert: " + vat + " und " + price);

    ergebnisDiv.style.display = "block";
};

