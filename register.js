document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const errors = [];

    // Get form elements
    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const dob = document.getElementById("dob").value;
    const parentNumber = document.getElementById("parent_number").value.trim();
    const emergencyContact = document.getElementById("emergency_contact").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const email = document.getElementById("email").value.trim();
    const photo = document.getElementById("photo").files[0];

    // Required field validation
    if (!firstName) errors.push("First name is required");
    if (!lastName) errors.push("Last name is required");
    if (!dob) errors.push("Date of birth is required");
    if (!parentNumber) errors.push("Parent number is required");
    if (!emergencyContact) errors.push("Emergency contact is required");
    if (!gender) errors.push("Gender is required");
    if (!email) errors.push("Email is required");

    // Name validation
    if (firstName && /^\d/.test(firstName)) errors.push("First name cannot start with a number");
    if (lastName && /^\d/.test(lastName)) errors.push("Last name cannot start with a number");

    // Contact validation
    if (parentNumber && !/^\d{10}$/.test(parentNumber)) errors.push("Parent number must be 10 digits");
    if (emergencyContact && !/^\d{10}$/.test(emergencyContact)) errors.push("Emergency contact must be 10 digits");

    // Date validation
    if (dob) {
        const dobDate = new Date(dob);
        const maxDate = new Date('2020-12-31');
        if (dobDate > maxDate) errors.push("Child must be at least 5 years old (born before 2021)");
    }

    // Email validation
    if (email && !email.includes('@')) errors.push("Email must contain @ symbol");

    // Display errors if any
    if (errors.length > 0) {
        alert("Validation errors:\n" + errors.join("\n"));
        return;
    }

    // Store child data in localStorage under "kids" key
    const childData = {
        name: `${firstName} ${lastName}`,
        dob: dob
    };
    let kids = JSON.parse(localStorage.getItem('kids') || '[]');
    console.log("Current kids in localStorage before adding:", kids); // Debug
    kids.push(childData);
    console.log("Kids after adding new child:", kids); // Debug
    localStorage.setItem('kids', JSON.stringify(kids));
    console.log("Updated kids in localStorage:", JSON.parse(localStorage.getItem('kids'))); // Debug

    // Create printable content
    const printContent = document.createElement('div');
    printContent.className = 'printable-info';
    printContent.style.display = 'none';
    document.body.appendChild(printContent);

    // Handle photo
    if (photo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            console.log('Photo loaded successfully:', e.target.result);
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                console.log('Image preloaded for printing');
                printContent.innerHTML = createPrintableHTML(e.target.result);
                printAndCleanup();
            };
            img.onerror = function () {
                console.error('Failed to preload image');
                printContent.innerHTML = createPrintableHTML(null);
                printAndCleanup();
            };
        };
        reader.onerror = function () {
            console.error('Failed to read photo file');
            printContent.innerHTML = createPrintableHTML(null);
            printAndCleanup();
        };
        reader.readAsDataURL(photo);
    } else {
        console.log('No photo uploaded');
        printContent.innerHTML = createPrintableHTML(null);
        printAndCleanup();
    }

    // Show success message and reset form
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
        document.getElementById("registerForm").reset(); // Reset the form
    }, 3000); // Hide after 3 seconds
});

function createPrintableHTML(photoSrc) {
    return `
        <div class="printable-content">
            ${photoSrc ? `<img src="${photoSrc}" alt="Child Photo" class="printable-photo">` : ''}
            <div class="details">
                <p><strong>Child name:</strong> ${document.getElementById("first_name").value} ${document.getElementById("last_name").value}</p>
                <p><strong>DOB:</strong> ${document.getElementById("dob").value}</p>
                <p><strong>Gender:</strong> ${document.querySelector('input[name="gender"]:checked')?.value || 'Not selected'}</p>
                <p><strong>Phone:</strong> ${document.getElementById("parent_number").value}</p>
                <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
            </div>
        </div>
    `;
}

function printAndCleanup() {
    const allElements = document.body.children;
    for (let element of allElements) {
        if (!element.classList.contains('printable-info')) {
            element.style.display = 'none';
        }
    }

    const printContent = document.querySelector('.printable-info');
    printContent.style.display = 'block';

    setTimeout(() => {
        console.log('Triggering print');
        window.print();

        for (let element of allElements) {
            if (!element.classList.contains('printable-info')) {
                element.style.display = '';
            }
        }
        printContent.remove();
    }, 500);
}
