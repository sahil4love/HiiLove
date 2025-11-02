// Anniversary Countdown Script
        // Set the exact anniversary date to November 2nd, 2025, at 11:59 PM (23:59:00).
        const anniversaryDate = new Date("November 2, 2025 23:59:00").getTime();

        // Function to safely grab a DOM element
        const getElement = (id) => document.getElementById(id);

        // Helper to ensure two digits are displayed (e.g., 05 instead of 5)
        const formatTime = (time) => String(time).padStart(2, '0');

        /**
         * Renders the HTML structure for a single time component (e.g., Days, Hours).
         * @param {string | number} value The time value.
         * @param {string} unit The unit (e.g., 'Days', 'Hours').
         * @param {string} colorClass Tailwind class for the text color.
         * @returns {string} The HTML string for the component.
         */
        const renderTimeComponent = (value, unit, colorClass = 'text-pink-300') => `
            <div class="flex flex-col items-center">
                <span class="text-3xl sm:text-4xl md:text-6xl font-bold ${colorClass}">${value}</span>
                <span class="text-xs md:text-base uppercase mt-1">${unit}</span>
            </div>
        `;

        /**
         * Updates the countdown display based on the distance to the anniversary.
         */
        const updateCountdown = () => {
            const now = new Date().getTime();
            let distance = anniversaryDate - now;
            const countdownContainer = getElement('countdown');

            // Time constant conversions
            const secondsInMs = 1000;
            const minutesInMs = secondsInMs * 60;
            const hoursInMs = minutesInMs * 60;
            const daysInMs = hoursInMs * 24;

            if (distance < 0) {
                // *** ANNIVERSARY HAS PASSED: Display Time Elapsed ***
                // Calculate time since the event
                distance = now - anniversaryDate;

                const days = Math.floor(distance / daysInMs);
                const hours = Math.floor((distance % daysInMs) / hoursInMs);
                const minutes = Math.floor((distance % hoursInMs) / minutesInMs);
                const seconds = Math.floor((distance % minutesInMs) / secondsInMs);

                // Construct new beautiful HTML for elapsed time (Yellow accent for celebration)
                countdownContainer.innerHTML = `
                    <p class="text-xl md:text-2xl mb-3 font-semibold uppercase tracking-wider heart-gradient animate-dramatic-pulse">
                        WE ARE CELEBRATING!
                    </p>
                    <p class="text-base md:text-xl mb-6 text-pink-100">It's been an incredible journey of:</p>
                    <div class="flex justify-center space-x-3 sm:space-x-4 md:space-x-8 text-white">
                        ${renderTimeComponent(days, 'Days', 'text-yellow-300')}
                        ${renderTimeComponent(formatTime(hours), 'Hours', 'text-yellow-300')}
                        ${renderTimeComponent(formatTime(minutes), 'Minutes', 'text-yellow-300')}
                        ${renderTimeComponent(formatTime(seconds), 'Seconds', 'text-yellow-300')}
                    </div>
                `;

            } else {
                // *** COUNTDOWN ACTIVE: Display Time Remaining ***
                const days = Math.floor(distance / daysInMs);
                const hours = Math.floor((distance % daysInMs) / hoursInMs);
                const minutes = Math.floor((distance % hoursInMs) / minutesInMs);
                const seconds = Math.floor((distance % minutesInMs) / secondsInMs);

                let title = "Counting down to Forever";
                let titleClass = "text-pink-100";
                let timeColor = "text-pink-300";

                // Dramatic effect for the last 24 hours (less than one day)
                if (distance < daysInMs) {
                    title = "THE MOMENT IS ALMOST HERE!";
                    titleClass = "heart-gradient animate-dramatic-pulse";
                    timeColor = "text-red-400"; // Change color for urgency
                }

                // Re-inject the HTML structure for the countdown
                 countdownContainer.innerHTML = `
                    <p class="text-xl md:text-2xl mb-3 font-semibold uppercase tracking-wider ${titleClass}">${title}</p>
                    <div class="flex justify-center space-x-3 sm:space-x-4 md:space-x-8 text-white">
                        ${renderTimeComponent(days, 'Days', timeColor)}
                        ${renderTimeComponent(formatTime(hours), 'Hours', timeColor)}
                        ${renderTimeComponent(formatTime(minutes), 'Minutes', timeColor)}
                        ${renderTimeComponent(formatTime(seconds), 'Seconds', timeColor)}
                    </div>
                `;
            }
        }

        // Initialize the app on load
        window.onload = function() {
            // Start the countdown immediately
            updateCountdown();
            // Then set an interval to update it continuously every second
            setInterval(updateCountdown, 1000);
            console.log("Anniversary Countdown logic refactored and initialized.");
        };

        // Extra JS to add a subtle scroll effect on the hero background (Parallax Lite)
        document.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const hero = getElement('hero');
            if (hero) {
                // Adjust background position based on scroll to create a slight parallax effect
                hero.style.backgroundPositionY = `calc(50% - ${scrollY * 0.1}px)`;
            }
        });