function call_all(){
    Class_image(); 
    raceDetails(); 
    racebonus_five_e(); 
    Copy_info(); 
    ac_stat(); 
    hp_stat();
    armorProf();
}
// Dark / light mode
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

        // Get the image element
        var filterImage = document.getElementById('filterImage');
        
        // Toggle the image source
        if (filterImage.src.includes('Sun.png')) {
            filterImage.src = 'Images/Moon.png';
        } else {
            filterImage.src = 'Images/Sun.png';
        }

        // Get the body element to change the background image
        var body = document.body;

        // Toggle the background image
        if (window.getComputedStyle(body).backgroundImage.includes('Background_light.jpeg')) {
            body.style.backgroundImage = 'url("Images/Background_dark.jpg")';
        } else {
            body.style.backgroundImage = 'url("Images/Background_light.jpeg")';
        }
    });


//Copy info to character sheet  
    function Copy_info() {
    //Name
        var name_input = document.getElementById('characterName').value;

        if (name_input.trim() === "") {
            document.getElementById('character_name').innerText = 'Name';
        } else {
            document.getElementById('character_name').innerText = name_input;
        }    

    //Lvl
        var lvl_input = document.getElementById('characterLvl');
        var lvl_output = document.getElementById('sheet_lvl');

            lvl_output.textContent = lvl_input.value;

    //Alignment
        var alignment_input = document.getElementById('characterAlignment');
        var alignment_output = document.getElementById('sheet_alignment');

            alignment_output.textContent = alignment_input.value;

    //Race
    var race_input = document.getElementById('characterRace');
    var race_output = document.getElementById('sheet_race');

        race_output.textContent = race_input.value;

    //Background
    var background_input = document.getElementById('characterBackground');
    var background_output = document.getElementById('sheet_background');

        background_output.textContent = background_input.value; 
    }
// Attach the Copy_info function to the onchange event of the select element
    document.getElementById("characterClass").addEventListener("change", Copy_info);

