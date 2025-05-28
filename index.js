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
    // Funkcja do interakcji z użytkownikiem
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

