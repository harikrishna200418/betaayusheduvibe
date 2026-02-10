document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. GLOBAL UTILITIES
       ========================================= */

    // Helper to format currency/text if needed
    const formatMoney = (amount) => `${amount}`;

    /* =========================================
       2. MOBILE MENU
       ========================================= */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = isActive ? '&#10005;' : '&#9776;'; // Toggle X and Hamburger
        });

        // Close menu when clicking a link (improves UX on mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '&#9776;';
            });
        });
    }

    /* =========================================
       3. DYNAMIC CONTENT RENDERING
       ========================================= */

    // Render Universities (Study Abroad Page)
    const uniContainer = document.getElementById('universities-list');
    if (uniContainer && typeof APP_DATA !== 'undefined') {
        renderUniversities(APP_DATA.universities);

        // Country Filter Logic (Simple implementation)
        const countryBtns = document.querySelectorAll('[data-country]');
        countryBtns.forEach(btn => {
            if (btn.tagName === 'A' || btn.tagName === 'BUTTON') { // Ensure we target clickable elements
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const country = btn.getAttribute('data-country');
                    if (country === 'All') {
                        renderUniversities(APP_DATA.universities);
                    } else {
                        const filtered = APP_DATA.universities.filter(u => u.country === country);
                        renderUniversities(filtered);
                    }

                    // Auto-scroll to results
                    if (uniContainer) {
                        uniContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }
        });
    }

    /* =========================================
       NEW: CHECK LOGIN STATUS & UPDATE UI (UNIFIED)
       ========================================= */
    const portalSession = localStorage.getItem('portal_session');
    const legacyLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (portalSession || legacyLoggedIn) {
        // Prefer portal_session (email) for name, else fallback
        let userName = 'Student';
        if (portalSession) {
            const namePart = portalSession.split('@')[0];
            userName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        } else {
            const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            if (userProfile.name) userName = userProfile.name.split(' ')[0];
        }

        // Find 'Join Now' or 'Register' button in nav to replace, or append
        const navLinksContainer = document.querySelector('.nav-links');

        // Hide Login Button if present
        const loginBtnContainer = document.getElementById('auth-buttons');
        if (loginBtnContainer) loginBtnContainer.style.display = 'none';

        // Check if profile already exists (index.html has it hardcoded)
        const existingProfile = document.getElementById('nav-user-profile');
        if (existingProfile) {
            existingProfile.style.display = 'flex';
            const nameSpan = document.getElementById('nav-user-name');
            if (nameSpan) nameSpan.innerText = 'Hi, ' + userName;
            const avatar = document.getElementById('nav-user-avatar');
            if (avatar) avatar.innerText = userName.charAt(0);
            return; // Stop here to prevent duplicate
        }

        // Check if profile already exists (script injected)
        if (!document.getElementById('nav-user-profile-script-injected')) {
            const profileHtml = `
                <div id="nav-user-profile-script-injected" style="display: flex; align-items: center; gap: 10px; margin-left: 10px; cursor:pointer;" onclick="window.location.href='portal-dashboard.html'">
                    <div style="width: 32px; height: 32px; background: var(--primary); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size:0.9rem;">
                        ${userName.charAt(0)}
                    </div>
                    <span style="color: var(--text-main); font-weight: 600; font-size:0.9rem;">Hi, ${userName}</span>
                </div>
            `;

            // If on a page other than index (which handles its own), append to nav
            // Or just append it if not found.
            if (navLinksContainer) {
                const div = document.createElement('div');
                div.innerHTML = profileHtml;
                navLinksContainer.appendChild(div.firstElementChild);
            }
        }
    }

    function renderUniversities(data) {
        uniContainer.innerHTML = '';
        if (data.length === 0) {
            uniContainer.innerHTML = '<p class="text-center">No universities found for this region.</p>';
            return;
        }

        data.forEach(uni => {
            let scholarshipHTML = '';
            if (uni.scholarship) {
                scholarshipHTML = `
                    <div style="margin: 1rem 0; padding: 1rem; background: ${uni.scholarship.color}15; border-radius: 8px; border-left: 3px solid ${uni.scholarship.color};">
                        <h4 style="margin-bottom: 0.5rem; color: ${uni.scholarship.color};">${uni.scholarship.title}</h4>
                        <p style="color: #374151; font-weight: bold; font-size: 0.9rem;">${uni.scholarship.desc}</p>
                    </div>
                `;
            }

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="flex-between mb-2">
                    <h3>${uni.name}</h3>
                    <span class="tag tag-popular">${uni.rank}</span>
                </div>
                <p>${uni.location}</p>
                ${scholarshipHTML}
                <button class="btn btn-primary" onclick="alert('Starting application for ${uni.name}...')">Apply Now</button>
            `;
            uniContainer.appendChild(card);
        });
    }

    // Render Jobs (Jobs Page)
    const jobsContainer = document.getElementById('jobs-list');
    const jobSearchInput = document.getElementById('job-search');

    if (jobsContainer && typeof APP_DATA !== 'undefined') {
        renderJobs(APP_DATA.jobs);

        // Search Filter
        if (jobSearchInput) {
            jobSearchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const filtered = APP_DATA.jobs.filter(job =>
                    job.title.toLowerCase().includes(term) ||
                    job.company.toLowerCase().includes(term) ||
                    job.location.toLowerCase().includes(term)
                );
                renderJobs(filtered);
            });
        }
    }

    function renderJobs(data) {
        jobsContainer.innerHTML = '';
        if (data.length === 0) {
            jobsContainer.innerHTML = '<p class="text-center">No jobs found matching your criteria.</p>';
            return;
        }
        data.forEach(job => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="flex-between">
                    <h3>${job.title}</h3>
                    <span class="tag ${job.tagClass}">${job.type}</span>
                </div>
                <p>${job.company} • ${job.location}</p>
                <p style="margin-top: 1rem; color: var(--primary); font-weight: bold;">${job.salary}</p>
                <button class="btn btn-secondary btn-full mt-2" onclick="applyForJob(this, '${job.title}')">Apply Now</button>
            `;
            jobsContainer.appendChild(card);
        });
    }

    // Global function for onclick events
    window.applyForJob = function (btn, jobTitle) {
        // user feedback
        const originalText = btn.innerText;
        btn.innerText = "Applied! ✓";
        btn.style.background = "var(--primary)";
        btn.style.color = "white";

        // Save to local storage (Mock Backend)
        const applications = JSON.parse(localStorage.getItem('myApplications') || '[]');
        applications.push({ job: jobTitle, date: new Date().toLocaleDateString() });
        localStorage.setItem('myApplications', JSON.stringify(applications));

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "";
            btn.style.color = "";
        }, 2000);
    };

    // Render Exams (Exams Page)
    const examsFreeContainer = document.getElementById('exams-free-list');
    const examsPaidContainer = document.getElementById('exams-paid-list');

    if (examsFreeContainer && examsPaidContainer && typeof APP_DATA !== 'undefined') {
        // Render Free
        APP_DATA.exams.free.forEach(exam => {
            const card = document.createElement('div');
            card.className = 'card text-center';

            let actionHtml = `<button class="btn btn-secondary btn-full">Start Learning</button>`;
            if (exam.link) {
                actionHtml = `<a href="${exam.link}" target="_blank" class="btn btn-secondary btn-full" style="text-decoration:none;">Start Learning</a>`;
            }

            card.innerHTML = `
                <h3>${exam.name}</h3>
                <p>${exam.desc}</p>
                ${actionHtml}
            `;
            examsFreeContainer.appendChild(card);
        });

        // Render Paid
        APP_DATA.exams.paid.forEach(exam => {
            const featuresList = exam.features.map(f => `<li>✓ ${f}</li>`).join('');
            const card = document.createElement('div');
            card.className = 'card text-center';
            card.style.borderColor = exam.color;
            card.innerHTML = `
                <h3 style="font-size: 2.5rem; color: ${exam.color};">${exam.price}</h3>
                <p>${exam.name}</p>
                <ul style="list-style: none; margin: 1rem 0; text-align: left; opacity: 0.8;">
                    ${featuresList}
                </ul>
                <button class="btn btn-primary btn-full">Buy Now</button>
            `;
            examsPaidContainer.appendChild(card);
        });
    }

    // Render Accommodation (Services Page)
    const accomContainer = document.getElementById('accom-list');
    if (accomContainer && typeof APP_DATA !== 'undefined') {
        accomContainer.innerHTML = ''; // Clear loading message
        APP_DATA.accommodation.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div style="height: 150px; margin-bottom: 1rem; border-radius: 8px; overflow: hidden;">
                    <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <h3>${item.title}</h3>
                <p>${item.location}</p>
                <p style="color: var(--primary); font-weight: bold;">${item.price}</p>
                <button class="btn btn-secondary btn-full mt-2">View Details</button>
            `;
            accomContainer.appendChild(card);
        });
    }


    /* =========================================
       4. REGISTRATION WIZARD
       ========================================= */
    /* =========================================
       4. REGISTRATION WIZARD (ENHANCED)
       ========================================= */
    const wizardForm = document.getElementById('wizard-form');
    if (wizardForm) {
        let currentStep = 1;
        const totalSteps = 3;
        const formData = {};

        const nextBtns = document.querySelectorAll('[data-next]');
        const prevBtns = document.querySelectorAll('[data-prev]');
        const steps = document.querySelectorAll('.step-content');

        // Qualification & Branch Logic
        const qualSelect = document.getElementById('reg-qualification');
        const specContainer = document.getElementById('specialization-container');
        const specSelect = document.getElementById('reg-specialization');

        if (qualSelect && typeof BRANCH_DATA !== 'undefined') {
            qualSelect.addEventListener('change', (e) => {
                const qual = e.target.value;
                specContainer.style.display = 'none';
                specSelect.innerHTML = '';

                let options = [];
                // Check if branch data exists for this qualification
                if (BRANCH_DATA[qual]) {
                    if (Array.isArray(BRANCH_DATA[qual])) {
                        options = BRANCH_DATA[qual];
                    } else if (typeof BRANCH_DATA[qual] === 'object') {
                        // It's grouped (like B.Tech with categories)
                        // flattened for dropdown, or use optgroups
                        for (const [group, branches] of Object.entries(BRANCH_DATA[qual])) {
                            const optGroup = document.createElement('optgroup');
                            optGroup.label = group;
                            branches.forEach(b => {
                                const opt = document.createElement('option');
                                opt.value = b;
                                opt.textContent = b;
                                optGroup.appendChild(opt);
                            });
                            specSelect.appendChild(optGroup);
                        }
                        specContainer.style.display = 'block';
                        return; // Done for grouped
                    } else if (BRANCH_DATA[qual].Streams) {
                        options = BRANCH_DATA[qual].Streams;
                    } else if (BRANCH_DATA[qual].Specializations) {
                        options = BRANCH_DATA[qual].Specializations;
                    } else if (BRANCH_DATA[qual].Courses) {
                        options = BRANCH_DATA[qual].Courses;
                    }
                }

                if (options.length > 0) {
                    options.forEach(optVal => {
                        const opt = document.createElement('option');
                        opt.value = optVal;
                        opt.textContent = optVal;
                        specSelect.appendChild(opt);
                    });
                    specContainer.style.display = 'block';
                }
            });
        }

        // Password Strength Logic
        const passInput = document.getElementById('reg-password');
        const passStrength = document.getElementById('pass-strength');
        if (passInput) {
            passInput.addEventListener('input', (e) => {
                const val = e.target.value;
                if (val.length === 0) { passStrength.innerText = 'Weak'; passStrength.style.color = '#bbb'; }
                else if (val.length < 6) { passStrength.innerText = 'Too Short'; passStrength.style.color = 'red'; }
                else if (val.length < 10) { passStrength.innerText = 'Medium'; passStrength.style.color = 'orange'; }
                else { passStrength.innerText = 'Strong'; passStrength.style.color = '#00ff88'; }
            });
        }

        function validateStep(step) {
            if (step === 1) {
                const name = document.getElementById('reg-name').value.trim();
                const phone = document.getElementById('reg-phone').value.trim();
                const email = document.getElementById('reg-email').value.trim();
                const emailError = document.getElementById('email-error');

                if (!name || !phone || !email) {
                    alert('Please fill in all required fields marked with *');
                    return false;
                }
                if (!email.includes('@') || !email.includes('.')) {
                    if (emailError) emailError.style.display = 'block';
                    return false;
                }
                if (emailError) emailError.style.display = 'none';

                formData.name = name;
                formData.phone = phone;
                formData.email = email;
            }
            if (step === 2) {
                const qual = document.getElementById('reg-qualification').value;
                if (!qual) {
                    alert('Please select your qualification.');
                    return false;
                }
                formData.qualification = qual;
                formData.interest = document.getElementById('reg-interest').value;
                const spec = document.getElementById('reg-specialization').value;
                if (spec && document.getElementById('specialization-container').style.display !== 'none') {
                    formData.specialization = spec;
                }
            }
            if (step === 3) {
                const pass = document.getElementById('reg-password').value;
                if (pass.length < 8) {
                    alert('Password must be at least 8 characters long.');
                    return false;
                }
                formData.password = pass; // In real app, never store plain text
            }
            return true;
        }

        function showStep(step) {
            steps.forEach((s, index) => {
                s.style.display = (index + 1) === step ? 'block' : 'none';
            });
            const indicators = document.querySelectorAll('.wizard-steps .step');
            indicators.forEach((s, index) => {
                if (index + 1 <= step) s.classList.add('active');
                else s.classList.remove('active');
            });
            currentStep = step;
        }

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!validateStep(currentStep)) return;

                if (currentStep < totalSteps) {
                    showStep(currentStep + 1);
                } else {
                    // Final Submission
                    formData.registeredAt = new Date().toISOString();

                    // SIMULATED SERVER ALERT
                    const serverMsg = `SERVER ALERT: New User Joined!\nName: ${formData.name}\nTimestamp: ${formData.registeredAt}`;
                    console.log(serverMsg); // Log to console like a server log
                    // alert(serverMsg);

                    // DOWNLOAD DATA AS FILE (Simulating database storage)
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
                    const downloadAnchorNode = document.createElement('a');
                    downloadAnchorNode.setAttribute("href", dataStr);
                    const fileName = "userdetails_" + (formData.name ? formData.name.replace(/\s+/g, '_') : 'guest') + ".json";
                    downloadAnchorNode.setAttribute("download", fileName);
                    document.body.appendChild(downloadAnchorNode);
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();

                    // MOCK SESSION
                    localStorage.setItem('userProfile', JSON.stringify(formData));
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('portal_session', formData.email); // Enable Gateway to Dashboard

                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 500);
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 1) showStep(currentStep - 1);
            });
        });

        showStep(1);
    }

    /* =========================================
       5. GENERAL TAB LOGIC
       ========================================= */
    // If any tabs exist
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        // Logic handled in specific pages if needed, 
        // generally handled by specific IDs in my implementation above.
    }
});


