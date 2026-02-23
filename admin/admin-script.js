// ====================================
// BIS Admin Panel - Enhanced Version
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
let currentDoctorIndex = null;
let coursesData = [];
let scheduleData = {};
let activeLevel = 1; // Default to Level 1
let hasUnsavedChanges = false;

// Time Slots Configuration
const TIME_SLOTS = [
    { id: 1, label: '8:00 AM - 10:00 AM' },
    { id: 2, label: '10:00 AM - 12:00 AM' },
    { id: 3, label: '12:00 AM - 2:00 PM' },
    { id: 4, label: '2:00 PM - 4:00 PM' },
    { id: 5, label: '4:00 PM - 6:00 PM' },
    { id: 6, label: '6:00 PM - 8:00 PM' }
];

const DAYS = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

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
    if (hasUnsavedChanges) {
        if (!confirm('You have unsaved changes. Are you sure you want to logout?')) {
            return;
        }
    }
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
    document.getElementById('loginView').classList.remove('hidden');
    document.getElementById('dashboardView').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('loginView').classList.add('hidden');
    document.getElementById('dashboardView').classList.remove('hidden');
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

function showFloatingSaveBtn() {
    document.getElementById('floatingSaveBtn').classList.remove('hidden');
    hasUnsavedChanges = true;
}

function hideFloatingSaveBtn() {
    document.getElementById('floatingSaveBtn').classList.add('hidden');
    hasUnsavedChanges = false;
}

// ====================================
// Navigation
// ====================================

document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', function() {
        if (hasUnsavedChanges) {
            if (!confirm('You have unsaved changes. Continue anyway?')) {
                return;
            }
        }
        
        const view = this.getAttribute('data-view');
        switchView(view);
    });
});

function switchView(viewName) {
    // Update nav buttons
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-view') === viewName) {
            btn.classList.add('active');
        }
    });
    
    // Hide all views
    document.querySelectorAll('.content-view').forEach(v => {
        v.classList.add('hidden');
    });
    
    // Show selected view
    const viewMap = {
        'courses': { view: 'coursesView', title: 'GPA Courses Management' },
        'schedule': { view: 'scheduleView', title: 'Schedule Data Management' },
        'settings': { view: 'settingsView', title: 'Settings' }
    };
    
    const selected = viewMap[viewName];
    document.getElementById(selected.view).classList.remove('hidden');
    document.getElementById('pageTitle').textContent = selected.title;
    
    if (viewName === 'schedule') {
        loadScheduleForLevel(document.getElementById('scheduleLevel').value);
    } else if (viewName === 'courses') {
        renderCoursesForLevel(activeLevel);
    }
    
    hideFloatingSaveBtn();
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
        renderCoursesForLevel(activeLevel);
        updateCourseCounts();
        
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
// Level Tabs for Courses
// ====================================

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const level = parseInt(this.getAttribute('data-level'));
        switchToLevel(level);
    });
});

function switchToLevel(level) {
    activeLevel = level;
    
    // Update tab UI
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.getAttribute('data-level')) === level) {
            btn.classList.add('active');
        }
    });
    
    // Render courses for this level
    renderCoursesForLevel(level);
}

function updateCourseCounts() {
    for (let level = 1; level <= 4; level++) {
        const count = coursesData.filter(c => c.level === level).length;
        const countEl = document.getElementById(`count-level-${level}`);
        if (countEl) {
            countEl.textContent = count;
        }
    }
}

// ====================================
// Courses CRUD with Level Filtering
// ====================================

