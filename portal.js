// Check Auth
const sessionUser = localStorage.getItem('portal_session');
if (!sessionUser) {
    window.location.href = 'portal-login.html';
}

// Update User Info in Sidebar
if (sessionUser) {
    document.getElementById('userEmail').innerText = sessionUser;

    // Simple logic to get name from email
    let name = sessionUser.split('@')[0];
    name = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize
    document.getElementById('userName').innerText = name;

    document.getElementById('userAvatar').innerText = name.charAt(0);
}

// Tab Navigation
function showTab(tabName, navItem) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
        // Reset animation
        tab.style.animation = 'none';
        tab.offsetHeight; /* trigger reflow */
        tab.style.animation = null;
    });
    // Show selected tab
    const selectedTab = document.getElementById('tab-' + tabName);
    if (selectedTab) selectedTab.classList.add('active');

    // Update Sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if (navItem) navItem.classList.add('active');

    // On mobile, close sidebar after selection
    if (window.innerWidth <= 1024) {
        document.getElementById('sidebar').classList.remove('open');
    }
}

// Logout
function logout() {
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('portal_session');
        window.location.href = 'portal-login.html';
    }
}

// Appointment Form
const appForm = document.getElementById('appointmentForm');
if (appForm) {
    appForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Booking Confirmed! \n\nWe will call you soon to confirm timing.');
        appForm.reset();
    });
}

// Eligibility Check
const eliForm = document.getElementById('eligibilityForm');
if (eliForm) {
    eliForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const gpa = parseFloat(document.getElementById('eli-gpa').value);
        const resultDiv = document.getElementById('eligibilityResult');

        resultDiv.style.display = 'block';
        if (gpa >= 60 || gpa >= 6.0) { // Broad logic
            resultDiv.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
            resultDiv.style.border = '2px solid #00ff88';
            resultDiv.innerHTML = '<h3 style="color:#00ff88; margin-bottom:5px;">✅ Good News!</h3><p style="margin:0; color:white;">You have a good chance to go abroad. <br><button class="btn btn-primary mt-2" onclick="showTab(\'apply\', document.querySelectorAll(\'.nav-item\')[4])">Start Application Now</button></p>';
        } else {
            resultDiv.style.backgroundColor = 'rgba(255, 184, 0, 0.1)'; // Orange warning
            resultDiv.style.border = '2px solid #ffb800';
            resultDiv.innerHTML = '<h3 style="color:#ffb800; margin-bottom:5px;">⚠️ Needs Review</h3><p style="margin:0; color:white;">Your score is okay, but we need to check more details. <br><button class="btn btn-secondary mt-2" onclick="showTab(\'appointment\', document.querySelectorAll(\'.nav-item\')[2])">Talk to Expert</button></p>';
        }
    });
}

// Application Wizard
function nextStep(step) {
    window.scrollTo(0, 0); // Scroll to top
    // Hide all steps
    for (let i = 1; i <= 4; i++) {
        const el = document.getElementById('apply-step-' + i);
        if (el) el.style.display = 'none';

        // Update progress bar
        const node = document.getElementById('step-node-' + i);
        if (i < step) {
            node.classList.add('completed');
            node.classList.remove('active');
        } else if (i === step) {
            node.classList.add('active');
            node.classList.remove('completed');
        } else {
            node.classList.remove('active', 'completed');
        }
    }
    const target = document.getElementById('apply-step-' + step);
    if (target) {
        target.style.display = 'block';
        // Add animation
        target.style.animation = 'fadeIn 0.5s';
    }
}

function prevStep(step) {
    nextStep(step);
}

// Submit Application
function submitApplication() {
    const btn = document.querySelector('#apply-step-4 button');
    const originalText = btn.innerText;
    btn.innerText = 'Sending... Please Wait ⏳';
    btn.disabled = true;

    setTimeout(() => {
        alert('🎉 Application Sent Successfully! \n\nCheck your email inbox later.');

        btn.innerText = 'Sent ✅';
        // Go back to dashboard
        setTimeout(() => {
            showTab('dashboard', document.querySelectorAll('.nav-item')[0]);
            // Reset wizard
            nextStep(1);
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1000);
    }, 2000);
}

// Mobile Toggle
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');

if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing
        sidebar.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target) && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });
}
