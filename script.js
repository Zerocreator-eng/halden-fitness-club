// ---------- 1. Rotating hero lines ----------
const rotator = document.querySelector(".hero-rotator");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (rotator && !reduceMotion) {
    const lines = rotator.querySelectorAll("li");
    let current = 0;

    rotator.classList.add("is-rotating");
    lines[current].classList.add("is-visible");

    setInterval(() => {
        lines[current].classList.remove("is-visible");
        current = (current + 1) % lines.length;
        lines[current].classList.add("is-visible");
    }, 3000);
}

// ---------- 2. Schedule filter ----------
const filterButtons = document.querySelectorAll(".schedule-filters button");
const scheduleRows = document.querySelectorAll(".schedule-table tbody tr");

function showDay(day) {
    scheduleRows.forEach((row) => {
        row.hidden = day !== "all" && row.dataset.day !== day;
    });

    filterButtons.forEach((button) => {
        const isActive = button.dataset.filter === day;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => showDay(button.dataset.filter));
});

if (filterButtons.length) {
    showDay("all");
}

// ---------- 3. Contact form message ----------
const form = document.querySelector(".contact-card");

if (form) {
    const status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("role", "status");
    form.appendChild(status);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = form.querySelector("#name");
        const emailInput = form.querySelector("#email");
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        status.classList.remove("is-error");

        if (!name) {
            status.textContent = "Please enter your name.";
            status.classList.add("is-error");
            nameInput.focus();
            return;
        }

        if (!emailLooksValid) {
            status.textContent = "Please enter a valid email address.";
            status.classList.add("is-error");
            emailInput.focus();
            return;
        }

        status.textContent = "Thanks, " + name + ". We'll be in touch soon.";
        form.reset();
    });
}