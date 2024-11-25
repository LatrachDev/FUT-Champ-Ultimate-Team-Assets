# FUT-Champ-Ultimate-Team-Assets

## Project Context
The application allows users to build their FUT (Ultimate Team) by adding, positioning, and modifying players while adhering to tactical formations like 4-4-2 or 4-3-3. The focus is on an interactive experience with dynamic forms, data management via localStorage, and an engaging interface.

## Key Features

### Integration UI and Dynamic Player Addition
- A form to add players with fields for name, position, rating, stats, and other relevant details.
- Players are positioned according to the selected formation (e.g., 4-3-3 or 4-4-2).

### Player Positioning Based on Tactical Formation
- Positions follow the selected formation:
  - **4-3-3 Formation**: 1 GK, 2 CB, 1 LB, 1 RB, 3 CM, 1 LW, 1 RW, and 1 ST.
  - **4-4-2 Formation**: 1 GK, 2 CB, 1 LB, 1 RB, 2 CM, 1 RM, 1 LM, and 2 ST.
- Automatic adjustment of player positions when the formation changes.

### Player Card Management
- Add, edit, and delete player cards through the UI.
- Strict limitation to 11 players in the main formation; remaining players are reserved for substitutions.

### Dynamic Player Management Forms
- Add or remove players while adhering to formation rules (maximum 11 players in the main formation).

### Team Chemistry Calculation
- Automatic calculation of team chemistry based on defined rules, such as:
  - Correctly positioned players receive 10 points.
  - Strong club link adds 3 points.
  - Shared league with adjacent players adds 2 points per player.
  - Shared nationality adds 1 point.
- Total team chemistry is calculated as the sum of individual chemistry values and normalized on a 0-100 scale.

### Field Validation for Forms
- Validation of all input fields (e.g., name, position, rating) to ensure data consistency.
- Native validations to ensure input accuracy.

### LocalStorage for Formations and Players
- Save formations and player data for future use without losing configurations.
- Automatically load saved data when reopening the application.

### Responsive Design
- The application adapts to various screen sizes (laptop, tablet, mobile).
- Dynamic adjustments to player positioning and display for optimal user experience.

## Technologies Required
- **HTML**
- **CSS** (native or framework like Tailwind CSS, Bootstrap)
- **JavaScript** (Vanilla JS and DOM API)

## User Stories

### 1. Creating a Team of 11 Players
- **As a user**, I want to add players to my formation via a dynamic form, with a maximum of 11 players, to ensure a valid team structure.
- **Acceptance Criteria**:
  - Add players using a form with necessary fields (name, position, stats).
  - Modify or delete added players.
  - Validate form inputs.

### 2. Formation Adaptation (e.g., 4-3-3 or 4-4-2)
- **As a user**, I want to change the formation of my team and see the positions of players adjust accordingly.
- **Acceptance Criteria**:
  - Choose between predefined formations (4-4-2, 4-3-3).
  - Automatically update player positions to match the formation.

### 3. Team Chemistry Score Calculation
- **As a user**, I want to see my team's chemistry score calculated and displayed based on player relationships, to optimize my team composition.
- **Acceptance Criteria**:
  - Dynamic updates to the chemistry score based on selected players and their compatibility.
  - Visual indicators for strong/weak links.

### 4. Data Saving and Retrieval
- **As a user**, I want my formation and team data to be saved automatically and retrieved later.
- **Acceptance Criteria**:
  - Save data locally.
  - Automatically load saved data upon app restart.

### 5. Dynamic Player Form
- **As a user**, I want to dynamically add new players via the interface.
- **Acceptance Criteria**:
  - Use a dynamic form to create new players.
  - Adjust positions and team size accordingly.

## Deliverables
1. **Task Management**: Scrum Board with all User Stories.
2. **Repository**: A GitHub repository containing:
   - Source code of the web application.
   - A README file.
3. **Deployed Application**: A link to the hosted web application.
4. **Presentation**: A link to the project presentation.

## Performance Criteria
- Intuitive and responsive user interface.
- Effective field validations for data integrity.
- Dynamic formation changes without page refresh.
- Accurate and quick team chemistry calculation.
- Reliable localStorage implementation.

## Work Modalities
- **Individual Work**
- **Duration**: 5 days
- **Launch Date**: 25/11/2024 at 09:00 AM
- **Submission Deadline**: 29/11/2024 before 05:30 PM

## Evaluation Modalities
- 35-minute public defense divided as follows:
  - **Demonstration**: Showcase functionality and code (10 minutes).
  - **Code Review**: Questions on the source code and web culture (10 minutes).
  - **Scenario-Based Test**: Hands-on evaluation (15 minutes).
"""
