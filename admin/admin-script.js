// ====================================
// BIS Admin Panel - Firebase Integration
// ====================================

// Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBFbHh80H1stkEo4fEr1xgBYw82XUQy3DI",
    authDomain: "bis-student-portal.firebaseapp.com",
    databaseURL: "https://bis-student-portal-default-rtdb.firebaseio.com",
    projectId: "bis-student-portal",
    storageBucket: "bis-student-portal.firebasestorage.app",
    messagingSenderId: "1052249954406",
    appId: "1:1052249954406:web:8654dd50dc757b4e4c75a7",
    measurementId: "G-Q5X81FD91K"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Global State
let currentUser = null;
let currentCourseId = null;
let currentSubjectId = null;
let coursesData = [];
let scheduleData = {};

// ====================================
// Authentication Functions
// ====================================

// Check Auth State
auth.onAuthStateChanged((user) => {
    hideLoading();
    if (user) {
        currentUser = user;
        showDashboard();
        loadAllData();
    } else {
        showLogin();
    }
});

// Login Handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    showLoading();
    try {
        await auth.signInWithEmailAndPassword(email, password);
        showToast('Login successful!', 'success');
    } catch (error) {
        hideLoading();
        showToast(error.message, 'error');
    }
});

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', async () => {
    if (confirm('Are you sure you want to logout?')) {
        showLoading();
        await auth.signOut();
        showToast('Logged out successfully', 'success');
    }
});

// ====================================
// UI Functions
// ====================================

function showLogin() {
    document.getElementById('loginView').style.display = 'flex';
    document.getElementById('dashboardView').style.display = 'none';
}

function showDashboard() {
    document.getElementById('loginView').style.display = 'none';
    document.getElementById('dashboardView').style.display = 'grid';
    document.getElementById('adminEmail').textContent = currentUser.email;
}

function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = toast.querySelector('.toast-icon');
    const msg = toast.querySelector('.toast-message');
    
    toast.className = `toast ${type} show`;
    icon.textContent = type === 'success' ? '✓' : '✗';
    msg.textContent = message;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ====================================
// Navigation
// ====================================

document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', function() {
        const view = this.getAttribute('data-view');
        switchView(view);
    });
});

function switchView(viewName) {
    // Update nav buttons
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Hide all views
    document.querySelectorAll('.content-view').forEach(v => {
        v.style.display = 'none';
    });
    
    // Show selected view
    const viewMap = {
        'courses': { view: 'coursesView', title: 'GPA Courses Management' },
        'schedule': { view: 'scheduleView', title: 'Schedule Data Management' },
        'settings': { view: 'settingsView', title: 'Settings' }
    };
    
    const selected = viewMap[viewName];
    document.getElementById(selected.view).style.display = 'block';
    document.getElementById('pageTitle').textContent = selected.title;
    
    if (viewName === 'schedule') {
        loadScheduleForLevel(document.getElementById('scheduleLevel').value);
    }
}

// ====================================
// Data Loading
// ====================================

async function loadAllData() {
    showLoading();
    try {
        // Load courses
        const coursesSnapshot = await database.ref('courses').once('value');
        coursesData = coursesSnapshot.val() || [];
        renderCoursesTable(coursesData);
        
        // Load schedule
        const scheduleSnapshot = await database.ref('schedule').once('value');
        scheduleData = scheduleSnapshot.val() || { 1: [], 2: [], 3: [], 4: [] };
        loadScheduleForLevel(2);
        
        // Update settings
        document.getElementById('dbUrl').value = firebaseConfig.databaseURL;
        document.getElementById('lastSync').value = new Date().toLocaleString();
        
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Error loading data: ' + error.message, 'error');
    }
}

// ====================================
// Courses CRUD
// ====================================

