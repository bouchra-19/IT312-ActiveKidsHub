document.addEventListener("DOMContentLoaded", function () {
    console.log("Enroll Activity script loaded");

    // Default kids (same as Parent Dashboard)
    const defaultKids = [
        { name: "Amal Al-Fayz", dob: "2015-05-11" },
        { name: "Ali Al-Fayz", dob: "2018-08-22" },
        { name: "Sara Al-Fayz", dob: "2013-03-15" }
    ];

    // Retrieve kids from localStorage and merge with default kids
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
    localStorage.setItem('kids', JSON.stringify(kids)); // Update localStorage
    console.log("Merged kids (default + registered):", kids);

    const kidSelect = document.getElementById('kid-select');
    console.log("kidSelect element:", kidSelect);

    if (!kidSelect) {
        console.error("Error: #kid-select element not found in the DOM");
        return;
    }

    // Clear existing options (except the default "Select" option)
    while (kidSelect.options.length > 1) {
        kidSelect.remove(1);
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

    // Activity data with tutors and skill levels (unchanged)
    const activities = [
        { name: "tennis", tutor: "coach1", skillLevel: "beginner" },
        { name: "soccer", tutor: "coach2", skillLevel: "intermediate" },
        { name: "swimming", tutor: "coach3", skillLevel: "all" },
        { name: "horse_riding", tutor: "coach4", skillLevel: "beginner" },
        { name: "karate", tutor: "coach5", skillLevel: "intermediate" },
        { name: "painting", tutor: "coach6", skillLevel: "all" }
    ];

    // Filter activities based on tutor and skill level (unchanged)
    const tutorFilter = document.getElementById('tutor-filter');
    const skillLevelInputs = document.querySelectorAll('input[name="skill-level"]');
    const activityCheckboxes = document.querySelectorAll('.activity-enrollment');

    

    tutorFilter.addEventListener('change', filterActivities);
    skillLevelInputs.forEach(input => input.addEventListener('change', filterActivities));
    filterActivities();

    // Handle form submission (unchanged)
    document.getElementById("enrollmentForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const selectedKid = kidSelect.value;
        const selectedActivities = Array.from(document.querySelectorAll('input[name="activities"]:checked'))
            .map(checkbox => checkbox.value);

        if (!selectedKid) {
            alert("Please select a child.");
            return;
        }
        if (selectedActivities.length === 0) {
            alert("Please select at least one activity.");
            return;
        }

        let enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        selectedActivities.forEach(activity => {
            enrollments.push({ kid: selectedKid, activity: activity });
        });
        localStorage.setItem('enrollments', JSON.stringify(enrollments));

        alert(`${selectedKid} has been enrolled in: ${selectedActivities.join(', ')}!`);
    });
});