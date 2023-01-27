// Variablen 
const betragInput = document.getElementById("betragInput");
const submitForm = document.querySelector("form");
const ergebnisDiv = document.getElementById("ergebnis");
let price, vat;

//Trigger 
submitForm.addEventListener("change", calculatePrice = () => {
    const nettoBrutto = document.getElementById('aufschlagen').checked;
    const steuersatz = parseFloat(document.querySelector('input[name="steuersatz"]:checked').value);
    const betrag = betragInput.value;

    switch (nettoBrutto) {
        case true:
            console.log("============ Berechnung netto zu brutto (aufschlagen) gestartet mit einem aktuellen Betrag von: " + betrag + " und einem Steuersatz von: " + steuersatz);
            
            price = parseInt(betrag) + betrag * (steuersatz / 100);
            vat = (betrag * (steuersatz / 100));   
            document.getElementById('labelEndpreis').innerHTML = "Bruttobetrag (Endpreis)";
            
            console.log("Ergebnis: Steuerbetrag = " + vat + " Bruttobetrag = " + price);
            
            vat = `${vat.toFixed(2)} €`;
            document.getElementById('endsteuer').innerHTML = vat.replace(".", ",");

            price = `${price.toFixed(2)} €`;
            document.getElementById('endpreis').innerHTML = price.replace(".", ",");

            console.log("Ergebnisbereich formatiert: " + vat + " und " + price);
            return;

        case false:
            console.log("============ Berechnung brutto zu netto (abziehen) gestartet mit einem aktuellen Betrag von: " + betrag + " und einem Steuersatz von: " + steuersatz);
            
            price = betrag / (1 + (steuersatz / 100));
            vat = betrag - (betrag / (1 + (steuersatz / 100)));
            document.getElementById('labelEndpreis').innerHTML = "Nettobetrag";    

            console.log("Ergebnis: Steuerbetrag = " + vat + " Nettobetrag = " + price);

            vat = `${vat.toFixed(2)} €`;
            document.getElementById('endsteuer').innerHTML = vat.replace(".", ",");

            price = `${price.toFixed(2)} €`;
            document.getElementById('endpreis').innerHTML = price.replace(".", ",");

            console.log("Ergebnisbereich formatiert: " + vat + " und " + price);
    }
});

