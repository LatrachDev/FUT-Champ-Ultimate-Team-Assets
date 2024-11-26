// event listener to the button with ID add-player-btn
document.getElementById("add-player-btn").addEventListener("click", () => {

    // get values from inputs
    const name = document.getElementById("player-name").value; 
    const photoUrl = document.getElementById("player-photo-url").value;
    const nationality = document.getElementById("nationality").value;
    const flagUrl = document.getElementById("flag-url").value;
    const clubUrl = document.getElementById("club-url").value;
    const position = document.getElementById("position").value;

    // player stats
    const pace = document.getElementById("player-pace").value;
    const shooting = document.getElementById("player-shooting").value;
    const passing = document.getElementById("player-passing").value;
    const dribbling = document.getElementById("player-dribbling").value;
    const defending = document.getElementById("player-defending").value;
    const physical = document.getElementById("player-physical").value;

    // ensure required fields are not empty
    if (!name || !photoUrl || !flagUrl || !clubUrl || !position) {
        alert("Please fill in all required fields.");
        return; // Stop execution
    }

    // create player card
    const playerCard = document.createElement("div");
    playerCard.className = "relative w-[150px] h-[240px] bg-cover bg-center rounded-md shadow-md";
    playerCard.style.backgroundImage = "url('badge_gold.webp')"; // golden badge as a bg

    playerCard.innerHTML = `
    
        <!-- Rating and Position -->
        <div class="absolute top-12 left-4 text-white text-lg font-bold">
            <span class="block">90</span>
            <span class="block text-sm font-medium">${position}</span>
        </div>

        <!-- Player Image -->
        <div class="absolute top-10 left-1/2 transform -translate-x-1/2">
            <img src="${photoUrl}" alt="${name}" class="w-[80px] h-[80px]">
        </div>

        <!-- Player Name -->
        <div class="absolute bottom-24 w-full text-center">
            <span class="block text-white text-sm font-bold">${name}</span>
        </div>

        <!-- Stats -->
        <div class="absolute bottom-9 w-full grid grid-cols-3 text-center text-xs text-white">
            <div>
                <span class="block font-bold">${pace || 0}</span>
                <span class="block">PAC</span>
            </div>
            <div>
                <span class="block font-bold">${shooting || 0}</span>
                <span class="block">SHO</span>
            </div>
            <div>
                <span class="block font-bold">${passing || 0}</span>
                <span class="block">PAS</span>
            </div>
            <div>
                <span class="block font-bold">${dribbling || 0}</span>
                <span class="block">DRI</span>
            </div>
            <div>
                <span class="block font-bold">${defending || 0}</span>
                <span class="block">DEF</span>
            </div>
            <div>
                <span class="block font-bold">${physical || 0}</span>
                <span class="block">PHY</span>
            </div>
        </div>

        <!-- Nationality and Club -->
        <div class="absolute bottom-28 left-4 flex items-center gap-1">
            <img src="${flagUrl}" alt="Flag" class="w-3 h-3 rounded-sm">
            <img src="${clubUrl}" alt="Club Logo" class="w-3 h-3">
        </div>
    `;

    // append the player card to the players list
    document.getElementById("players-list").appendChild(playerCard);

    // clear form inputs after submission
    document.getElementById("player-name").value = "";
    document.getElementById("player-photo-url").value = "";
    document.getElementById("nationality").value = "";
    document.getElementById("flag-url").value = "";
    document.getElementById("club-url").value = "";
    document.getElementById("position").value = "";
    document.getElementById("player-pace").value = "";
    document.getElementById("player-shooting").value = "";
    document.getElementById("player-passing").value = "";
    document.getElementById("player-dribbling").value = "";
    document.getElementById("player-defending").value = "";
    document.getElementById("player-physical").value = "";
});