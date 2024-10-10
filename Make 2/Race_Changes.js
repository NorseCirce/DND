

// Dark / Light Mode Toggle
document.getElementById('filterImage').addEventListener('click', function() {
    // Get all elements with the class 'container'
    var containers = document.getElementsByClassName('container');
    
    // Determine if the filter is already applied by checking the first element's filter style
    var isFiltered = containers[0].style.filter === 'invert(1) brightness(0.9)';
    
    // Loop through each element and toggle the invert filter
    for (var i = 0; i < containers.length; i++) {
        if (isFiltered) {
            containers[i].style.filter = '';
        } else {
            containers[i].style.filter = 'invert(1) brightness(0.9)';
        }
    }

    // Toggle the image source
    var filterImage = document.getElementById('filterImage');
    if (filterImage.src.includes('Sun.png')) {
        filterImage.src = 'Images/Moon.png';
    } else {
        filterImage.src = 'Images/Sun.png';
    }

    // Toggle the background image
    var body = document.body;
    if (window.getComputedStyle(body).backgroundImage.includes('Background_light.jpeg')) {
        body.style.backgroundImage = 'url("Images/Background_dark.jpg")';
    } else {
        body.style.backgroundImage = 'url("Images/Background_light.jpeg")';
    }
});

class Character {
    constructor() {
        this.strength = 0;
        this.dexterity = 0;
        this.constitution = 0;
        this.intelligence = 0;
        this.wisdom = 0;
        this.charisma = 0;
        this.hp = 0;
        this.ac = 0;
        this.race = '';
        this.class = '';
        this.alignment = '';
        this.background = '';
        this.proficiencyBonus = 2; // Default proficiency bonus
    }

    // Update ability scores
    updateAbilityScores(str, dex, con, int, wis, cha) {
        this.strength = str;
        this.dexterity = dex;
        this.constitution = con;
        this.intelligence = int;
        this.wisdom = wis;
        this.charisma = cha;
    }

    // Update HP based on class and level
    updateHP(characterClass, level) {
        const hpPerLevel = {
            "Artificer": 8,
            "Barbarian": 12,
            "Bard": 8,
            "Blood Hunter": 10,
            "Cleric": 8,
            "Druid": 8,
            "Fighter": 10,
            "Monk": 8,
            "Paladin": 10,
            "Ranger": 10,
            "Rogue": 8,
            "Sorcerer": 6,
            "Warlock": 8,
            "Wizard": 6
        };
        this.hp = (hpPerLevel[characterClass] || 6) + (level - 1) * (hpPerLevel[characterClass] || 6);
    }

    // Update AC based on Dexterity bonus and armor class input
    updateAC(armorClassInput) {
        const dexBonus = Math.floor((this.dexterity - 10) / 2);
        this.ac = armorClassInput + dexBonus;
    }

    // Update race
    updateRace(newRace) {
        this.race = newRace;
        this.applyRaceBonuses();
    }

    // Update class
    updateClass(newClass) {
        this.class = newClass;
        this.updateHP(this.class, parseInt(document.getElementById('characterLvl').value));
        this.updateArmorProf();
    }

    // Update alignment and background
    updateAlignment(alignment) {
        this.alignment = alignment;
    }

    updateBackground(background) {
        this.background = background;
    }

    // Apply race bonuses to ability scores
    applyRaceBonuses() {
        const raceBonuses = {
            "Dragonborn": { strength: 2, charisma: 1 },
            "Dwarf": { constitution: 2 },
            "Elf": { dexterity: 2 },
            "Gnome": { intelligence: 2 },
            "Half-Elf": { charisma: 2 },
            "Half-Orc": { strength: 2, constitution: 2 },
            "Halfling": { dexterity: 2 },
            "Human": { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
            "Tiefling": { charisma: 2 }
        };

        const bonuses = raceBonuses[this.race] || {};

        this.strength += bonuses.strength || 0;
        this.dexterity += bonuses.dexterity || 0;
        this.constitution += bonuses.constitution || 0;
        this.intelligence += bonuses.intelligence || 0;
        this.wisdom += bonuses.wisdom || 0;
        this.charisma += bonuses.charisma || 0;
    }

    // Update proficiency bonus based on character level
    updateProficiencyBonus(level) {
        if (level >= 1 && level <= 4) this.proficiencyBonus = 2;
        else if (level >= 5 && level <= 8) this.proficiencyBonus = 3;
        else if (level >= 9 && level <= 12) this.proficiencyBonus = 4;
        else if (level >= 13 && level <= 16) this.proficiencyBonus = 5;
        else if (level >= 17) this.proficiencyBonus = 6;
        else this.proficiencyBonus = 2; // Default proficiency bonus
    }

    // Update armor proficiencies
    updateArmorProf() {
        const armorProficiencies = {
            "Artificer": "Light armor, medium armor, heavy armor, shields",
            "Barbarian": "Light armor, medium armor",
            "Bard": "Light armor",
            "Blood Hunter": "Light armor, medium armor, heavy armor",
            "Cleric": "Light armor, medium armor, shields",
            "Druid": "Light armor, medium armor, shields",
            "Fighter": "Light armor, medium armor, heavy armor, shields",
            "Monk": "None",
            "Paladin": "Light armor, medium armor, heavy armor, shields",
            "Ranger": "Light armor, medium armor",
            "Rogue": "Light armor",
            "Sorcerer": "Light armor",
            "Warlock": "Light armor",
            "Wizard": "None"
        };
        const armorProfText = armorProficiencies[this.class] || "None";
        document.getElementById("armorProfText").innerText = armorProfText;
    }

    // Update all character details
    updateAll(level, armorClassInput) {
        this.updateProficiencyBonus(level);
        this.updateHP(this.class, level);
        this.updateAC(armorClassInput);
        this.applyRaceBonuses();
    }
}

// Initialize character
const myCharacter = new Character();

// Example usage
myCharacter.updateClass('Barbarian');
myCharacter.updateRace('Dwarf');
myCharacter.updateAbilityScores(16, 14, 15, 10, 12, 8);
myCharacter.updateAlignment('Neutral Good');
myCharacter.updateBackground('Soldier');

// Event listeners to update character based on input changes
document.getElementById('characterLvl').addEventListener('input', function() {
    const level = parseInt(document.getElementById('characterLvl').value);
    const armorClassInput = parseInt(document.getElementById('armorClassInput').value) || 0;
    myCharacter.updateAll(level, armorClassInput);
});

document.getElementById('characterClass').addEventListener('change', function() {
    myCharacter.updateClass(document.getElementById('characterClass').value);
});

document.getElementById('characterRace').addEventListener('change', function() {
    myCharacter.updateRace(document.getElementById('characterRace').value);
});

document.getElementById('armorClassInput').addEventListener('input', function() {
    myCharacter.updateAC(parseInt(document.getElementById('armorClassInput').value));
});