function renderCoursesTable(courses) {
    const tbody = document.getElementById('coursesTableBody');
    
    if (!courses || courses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No courses found. Click "Add Course" to create one.</td></tr>';
        return;
    }
    
    tbody.innerHTML = courses.map((course, index) => `
        <tr>
            <td><strong>${course.code}</strong></td>
            <td>${course.name}</td>
            <td>${course.hours}</td>
            <td>Level ${course.level}</td>
            <td>Semester ${course.semester}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon btn-edit" onclick="editCourse(${index})" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteCourse(${index})" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Course Search
document.getElementById('courseSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = coursesData.filter(course => 
        course.code.toLowerCase().includes(searchTerm) ||
        course.name.toLowerCase().includes(searchTerm)
    );
    renderCoursesTable(filtered);
});

// Add Course
document.getElementById('addCourseBtn').addEventListener('click', () => {
    currentCourseId = null;
    document.getElementById('courseModalTitle').textContent = 'Add Course';
    document.getElementById('courseForm').reset();
    document.getElementById('courseModal').classList.add('show');
});

// Course Form Submit
document.getElementById('courseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const courseData = {
        code: document.getElementById('courseCode').value,
        name: document.getElementById('courseName').value,
        hours: parseInt(document.getElementById('courseHours').value),
        level: parseInt(document.getElementById('courseLevel').value),
        semester: parseInt(document.getElementById('courseSemester').value)
    };
    
    showLoading();
    try {
        if (currentCourseId !== null) {
            // Update existing
            coursesData[currentCourseId] = courseData;
        } else {
            // Add new
            coursesData.push(courseData);
        }
        
        await database.ref('courses').set(coursesData);
        renderCoursesTable(coursesData);
        closeCourseModal();
        showToast(`Course ${currentCourseId !== null ? 'updated' : 'added'} successfully!`, 'success');
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Error saving course: ' + error.message, 'error');
    }
});

function editCourse(index) {
    currentCourseId = index;
    const course = coursesData[index];
    
    document.getElementById('courseModalTitle').textContent = 'Edit Course';
    document.getElementById('courseCode').value = course.code;
    document.getElementById('courseName').value = course.name;
    document.getElementById('courseHours').value = course.hours;
    document.getElementById('courseLevel').value = course.level;
    document.getElementById('courseSemester').value = course.semester;
    
    document.getElementById('courseModal').classList.add('show');
}

async function deleteCourse(index) {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    showLoading();
    try {
        coursesData.splice(index, 1);
        await database.ref('courses').set(coursesData);
        renderCoursesTable(coursesData);
        showToast('Course deleted successfully!', 'success');
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Error deleting course: ' + error.message, 'error');
    }
}

function closeCourseModal() {
    document.getElementById('courseModal').classList.remove('show');
}

// ====================================
// Schedule CRUD
// ====================================

document.getElementById('scheduleLevel').addEventListener('change', function() {
    loadScheduleForLevel(this.value);
});

function loadScheduleForLevel(level) {
    const grid = document.getElementById('scheduleGrid');
    const subjects = scheduleData[level] || [];
    
    if (subjects.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">No subjects for this level. Click "Add Subject" to create one.</div>';
        return;
    }
    
    grid.innerHTML = subjects.map((subject, index) => `
        <div class="schedule-card" style="border-left-color: ${subject.color}">
            <div class="schedule-card-header">
                <h3>${subject.name}</h3>
                <div class="table-actions">
                    <button class="btn-icon btn-edit" onclick="editSubject(${level}, ${index})" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteSubject(${level}, ${index})" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="doctor-list">
                ${subject.doctors.map(doctor => `
                    <div class="doctor-item">
                        <div class="doctor-name">${doctor.name}</div>
                        <div class="doctor-schedule">
                            ${doctor.schedule.map(s => 
                                `${s.day}: ${s.slots.map(slot => slot.g).join(', ')}`
                            ).join(' | ')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Add Subject
document.getElementById('addScheduleBtn').addEventListener('click', () => {
    currentSubjectId = null;
    document.getElementById('scheduleModalTitle').textContent = 'Add Subject';
    document.getElementById('scheduleForm').reset();
    document.getElementById('subjectLevel').value = document.getElementById('scheduleLevel').value;
    document.getElementById('doctorsContainer').innerHTML = '';
    addDoctorEntry();
    document.getElementById('scheduleModal').classList.add('show');
});

function addDoctorEntry() {
    const container = document.getElementById('doctorsContainer');
    const index = container.children.length;
    
    const doctorDiv = document.createElement('div');
    doctorDiv.className = 'doctor-entry';
    doctorDiv.style.cssText = 'background: var(--bg-main); padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem;';
    doctorDiv.innerHTML = `
        <div class="form-group">
            <label>Doctor Name</label>
            <input type="text" class="doctor-name-input" required placeholder="Dr. Name">
        </div>
        <div class="form-group">
            <label>Schedule (JSON format)</label>
            <textarea class="doctor-schedule-input" rows="4" required placeholder='[{"day": "Sunday", "slots": [{"id": 1, "g": "G1"}]}]'></textarea>
            <small style="color: var(--text-secondary);">Format: [{"day": "Sunday", "slots": [{"id": 1, "g": "G1"}]}]</small>
        </div>
        <button type="button" class="btn-secondary btn-small" onclick="this.parentElement.remove()">Remove Doctor</button>
    `;
    
    container.appendChild(doctorDiv);
}

// Schedule Form Submit
document.getElementById('scheduleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const level = parseInt(document.getElementById('subjectLevel').value);
    const subjectData = {
        name: document.getElementById('subjectName').value,
        color: document.getElementById('subjectColor').value,
        doctors: []
    };
    
    // Parse doctors
    document.querySelectorAll('.doctor-entry').forEach(entry => {
        try {
            const name = entry.querySelector('.doctor-name-input').value;
            const scheduleText = entry.querySelector('.doctor-schedule-input').value;
            const schedule = JSON.parse(scheduleText);
            
            subjectData.doctors.push({ name, schedule });
        } catch (error) {
            showToast('Invalid schedule JSON format', 'error');
            throw error;
        }
    });
    
    showLoading();
    try {
        if (!scheduleData[level]) scheduleData[level] = [];
        
        if (currentSubjectId !== null) {
            scheduleData[level][currentSubjectId] = subjectData;
        } else {
            scheduleData[level].push(subjectData);
        }
        
        await database.ref('schedule').set(scheduleData);
        loadScheduleForLevel(level);
        closeScheduleModal();
        showToast(`Subject ${currentSubjectId !== null ? 'updated' : 'added'} successfully!`, 'success');
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Error saving subject: ' + error.message, 'error');
    }
});

function editSubject(level, index) {
    currentSubjectId = index;
    const subject = scheduleData[level][index];
    
    document.getElementById('scheduleModalTitle').textContent = 'Edit Subject';
    document.getElementById('subjectName').value = subject.name;
    document.getElementById('subjectColor').value = subject.color;
    document.getElementById('subjectLevel').value = level;
    
    const container = document.getElementById('doctorsContainer');
    container.innerHTML = '';
    
    subject.doctors.forEach(doctor => {
        addDoctorEntry();
        const lastEntry = container.lastElementChild;
        lastEntry.querySelector('.doctor-name-input').value = doctor.name;
        lastEntry.querySelector('.doctor-schedule-input').value = JSON.stringify(doctor.schedule, null, 2);
    });
    
    document.getElementById('scheduleModal').classList.add('show');
}

async function deleteSubject(level, index) {
    if (!confirm('Are you sure you want to delete this subject?')) return;
    
    showLoading();
    try {
        scheduleData[level].splice(index, 1);
        await database.ref('schedule').set(scheduleData);
        loadScheduleForLevel(level);
        showToast('Subject deleted successfully!', 'success');
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Error deleting subject: ' + error.message, 'error');
    }
}

function closeScheduleModal() {
    document.getElementById('scheduleModal').classList.remove('show');
}

// Sync Data
document.getElementById('syncDataBtn').addEventListener('click', () => {
    loadAllData();
    showToast('Data synced successfully!', 'success');
});

// Initialize
console.log('🔥 BIS Admin Panel Loaded');
console.log('📊 Firebase Integration Active');
