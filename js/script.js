document.addEventListener("DOMContentLoaded", () => {
    
    // predefined formations
    const formations = {
        "4-3-3": [
            { top: "10%", left: "30%", position: "lw" },
            { top: "10%", left: "50%", position: "st" },
            { top: "10%", left: "70%", position: "rw" },

            { top: "40%", left: "20%", position: "lm" },
            { top: "40%", left: "50%", position: "cm" },
            { top: "40%", left: "80%", position: "rm" },

            { top: "70%", left: "10%", position: "lb" },
            { top: "70%", left: "30%", position: "cb" },
            { top: "70%", left: "70%", position: "cb" },
            { top: "70%", left: "90%", position: "rb" },

            { top: "90%", left: "50%", position: "gk" }
        ],
        "4-4-2": [
            { top: "10%", left: "35%", position: "st" },
            { top: "10%", left: "65%", position: "st" },

            { top: "40%", left: "15%", position: "lm" },
            { top: "40%", left: "35%", position: "cm" },
            { top: "40%", left: "65%", position: "cm" },
            { top: "40%", left: "85%", position: "rm" },

            { top: "70%", left: "10%", position: "lb" },
            { top: "70%", left: "30%", position: "cb" },
            { top: "70%", left: "70%", position: "cb" },
            { top: "70%", left: "90%", position: "rb" },
            { top: "90%", left: "50%", position: "gk" }
        ]
    };

    const container = document.getElementById("formation-container");
    const select = document.getElementById("formation-select");
    const modal = document.getElementById("playerModal");
    const playerListContainer = document.getElementById("playerList");
    const closeModalButton = document.getElementById("closeModal");
    
    let currentPlayerIndex = null; // track indx of player being edited

    function updateFormation(formation) {
        container.innerHTML = "";
        
        // overlay bg
        const overlay = document.createElement("div");
        overlay.className = "absolute inset-0 bg-black bg-opacity-40 rounded-md";
        container.appendChild(overlay);

        // dynamically create player placeholders for the formation
        formations[formation].forEach((position) => {
            const player = document.createElement("div");
            player.className = "players absolute w-[60px] h-[75px] bg-cover bg-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer duration-300 hover:drop-shadow-[0_0_15px_#2ee0a2]";
            player.style.top = position.top;
            player.style.left = position.left;
            player.style.backgroundImage = "url('images/card.png')";
            player.setAttribute("data-position", position.position); // used to store the role (e.g., "lw", "st", "gk") 
            
            // add a click event to open the modal for selecting players
            player.addEventListener("click", () => {
                selectedPositionCard = player; // track the clicked position
                const clickedPosition = player.getAttribute("data-position");
                
                showPlayersForPosition(clickedPosition); // show matching players in modal
                modal.style.display = "block"; // display the modal
            });

            container.appendChild(player);
        });

        attachPlayerModalListeners(); //for close player selection modal
    }   
    
    // **************************************************************
    // players and gk stats
    const positionSelect = document.getElementById("position");
    const gkStatsContainer = document.getElementById("gkStats"); // gk stats container
    const playerStatsContainer = document.getElementById("playerStats"); // player stats container

    // Toggle visibility of stats based on position selection
    positionSelect.addEventListener("change", () => {
        if (positionSelect.value === "gk") {
            gkStatsContainer.classList.remove("hidden");
            gkStatsContainer.classList.add("flex");
            playerStatsContainer.classList.add("hidden");
        } else {
            gkStatsContainer.classList.add("hidden");
            playerStatsContainer.classList.remove("hidden");
        }
    });
    // **************************************************************

    // event listener for adding a new player
    document.getElementById("add-player-btn").addEventListener("click", () => {
        const name = document.getElementById("player-name").value;
        const photoUrl = document.getElementById("player-photo-url").value;
        const nationality = document.getElementById("nationality").value;
        const flagUrl = document.getElementById("flag-url").value;
        const clubUrl = document.getElementById("club-url").value;
        const position = document.getElementById("position").value;

        if (!name || !photoUrl || !flagUrl || !clubUrl || !position) {
            alert("Please fill in all required fields.");
            return;
        }

        // player stats
        const pace = document.getElementById("player-pace").value;
        const shooting = document.getElementById("player-shooting").value;
        const passing = document.getElementById("player-passing").value;
        const dribbling = document.getElementById("player-dribbling").value;
        const defending = document.getElementById("player-defending").value;
        const physical = document.getElementById("player-physical").value;

        // gk stats
        const diving = document.getElementById("gk-diving").value;
        const kicking = document.getElementById("gk-kicking").value;
        const speed = document.getElementById("gk-speed").value;
        const handling = document.getElementById("gk-handling").value;
        const reflexes = document.getElementById("gk-reflexes").value;
        const positioning = document.getElementById("gk-positioning").value;

        // collect stats based on position
        let stats;

        if (position === "gk") {
            // gk validation
            if (!diving || diving < 0 || diving > 100 || !kicking || kicking < 0 || kicking > 100 ||
                !speed || speed < 0 || speed > 100 || !handling || handling < 0 || handling > 100 ||
                !reflexes || reflexes < 0 || reflexes > 100 || !positioning || positioning < 0 || positioning > 100) {
                alert("Please ensure all goalkeeper stats are between 0 and 100.");
                return;
            }
            stats = {
                diving: parseInt(diving),
                kicking: parseInt(kicking),
                speed: parseInt(speed),
                handling: parseInt(handling),
                reflexes: parseInt(reflexes),
                positioning: parseInt(positioning)
            };
        } else {
            // player validation
            if (!pace || pace < 0 || pace > 100 || !shooting || shooting < 0 || shooting > 100 ||
                !passing || passing < 0 || passing > 100 || !dribbling || dribbling < 0 || dribbling > 100 ||
                !defending || defending < 0 || defending > 100 || !physical || physical < 0 || physical > 100) {
                alert("Please ensure all player stats are between 0 and 100.");
                return;
            }
            stats = {
                pace: parseInt(pace),
                shooting: parseInt(shooting),
                passing: parseInt(passing),
                dribbling: parseInt(dribbling),
                defending: parseInt(defending),
                physical: parseInt(physical)
            };
        }

        const player = {
            name,
            photoUrl,
            nationality,
            flagUrl,
            clubUrl,
            position,
            stats
        };

        // save the player to localStorage (update if editing)
        const players = JSON.parse(localStorage.getItem("players")) || [];

        if (currentPlayerIndex !== null) {
            players[currentPlayerIndex] = player; // update existing player
            currentPlayerIndex = null;
            document.getElementById("add-player-btn").textContent = "Add Player";
        } else {
            players.push(player); // Add new player
        }

        localStorage.setItem("players", JSON.stringify(players));
        renderPlayerCards(players); // refresh player cards

        clearFormInputs();
    });

    const players = JSON.parse(localStorage.getItem("players")) || [];
    renderPlayerCards(players);

    function renderPlayerCards(players) {
        const playersList = document.getElementById("players-list");
        playersList.innerHTML = "";
        players.forEach((player, index) => {
            // for each player.. create a card using createPlayerCard function
            createPlayerCard(player, index);
        });
    }

    function createPlayerCard(player, index) {
        // create the player card container
        const playerCard = document.createElement("div");
        playerCard.className = "relative w-[150px] h-[240px] bg-cover bg-center mx-auto";
        playerCard.style.backgroundImage = "url('badge_gold.webp')";

        // Parse stats as integers (to ensure correct calculations)
        const pace = parseInt(player.stats.pace);
        const shooting = parseInt(player.stats.shooting);
        const passing = parseInt(player.stats.passing);
        const dribbling = parseInt(player.stats.dribbling);
        const defending = parseInt(player.stats.defending);
        const physical = parseInt(player.stats.physical);

        
        // Calculate the average rating
        const totalStats = pace + shooting + passing + dribbling + defending + physical;
        const averageRating = Math.round(totalStats / 6);

        // create the player card content (added players)
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
            <div class="absolute bottom-9 w-full grid grid-cols-3 text-center text-[0.5rem] text-black font-semibold">
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
            <div class="absolute bottom-28 left-4 flex flex-col items-center gap-1">
                <img src="${player.flagUrl}" alt="Flag" class="w-3 h-3 rounded-sm">
                <img src="${player.clubUrl}" alt="Club Logo" class="w-3 h-3">
            </div>
        `;

        // Append the player card to the players list
        document.getElementById("players-list").appendChild(playerCard);

        // editing player
        playerCard.querySelector(".editBtn").addEventListener("click", () => {
            // Pre-fill the form with player data for editing
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

            currentPlayerIndex = index; // Track the index of the player being edited
            document.getElementById("add-player-btn").textContent = "Update Player";
        });

        // deleting player
        playerCard.querySelector(".deleteBtn").addEventListener("click", () => {
            players.splice(index, 1); // remove player from arr
            localStorage.setItem("players", JSON.stringify(players)); // update local strg
            renderPlayerCards(players); // re-render the player list
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

    // hadi bach nfiltri players bl posiiton dyalhom 
    function showPlayersForPosition(position) {
        //If strg doesn't contain players key or it's value null, it defaults to an empty array ([]).
        const players = JSON.parse(localStorage.getItem("players")) || []; //parse str to arr||obj
        
        // Map of grouped positions (e.g., forwards, midfielders)
        const positionMap = {
            'fw': ['st', 'rw', 'lw'], // Forward positions
            'mf': ['cm', 'lm', 'rm'], // Midfielder positions
            'df': ['cb', 'lb', 'rb'], // Defender positions
            'gk': ['gk'] // Goalkeeper
        };

        const normalizedPosition = position.toLowerCase(); // Convert position to lowercase for comparison
        
        // Filter players based on the specific position clicked
        const filteredPlayers = players.filter(player => {
            const playerPosition = player.position.toLowerCase();
            
            // If the clicked position is a specific position (like 'st' etc..), check for exact match
            if (!positionMap[normalizedPosition]) {
                return playerPosition === normalizedPosition;
            }
            
            // If it's a category (e.g., "fw"), check if it matches any positions in the group
            return positionMap[normalizedPosition].includes(playerPosition);
        });

        playerListContainer.innerHTML = "";
        
        // No players found for position if no players match the position
        if (filteredPlayers.length === 0) {
            playerListContainer.innerHTML = `
                <div class="p-4 text-center">
                    <p class="text-gray-500">No players found for position: ${position.toUpperCase()}</p>
                </div>
            `;
            return;
        }   
    
        // Create a card for each filtered player and display in the modal
        filteredPlayers.forEach((player) => {
            const playerItem = document.createElement("div");
            playerItem.className = "flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer";
            
            // Calculate average rating
            const stats = player.stats;
            const avgRating = Math.round(
                Object.values(stats).reduce((sum, val) => sum + val, 0) / Object.keys(stats).length
            );
    
            // Create the player item HTML
            playerItem.innerHTML = `
                 <div class="flex items-center">
                    <img src="${player.photoUrl}" alt="${player.name}" class="w-12 h-12 rounded-full mr-4 text-gray-600">
                    <div>
                        <p class="font-bold text-gray-600">${player.name}</p>
                        <p class="text-sm text-gray-600">${player.position}</p>
                        <p class="text-sm text-gray-600">${player.nationality}</p>
                        <p class="text-sm text-gray-600">${player.stats.physical}</p>
                    </div>
                </div>
                <span class="text-green-600">Select</span>
            `;
    
            // When player selected, update formation and close the modal
            playerItem.addEventListener("click", () => {
                if (selectedPositionCard) {
                    updatePositionCard(selectedPositionCard, player);
                    modal.style.display = "none"; // Close modal
                }
            });
    
            playerListContainer.appendChild(playerItem); // Add player item to the modal
        });
    }
    
    // Helper function to update the position card with selected player
    function updatePositionCard(positionCard, player) {
        const stats = player.stats;
        const avgRating = Math.floor(
            Object.values(stats).reduce((sum, val) => sum + val, 0) / 6
        ); 
    
        // Create a new card to replace the placeholder
        const playerCard = document.createElement("div");
        playerCard.className = positionCard.className; // Inherit class from the original position
        playerCard.style.cssText = positionCard.style.cssText; // Inherit styles
        playerCard.style.backgroundImage = "url('badge_gold.webp')";
        
        playerCard.innerHTML = `
         <div class="absolute top-[0.8rem] left-[0.5rem] text-black text-[0.4rem] font-bold">
                ${avgRating}
            </div>

            <div class="absolute top-2 left-1/2 transform -translate-x-1/2">
                <img src="${player.photoUrl}" alt="${player.name}" class="w-8 h-8 object-cover">
            </div>
            <div class="absolute bottom-[1.8rem] w-full text-center">
                <span class="block text-black text-[0.27rem] font-bold">${player.name}</span>
            </div>
            <div class="absolute bottom-[0.5rem] w-full grid grid-cols-3 gap-px text-center text-[0.2rem] text-black font-semibold">
                ${Object.entries(stats).slice(0, 6).map(([key, value]) => `
                    <div>
                        <span class="block font-bold">${value}</span>
                        <span class="block uppercase">${key.slice(0, 3)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="absolute bottom-[1.9rem] left-[0.5rem] flex flex-col items-center gap-[0.1rem]">
                <img src="${player.flagUrl}" alt="Flag" class="w-1 h-1 ">
                <img src="${player.clubUrl}" alt="Club Logo" class="w-1 h-1">
            </div>
        `;
    
        positionCard.parentNode.replaceChild(playerCard, positionCard); //replace original placeholder with created card.. player's details
        //  parent element of positionCard (the formation container)
    }

    function attachPlayerModalListeners() {
        // Close modal button
        closeModalButton.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Close modal when clicking outside
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Initialize with the default formation
    updateFormation(select.value);

    // Update formation when a new option is selected
    select.addEventListener("change", (e) => {
        updateFormation(e.target.value);
    });

    // Initial attachment of modal listeners
    attachPlayerModalListeners();
});