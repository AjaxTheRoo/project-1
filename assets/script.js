
const formSubmit = document.querySelector('#search');



async function fetchData() {

  try {

    const monsterName = document.getElementById("monsterInput").value.toLowerCase();
    const response = await fetch (`https://www.dnd5eapi.co/api/monsters/${monsterName}`);

    if(!response.ok){
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();
    console.log(data);
    const monsterImage = data.image;
    const imgElement = document.getElementById("monsterImage");
   imgElement.src = `https://www.dnd5eapi.co${monsterImage}`
    imgElement.style.display = "block";

    storeMonster(monsterName);
    displaySearchedMonsters();
  }
  catch (error) {
    console.error(error);
  }
}
function storeMonster(monsterName) {
  let monsters = JSON.parse(localStorage.getItem('searchedMonsters')) || [];

  if (!monsters.includes(monsterName)) {
    monsters.push(monsterName);
    localStorage.setItem('searchedMonsters', JSON.stringify(monsters));
  }
}
const displaySearchedMonsters = () => {
  const monsters = JSON.parse(localStorage.getItem('searchedMonsters')) || [];
  const monsterList = document.getElementById('monsterList');
  monsterList.innerHTML = '';

  monsters.forEach(monster => {
    const listItem = document.createElement('li');
    listItem.textContent = monster;
    monsterList.appendChild(listItem);
  });
}

formSubmit.addEventListener('click', fetchData);

document.getElementById('monsterInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    fetchData();
  }
});
document.getElementById('monsterInput').addEventListener('input', function(event) {
  const query = event.target.value;

  const monsterNames = ["Aboleth", "Acolyte", "Adult Black Dragon", "Adult Blue Dragon", "Adult Brass Dragon", "Adult Bronze Dragon", 
    "Adult Copper Dragon", "Adult Gold Dragon", "Adult Green Dragon", "Adult Red Dragon", "Adult Silver Dragon", 
    "Adult White Dragon", "Air Elemental", "Ancient Black Dragon", "Ancient Blue Dragon", "Ancient Brass Dragon", 
    "Ancient Bronze Dragon", "Ancient Copper Dragon", "Ancient Gold Dragon", "Ancient Green Dragon", "Ancient Red Dragon", 
    "Ancient Silver Dragon", "Ancient White Dragon", "Androsphinx", "Animated Armor", "Ankheg", "Ape", "Archmage", 
    "Assassin", "Awakened Shrub", "Awakened Tree", "Axe Beak", "Azer", "Baboon", "Badger", "Balor", "Bandit", 
    "Bandit Captain", "Barbed Devil", "Basilisk", "Bat", "Bearded Devil", "Behir", "Berserker", "Black Bear", 
    "Black Dragon Wyrmling", "Black Pudding", "Blink Dog", "Blood Hawk", "Blue Dragon Wyrmling", "Boar", "Bone Devil", 
    "Brass Dragon Wyrmling", "Bronze Dragon Wyrmling", "Brown Bear", "Bugbear", "Bulette", "Camel", "Cat", "Centaur", 
    "Chain Devil", "Chimera", "Chuul", "Clay Golem", "Cloaker", "Cloud Giant", "Cockatrice", "Commoner", 
    "Constrictor Snake", "Copper Dragon Wyrmling", "Couatl", "Crab", "Crocodile", "Cult Fanatic", "Cultist", "Darkmantle", 
    "Death Dog", "Deep Gnome (Svirfneblin)", "Deer", "Deva", "Dire Wolf", "Djinni", "Doppelganger", "Draft Horse", 
    "Dragon Turtle", "Dretch", "Drider", "Drow", "Druid", "Dryad", "Duergar", "Dust Mephit", "Eagle", "Earth Elemental", 
    "Efreeti", "Elephant", "Elk", "Erinyes", "Ettercap", "Ettin", "Fire Elemental", "Fire Giant", "Flesh Golem", 
    "Flying Snake", "Flying Sword", "Frog", "Frost Giant", "Gargoyle", "Gelatinous Cube", "Ghast", "Ghost", "Ghoul", 
    "Giant Ape", "Giant Badger", "Giant Bat", "Giant Boar", "Giant Centipede", "Giant Constrictor Snake", "Giant Crab", 
    "Giant Crocodile", "Giant Eagle", "Giant Elk", "Giant Fire Beetle", "Giant Frog", "Giant Goat", "Giant Hyena", 
    "Giant Lizard", "Giant Octopus", "Giant Owl", "Giant Poisonous Snake", "Giant Rat", "Giant Rat (Diseased)", 
    "Giant Scorpion", "Giant Sea Horse", "Giant Shark", "Giant Spider", "Giant Toad", "Giant Vulture", "Giant Wasp", 
    "Giant Weasel", "Giant Wolf Spider", "Gibbering Mouther", "Glabrezu", "Gladiator", "Gnoll", "Goat", "Goblin", 
    "Gold Dragon Wyrmling", "Gorgon", "Gray Ooze", "Green Dragon Wyrmling", "Green Hag", "Grick", "Griffon", 
    "Grimlock", "Guard", "Guardian Naga", "Gynosphinx", "Half-Red Dragon Veteran", "Harpy", "Hawk", "Hell Hound", 
    "Hezrou", "Hill Giant", "Hippogriff", "Hobgoblin", "Homunculus", "Horned Devil", "Hunter Shark", "Hydra", "Hyena", 
    "Ice Devil", "Ice Mephit", "Imp", "Invisible Stalker", "Iron Golem", "Jackal", "Killer Whale", "Knight", "Kobold", 
    "Kraken", "Lamia", "Lemure", "Lich", "Lion", "Lizard", "Lizardfolk", "Mage", "Magma Mephit", "Magmin", "Mammoth", 
    "Manticore", "Marilith", "Mastiff", "Medusa", "Merfolk", "Merrow", "Mimic", "Minotaur", "Minotaur Skeleton", "Mule", 
    "Mummy", "Mummy Lord", "Nalfeshnee", "Night Hag", "Nightmare", "Noble", "Ochre Jelly", "Octopus", "Ogre", 
    "Ogre Zombie", "Oni", "Orc", "Otyugh", "Owl", "Owlbear", "Panther", "Pegasus", "Phase Spider", "Pit Fiend", 
    "Planetar", "Plesiosaurus", "Poisonous Snake", "Polar Bear", "Pony", "Priest", "Pseudodragon", "Purple Worm", 
    "Quasit", "Quipper", "Rakshasa", "Rat", "Raven", "Red Dragon Wyrmling", "Reef Shark", "Remorhaz", "Rhinoceros", 
    "Riding Horse", "Roc", "Roper", "Rug of Smothering", "Rust Monster", "Saber-Toothed Tiger", "Sahuagin", "Salamander", 
    "Satyr", "Scorpion", "Scout", "Sea Hag", "Sea Horse", "Shadow", "Shambling Mound", "Shield Guardian", "Shrieker", 
    "Silver Dragon Wyrmling", "Skeleton", "Solar", "Specter", "Spider", "Spirit Naga", "Sprite", "Spy", "Steam Mephit", 
    "Stirge", "Stone Giant", "Stone Golem", "Storm Giant", "Succubus/Incubus", "Swarm of Bats", "Swarm of Beetles", 
    "Swarm of Centipedes", "Swarm of Insects", "Swarm of Poisonous Snakes", "Swarm of Quippers", "Swarm of Rats", 
    "Swarm of Ravens", "Swarm of Spiders", "Swarm of Wasps", "Tarrasque", "Thug", "Tiger", "Treant", "Tribal Warrior", 
    "Triceratops", "Troll", "Tyrannosaurus Rex", "Unicorn", "Vampire, Bat Form", "Vampire, Mist Form", "Vampire Spawn", 
    "Vampire, Vampire Form", "Veteran", "Violet Fungus", "Vrock", "Vulture", "Warhorse", "Warhorse Skeleton", 
    "Water Elemental", "Weasel", "Werebear, Bear Form", "Werebear, Human Form", "Werebear, Hybrid Form", 
    "Wereboar, Boar Form", "Wereboar, Human Form", "Wereboar, Hybrid Form", "Wererat, Human Form", "Wererat, Hybrid Form", 
    "Wererat, Rat Form", "Weretiger, Human Form", "Weretiger, Hybrid Form", "Weretiger, Tiger Form", "Werewolf, Human Form", 
    "Werewolf, Hybrid Form", "Werewolf, Wolf Form", "White Dragon Wyrmling", "Wight", "Will-o'-Wisp", "Winter Wolf", 
    "Wolf", "Worg", "Wraith", "Wyvern", "Xorn", "Young Black Dragon", "Young Blue Dragon", "Young Brass Dragon", 
    "Young Bronze Dragon", "Young Copper Dragon", "Young Gold Dragon", "Young Green Dragon", "Young Red Dragon", 
    "Young Silver Dragon", "Young White Dragon", "Zombie"
  ];
  

  function fetchSuggestions(query) {
 
    const match = monsterNames.filter(monster => monster.toLowerCase().startsWith(query.toLowerCase()));
  
   
    if (match) {
      document.getElementById("monsterInput").value = match;
    }
  }
 
  fetchSuggestions(query);
});

window.onload = displaySearchedMonsters;