function renderCoursesForLevel(level) {
    const tbody = document.getElementById('coursesTableBody');
    const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
    
    // Filter by level and search
    let filtered = coursesData.filter(course => course.level === level);
    
    if (searchTerm) {
        filtered = filtered.filter(course => 
            course.code.toLowerCase().includes(searchTerm) ||
            course.name.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr class="empty-state"><td colspan="5">No courses found for this level</td></tr>';
        return;
    }
    
    tbody.innerHTML = filtered.map((course, originalIndex) => {
        // Find the original index in coursesData
        const globalIndex = coursesData.findIndex(c => 
            c.code === course.code && c.level === course.level && c.semester === course.semester
        );
        
        return `
        <tr>
            <td><strong>${course.code}</strong></td>
            <td>${course.name}</td>
            <td>${course.hours}</td>
            <td>Semester ${course.semester}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon btn-edit" onclick="editCourse(${globalIndex})" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteCourse(${globalIndex})" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `}).join('');
}

// Real-time Search
document.getElementById('courseSearch').addEventListener('input', function() {
    renderCoursesForLevel(activeLevel);
});

// Add Course - Smart Pre-fill with Active Level
document.getElementById('addCourseBtn').addEventListener('click', () => {
    currentCourseId = null;
    document.getElementById('courseModalTitle').textContent = 'Add Course';
    document.getElementById('courseForm').reset();
    
    // Smart pre-fill: Set level to active tab
    document.getElementById('courseLevel').value = activeLevel;
    
    document.getElementById('courseModal').classList.add('show');
});

// Course Form Submit
document.getElementById('courseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const courseData = {
        code: document.getElementById('courseCode').value.trim(),
        name: document.getElementById('courseName').value.trim(),
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
        renderCoursesForLevel(activeLevel);
        updateCourseCounts();
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
    const course = coursesData[index];
    if (!confirm(`Delete course "${course.name}" (${course.code})?`)) return;
    
    showLoading();
    try {
        coursesData.splice(index, 1);
        await database.ref('courses').set(coursesData);
        renderCoursesForLevel(activeLevel);
        updateCourseCounts();
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
// Schedule Management with Smart Forms
// ====================================

document.getElementById('scheduleLevel').addEventListener('change', function() {
    loadScheduleForLevel(this.value);
});

// Real-time Schedule Search
document.getElementById('scheduleSearch').addEventListener('input', function() {
    loadScheduleForLevel(document.getElementById('scheduleLevel').value);
});

function loadScheduleForLevel(level) {
    const grid = document.getElementById('scheduleGrid');
    const searchTerm = document.getElementById('scheduleSearch').value.toLowerCase();
    let subjects = scheduleData[level] || [];
    
    // Filter by search
    if (searchTerm) {
        subjects = subjects.filter(subject => 
            subject.name.toLowerCase().includes(searchTerm) ||
            subject.doctors.some(d => d.name.toLowerCase().includes(searchTerm))
        );
    }
    
    if (subjects.length === 0) {
        grid.innerHTML = `
            <div class="empty-state-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <p>No subjects for this level</p>
                <button class="btn-secondary" onclick="document.getElementById('addScheduleBtn').click()">Add Subject</button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = subjects.map((subject, index) => `
        <div class="schedule-card" style="border-left-color: ${subject.color}">
            <div class="schedule-card-header">
                <h3 style="color: ${subject.color}">${subject.name}</h3>
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
            <div class="doctor-accordion">
                ${subject.doctors.map((doctor, dIndex) => `
                    <div class="doctor-card">
                        <div class="doctor-header" onclick="toggleDoctorCard(this)">
                            <div class="doctor-info">
                                <span class="doctor-name">${doctor.name}</span>
                                <span class="slot-summary">${getDoctorSlotSummary(doctor)}</span>
                            </div>
                            <div class="doctor-actions">
                                <button class="btn-icon btn-edit" onclick="event.stopPropagation(); editDoctorSchedule(${level}, ${index}, ${dIndex})" title="Edit Schedule">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                </button>
                                <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </div>
                        </div>
                        <div class="doctor-details">
                            ${formatDoctorSchedule(doctor)}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function getDoctorSlotSummary(doctor) {
    const totalSlots = doctor.schedule.reduce((sum, day) => sum + day.slots.length, 0);
    const days = doctor.schedule.length;
    return `${totalSlots} slots across ${days} days`;
}

function formatDoctorSchedule(doctor) {
    return doctor.schedule.map(day => `
        <div class="day-schedule">
            <strong>${day.day}:</strong> ${day.slots.map(s => s.g).join(', ')}
        </div>
    `).join('');
}

function toggleDoctorCard(header) {
    const card = header.closest('.doctor-card');
    card.classList.toggle('expanded');
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

// Dynamic Doctor Entry (Simplified - just name, schedule built in separate modal)
function addDoctorEntry() {
    const container = document.getElementById('doctorsContainer');
    const index = container.children.length;
    
    const doctorDiv = document.createElement('div');
    doctorDiv.className = 'doctor-entry';
    doctorDiv.innerHTML = `
        <div class="doctor-entry-header">
            <input type="text" class="doctor-name-input" required placeholder="Doctor Name (e.g., Dr. Ahmed Hassan)">
            <button type="button" class="btn-icon btn-delete" onclick="this.parentElement.parentElement.remove()" title="Remove Doctor">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        <div class="doctor-schedule-preview" data-doctor-index="${index}">
            <span class="schedule-summary">No schedule added yet</span>
            <button type="button" class="btn-secondary btn-small" onclick="openScheduleBuilder(${index})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                Build Schedule
            </button>
        </div>
        <input type="hidden" class="doctor-schedule-data" value="[]">
    `;
    
    container.appendChild(doctorDiv);
}

// Open Schedule Builder Modal
let currentBuildingDoctorIndex = null;

function openScheduleBuilder(doctorIndex) {
    currentBuildingDoctorIndex = doctorIndex;
    const doctorEntry = document.querySelectorAll('.doctor-entry')[doctorIndex];
    const doctorName = doctorEntry.querySelector('.doctor-name-input').value || 'Doctor';
    const scheduleData = doctorEntry.querySelector('.doctor-schedule-data').value;
    
    document.getElementById('doctorNameDisplay').value = doctorName;
    document.getElementById('doctorModalTitle').textContent = `Edit Schedule: ${doctorName}`;
    
    // Load existing schedule
    const schedule = scheduleData ? JSON.parse(scheduleData) : [];
    renderTimeSlots(schedule);
    
    document.getElementById('doctorModal').classList.add('show');
}

// ====================================
// Time Slot Management (Smart Forms)
// ====================================

function renderTimeSlots(schedule) {
    const container = document.getElementById('timeSlotsContainer');
    container.innerHTML = '';
    
    if (schedule.length === 0) {
        addTimeSlot();
        return;
    }
    
    // Convert schedule to flat slots
    schedule.forEach(dayObj => {
        dayObj.slots.forEach(slot => {
            addTimeSlot(dayObj.day, slot.id, slot.g);
        });
    });
    
    checkScheduleConflicts();
}

function addTimeSlot(day = '', timeId = '', groupId = '') {
    const container = document.getElementById('timeSlotsContainer');
    const slotDiv = document.createElement('div');
    slotDiv.className = 'time-slot-row';
    slotDiv.innerHTML = `
        <select class="slot-day" onchange="checkScheduleConflicts()" required>
            <option value="">Select Day</option>
            ${DAYS.map(d => `<option value="${d}" ${d === day ? 'selected' : ''}>${d}</option>`).join('')}
        </select>
        <select class="slot-time" onchange="checkScheduleConflicts()" required>
            <option value="">Select Time</option>
            ${TIME_SLOTS.map(t => `<option value="${t.id}" ${t.id == timeId ? 'selected' : ''}>${t.label}</option>`).join('')}
        </select>
        <input type="text" class="slot-group" placeholder="Group (e.g., G1)" value="${groupId}" required>
        <button type="button" class="btn-icon btn-delete" onclick="this.parentElement.remove(); checkScheduleConflicts();" title="Remove Slot">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    
    container.appendChild(slotDiv);
}

// Conflict Detection
function checkScheduleConflicts() {
    const slots = document.querySelectorAll('.time-slot-row');
    const conflicts = new Map();
    const warning = document.getElementById('conflictWarning');
    
    // Clear previous conflicts
    slots.forEach(slot => slot.classList.remove('conflict'));
    
    // Check for duplicates
    slots.forEach((slot, index) => {
        const day = slot.querySelector('.slot-day').value;
        const time = slot.querySelector('.slot-time').value;
        
        if (!day || !time) return;
        
        const key = `${day}-${time}`;
        
        if (conflicts.has(key)) {
            // Mark both as conflict
            slot.classList.add('conflict');
            conflicts.get(key).classList.add('conflict');
            warning.classList.remove('hidden');
        } else {
            conflicts.set(key, slot);
        }
    });
    
    // Hide warning if no conflicts
    if (document.querySelectorAll('.time-slot-row.conflict').length === 0) {
        warning.classList.add('hidden');
    }
}

// Save Doctor Schedule (Auto-JSON Conversion)
function saveDoctorSchedule() {
    // Check for conflicts
    if (document.querySelectorAll('.time-slot-row.conflict').length > 0) {
        if (!confirm('Schedule conflicts detected! Save anyway?')) {
            return;
        }
    }
    
    const slots = document.querySelectorAll('.time-slot-row');
    const scheduleByDay = {};
    
    // Group slots by day
    slots.forEach(slot => {
        const day = slot.querySelector('.slot-day').value;
        const timeId = parseInt(slot.querySelector('.slot-time').value);
        const groupId = slot.querySelector('.slot-group').value.trim();
        
        if (!day || !timeId || !groupId) return;
        
        if (!scheduleByDay[day]) {
            scheduleByDay[day] = [];
        }
        
        scheduleByDay[day].push({ id: timeId, g: groupId });
    });
    
    // Convert to schedule array format
    const schedule = Object.keys(scheduleByDay).map(day => ({
        day: day,
        slots: scheduleByDay[day]
    }));
    
    // Save to hidden input in doctor entry
    const doctorEntry = document.querySelectorAll('.doctor-entry')[currentBuildingDoctorIndex];
    doctorEntry.querySelector('.doctor-schedule-data').value = JSON.stringify(schedule);
    
    // Update preview
    const preview = doctorEntry.querySelector('.schedule-summary');
    const totalSlots = schedule.reduce((sum, day) => sum + day.slots.length, 0);
    preview.textContent = `${totalSlots} slots across ${schedule.length} days`;
    
    closeDoctorModal();
    showToast('Schedule saved!', 'success');
}

function closeDoctorModal() {
    document.getElementById('doctorModal').classList.remove('show');
    currentBuildingDoctorIndex = null;
}

// Schedule Form Submit (Auto-JSON Conversion)
document.getElementById('scheduleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const level = parseInt(document.getElementById('subjectLevel').value);
    const subjectData = {
        name: document.getElementById('subjectName').value.trim(),
        color: document.getElementById('subjectColor').value,
        doctors: []
    };
    
    // Build doctors array from entries
    const doctorEntries = document.querySelectorAll('.doctor-entry');
    doctorEntries.forEach(entry => {
        const name = entry.querySelector('.doctor-name-input').value.trim();
        const scheduleJSON = entry.querySelector('.doctor-schedule-data').value;
        
        if (!name) return;
        
        const schedule = scheduleJSON ? JSON.parse(scheduleJSON) : [];
        subjectData.doctors.push({ name, schedule });
    });
    
    if (subjectData.doctors.length === 0) {
        showToast('Please add at least one doctor', 'error');
        return;
    }
    
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
    
    subject.doctors.forEach((doctor, dIndex) => {
        addDoctorEntry();
        const lastEntry = container.lastElementChild;
        lastEntry.querySelector('.doctor-name-input').value = doctor.name;
        lastEntry.querySelector('.doctor-schedule-data').value = JSON.stringify(doctor.schedule);
        
        // Update preview
        const totalSlots = doctor.schedule.reduce((sum, day) => sum + day.slots.length, 0);
        lastEntry.querySelector('.schedule-summary').textContent = `${totalSlots} slots across ${doctor.schedule.length} days`;
    });
    
    document.getElementById('scheduleModal').classList.add('show');
}

function editDoctorSchedule(level, subjectIndex, doctorIndex) {
    const subject = scheduleData[level][subjectIndex];
    const doctor = subject.doctors[doctorIndex];
    
    document.getElementById('doctorNameDisplay').value = doctor.name;
    document.getElementById('doctorModalTitle').textContent = `Edit Schedule: ${doctor.name}`;
    
    renderTimeSlots(doctor.schedule);
    
    // Store reference for saving
    window.currentEditingDoctor = { level, subjectIndex, doctorIndex };
    
    document.getElementById('doctorModal').classList.add('show');
}

// Override save function when editing existing doctor
const originalSaveDoctorSchedule = saveDoctorSchedule;
window.addEventListener('DOMContentLoaded', () => {
    window.saveDoctorSchedule = function() {
        if (window.currentEditingDoctor) {
            // Editing existing doctor in schedule
            const { level, subjectIndex, doctorIndex } = window.currentEditingDoctor;
            
            // Check conflicts
            if (document.querySelectorAll('.time-slot-row.conflict').length > 0) {
                if (!confirm('Schedule conflicts detected! Save anyway?')) {
                    return;
                }
            }
            
            const slots = document.querySelectorAll('.time-slot-row');
            const scheduleByDay = {};
            
            slots.forEach(slot => {
                const day = slot.querySelector('.slot-day').value;
                const timeId = parseInt(slot.querySelector('.slot-time').value);
                const groupId = slot.querySelector('.slot-group').value.trim();
                
                if (!day || !timeId || !groupId) return;
                
                if (!scheduleByDay[day]) {
                    scheduleByDay[day] = [];
                }
                
                scheduleByDay[day].push({ id: timeId, g: groupId });
            });
            
            const schedule = Object.keys(scheduleByDay).map(day => ({
                day: day,
                slots: scheduleByDay[day]
            }));
            
            // Update in scheduleData
            scheduleData[level][subjectIndex].doctors[doctorIndex].schedule = schedule;
            
            // Save to Firebase
            database.ref('schedule').set(scheduleData).then(() => {
                loadScheduleForLevel(level);
                closeDoctorModal();
                showToast('Doctor schedule updated!', 'success');
                window.currentEditingDoctor = null;
            });
        } else {
            // Building new doctor schedule
            originalSaveDoctorSchedule();
        }
    };
});

async function deleteSubject(level, index) {
    const subject = scheduleData[level][index];
    if (!confirm(`Delete subject "${subject.name}"?`)) return;
    
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

// ====================================
// Floating Save Button
// ====================================

document.getElementById('floatingSaveBtn').addEventListener('click', async () => {
    showLoading();
    try {
        await Promise.all([
            database.ref('courses').set(coursesData),
            database.ref('schedule').set(scheduleData)
        ]);
        hideFloatingSaveBtn();
        showToast('All changes saved successfully!', 'success');
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Error saving changes: ' + error.message, 'error');
    }
});

// Sync Data
document.getElementById('syncDataBtn').addEventListener('click', () => {
    loadAllData();
    showToast('Data synced successfully!', 'success');
});

// Initialize
console.log('🔥 BIS Admin Panel Enhanced Version Loaded');
console.log('✨ Features: Tabbed Navigation, Smart Forms, Conflict Detection, Auto-JSON Conversion');
