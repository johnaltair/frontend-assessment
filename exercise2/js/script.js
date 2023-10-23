/**
 * Toggles the active state of the accordion section.
 *
 * @param {number} index - The index of the accordion section to toggle.
 * The index corresponds to the order of sections in the HTML structure.
 */
function toggleAccordion(index) {
    const sections = document.querySelectorAll('.accordion .section');
    const tabs = document.querySelectorAll('.tabs .tab');
    sections.forEach((section, i) => {
        section.classList.remove('big-active');
        if (i === index) {
            tabs.forEach((section, t) => {
                if (t === index) {
                    section.classList.add('active');
                }
            });
            if (section.classList.contains('active')) {
                section.classList.remove('active');
                section.classList.add('big-active');
            } else {
                section.classList.add('active');
            }
        } else {
            tabs.forEach((section, t) => {
                if (t !== index) {
                    section.classList.remove('active');
                }
            });
            section.classList.remove('active');
        }
    });
}

/**
 * Toggles the active state of a tab and its corresponding content.
 *
 * @param {number} index - The index of the tab to toggle.
 * The index corresponds to the order of tabs in the HTML structure.
 */
function toggleTab(index) {
    const tabs = document.querySelectorAll('.tabs .tab');
    tabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    const contents = document.querySelectorAll('.accordion .section');
    contents.forEach((content, i) => {
        content.classList.remove('big-active');
        if (i === index) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

/**
 * Populates the accordion and tabs with data from the provided array.
 *
 * @param {Array} data - An array containing objects with section titles and content.
 * The function creates sections in the accordion and corresponding tabs based on the data.
 * It also sets up event handlers for toggling sections and tabs.
 */
function populateSections(data) {
    const accordion = document.getElementById('accordion');
    const tabs = document.getElementById('tabs');

    data.forEach((item, i) => {
        const section = document.createElement('div');
        section.classList.add('section');
        section.innerHTML = `
            <label class="title" onclick="toggleAccordion(${i})">${item.title}</label>
            <div class="content">${item.content}</div>
        `;

        const tab = document.createElement('div');
        tab.classList.add('tab');
        tab.onclick = function () {
            toggleTab(i);
        };
        tab.textContent = item.title;

        accordion.appendChild(section);
        tabs.appendChild(tab);
    });

    toggleAccordion(0);
    toggleTab(0);
}

/**
 * Fetches data from a JSON file named 'data.json' located at a relative path.
 * Upon successful retrieval, it parses the JSON data and populates the HTML structure
 * using the 'populateSections' function. If there is an error during the fetching
 * process, it logs an error message to the console.
 */
fetch('../../data.json')
    .then(response => response.json())
    .then(data => {
        populateSections(data);
    })
    .catch(error => console.error('Error fetching data: ' + error));