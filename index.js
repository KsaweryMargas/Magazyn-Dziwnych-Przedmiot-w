const readline = require('readline');

// Klasa Item
class Item {
    // Przyjmuje nazwe, wage w kg, poziom dziwności i informację o delikatności
    constructor(name, weightKg, weirdnessLevel, isFragile) 
    {
        this.name = name;
        this.weightKg = parseFloat(weightKg.toFixed(3));
        this.weirdnessLevel = weirdnessLevel;
        this.isFragile = isFragile;
    }

    // Metoda zwraca opis przedmiotów w JSON
    describe()
    {
        return JSON.stringify({
            nazwa: this.name, // Nazwa przedmiotu
            waga_kg: this.weightKg, // Waga w kilogramach
            poziom_dziwności: this.weirdnessLevel, // Poziom dziwności
            czy_delikatny: this.isFragile ? "tak" : "nie" // Informacja o delikatności
        } , null, 4);
    }
}

// Klasa Warehouse
class Warehouse {
    constructor(capacity, maxTotalWeight) {
        this.capacity = capacity; // Maksymalna liczba przedmiotów 
        this.maxTotalWeight = parseFloat(maxTotalWeight.toFixed(3)); // Maksymalna waga całkowita
        this.currentItemCount = 0; // Liczba przedmiotów w magazynie
        this.items = []; // Tablica ktora przechowuje przedmioty
    }
        
      getCurrentWeight() {
        return this.items.reduce((sum, item) => sum + item.weightKg, 0);
    }

    // Metoda dodaje przedmiot do magazynu
    addItem(item) {

        // Sprawdza czy magazyn jest pełny
        if (this.currentItemCount >= this.capacity) {
            return "Magazyn jest pełny, nie można dodać więcej przedmiotów.";
        }

        // Sprawdza czy nie przekroczono makymalnej wagi
        if (this.getCurrentWeight() + item.weightKg > this.maxTotalWeight) {
            return "Przekroczono maksymalną wagę magazynu.";
        }

        this.items.push(item);// Dodaje przedmiot do magazynu
        this.currentItemCount++; // Dodaje do licznika plus 1 gdy przedmiot zostanie dodany
        return `Dodano przedmiot: ${item.name}`; // Zwraca Zdanie że przedmiot został dodany
    }

    // Metoda wypisuje przedmioty w magazynie
    listAll() {
        this.items.forEach((item, i) => {
            console.log(`Przedmiot #${i + 1}:`); // Wypisuje w konsoli informacje przedmiotu
            console.log(item.describe());
    });
  }
}
    // Funkcja do interakcji z uzytkownikiem
    const rl = readline.createInterface ({

    // Ustawia wejście i wyjście dla readline
    input: process.stdin,
    output: process.stdout
});
    // Funkcja askQuestion zadaje pyanie uzytkownikowi
    function askQuestion(query) {
    // Zwraca odpowiedz uzytkownika
    return new Promise(resolve => rl.question(query, answer => resolve(answer)));
}
    // funkcja ktora odpala program
    async function main() {
    
    // Pobiera pojemnosc magazynu 
    const capacity = parseInt(await askQuestion("Podaj pojemność magazynu: "));
    // Pobiera maksymalna wage
    const maxWeight = parseFloat(await askQuestion("Podaj maksymalną łączną wagę magazynu (kg): "));
    
    // Tworzy nowy obiekt 
    const warehouse = new Warehouse(capacity, maxWeight);

    // Pobiera informacje takie jak, nazwa przedmiotu, wage, dziwnosc i czy jest delikatna 
    const name = await askQuestion("Podaj nazwę przedmiotu: ");
    const weight = parseFloat(await askQuestion("Podaj wagę przedmiotu (kg): "));
    const weirdness = parseInt(await askQuestion("Podaj poziom dziwności (1-10): "));

    // Sprawdza czy przedmiot jest delikatny
    const isFragile = (await askQuestion("Czy przedmiot jest delikatny? (tak/nie): ")).toLowerCase() === "tak";

    // tworzy przedmiot na podstawie danych 
    const item = new Item(name, weight, weirdness, isFragile);

    // Dodaje przedmiot i wypisuje rezultat czy przedmiot jest dodany czy nie
    const result = warehouse.addItem(item);

    // Wypisuje rezultat dodanego przedmiotu
    console.log(result.message);

    // Pokazuje zawartosc magazynu
    console.log("\nZawartość magazynu:");
    warehouse.listAll();

    // Zamyka interferjs readline
    rl.close();
}

// Odpala funkcje main
main();