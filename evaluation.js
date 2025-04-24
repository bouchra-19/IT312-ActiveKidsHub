let selectedActivity = null;
let selectedRating = 0;


document.querySelectorAll(".activity-button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".activity-button").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedActivity = button.textContent;
    });
});


document.querySelectorAll("#ratingStars .stars").forEach((star, index) => {
    star.addEventListener("click", () => {
        selectedRating = index + 1;
        document.querySelectorAll("#ratingStars .stars").forEach((s, i) => {
            s.textContent = i < selectedRating ? "★" : "☆";
        });
    });
});


document.querySelector(".submit-button").addEventListener("click", function (e) {
    e.preventDefault(); 
    if (!selectedActivity) {
        alert("Please select an activity.");
        return;
    }

    if (selectedRating === 0) {
        alert("Please rate the activity.");
        return;
    }

    alert(`Thank you for your feedback!\nYou're rating for activity #${selectedActivity} is ${"★".repeat(selectedRating)}`);
    window.location.href = "index.html";
});
