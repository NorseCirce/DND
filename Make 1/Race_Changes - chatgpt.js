function call_all() {
    const character = new Character();
    character.setStats();
}

class Character {
    constructor() {
        this.name = this.getElementValue('characterName');
        this.level = this.parseElementValue('characterLvl');
        this.alignment = this.getElementValue('characterAlignment');
        this.race = this.getElementValue('characterRace');
        this.characterClass = this.getElementValue('characterClass');
        this.strength = this.parseElementValue('Stat_strength_five_e');
        this.dexterity = this.parseElementValue('Stat_dexterity_five_e');
        this.constitution = this.parseElementValue('Stat_constitution_five_e');
        this.intelligence = this.parseElementValue('Stat_intelligence_five_e');
        this.wisdom = this.parseElementValue('Stat_wisdom_five_e');
        this.charisma = this.parseElementValue('Stat_charisma_five_e');
        this.armor = this.getElementValue('characterArmor');
        this.hp = 0;
        this.ac = 0;
        this.languages = [];
        this.bonuses = {};
    }

    getElementValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : '';
    }

    parseElementValue(id) {
        const value = this.getElementValue(id);
        return value ? parseInt(value, 10) : 0;
    }

    copyInfo() {
        document.getElementById('character_name').innerText = this.name || 'Name';
        document.getElementById('sheet_lvl').textContent = this.level;
        document.getElementById('sheet_alignment').textContent = this.alignment;
        document.getElementById('sheet_race').textContent = this.race;
        document.getElementById('sheet_background').textContent = this.getElementValue('characterBackground');
    }

    updateClassImage() {
        const imageMap = {
            "Artificer": "Images/artificer_logo.png",
            "Barbarian": "Images/barbarian_logo.png",
            "Bard": "Images/bard_logo.png",
            "Blood Hunter": "Images/blood_hunter_logo.png",
            "Cleric": "Images/cleric_logo.png",
            "Druid": "Images/druid_logo.png",
            "Fighter": "Images/fighter_logo.png",
            "Monk": "Images/monk_logo.png",
            "Paladin": "Images/paladin_logo.png",
            "Ranger": "Images/ranger_logo.png",
            "Rogue": "Images/rogue_logo.png",
            "Sorcerer": "Images/sorcerer_logo.png",
            "Warlock": "Images/warlock_logo.png",
            "Wizard": "Images/wizard_logo.png"
        };
        const imageUrl = imageMap[this.characterClass] || "Images/dnd_logo.png";
        document.querySelector(".center_image").style.backgroundImage = `url(${imageUrl})`;
    }

    updateRaceDetails() {
        const raceDetailsMap = {
            "Dragonborn": { languages: ["Common", "Draconic"], speed: 30 },
            "Dwarf": { languages: ["Common", "Dwarvish"], speed: 25 },
            "Elf": { languages: ["Common", "Elven"], speed: 30 },
            "Gnome": { languages: ["Common", "Gnomish"], speed: 25 },
            "Half-Elf": { languages: ["Common", "Elven"], speed: 30 },
            "Halfling": { languages: ["Common", "Halfling"], speed: 25 },
            "Human": { languages: ["Common"], speed: 25 },
            "Tiefling": { languages: ["Common", "Infernal"], speed: 30 }
        };

        const raceDetails = raceDetailsMap[this.race] || { languages: [], speed: 30 };
        this.languages = raceDetails.languages;
        document.getElementById("characterSpeed").value = raceDetails.speed;

        const languagesElement = document.getElementById("languages");
        languagesElement.innerHTML = "";
        this.languages.forEach(language => {
            const languageParagraph = document.createElement("p");
            languageParagraph.textContent = language;
            languagesElement.appendChild(languageParagraph);
        });
    }

    calculateAbilityModifiers() {
        const abilityScores = {
            strength: this.strength,
            dexterity: this.dexterity,
            constitution: this.constitution,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            charisma: this.charisma
        };

        for (let [key, value] of Object.entries(abilityScores)) {
            const modifier = Math.floor((value - 10) / 2);
            document.getElementById(`Stat_${key}_five_eResult`).innerText = modifier;
        }
    }

    updateRaceBonuses() {
        const raceBonusesMap = {
            "Dragonborn": { strength: 2, charisma: 1 },
            "Dwarf": { constitution: 2 },
            "Elf": { dexterity: 2 },
            "Gnome": { intelligence: 2 },
            "Half-Elf": { charisma: 2 },
            "Half-Orc": { strength: 2, constitution: 1 },
            "Halfling": { dexterity: 2 },
            "Human": { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
            "Tiefling": { charisma: 2 }
        };

        const bonuses = raceBonusesMap[this.race] || {};
        this.bonuses = bonuses;

        for (let [key, value] of Object.entries(bonuses)) {
            this[key] += value;
            document.getElementById(`Stat_${key}_five_e`).value = this[key];
        }

        this.calculateAbilityModifiers();
    }

    getProficiencyBonus() {
        if (this.level >= 1 && this.level <= 4) return 2;
        if (this.level >= 5 && this.level <= 8) return 3;
        if (this.level >= 9 && this.level <= 12) return 4;
        if (this.level >= 13 && this.level <= 16) return 5;
        if (this.level >= 17) return 6;
        return NaN;
    }

    updateSkillModifiers() {
        const prof = this.getProficiencyBonus();

        const abilityModifiers = {
            strength: parseInt(document.getElementById("Stat_strength_five_eResult").innerText),
            dexterity: parseInt(document.getElementById("Stat_dexterity_five_eResult").innerText),
            constitution: parseInt(document.getElementById("Stat_constitution_five_eResult").innerText),
            intelligence: parseInt(document.getElementById("Stat_intelligence_five_eResult").innerText),
            wisdom: parseInt(document.getElementById("Stat_wisdom_five_eResult").innerText),
            charisma: parseInt(document.getElementById("Stat_charisma_five_eResult").innerText)
        };

        const savingThrows = {
            strength: document.getElementById("st_strength_five_e"),
            dexterity: document.getElementById("st_dexterity_five_e"),
            constitution: document.getElementById("st_constitution_five_e"),
            intelligence: document.getElementById("st_intelligence_five_e"),
            wisdom: document.getElementById("st_wisdom_five_e"),
            charisma: document.getElementById("st_charisma_five_e")
        };

        for (let [key, element] of Object.entries(savingThrows)) {
            element.value = abilityModifiers[key];
        }

        const classSavingThrows = {
            "Artificer": ["constitution", "intelligence"],
            "Barbarian": ["strength", "constitution"],
            "Bard": ["dexterity", "charisma"],
            "Blood Hunter": ["dexterity", "intelligence"],
            "Cleric": ["wisdom", "charisma"],
            "Druid": ["intelligence", "wisdom"],
            "Fighter": ["strength", "constitution"],
            "Monk": ["strength", "dexterity"],
            "Paladin": ["wisdom", "charisma"],
            "Ranger": ["strength", "dexterity"],
            "Rogue": ["dexterity", "intelligence"],
            "Sorcerer": ["constitution", "charisma"],
            "Warlock": ["wisdom", "charisma"],
            "Wizard": ["intelligence", "wisdom"]
        };

        const classSavingThrowModifiers = classSavingThrows[this.characterClass] || [];
        classSavingThrowModifiers.forEach(key => {
            savingThrows[key].value += prof;
        });

        const skills = {
            Acrobatics: "dexterity",
            AnimalHandling: "wisdom",
            Arcana: "intelligence",
            Athletics: "strength",
            Deception: "charisma",
            History: "intelligence",
            Insight: "wisdom",
            Intimidation: "charisma",
            Investigation: "intelligence",
            Medicine: "wisdom",
            Nature: "intelligence",
            Perception: "wisdom",
            Performance: "charisma",
            Persuasion: "charisma",
            Religion: "intelligence",
            SleightOfHand: "dexterity",
            Stealth: "dexterity",
            Survival: "wisdom"
        };

        for (let [skill, ability] of Object.entries(skills)) {
            document.getElementById(skill).value = abilityModifiers[ability];
        }

        const classSkillProficiencies = {
            "Artificer": ["Arcana", "History", "Investigation", "Medicine", "Nature", "Perception", "SleightOfHand"],
            "Barbarian": ["AnimalHandling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"],
            "Bard": ["Acrobatics", "AnimalHandling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "SleightOfHand", "Stealth", "Survival"],
            "Blood Hunter": ["Acrobatics", "Arcana", "Athletics", "Insight", "Intimidation", "Investigation", "Survival"],
            "Cleric": ["History", "Insight", "Medicine", "Persuasion", "Religion"],
            "Druid": ["AnimalHandling", "Arcana", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"],
            "Fighter": ["Acrobatics", "AnimalHandling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"],
            "Monk": ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"],
            "Paladin": ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"],
            "Ranger": ["AnimalHandling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"],
            "Rogue": ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "SleightOfHand", "Stealth"],
            "Sorcerer": ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"],
            "Warlock": ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"],
            "Wizard": ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"]
        };

        const classSkills = classSkillProficiencies[this.characterClass] || [];
        classSkills.forEach(skill => {
            document.getElementById(skill).value += prof;
        });

        const proficiencyTable = {
            Simple: {
                Artificer: true, Barbarian: true, Bard: true, BloodHunter: true, Cleric: true,
                Druid: true, Fighter: true, Monk: true, Paladin: true, Ranger: true,
                Rogue: true, Sorcerer: true, Warlock: true, Wizard: true
            },
            Martial: {
                Artificer: false, Barbarian: true, Bard: false, BloodHunter: true, Cleric: false,
                Druid: false, Fighter: true, Monk: false, Paladin: true, Ranger: true,
                Rogue: false, Sorcerer: false, Warlock: false, Wizard: false
            }
        };

        document.getElementById("SimpleWeaponsProficiency").checked = proficiencyTable.Simple[this.characterClass] || false;
        document.getElementById("MartialWeaponsProficiency").checked = proficiencyTable.Martial[this.characterClass] || false;

        const armorProficiencyTable = {
            Light: {
                Artificer: true, Barbarian: true, Bard: true, BloodHunter: true, Cleric: true,
                Druid: true, Fighter: true, Monk: false, Paladin: true, Ranger: true,
                Rogue: true, Sorcerer: false, Warlock: true, Wizard: false
            },
            Medium: {
                Artificer: true, Barbarian: true, Bard: false, BloodHunter: true, Cleric: true,
                Druid: true, Fighter: true, Monk: false, Paladin: true, Ranger: true,
                Rogue: false, Sorcerer: false, Warlock: false, Wizard: false
            },
            Heavy: {
                Artificer: false, Barbarian: true, Bard: false, BloodHunter: false, Cleric: false,
                Druid: false, Fighter: true, Monk: false, Paladin: true, Ranger: false,
                Rogue: false, Sorcerer: false, Warlock: false, Wizard: false
            }
        };

        document.getElementById("LightArmorProficiency").checked = armorProficiencyTable.Light[this.characterClass] || false;
        document.getElementById("MediumArmorProficiency").checked = armorProficiencyTable.Medium[this.characterClass] || false;
        document.getElementById("HeavyArmorProficiency").checked = armorProficiencyTable.Heavy[this.characterClass] || false;

        const savingThrowsList = document.querySelectorAll(".savingThrowProficiency");
        savingThrowsList.forEach(checkbox => checkbox.checked = false);

        classSavingThrowModifiers.forEach(st => {
            const checkbox = document.querySelector(`input[name=${st}]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

    setStats() {
        this.copyInfo();
        this.updateClassImage();
        this.updateRaceDetails();
        this.calculateAbilityModifiers();
        this.updateRaceBonuses();
        this.updateSkillModifiers();
    }
}

// Save the scroll position in localStorage before the page unloads
window.addEventListener('beforeunload', function() {
    localStorage.setItem('scrollPosition', window.scrollY);
});

// Restore the scroll position from localStorage when the page loads
window.addEventListener('load', function() {
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
    }
});

document.getElementById("generateSheet").addEventListener("click", () => {
    const character = new Character();
    character.setStats();
});
