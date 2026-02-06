// 1. Time Slots & Days Configuration
const timeSlots = [
    { id: 1, display: '8:10 - 10:12' },
    { id: 2, display: '10:12 - 12:2' },
    { id: 3, display: '12:2 - 2:4' },
    { id: 4, display: '2:4 - 4:6' },
    { id: 5, display: '4:6 - 6:8' }
];

const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

// 2. Comprehensive Level 2 Course Data (All Doctors from PDF)
const updatedCoursesData = {
    2: [
        {
            name: 'Money and Banking',
            color: '#ef4444',
            doctors: [
                { name: 'Dr. Mahmoud Eltony', schedule: [{ day: 'Saturday', slots: [{id: 2, g: 'G18'}, {id: 3, g: 'G19'}] }, { day: 'Sunday', slots: [{id: 1, g: 'G20'}, {id: 2, g: 'G21'}, {id: 3, g: 'G22'}] }] },
                { name: 'Dr. Mohamed Abdel Wahid', schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}, {id: 3, g: 'G3'}] }, { day: 'Sunday', slots: [{id: 1, g: 'G4'}, {id: 2, g: 'G5'}, {id: 3, g: 'G6'}] }, { day: 'Monday', slots: [{id: 1, g: 'G7'}, {id: 2, g: 'G8'}, {id: 3, g: 'G9'}] }] },
                { name: 'Dr. Gaber Abdel Gawad', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G10'}, {id: 2, g: 'G11'}, {id: 3, g: 'G12'}] }, { day: 'Monday', slots: [{id: 1, g: 'G13'}, {id: 2, g: 'G14'}, {id: 3, g: 'G15'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G16'}, {id: 2, g: 'G17'}] }] },
                { name: 'Dr. Thoraya', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G24'}, {id: 2, g: 'G25'}, {id: 3, g: 'G26'}] }] }
            ]
        },
        {
            name: 'Accounting for Corporations',
            color: '#3b82f6',
            doctors: [
                { name: 'Dr. Amr Hassan', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G10'}, {id: 2, g: 'G11'}] }] },
                { name: 'Dr. Mohamed El Ardy', schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}] }, { day: 'Sunday', slots: [{id: 1, g: 'G3'}, {id: 2, g: 'G4'}, {id: 4, g: 'G5'}] }, { day: 'Monday', slots: [{id: 1, g: 'G6'}, {id: 2, g: 'G7'}] }] },
                { name: 'Dr. Ahmed Ibrahim', schedule: [{ day: 'Saturday', slots: [{id: 3, g: 'G14'}] }, { day: 'Sunday', slots: [{id: 1, g: 'G15'}, {id: 2, g: 'G16'}, {id: 4, g: 'G17'}] }] },
                { name: 'Dr. Soha Samir', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G18'}, {id: 2, g: 'G19'}, {id: 3, g: 'G20'}] }, { day: 'Monday', slots: [{id: 1, g: 'G21'}, {id: 2, g: 'G22'}, {id: 3, g: 'G23'}] }, { day: 'Thursday', slots: [{id: 1, g: 'G24'}, {id: 2, g: 'G25'}, {id: 3, g: 'G26'}] }] },
                { name: 'Dr. Yasmeen Abdel Aal', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G8'}, {id: 2, g: 'G9'}] }] },
                { name: 'Dr. Hamdy Habl', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G22'}, {id: 2, g: 'G23'}, {id: 3, g: 'G24'}] }] }
            ]
        },
        {
            name: 'System Analysis 2',
            color: '#8b5cf6',
            doctors: [
                { name: 'Dr. Menna Ibrahim', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G8'}, {id: 2, g: 'G9'}, {id: 3, g: 'G10'}] }] },
                { name: 'Dr. Wael Karam', schedule: [{ day: 'Saturday', slots: [{id: 4, g: 'G1'}] }, { day: 'Thursday', slots: [{id: 2, g: 'G2'}, {id: 3, g: 'G3'}, {id: 4, g: 'G4'}] }] },
                { name: 'Dr. Ashraf Said', schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'G22'}] }, { day: 'Sunday', slots: [{id: 2, g: 'G15'}] }] },
                { name: 'Dr. Amr Galal', schedule: [{ day: 'Saturday', slots: [{id: 2, g: 'G5'}, {id: 3, g: 'G6'}, {id: 4, g: 'G7'}] }] },
                { name: 'Dr. Antony', schedule: [{ day: 'Tuesday', slots: [{id: 1, g: 'G11'}, {id: 2, g: 'G12'}, {id: 3, g: 'G13'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G14'}] }] },
                { name: 'Dr. Walaa Mohamed', schedule: [{ day: 'Wednesday', slots: [{id: 1, g: 'G19'}, {id: 2, g: 'G20'}, {id: 3, g: 'G21'}] }] },
                { name: 'Dr. Sara Naeem', schedule: [{ day: 'Thursday', slots: [{id: 2, g: 'G15'}, {id: 3, g: 'G16'}, {id: 4, g: 'G17'}] }] },
                { name: 'Dr. Amira Mohie', schedule: [{ day: 'Wednesday', slots: [{id: 1, g: 'G23'}, {id: 2, g: 'G24'}, {id: 3, g: 'G25'}] }] }
            ]
        },
        {
            name: 'Programming 2',
            color: '#f59e0b',
            doctors: [
                { name: 'Dr. Mahmoud Bahlol', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G25'}, {id: 2, g: 'G26'}] }] },
                { name: 'Dr. Amr Mansour', schedule: [{ day: 'Saturday', slots: [{id: 4, g: 'G21'}, {id: 5, g: 'G22'}] }, { day: 'Tuesday', slots: [{id: 2, g: 'G23'}, {id: 3, g: 'G24'}] }] },
                { name: 'Dr. Wael Haider', schedule: [{ day: 'Tuesday', slots: [{id: 3, g: 'G17'}] }, { day: 'Thursday', slots: [{id: 2, g: 'G18'}, {id: 3, g: 'G19'}, {id: 4, g: 'G20'}] }] },
                { name: 'Dr. Mahmoud Halawa', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G9'}, {id: 2, g: 'G10'}, {id: 3, g: 'G11'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G12'}] }] },
                { name: 'Dr. Mohamed Atteya', schedule: [{ day: 'Wednesday', slots: [{id: 4, g: 'G5'}, {id: 5, g: 'G6'}] }, { day: 'Thursday', slots: [{id: 4, g: 'G7'}, {id: 5, g: 'G8'}] }] },
                { name: 'Dr. Amr Ibrahim', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G13'}, {id: 1, g: 'G14'}, {id: 2, g: 'G15'}, {id: 3, g: 'G16'}] }] },
                { name: 'Dr. Heba Mohsen', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}, {id: 3, g: 'G3'}, {id: 1, g: 'G4'}] }] }
            ]
        },
        {
            name: 'Marketing',
            color: '#ec4899',
            doctors: [
                { name: 'Dr. Wafaa Abdel Samie', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}, {id: 3, g: 'G3'}] }, { day: 'Tuesday', slots: [{id: 1, g: 'G4'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G5'}, {id: 2, g: 'G6'}, {id: 3, g: 'G7'}] }] },
                { name: 'Dr. Rasha El Naggar', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G8'}, {id: 2, g: 'G9'}, {id: 3, g: 'G10'}] }] },
                { name: 'Dr. Amira Moussa', schedule: [{ day: 'Wednesday', slots: [{id: 1, g: 'G11'}, {id: 2, g: 'G12'}, {id: 3, g: 'G13'}] }] },
                { name: 'Dr. Mohamed Ramadan', schedule: [{ day: 'Tuesday', slots: [{id: 2, g: 'G14'}, {id: 4, g: 'G15'}, {id: 5, g: 'G16'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G17'}, {id: 2, g: 'G18'}, {id: 4, g: 'G19'}] }] },
                { name: 'Dr. Mostafa Youssef', schedule: [{ day: 'Tuesday', slots: [{id: 2, g: 'G20'}, {id: 4, g: 'G21'}, {id: 5, g: 'G22'}] }, { day: 'Thursday', slots: [{id: 3, g: 'G23'}] }] },
                { name: 'Dr. Sarah Hashem', schedule: [{ day: 'Thursday', slots: [{id: 3, g: 'G24'}, {id: 1, g: 'G25'}, {id: 2, g: 'G26'}] }] }
            ]
        },
        {
            name: 'Creative Thinking',
            color: '#14b8a6',
            doctors: [
                { name: 'Dr. Mohamed El Tayar', schedule: [{ day: 'Thursday', slots: [{id: 2, g: 'G17'}, {id: 3, g: 'G18'}, {id: 4, g: 'G19'}] }] },
                { name: 'Dr. Mai Qenawi', schedule: [{ day: 'Wednesday', slots: [{id: 1, g: 'G14'}, {id: 2, g: 'G15'}, {id: 3, g: 'G16'}] }] },
                { name: 'Dr. Hanan Morsi', schedule: [{ day: 'Saturday', slots: [{id: 4, g: 'G10'}, {id: 5, g: 'G11'}] }] },
                { name: 'Dr. Abeer El Ghandour', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}, {id: 3, g: 'G3'}] }] },
                { name: 'Dr. Mohamed Obeid', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G24'}, {id: 3, g: 'G25'}, {id: 4, g: 'G26'}] }] },
                { name: 'Dr. Marwa El Badry', schedule: [{ day: 'Monday', slots: [{id: 4, g: 'G4'}, {id: 5, g: 'G5'}] }] },
                { name: 'Dr. Mona Zaghloul', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G20'}, {id: 2, g: 'G21'}] }] },
                { name: 'Dr. Nahla El Shourbagy', schedule: [{ day: 'Thursday', slots: [{id: 3, g: 'G22'}, {id: 4, g: 'G23'}] }] }
            ]
        }
    ]
};

// 3. Logic & State Management
let selectedYear = null;
let scheduleData = {}; 
let previewData = null;

function initScheduleTable() {
    const tbody = document.getElementById('scheduleBody');
    tbody.innerHTML = '';
    days.forEach(day => {
        const row = document.createElement('tr');
        const dayCell = document.createElement('td');
        dayCell.className = 'day-column';
        dayCell.textContent = day;
        row.appendChild(dayCell);
        timeSlots.forEach(slot => {
            const cell = document.createElement('td');
            cell.id = `${day}-${slot.id}`;
            cell.className = 'schedule-cell';
            cell.setAttribute('data-day', day);
            cell.setAttribute('data-slot', slot.id);
            cell.innerHTML = '<div class="slot-content slot-empty">Free</div>';
            cell.addEventListener('click', () => handleSlotClick(day, slot.id));
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

function selectYear(year) {
    selectedYear = year;
    document.querySelectorAll('.year-card').forEach(c => c.classList.remove('active'));
    event.target.closest('.year-card').classList.add('active');
    loadSubjects(year);
    document.getElementById('subjectSection').style.display = 'block';
    document.getElementById('scheduleSection').style.display = 'block';
    initScheduleTable();
    scheduleData = {};
    previewData = null;
}

function loadSubjects(year) {
    const container = document.getElementById('subjectsContainer');
    const courses = updatedCoursesData[year] || [];
    container.innerHTML = courses.map((course) => `
        <div class="subject-card">
            <div class="subject-header">
                <div class="subject-color" style="background: ${course.color};"></div>
                <div class="subject-name">${course.name}</div>
            </div>
            <div class="doctor-list">
                ${course.doctors.map((doctor, idx) => `
                    <div class="doctor-item" data-subject-name="${course.name}" data-doctor-name="${doctor.name}" data-color="${course.color}" data-doctor-index="${idx}">
                        <div class="doctor-name">👨‍🏫 ${doctor.name}</div>
                        <div class="doctor-schedule">${formatSchedule(doctor.schedule)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.doctor-item').forEach(item => {
        item.addEventListener('click', function() {
            const subjectName = this.getAttribute('data-subject-name');
            const doctorName = this.getAttribute('data-doctor-name');
            const color = this.getAttribute('data-color');
            const doctorIndex = parseInt(this.getAttribute('data-doctor-index'));
            const course = courses.find(c => c.name === subjectName);
            previewDoctor(subjectName, doctorName, color, course.doctors[doctorIndex].schedule);
        });
    });
}

function formatSchedule(schedule) {
    return schedule.map(item => `${item.day}: ${item.slots.map(s => s.g).join(', ')}`).join(' | ');
}

function previewDoctor(subjectName, doctorName, color, schedule) {
    clearPreview();
    previewData = { name: subjectName, doctor: doctorName, color: color, schedule: schedule };
    document.querySelectorAll('.doctor-item').forEach(i => i.classList.remove('selected'));
    event.target.closest('.doctor-item').classList.add('selected');
    schedule.forEach(item => {
        item.slots.forEach(slotData => {
            const cell = document.getElementById(`${item.day}-${slotData.id}`);
            if (cell && !isSlotOccupied(item.day, slotData.id)) {
                cell.classList.add('preview-highlight');
                cell.innerHTML = `
                    <div class="slot-content slot-preview" style="background: ${color}; opacity: 0.6;">
                        <div class="slot-subject">${subjectName}</div>
                        <div class="slot-doctor">${doctorName}</div>
                        <div class="slot-group">${slotData.g}</div>
                    </div>`;
            }
        });
    });
}

function handleSlotClick(day, slotId) {
    if (!previewData) return;
    const key = `${day}-${slotId}`;
    if (isSlotOccupied(day, slotId)) return alert('⚠️ Conflict! This slot is already taken.');

    let slotInfo = null;
    previewData.schedule.forEach(item => {
        if (item.day === day) {
            const found = item.slots.find(s => s.id === slotId);
            if (found) slotInfo = found;
        }
    });

    if (!slotInfo) return alert('⚠️ This slot is not available for the selected doctor.');

    scheduleData[key] = { ...previewData, group: slotInfo.g };
    clearPreview();
    previewData = null;
    document.querySelectorAll('.doctor-item').forEach(i => i.classList.remove('selected'));
    renderSchedule();
}

function isSlotOccupied(day, slotId) { return scheduleData.hasOwnProperty(`${day}-${slotId}`); }

function clearPreview() {
    document.querySelectorAll('.preview-highlight').forEach(cell => {
        cell.classList.remove('preview-highlight');
        if (!isSlotOccupied(cell.getAttribute('data-day'), parseInt(cell.getAttribute('data-slot')))) {
            cell.innerHTML = '<div class="slot-content slot-empty">Free</div>';
        }
    });
}

function renderSchedule() {
    days.forEach(day => {
        timeSlots.forEach(slot => {
            const cell = document.getElementById(`${day}-${slot.id}`);
            const data = scheduleData[`${day}-${slot.id}`];
            cell.innerHTML = data ? `
                <div class="slot-content slot-confirmed" style="background: ${data.color}; color: white;">
                    <div class="slot-subject">${data.name}</div>
                    <div class="slot-doctor">${data.doctor}</div>
                    <div class="slot-group">${data.group}</div>
                </div>` : '<div class="slot-content slot-empty">Free</div>';
        });
    });
}