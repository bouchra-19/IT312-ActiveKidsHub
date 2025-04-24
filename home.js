

    // Add review hover effect
    const reviewCards = document.querySelectorAll(".reviews .card");
    reviewCards.forEach((card, index) => {
        const details = [
            {
                name: "Fatimah Al-Mutairi",
                rate: 5,
                text: "Very supportive coaches, highly recommend tennis!"
            },
            {
                name: "Khalid Al-Qahtani",
                rate: 5,
                text: "Horse riding helped my daughter’s self-esteem!"
            }
        ];

        const hoverDiv = document.createElement("div");
        hoverDiv.className = "hover-info";
        hoverDiv.innerHTML = `<strong>Parent:</strong> ${details[index].name}<br>
                              <strong>Rating:</strong> ${"★".repeat(details[index].rate)}<br>
                              <em>${details[index].text}</em>`;
        hoverDiv.style.display = "none";
        hoverDiv.style.position = "absolute";
        hoverDiv.style.backgroundColor = "#fff";
        hoverDiv.style.border = "1px solid #ccc";
        hoverDiv.style.padding = "8px";
        hoverDiv.style.zIndex = "10";

        card.style.position = "relative";
        card.appendChild(hoverDiv);

        card.addEventListener("mouseenter", () => {
            hoverDiv.style.display = "block";
        });
        card.addEventListener("mouseleave", () => {
            hoverDiv.style.display = "none";
        });
    });
