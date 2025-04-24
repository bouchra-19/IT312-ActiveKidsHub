document.addEventListener("DOMContentLoaded", function () {
    console.log("Enroll Activity script loaded");

    // Step 1: Retrieve kids from localStorage
    const defaultKids = [
        { name: "Amal Al-Fayz", dob: "2015-05-11" },
        { name: "Ali Al-Fayz", dob: "2018-08-22" },
        { name: "Sara Al-Fayz", dob: "2013-03-15" }
    ];

    let kids = JSON.parse(localStorage.getItem('kids') || '[]');
    console.log("Kids from localStorage (initial):", kids);

    // Merge default kids, avoiding duplicates by name
    const mergedKids = [...defaultKids];
    kids.forEach(kid => {
        if (!mergedKids.some(existingKid => existingKid.name === kid.name)) {
            mergedKids.push(kid);
        }
    });
    kids = mergedKids;
    localStorage.setItem('kids', JSON.stringify(kids));
    console.log("Merged kids:", kids);

    const kidSelect = document.getElementById('kid-select');
    if (!kidSelect) {
        console.error("Error: #kid-select element not found in the DOM");
        return;
    }

    // Populate kid dropdown
    if (kids.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No kids registered';
        option.disabled = true;
        kidSelect.appendChild(option);
        console.log("No kids registered, added placeholder option");
    } else {
        kids.forEach(kid => {
            const option = document.createElement('option');
            option.value = kid.name;
            option.textContent = kid.name;
            kidSelect.appendChild(option);
            console.log("Added kid to dropdown:", kid.name);
        });
    }

    // Step 2: Create multidimensional array for activities
    const activities = [
        { name: "Tennis", coach: "Ahmad Mohamed", prerequisite: "Beginner" },
        { name: "Soccer", coach: "Abdullah Al-Mutairi", prerequisite: "Intermediate" },
        { name: "Swimming", coach: "Khaled Abdulaziz", prerequisite: "Beginner" },
        { name: "Horse Riding", coach: "Nora Al-Dosari", prerequisite: "Beginner" },
        { name: "Karate", coach: "Fahad Al-Shammari", prerequisite: "Intermediate" },
        { name: "Painting", coach: "Laila Al-Harbi", prerequisite: "All Levels" },
        { name: "Chess", coach: "Laila Al-Harbi", prerequisite: "All Levels" }
    ];
    console.log("Activities array:", activities);

    // Step 3: Populate filter options (coaches and prerequisites) with no duplicates
    const tutorFilter = document.getElementById('tutor-filter');
    const skillLevelInputs = document.querySelectorAll('input[name="skill-level"]');
    const activityGrid = document.getElementById('activities-grid');

    if (!tutorFilter || !activityGrid || skillLevelInputs.length === 0) {
        console.error("Error: One or more required elements not found - tutorFilter:", tutorFilter, "activityGrid:", activityGrid, "skillLevelInputs:", skillLevelInputs);
        return;
    }

    // Collect unique coaches and prerequisites
    const coachSet = new Set(activities.map(act => act.coach));
    const prereqSet = new Set(activities.map(act => act.prerequisite));
    console.log("Unique coaches:", Array.from(coachSet));
    console.log("Unique prerequisites:", Array.from(prereqSet));

    // Populate tutor filter
    coachSet.forEach(coach => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = coach;
        const activitiesForCoach = activities.filter(act => act.coach === coach);
        activitiesForCoach.forEach(act => {
            const option = document.createElement('option');
            option.value = act.coach;
            option.textContent = `${act.name} (${act.coach})`;
            optgroup.appendChild(option);
        });
        tutorFilter.appendChild(optgroup);
    });

    // Step 4: Filter activities based on tutor and skill level
    function filterActivities() {
        const selectedTutor = tutorFilter.value;
        const selectedSkill = document.querySelector('input[name="skill-level"]:checked')?.value || 'all';
        console.log("Filtering activities - Tutor:", selectedTutor, "Skill:", selectedSkill);

        activityGrid.innerHTML = ''; // Clear current activities

        activities.forEach(act => {
            const matchesTutor = selectedTutor === 'all' || act.coach === selectedTutor;
            const matchesSkill = selectedSkill === 'all' || act.prerequisite.toLowerCase() === selectedSkill;

            if (matchesTutor && matchesSkill) {
                const label = document.createElement('label');
                label.className = 'activity-enrollment';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'activities';
                checkbox.value = act.name;
                label.appendChild(checkbox);

                const box = document.createElement('div');
                box.className = 'activity-box-enrollment';

                const img = document.createElement('img');
                img.src = `${act.name.toLowerCase().replace(' ', '_')}.jpg`;
                img.alt = act.name;
                img.className = 'activity-image-enrollment';
                box.appendChild(img);

                box.appendChild(document.createTextNode(act.name));
                label.appendChild(box);
                activityGrid.appendChild(label);
                console.log("Displayed activity:", act.name);
            }
        });

        if (activityGrid.innerHTML === '') {
            console.log("No activities match the current filters");
            activityGrid.innerHTML = '<p>No activities match the selected filters.</p>';
        }
    }

    // Initial display of activities
    filterActivities();

    // Add event listeners for filters
    tutorFilter.addEventListener('change', () => {
        console.log("Tutor filter changed to:", tutorFilter.value);
        filterActivities();
    });
    skillLevelInputs.forEach(input => {
        input.addEventListener('change', () => {
            console.log("Skill filter changed to:", input.value);
            filterActivities();
        });
    });

    // Step 5 & 6: Handle form submission with validation
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (!enrollmentForm) {
        console.error("Error: #enrollmentForm not found in the DOM");
        return;
    }

    enrollmentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log("Form submitted");

        const selectedKid = kidSelect.value;
        const selectedActivities = Array.from(document.querySelectorAll('input[name="activities"]:checked'))
            .map(checkbox => checkbox.value);
        console.log("Selected kid:", selectedKid, "Selected activities:", selectedActivities);

        // Validation
        if (!selectedKid) {
            alert('Please select a kid to enroll.');
            console.log("Validation failed: No kid selected");
            return;
        }
        if (selectedActivities.length === 0) {
            alert('Please select at least one activity.');
            console.log("Validation failed: No activities selected");
            return;
        }

        // Step 7: Display enrollment details
        const enrollmentDetails = document.getElementById('enrollment-details');
        if (!enrollmentDetails) {
            console.error("Error: #enrollment-details not found in the DOM");
            return;
        }

        enrollmentDetails.innerHTML = ''; // Clear previous details
        console.log("Cleared previous enrollment details");

        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'enrollment-details-container';

        const heading = document.createElement('h3');
        heading.textContent = 'Enrollment Details';
        detailsContainer.appendChild(heading);

        const kidPara = document.createElement('p');
        kidPara.innerHTML = `<strong>Kid:</strong> ${selectedKid}`;
        detailsContainer.appendChild(kidPara);

        const activitiesPara = document.createElement('p');
        activitiesPara.innerHTML = '<strong>Activities and Coaches:</strong>';
        detailsContainer.appendChild(activitiesPara);

        const activityList = document.createElement('ul');
        selectedActivities.forEach(activityName => {
            const activity = activities.find(act => act.name === activityName);
            const listItem = document.createElement('li');
            listItem.textContent = `${activity.name} (Coach: ${activity.coach})`;
            activityList.appendChild(listItem);
        });
        detailsContainer.appendChild(activityList);

        enrollmentDetails.appendChild(detailsContainer);
        console.log("Displayed new enrollment details");

        // Clear the form
        kidSelect.selectedIndex = 0;
        document.querySelectorAll('input[name="activities"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        tutorFilter.value = 'all';
        document.querySelector('input[name="skill-level"][value="all"]').checked = true;
        filterActivities();
        console.log("Form cleared and filters reset");
    });
});