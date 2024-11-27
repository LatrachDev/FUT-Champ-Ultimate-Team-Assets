document.addEventListener("DOMContentLoaded", () => {
    let currentPlayerIndex = null; // track index of player being edited.

    document.getElementById("add-player-btn").addEventListener("click", () => {
        const name = document.getElementById("player-name").value; 
        const photoUrl = document.getElementById("player-photo-url").value;
        const nationality = document.getElementById("nationality").value;
        const flagUrl = document.getElementById("flag-url").value;
        const clubUrl = document.getElementById("club-url").value;
        const position = document.getElementById("position").value;

        const pace = document.getElementById("player-pace").value;
        const shooting = document.getElementById("player-shooting").value;
        const passing = document.getElementById("player-passing").value;
        const dribbling = document.getElementById("player-dribbling").value;
        const defending = document.getElementById("player-defending").value;
        const physical = document.getElementById("player-physical").value;

        if (!name || !photoUrl || !flagUrl || !clubUrl || !position || !pace || pace > 100 || pace < 0 || !shooting || shooting < 0 || shooting > 100 || !passing || passing > 100 || passing < 0 || !dribbling || dribbling > 100 || dribbling < 0 || !defending || defending > 100 || defending < 0 || !physical || physical < 0 || physical > 100) {
            alert("Please fill in all required fields, and ensure stats are between 0 and 100.");
            return;
        }

        const player = {
            name,
            photoUrl,
            nationality,
            flagUrl,
            clubUrl,
            position,
            stats: {
                pace: pace || 0,
                shooting: shooting || 0,
                passing: passing || 0,
                dribbling: dribbling || 0,
                defending: defending || 0,
                physical: physical || 0
            }
        };

        const players = JSON.parse(localStorage.getItem("players")) || [];

        if (currentPlayerIndex !== null) {
            players[currentPlayerIndex] = player;
            currentPlayerIndex = null;
            document.getElementById("add-player-btn").textContent = "Add Player";
        } else {
            players.push(player);
        }

        localStorage.setItem("players", JSON.stringify(players));
        renderPlayerCards(players);

        clearFormInputs();
    });

    const players = JSON.parse(localStorage.getItem("players")) || [];
    renderPlayerCards(players);

    function renderPlayerCards(players) {
        const playersList = document.getElementById("players-list");
        playersList.innerHTML = "";
        players.forEach((player, index) => {
            createPlayerCard(player, index);
        });
    }

    function createPlayerCard(player, index) {
        const playerCard = document.createElement("div");
        playerCard.className = "relative w-[150px] h-[240px] bg-cover bg-center mx-auto";
        playerCard.style.backgroundImage = "url('badge_gold.webp')";
    
        // Parse stats as integers
        const pace = parseInt(player.stats.pace);
        const shooting = parseInt(player.stats.shooting);
        const passing = parseInt(player.stats.passing);
        const dribbling = parseInt(player.stats.dribbling);
        const defending = parseInt(player.stats.defending);
        const physical = parseInt(player.stats.physical);
    
        // Calculate the average rating
        const totalStats = pace + shooting + passing + dribbling + defending + physical;
        const averageRating = Math.round(totalStats / 6);
    
        playerCard.innerHTML = `
            <!-- Rating and Position -->
            <div class="absolute top-12 left-4 text-black text-lg font-bold">
                <span class="block">${averageRating}</span>
                <span class="block text-sm font-medium">${player.position}</span>
            </div>
            <!-- edit icon -->
            <button class="editBtn">
                <i class="fa-solid fa-pen-to-square mr-2" style="color: #ffffff;"></i>
            </button>
            <!-- trash icon -->
            <button class="deleteBtn">
                <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>
            </button>
            <!-- Player Image -->
            <div class="absolute top-10 left-1/2 transform -translate-x-1/2">
                <img src="${player.photoUrl}" alt="${player.name}" class="w-[80px] h-[80px]">
            </div>
            <!-- Player Name -->
            <div class="absolute bottom-24 w-full text-center">
                <span class="block text-black text-sm font-bold">${player.name}</span>
            </div>
            <!-- Stats -->
            <div class="absolute bottom-9 w-full grid grid-cols-3 text-center text-xs text-black">
                <div>
                    <span class="block font-bold">${pace}</span>
                    <span class="block">PAC</span>
                </div>
                <div>
                    <span class="block font-bold">${shooting}</span>
                    <span class="block">SHO</span>
                </div>
                <div>
                    <span class="block font-bold">${passing}</span>
                    <span class="block">PAS</span>
                </div>
                <div>
                    <span class="block font-bold">${dribbling}</span>
                    <span class="block">DRI</span>
                </div>
                <div>
                    <span class="block font-bold">${defending}</span>
                    <span class="block">DEF</span>
                </div>
                <div>
                    <span class="block font-bold">${physical}</span>
                    <span class="block">PHY</span>
                </div>
            </div>
            <!-- Nationality and Club -->
            <div class="absolute bottom-28 left-4 flex items-center gap-1">
                <img src="${player.flagUrl}" alt="Flag" class="w-3 h-3 rounded-sm">
                <img src="${player.clubUrl}" alt="Club Logo" class="w-3 h-3">
            </div>
        `;
    
        document.getElementById("players-list").appendChild(playerCard);
    
        playerCard.querySelector(".editBtn").addEventListener("click", () => {
            document.getElementById("player-name").value = player.name;
            document.getElementById("player-photo-url").value = player.photoUrl;
            document.getElementById("nationality").value = player.nationality;
            document.getElementById("flag-url").value = player.flagUrl;
            document.getElementById("club-url").value = player.clubUrl;
            document.getElementById("position").value = player.position;
            document.getElementById("player-pace").value = player.stats.pace;
            document.getElementById("player-shooting").value = player.stats.shooting;
            document.getElementById("player-passing").value = player.stats.passing;
            document.getElementById("player-dribbling").value = player.stats.dribbling;
            document.getElementById("player-defending").value = player.stats.defending;
            document.getElementById("player-physical").value = player.stats.physical;
            currentPlayerIndex = index;
            document.getElementById("add-player-btn").textContent = "Update Player";
        });
    
        playerCard.querySelector(".deleteBtn").addEventListener("click", () => {
            players.splice(index, 1);
            localStorage.setItem("players", JSON.stringify(players));
            renderPlayerCards(players);
        });
    }
            

    function clearFormInputs() {
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
    }
});