// Define a function to handle the background image change
    function Class_image() {
        // Get the selected character class
        var characterClass = document.getElementById("characterClass").value;

        // Define a mapping of character classes to image URLs
        var imageMap = {
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

        // Get the URL for the selected character class, or use a default image if none is selected
        var imageUrl = imageMap[characterClass] || "Images/dnd_logo.png";

        // Update the background image of the center_image div
        document.querySelector(".center_image").style.backgroundImage = "url(" + imageUrl + ")";
    }

//Speed and Languages
    function raceDetails() {
        var selectedRace = document.getElementById("characterRace").value;
        var languagesElement = document.getElementById("languages");
        var speedInput = document.getElementById("characterSpeed");

        // Clear previous display
        languagesElement.innerHTML = "";

        // Define language sets and speed for each race
        var languages = [];

        if (selectedRace === "Dragonborn") {
            languages = ["Common", "Draconic"];
            speedInput.value = 30; 
        }
        
        else if (selectedRace === "Dwarf") {
            languages = ["Common", "Dwarvish"];
            speedInput.value = 25; 
        } 
        
        else if (selectedRace === "Elf") {
            languages = ["Common", "Elven"];
            speedInput.value = 30; 
        } 

        else if (selectedRace === "Gnome") {
            languages = ["Common", "Gnomish"];
            speedInput.value = 25; 
        } 

        else if (selectedRace === "Half-Elf") {
            languages = ["Common", "Elven"];/*+1 of your choise*/ 
            speedInput.value = 30; 
        } 

        else if (selectedRace === "Halfling") {
            languages = ["Common", "Halfling"];
            speedInput.value = 25; 
        } 
        
        else if (selectedRace === "Human") {
            languages = ["Common"];/*+1 of your choise*/ 
            speedInput.value = 25; 
        } 

        else if (selectedRace === "Tiefling") {
            languages = ["Common", "Infernal"];
            speedInput.value = 30; 
        } 

        else {
            speedInput.value = 30; 
        }

        // Append languages to the languagesElement
        languages.forEach(function(language) {
            var languageParagraph = document.createElement("p");
            languageParagraph.textContent = language;
            languagesElement.appendChild(languageParagraph);
        });
        }

// The Stat modifier calculator - DND 5e
    function calculate_five_e() { 
        calculateAbilityScore_five_e("Stat_strength_five_e", "Stat_strength_five_eResult");
        calculateAbilityScore_five_e("Stat_dexterity_five_e", "Stat_dexterity_five_eResult");
        calculateAbilityScore_five_e("Stat_constitution_five_e", "Stat_constitution_five_eResult");
        calculateAbilityScore_five_e("Stat_intelligence_five_e", "Stat_intelligence_five_eResult");
        calculateAbilityScore_five_e("Stat_wisdom_five_e", "Stat_wisdom_five_eResult");
        calculateAbilityScore_five_e("Stat_charisma_five_e", "Stat_charisma_five_eResult");          
    }
    function calculateAbilityScore_five_e(inputId, resultId) {

        var inputValue = document.getElementById(inputId).value;
        var result = (inputValue-10) /2;
        result = Math.floor(result); // Rounding down
        document.getElementById(resultId).innerText = result; 
    }
    calculate_five_e(); // Call the function initially to display the results for the default values

// Race bonuses
    var strengthResult, dexterityResult, constitutionResult, intelligenceResult, wisdomResult, charismaResult;
    var lastAppliedBonuses = {};
    // Function to handle race bonuses for ability scores
    function racebonus_five_e() {
        var characterRaceSelect = document.getElementById('characterRace');
        var strengthInput = document.getElementById('strength_five_e');
        var dexterityInput = document.getElementById('dexterity_five_e');
        var constitutionInput = document.getElementById('constitution_five_e');
        var intelligenceInput = document.getElementById('intelligence_five_e');
        var wisdomInput = document.getElementById('wisdom_five_e');
        var charismaInput = document.getElementById('charisma_five_e');

        var strengthStat = document.getElementById('Stat_strength_five_e');
        var dexterityStat = document.getElementById('Stat_dexterity_five_e');
        var constitutionStat = document.getElementById('Stat_constitution_five_e');
        var intelligenceStat = document.getElementById('Stat_intelligence_five_e');
        var wisdomStat = document.getElementById('Stat_wisdom_five_e');
        var charismaStat = document.getElementById('Stat_charisma_five_e');

        // Function to revert bonuses
        function revertBonuses(bonuses) {
            for (let key in bonuses) {
                switch (key) {
                    case 'strength':
                        strengthStat.value -= bonuses[key];
                        break;
                    case 'dexterity':
                        dexterityStat.value -= bonuses[key];
                        break;
                    case 'constitution':
                        constitutionStat.value -= bonuses[key];
                        break;
                    case 'intelligence':
                        intelligenceStat.value -= bonuses[key];
                        break;
                    case 'wisdom':
                        wisdomStat.value -= bonuses[key];
                        break;
                    case 'charisma':
                        charismaStat.value -= bonuses[key];
                        break;
                    default:
                        break;
                }
            }
        }

        // Remove last applied bonuses if they exist
        if (Object.keys(lastAppliedBonuses).length > 0) {
            revertBonuses(lastAppliedBonuses);
        }

        // Apply bonuses based on selected race
        switch (characterRaceSelect.value) {
            case 'Dragonborn':
                lastAppliedBonuses = {
                    strength: 2,
                    charisma: 1
                };
                break;

            case 'Dwarf':
                lastAppliedBonuses = {
                    constitution: 2
                };
                break;

            case 'Elf':
                lastAppliedBonuses = {
                    dexterity: 2
                };
                break;

            case 'Gnome':
                lastAppliedBonuses = {
                    intelligence: 2
                };
                break;

            case 'Half-Elf':
                lastAppliedBonuses = {
                    charisma: 2

                };
                break;

            case 'Half-Orc':
                lastAppliedBonuses = {
                    strength: 2,
                    constitution: 2
                };
                break;

            case 'Halfling':
                lastAppliedBonuses = {
                    dexterity: 2
                };
                break;

            case 'Human':
                lastAppliedBonuses = {
                    strength: 1,
                    dexterity: 1,
                    constitution: 1,
                    intelligence: 1,
                    wisdom: 1,
                    charisma: 1
                };
                break;

            case 'Tiefling':
                lastAppliedBonuses = {
                    charisma: 2
                };
                break;

            default:
                lastAppliedBonuses = {};
                break;
        }

        // Apply the bonuses to the respective input fields
        strengthStat.value = parseInt(strengthInput.value) + (lastAppliedBonuses.strength || 0);
        dexterityStat.value = parseInt(dexterityInput.value) + (lastAppliedBonuses.dexterity || 0);
        constitutionStat.value = parseInt(constitutionInput.value) + (lastAppliedBonuses.constitution || 0);
        intelligenceStat.value = parseInt(intelligenceInput.value) + (lastAppliedBonuses.intelligence || 0);
        wisdomStat.value = parseInt(wisdomInput.value) + (lastAppliedBonuses.wisdom || 0);
        charismaStat.value = parseInt(charismaInput.value) + (lastAppliedBonuses.charisma || 0);

        // Update global variables and call calculateAbilityScore_five_e for each score
        calculateAbilityScore_five_e("Stat_strength_five_e", "Stat_strength_five_eResult");
        calculateAbilityScore_five_e("Stat_dexterity_five_e", "Stat_dexterity_five_eResult");
        calculateAbilityScore_five_e("Stat_constitution_five_e", "Stat_constitution_five_eResult");
        calculateAbilityScore_five_e("Stat_intelligence_five_e", "Stat_intelligence_five_eResult");
        calculateAbilityScore_five_e("Stat_wisdom_five_e", "Stat_wisdom_five_eResult");
        calculateAbilityScore_five_e("Stat_charisma_five_e", "Stat_charisma_five_eResult");  

        // Update derived skill modifiers
        updateSkillModifiers();
    }
//Proficiency bonus
    function getProficiencyBonus() {
        var characterLvl = parseInt(document.getElementById("characterLvl").value);
        var prof;

        if (characterLvl >= 1 && characterLvl <= 4) {
            prof = 2;
        } else if (characterLvl >= 5 && characterLvl <= 8) {
            prof = 3;
        } else if (characterLvl >= 9 && characterLvl <= 12) {
            prof = 4;
        } else if (characterLvl >= 13 && characterLvl <= 16) {
            prof = 5;
        } else if (characterLvl >= 17) {
            prof = 6;
        } else {
            prof = NaN; // Handle invalid levels
        }

        return prof;
    }
//Add proficiency bonus
    function updateSkillModifiers() {
        var characterClass = document.getElementById("characterClass").value;
        var prof = getProficiencyBonus();

        var strengthModifier = parseInt(document.getElementById("Stat_strength_five_eResult").innerText);
        var dexterityModifier = parseInt(document.getElementById("Stat_dexterity_five_eResult").innerText);
        var constitutionModifier = parseInt(document.getElementById("Stat_constitution_five_eResult").innerText);
        var intelligenceModifier = parseInt(document.getElementById("Stat_intelligence_five_eResult").innerText);
        var wisdomModifier = parseInt(document.getElementById("Stat_wisdom_five_eResult").innerText);
        var charismaModifier = parseInt(document.getElementById("Stat_charisma_five_eResult").innerText);

    // Saving throws
        var st_strength = document.getElementById("st_strength_five_e");
        var st_dexterity = document.getElementById("st_dexterity_five_e");
        var st_constitution = document.getElementById("st_constitution_five_e");
        var st_intelligence = document.getElementById("st_intelligence_five_e");
        var st_wisdom = document.getElementById("st_wisdom_five_e");
        var st_charisma = document.getElementById("st_charisma_five_e");

        st_strength.value = strengthModifier;
        st_dexterity.value = dexterityModifier;
        st_constitution.value = constitutionModifier;
        st_intelligence.value = intelligenceModifier;
        st_wisdom.value = wisdomModifier;
        st_charisma.value = charismaModifier;

        if (characterClass === "Artificer") {
            st_constitution.value = constitutionModifier + prof;
            st_intelligence.value = intelligenceModifier + prof;
        }
        else if (characterClass === "Barbarian"){
            st_strength.value = strengthModifier + prof;
            st_constitution.value = constitutionModifier + prof;
        }
        else if (characterClass === "Bard"){
            st_dexterity.value = dexterityModifier + prof;
            st_charisma.value = charismaModifier + prof;
        }
        else if (characterClass === "Blood Hunter"){
            st_dexterity.value = dexterityModifier + prof;
            st_intelligence.value = intelligenceModifier + prof;
        }
        else if (characterClass === "Cleric"){
            st_wisdom.value = wisdomModifier + prof;
            st_charisma.value = charismaModifier + prof;
        }
        else if (characterClass === "Druid"){
            st_intelligence.value = intelligenceModifier + prof;
            st_wisdom.value = wisdomModifier + prof;
        }
        else if (characterClass === "Fighter"){
            st_strength.value = strengthModifier + prof;
            st_constitution.value = constitutionModifier + prof;
        }
        else if (characterClass === "Monk"){
            st_strength.value = strengthModifier + prof;
            st_dexterity.value = dexterityModifier + prof;
        }
        else if (characterClass === "Paladin"){
            st_wisdom.value = wisdomModifier + prof;
            st_charisma.value = charismaModifier + prof;
        }
        else if (characterClass === "Ranger"){
            st_strength.value = strengthModifier + prof;
            st_dexterity.value = dexterityModifier + prof;
        }
        else if (characterClass === "Rogue"){
            st_dexterity.value = dexterityModifier + prof;
            st_intelligence.value = intelligenceModifier + prof;
        }
        else if (characterClass === "Sorcerer"){
            st_constitution.value = constitutionModifier + prof;
            st_charisma.value = charismaModifier + prof;
        }
        else if (characterClass === "Warlock"){
            st_wisdom.value = wisdomModifier + prof;
            st_charisma.value = charismaModifier + prof;
        }
        else if (characterClass === "Wizard"){
            st_intelligence.value = intelligenceModifier + prof;
            st_wisdom.value = wisdomModifier + prof;
        }


    //Skills
        var Acrobatics = document.getElementById("characterAcrobatics");
        var AnimalHandling = document.getElementById("characterAnimalHandling");
        var Arcana = document.getElementById("characterArcana");
        var Athletics = document.getElementById("characterAthletics");
        var Deception = document.getElementById("characterDeception");
        var History = document.getElementById("characterHistory");
        var Insight = document.getElementById("characterInsight");
        var Intimidation = document.getElementById("characterIntimidation")
        var Investigation = document.getElementById("characterInvestigation");
        var Medicine = document.getElementById("characterMedicine");
        var Nature = document.getElementById("characterNature");
        var Perception = document.getElementById("characterPerception");
        var Performance = document.getElementById("characterPerformance");
        var Persuasion = document.getElementById("characterPersuasion");
        var Religion = document.getElementById("characterReligion");
        var SleightOfHand = document.getElementById("characterSleightOfHand");
        var Stealth = document.getElementById("characterStealth");
        var Survival = document.getElementById("characterSurvival");

        Acrobatics.value = dexterityModifier;
        AnimalHandling.value = wisdomModifier;
        Arcana.value = intelligenceModifier;
        Athletics.value = strengthModifier;
        Deception.value = charismaModifier;
        History.value = intelligenceModifier;
        Insight.value = wisdomModifier;
        Intimidation.value = charismaModifier;
        Investigation.value = intelligenceModifier;
        Medicine.value = wisdomModifier;
        Nature.value = intelligenceModifier;
        Perception.value = wisdomModifier;
        Performance.value = charismaModifier;
        Persuasion.value = charismaModifier;
        Religion.value = intelligenceModifier;
        SleightOfHand.value = dexterityModifier;
        Stealth.value = dexterityModifier;
        Survival.value = wisdomModifier;

        if (characterClass === "Artificer"){

        }


        // Ensure characterPerceptionValue is a number
        
        document.getElementById("characterInitiative").value = dexterityModifier;
        var characterPerceptionValue = parseInt(document.getElementById("characterPerception").value);

        var passive_p = characterPerceptionValue + 10;
        document.getElementById("passive_perception").value = passive_p;

    }

    // Ensure this function runs after the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", updateSkillModifiers);
    // Event listener to update skill modifiers when level or class changes
    document.getElementById("characterLvl").addEventListener("change", updateSkillModifiers);
    document.getElementById("characterClass").addEventListener("change", updateSkillModifiers);
    

//Armor options visibility
document.addEventListener("DOMContentLoaded", function() {
    armorProf(); // Filter armor options on page load

    document.getElementById("characterClass").addEventListener("change", armorProf);
});

function armorProf() {
    var characterClass = document.getElementById("characterClass").value;
    var characterStrength = parseInt(document.getElementById('Stat_strength_five_e').value) || 0; // Fetch strength input and parse as integer

    const armorSelect = document.getElementById('characterArmor');
    const options = armorSelect.querySelectorAll('option');

    options.forEach(option => {
        const condition = option.getAttribute('data-condition');
        const requiredStrength = parseInt(option.getAttribute('data-strength')) || 0;

        // Determine if the option should be visible or hidden based on the selected class and strength
        if (isOptionVisibleForClass(characterClass, condition) && meetsStrengthRequirement(characterClass, option, characterStrength)) {
            option.style.display = ''; // Show the option
            console.log("Showing option: ", option.value);
        } else {
            option.style.display = 'none'; // Hide the option
            console.log("Hiding option: ", option.value);
        }
    });
}

function meetsStrengthRequirement(selectedClass, option, strength) {
    // Check if the option requires a strength check
    if (option.value === "Chain Mail" && strength < 13) {
        return false;
    } else if (option.value === "Splint" && strength < 15) {
        return false;
    }
    return true;
}

function isOptionVisibleForClass(selectedClass, condition) {
    switch (selectedClass) {
        case "Artificer":
            return ['light', 'medium'].includes(condition);
        case "Barbarian":
        case "Cleric":
        case "Druid":
        case "Fighter":
        case "Paladin":
        case "Ranger":
            return ['light', 'medium', 'heavy'].includes(condition);
        case "Bard":
        case "Rogue":
        case "Sorcerer":
        case "Warlock":
        case "Wizard":
        case "Monk":
        case "Blood Hunter":
            return ['light'].includes(condition);
        default:
            return false; 
    }
}

//AC
    function ac_stat() {
        // Get selected armor type
        var Armor = document.getElementById("characterArmor").value;
        
        // Element where AC will be displayed or stored
        var acElement = document.getElementById("characterac");
        
        // Parse dexterity modifier as integer
        var dex_mod = parseInt(document.getElementById("Stat_dexterity_five_eResult").innerText);

        // Calculate AC based on the selected armor
        var acValue;
        if (Armor === "Padded Armor") {
            acValue = 11 + dex_mod;
        } 
        else if (Armor === "Studded Leather") {
            acValue = 12 + dex_mod;
        } 
        else if (Armor === "Hide") {
            if (dex_mod > 2) {
                dex_mod = 2;
            }
            acValue = 12 + dex_mod;
        } 
        else if (Armor === "Scale Mail") {
            if (dex_mod > 2) {
                dex_mod = 2;
            }
            acValue = 14 + dex_mod;
        } 
        else if (Armor === "Breastplate") {
            if (dex_mod > 2) {
                dex_mod = 2;
            }
            acValue = 14 + dex_mod;
        } 
        else if (Armor === "Half Plate") {
            if (dex_mod > 2) {
                dex_mod = 2;
            }
            acValue = 15 + dex_mod;
        }
        else if (Armor === "Ring Mail") {
            acValue = 14;
        }
        else if (Armor === "Chain Mail") {
            acValue = 16;
        } 
        else if (Armor === "Splint") {
            acValue = 17;
        } 
        else {
            acValue = 10 + dex_mod;
        }

        // Set the calculated AC value to the appropriate element
        acElement.value = acValue;
    }


//HP
function hp_stat() {
    // Retrieve and parse inputs
    var con_mod = parseInt(document.getElementById("Stat_constitution_five_eResult").innerText);
    var Class = document.getElementById("characterClass").value;
    var Lvl = parseInt(document.getElementById("characterLvl").value);
    var hpResult = document.getElementById("characterhp");

    // Object to map classes to their base hit points at level 1
    var classHitPoints = {
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

    // Set default value for lvl1 if Class is not found in classHitPoints
    var lvl1 = classHitPoints[Class] || 0;

    // Calculate hit points
    var calculated_hp = lvl1 + (Lvl - 1) * (lvl1/2 + 1) + con_mod;

    // Display the result
    hpResult.value = calculated_hp;

    // Debugging output
        //console.log("Class:", Class);
        //console.log("Level:", Lvl);
        //console.log("Constitution Modifier:", con_mod);
        //console.log("Base Hit Points at Level 1:", lvl1);
        //console.log("Calculated Hit Points:", calculated_hp);
}














