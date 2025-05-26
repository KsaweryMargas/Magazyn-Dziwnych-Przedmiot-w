const readline = require('readline');

// Definicja klasy Item
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