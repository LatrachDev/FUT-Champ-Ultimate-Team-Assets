//  4-3-3 formation

const formations = {
    "4-3-3": [
        { top: "10%", left: "30%" }, // Forward left
        { top: "10%", left: "50%" }, // Forward center
        { top: "10%", left: "70%" }, // Forward right

        { top: "40%", left: "20%" }, // Midfielder left
        { top: "40%", left: "50%" }, // Midfielder center
        { top: "40%", left: "80%" }, // Midfielder right

        { top: "70%", left: "10%" }, // Defender left
        { top: "70%", left: "30%" }, // Defender center-left
        { top: "70%", left: "70%" }, // Defender center-right
        { top: "70%", left: "90%" }, // Defender right
        
        { top: "90%", left: "50%" }, // Goalkeeper
    ],
    "4-4-2": [
        { top: "10%", left: "35%" }, // Forward left
        { top: "10%", left: "65%" }, // Forward right

        { top: "40%", left: "15%" }, // Midfielder left
        { top: "40%", left: "35%" }, // Midfielder center-left
        { top: "40%", left: "65%" }, // Midfielder center-right
        { top: "40%", left: "85%" }, // Midfielder right

        { top: "70%", left: "10%" }, // Defender left
        { top: "70%", left: "30%" }, // Defender center-left
        { top: "70%", left: "70%" }, // Defender center-right
        { top: "70%", left: "90%" }, // Defender right

        { top: "90%", left: "50%" }, // Goalkeeper
    ],
};

const container = document.getElementById("formation-container");
const select = document.getElementById("formation-select");

// function to update formation
function updateFormation(formation) {

    // check if players already exist fl container
    const existingPlayers = container.querySelectorAll(".player");

    if (existingPlayers.length > 0) {

        // update position of exestig players
        formations[formation].forEach((position, index) => {

            const player = existingPlayers[index];
            player.style.top = position.top;
            player.style.left = position.left;
        });
        return;
    }

    // If no players exist, create new player
    formations[formation].forEach((position) => {

        const player = document.createElement("div");
        player.className =
            "player absolute w-[70px] h-[80px] bg-cover bg-center transform -translate-x-1/2 -translate-y-1/2";
        player.style.top = position.top;
        player.style.left = position.left;
        player.style.backgroundImage = "url('images/card.png')"; // placeholder image
        container.appendChild(player); // add player to the container
    });
}

// initialize with the default formation
updateFormation(select.value);

// update formation when a new option is selected
select.addEventListener("change", (e) => {
    updateFormation(e.target.value); // update the formation based on the selected value
});