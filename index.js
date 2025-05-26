const readline = require('readline');

class Item {
    constructor(name, weightKg, weirdnessLevel, isFragile) 
    {
        this.name = name;
        this.weightKg = parseFloat(weightKg.toFixed(3));
        this.weirdnessLevel = weirdnessLevel;
        this.isFragile = isFragile;
    }

    describe()
    {
        return JSON.stringify({
            nazwa: this.name,
            waga_kg: this.weightKg,
            poziom_dziwności: this.weirdnessLevel,
            czy_delikatny: this.isFragile ? "tak" : "nie"
        } , null, 4);
    }
}