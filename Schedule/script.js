// 1. Time Slots & Days Configuration
const timeSlots = [
    { id: 1, display: '8:00 - 10:00' },
    { id: 2, display: '10:00 - 12:00' },
    { id: 3, display: '12:00 - 2:00' },
    { id: 4, display: '2:00 - 4:00' },
    { id: 5, display: '4:00 - 6:00' },
    { id: 6, display: '6:00 - 8:00' }
];

const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

// 2. Data - UPDATED: No 'code' property, only 'name'
const updatedCoursesData = {
    1: [
        // Coming Soon - Level 1 data will be added here later
        // {
        //     name: '⚠️ Coming Soon',
        //     color: '#94a3b8',
        //     doctors: [
        //         { 
        //             name: 'Level 1 courses will be added soon', 
        //             schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'INFO'}] }] 
        //         }
        //     ]
        // }
    ],
    2: [
        {
            name: 'Money and Banking',
            color: '#ef4444',
            doctors: [
                { name: 'Dr. Mahmoud Eltony', schedule: [{ day: 'Saturday', slots: [{id: 2, g: 'G18'}, {id: 3, g: 'G19'}] }, { day: 'Sunday', slots: [{id: 2, g: 'G21'}, {id: 3, g: 'G22'}, {id: 4, g: 'G20'}] }] },
                { name: 'Dr. Mohamed Abdel Wahid', schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}, {id: 3, g: 'G3'}] }, { day: 'Sunday', slots: [{id: 1, g: 'G4'}, {id: 2, g: 'G5'}, {id: 3, g: 'G6'}] }, { day: 'Monday', slots: [{id: 1, g: 'G7'}, {id: 2, g: 'G8'}, {id: 3, g: 'G9'}] }] },
                { name: 'Dr. Gaber Abdel Gawad', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G10'}, {id: 2, g: 'G11'}, {id: 3, g: 'G12'}] }, { day: 'Monday', slots: [{id: 1, g: 'G13'}, {id: 2, g: 'G14'}, {id: 3, g: 'G15'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G16'}, {id: 2, g: 'G17'}] }] },
                { name: 'Dr. Thoraya', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G24'}, {id: 2, g: 'G25'}, {id: 3, g: 'G26'}] }] }
            ]
        },
        {
            name: 'Accounting for Corporations',
            color: '#3b82f6',
            doctors: [
                { name: 'Dr. Amr Hassan', schedule: [
                    { day: 'Sunday', slots: [{id: 1, g: 'G10'}, {id: 2, g: 'G11'}] },
                    { day: 'Monday', slots: [{id: 1, g: 'G12'}, {id: 2, g: 'G13'}] }
                ]},                   { name: 'Dr. Mohamed El Ardy', schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}] }, { day: 'Sunday', slots: [{id: 1, g: 'G3'}, {id: 2, g: 'G4'}, {id: 4, g: 'G5'}] }, { day: 'Monday', slots: [{id: 1, g: 'G6'}, {id: 2, g: 'G7'}] }] },
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
                { name: 'Dr. Walaa Mohamed', schedule: [{ day: 'Tuesday', slots: [{id: 1, g: 'G19'}, {id: 2, g: 'G20'}, {id: 3, g: 'G21'}] }] },
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
                { name: 'Dr. Amr Ibrahim', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G13'}, {id: 2, g: 'G15'}, {id: 3, g: 'G16'}] }] },
                { name: 'Dr. Heba Mohsen', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}, {id: 3, g: 'G3'}] }] }
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
                { name: 'Dr. Mostafa Youssef', schedule: [{ day: 'Tuesday', slots: [{id: 3, g: 'G20'}, {id: 4, g: 'G21'}, {id: 5, g: 'G22'}] }, { day: 'Wednesday', slots: [{id: 3, g: 'G23'}] }] },
                { name: 'Dr. Sarah Hashem', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G25'}, {id: 2, g: 'G26'}, {id: 3, g: 'G24'}] }] }
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
    ],
    3: [
        {
            name: 'Economics of Information',
            color: '#6366f1',
            doctors: [
                { name: 'Dr. Somaya Abdel Mawla', schedule: [{ day: 'Saturday', slots: [{id: 4, g: 'G4'}] }, { day: 'Sunday', slots: [{id: 1, g: 'G5'}, {id: 2, g: 'G6'}, {id: 3, g: 'G7'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G8'}, {id: 2, g: 'G9'}, {id: 3, g: 'G10'}] }] },
                { name: 'Dr. Shaimaa Wehbe', schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'G17'}, {id: 2, g: 'G18'}, {id: 3, g: 'G19'}] }, { day: 'Monday', slots: [{id: 1, g: 'G20'}, {id: 2, g: 'G21'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G22'}, {id: 2, g: 'G23'}, {id: 3, g: 'G24'}] }] },
                { name: 'Dr. Rasha El Kordi', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G11'}, {id: 2, g: 'G12'}, {id: 3, g: 'G13'}] }, { day: 'Monday', slots: [{id: 1, g: 'G14'}, {id: 2, g: 'G15'}, {id: 3, g: 'G16'}] }] },
                { name: 'Dr. Omar Salman', schedule: [{ day: 'Wednesday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}, {id: 3, g: 'G3'}] }] }
            ]
        },
        {
            name: 'Auditing',
            color: '#06b6d4',
            doctors: [
                { name: 'Dr. Eman Saad El Din', schedule: [{ day: 'Saturday', slots: [{id: 5, g: 'G18'}] }, { day: 'Monday', slots: [{id: 1, g: 'G19'}, {id: 2, g: 'G20'}, {id: 3, g: 'G21'}] }] },
                { name: 'Dr. Ashraf Mansour', schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'G9'}, {id: 2, g: 'G10'}, {id: 3, g: 'G11'}] }, { day: 'Sunday', slots: [{id: 1, g: 'G12'}, {id: 2, g: 'G13'}, {id: 3, g: 'G14'}] }, { day: 'Monday', slots: [{id: 1, g: 'G15'}, {id: 2, g: 'G16'}, {id: 3, g: 'G17'}] }] },
                { name: 'Dr. Hanan Jaber', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G3'}, {id: 2, g: 'G4'}, {id: 3, g: 'G5'}] }, { day: 'Thursday', slots: [{id: 1, g: 'G6'}, {id: 2, g: 'G7'}, {id: 3, g: 'G8'}] }] },
                { name: 'Dr. Hamdy Habl', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G22'}, {id: 2, g: 'G23'}, {id: 3, g: 'G24'}] }] }
            ]
        },
        {
            name: 'Management Information Systems',
            color: '#84cc16',
            doctors: [
                { name: 'Dr. Ahmed Mounir', schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'G11'}, {id: 2, g: 'G12'}, {id: 3, g: 'G13'}] }, { day: 'Monday', slots: [{id: 1, g: 'G10'}] }] },
                { name: 'Dr. Bishoy', schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'G17'}, {id: 2, g: 'G18'}, {id: 3, g: 'G19'}] }] },
                { name: 'Dr. Christina Albert', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G4'}, {id: 2, g: 'G5'}, {id: 3, g: 'G6'}] }] },
                { name: 'Dr. Shirin Tayea', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G7'}, {id: 2, g: 'G8'}, {id: 3, g: 'G9'}] }] },
                { name: 'Dr. Yehia Helmy', schedule: [{ day: 'Monday', slots: [{id: 2, g: 'G1'}, {id: 3, g: 'G2'}, {id: 4, g: 'G3'}] }] },
                { name: 'Dr. Dalia Magdy', schedule: [{ day: 'Wednesday', slots: [{id: 1, g: 'G14'}, {id: 2, g: 'G15'}, {id: 3, g: 'G16'}] }] },
                { name: 'Dr. Dina Helal', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G20'}, {id: 2, g: 'G21'}, {id: 3, g: 'G22'}] }] }
            ]
        },
        {
            name: 'Internet Application',
            color: '#f43f5e',
            doctors: [
                { name: 'Dr. Amani Ahmed', schedule: [{ day: 'Saturday', slots: [{id: 3, g: 'G7'}] }, { day: 'Thursday', slots: [{id: 1, g: 'G8'}, {id: 2, g: 'G9'}, {id: 3, g: 'G10'}] }] },
                { name: 'Dr. Iman Hanafi', schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'G22'}, {id: 2, g: 'G23'}, {id: 3, g: 'G24'}] }] },
                { name: 'Dr. Mortada Salah El Din', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}, {id: 4, g: 'G3'}] }] },
                { name: 'Dr. Ibrahim Zaghloul', schedule: [{ day: 'Monday', slots: [{id: 2, g: 'G4'}, {id: 3, g: 'G5'}, {id: 4, g: 'G6'}] }] },
                { name: 'Dr. Nanis Nabil', schedule: [{ day: 'Tuesday', slots: [{id: 1, g: 'G15'}, {id: 2, g: 'G16'}] }, { day: 'Thursday', slots: [{id: 1, g: 'G17'}, {id: 2, g: 'G18'}] }] },
                { name: 'Dr. Thanaa Mohamed', schedule: [{ day: 'Wednesday', slots: [{id: 1, g: 'G11'}, {id: 2, g: 'G12'}] }, { day: 'Thursday', slots: [{id: 1, g: 'G13'}, {id: 2, g: 'G14'}] }] },
                { name: 'Dr. Noura Shoaib', schedule: [{ day: 'Thursday', slots: [{id: 2, g: 'G19'}, {id: 3, g: 'G20'}, {id: 4, g: 'G21'}] }] }
            ]
        },
        {
            name: 'Advanced Database',
            color: '#a855f7',
            doctors: [
                { name: 'Dr. Mohamed Hassan', schedule: [{ day: 'Saturday', slots: [{id: 4, g: 'G9'}, {id: 5, g: 'G10'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G11'}, {id: 2, g: 'G12'}] }] },
                { name: 'Dr. Menna Mamdouh', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G23'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G24'}] }] },
                { name: 'Dr. Ibrahim El Desouki', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G5'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G6'}, {id: 2, g: 'G7'}, {id: 3, g: 'G8'}] }] },
                { name: 'Dr. Ahmed El Sidawy', schedule: [{ day: 'Monday', slots: [{id: 4, g: 'G1'}, {id: 5, g: 'G2'}] }, { day: 'Thursday', slots: [{id: 3, g: 'G3'}, {id: 4, g: 'G4'}] }] },
                { name: 'Dr. Yasser El Gedawy', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G19'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G20'}, {id: 4, g: 'G21'}, {id: 5, g: 'G22'}] }] },
                { name: 'Dr. Mira Tamer', schedule: [{ day: 'Tuesday', slots: [{id: 1, g: 'G16'}, {id: 2, g: 'G17'}, {id: 3, g: 'G18'}] }] },
                { name: 'Dr. Hany Gouda', schedule: [{ day: 'Thursday', slots: [{id: 1, g: 'G13'}, {id: 2, g: 'G14'}, {id: 3, g: 'G15'}] }] }
            ]
        },
        {
            name: 'Operation Research',
            color: '#fbbf24',
            doctors: [
                { name: 'Dr. Ghada Taha', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G15'}, {id: 2, g: 'G16'}, {id: 3, g: 'G17'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G18'}] }] },
                { name: 'Dr. Mahmoud Sadeq', schedule: [{ day: 'Sunday', slots: [{id: 1, g: 'G11'}, {id: 2, g: 'G12'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G13'}, {id: 2, g: 'G14'}] }] },
                { name: 'Dr. Ahmed Abdel Hadi', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G1'}, {id: 2, g: 'G2'}, {id: 5, g: 'G3'}] }, { day: 'Wednesday', slots: [{id: 1, g: 'G4'}, {id: 3, g: 'G5'}] }] },
                { name: 'Dr. Khaled Mohamed', schedule: [{ day: 'Monday', slots: [{id: 1, g: 'G19'}, {id: 1, g: 'G21'}, {id: 4, g: 'G20'}] }, { day: 'Thursday', slots: [{id: 1, g: 'G22'}, {id: 2, g: 'G23'}, {id: 4, g: 'G24'}] }] },
                { name: 'Dr. Hend Atteya', schedule: [{ day: 'Tuesday', slots: [{id: 2, g: 'G6'}, {id: 3, g: 'G7'}] }, { day: 'Thursday', slots: [{id: 1, g: 'G8'}, {id: 2, g: 'G9'}, {id: 3, g: 'G10'}] }] }
            ]
        }
    ],
    4: [
        // Coming Soon - Level 4 data will be added here later
        // {
        //     name: '⚠️ Coming Soon',
        //     color: '#94a3b8',
        //     doctors: [
        //         { 
        //             name: 'Level 4 courses will be added soon', 
        //             schedule: [{ day: 'Saturday', slots: [{id: 1, g: 'INFO'}] }] 
        //         }
        //     ]
        // }
    ]
};

// 3. Logic & State Management
let selectedYear = null;
let scheduleData = {}; 
let previewData = null;
let draggedSlot = null;

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
            
            // Events for Deletion & Selection
            cell.addEventListener('click', () => handleSlotClick(day, slot.id));
            cell.addEventListener('dragover', (e) => e.preventDefault());
            cell.addEventListener('drop', (e) => handleDrop(e, day, slot.id));
            
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

function selectYear(year) {
    selectedYear = year;
    document.querySelectorAll('.year-card').forEach(c => c.classList.remove('active'));
    if(window.event) window.event.currentTarget.closest('.year-card').classList.add('active');
    
    loadSubjects(year);
    document.getElementById('subjectSection').style.display = 'block';
    document.getElementById('scheduleSection').style.display = 'block';
    initScheduleTable();
    scheduleData = {};
    previewData = null;
}

// ✅ 1. Feature: Course Locking (Single Enrollment)
function isSubjectLocked(subjectName) {
    return Object.values(scheduleData).some(slot => slot.name === subjectName);
}

function loadSubjects(year) {
    const container = document.getElementById('subjectsContainer');
    const courses = updatedCoursesData[year] || [];
    
    if (courses.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-secondary);"><p>No courses available for this year.</p></div>';
        return;
    }

    container.innerHTML = courses.map((course) => {
        const isLocked = isSubjectLocked(course.name);
        const lockedClass = isLocked ? 'subject-locked' : '';
        const lockedBadge = isLocked ? '<span class="locked-badge">🔒 Enrolled</span>' : '';

        return `
            <div class="subject-card ${lockedClass}">
                <div class="subject-header">
                    <div class="subject-color" style="background: ${course.color};"></div>
                    <div class="subject-name">${course.name}</div>
                    ${lockedBadge}
                </div>
                <div class="doctor-list">
                    ${course.doctors.map((doctor, idx) => `
                        <div class="doctor-item ${isLocked ? 'disabled' : ''}" 
                             data-subject-name="${course.name}" 
                             data-doctor-name="${doctor.name}" 
                             data-color="${course.color}" 
                             data-doctor-index="${idx}">
                            <div class="doctor-name">👨‍🏫 ${doctor.name}</div>
                            <div class="doctor-schedule">${formatSchedule(doctor.schedule)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers to doctor items (only if not locked)
    document.querySelectorAll('.doctor-item:not(.disabled)').forEach(item => {
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
    event.currentTarget.classList.add('selected');
    
    schedule.forEach(item => {
        item.slots.forEach(slotData => {
            const cell = document.getElementById(`${item.day}-${slotData.id}`);
            if (cell && !scheduleData[`${item.day}-${slotData.id}`]) {
                cell.classList.add('preview-highlight');
                cell.innerHTML = `
                    <div class="slot-content slot-preview" style="background: ${color}; opacity: 0.5;">
                        <div class="slot-subject">${subjectName}</div>
                        <div class="slot-doctor">${doctorName}</div>
                        <div class="slot-group">${slotData.g}</div>
                        <div class="slot-hint">Click to add</div>
                    </div>`;
            }
        });
    });
}

// ✅ 2. Feature: Individual Slot Management (Delete)
function handleSlotClick(day, slotId) {
    const key = `${day}-${slotId}`;
    if (scheduleData[key]) {
        const slot = scheduleData[key];
        if (confirm(`Do you want to remove ${slot.name} - ${slot.doctor} (${slot.group})?`)) {
            delete scheduleData[key];
            renderSchedule();
            loadSubjects(selectedYear);
        }
        return;
    }
    
    if (!previewData) return;

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
    loadSubjects(selectedYear);
}

// ✅ 3. Feature: ENHANCED Drag and Drop with Valid Slot Highlighting
function highlightValidDropTargets(subjectName, doctorName, color) {
    // Clear any existing highlights
    clearDragHighlights();
    
    // Find the course and doctor
    const course = updatedCoursesData[selectedYear].find(c => c.name === subjectName);
    if (!course) return;
    
    const doctor = course.doctors.find(d => d.name === doctorName);
    if (!doctor) return;
    
    // Highlight all valid slots for this doctor with the course color at 30% opacity
    doctor.schedule.forEach(item => {
        item.slots.forEach(slotData => {
            const cellKey = `${item.day}-${slotData.id}`;
            const cell = document.getElementById(cellKey);
            
            // Only highlight if slot is NOT already occupied
            if (cell && !scheduleData[cellKey]) {
                cell.classList.add('drag-target-highlight');
                cell.style.backgroundColor = `${color}30`; // 30% opacity (hex: 30)
                cell.style.border = `2px dashed ${color}`;
            }
        });
    });
}

function clearDragHighlights() {
    document.querySelectorAll('.drag-target-highlight').forEach(cell => {
        cell.classList.remove('drag-target-highlight');
        cell.style.backgroundColor = '';
        cell.style.border = '';
    });
}

function handleDragStart(e, day, slotId) {
    const key = `${day}-${slotId}`;
    draggedSlot = { key: key, data: scheduleData[key] };
    e.target.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
    
    // NEW: Highlight valid drop targets for this doctor
    highlightValidDropTargets(draggedSlot.data.name, draggedSlot.data.doctor, draggedSlot.data.color);
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
    clearDragHighlights();
    draggedSlot = null;
}

function handleDrop(e, targetDay, targetSlotId) {
    e.preventDefault();
    if (!draggedSlot) return;
    
    const targetKey = `${targetDay}-${targetSlotId}`;
    
    if (scheduleData[targetKey]) {
        clearDragHighlights();
        return alert('⚠️ Target slot is already occupied!');
    }

    const course = updatedCoursesData[selectedYear].find(c => c.name === draggedSlot.data.name);
    const doctor = course.doctors.find(d => d.name === draggedSlot.data.doctor);
    
    let isValid = false, newGroupId = null;
    doctor.schedule.forEach(item => {
        if (item.day === targetDay) {
            const s = item.slots.find(sl => sl.id === targetSlotId);
            if (s) { 
                isValid = true; 
                newGroupId = s.g; 
            }
        }
    });

    if (!isValid) {
        clearDragHighlights();
        return alert('⚠️ Not available in doctor\'s schedule!');
    }

    // Move the slot
    delete scheduleData[draggedSlot.key];
    scheduleData[targetKey] = { ...draggedSlot.data, group: newGroupId };
    
    clearDragHighlights();
    draggedSlot = null;
    renderSchedule();
}

function renderSchedule() {
    days.forEach(day => {
        timeSlots.forEach(slot => {
            const cell = document.getElementById(`${day}-${slot.id}`);
            const key = `${day}-${slot.id}`;
            const data = scheduleData[key];
            
            if (data) {
                cell.innerHTML = `
                    <div class="slot-content slot-confirmed" draggable="true" style="background: ${data.color}; color: white; cursor: move;">
                        <div class="slot-subject">${data.name}</div>
                        <div class="slot-doctor">${data.doctor}</div>
                        <div class="slot-group">${data.group}</div>
                        <div class="slot-delete-hint">Click to remove</div>
                    </div>`;
                const div = cell.querySelector('.slot-content');
                div.addEventListener('dragstart', (e) => handleDragStart(e, day, slot.id));
                div.addEventListener('dragend', handleDragEnd);
            } else {
                cell.innerHTML = '<div class="slot-content slot-empty">Free</div>';
            }
        });
    });
}

function clearPreview() {
    document.querySelectorAll('.preview-highlight').forEach(cell => {
        cell.classList.remove('preview-highlight');
        const key = `${cell.dataset.day}-${cell.dataset.slot}`;
        if (!scheduleData[key]) {
            cell.innerHTML = '<div class="slot-content slot-empty">Free</div>';
        }
    });
}

function resetSchedule() {
    if (confirm('Are you sure you want to reset your schedule?')) {
        selectedYear = null;
        scheduleData = {};
        previewData = null;
        draggedSlot = null;
        
        document.getElementById('subjectSection').style.display = 'none';
        document.getElementById('scheduleSection').style.display = 'none';
        
        document.querySelectorAll('.year-card').forEach(card => {
            card.classList.remove('active');
        });
    }
}

// ✅ 4. Feature: Export Functionality FIXED
async function downloadAsImage() {
    const table = document.getElementById('scheduleTableContainer');
    if (!table) {
        alert('⚠️ Schedule table not found!');
        return;
    }
    
    if (!window.html2canvas) {
        alert('⚠️ html2canvas library not loaded. Please refresh the page.');
        return;
    }
    
    try {
        clearPreview();
        clearDragHighlights();
        
        const canvas = await html2canvas(table, { 
            backgroundColor: '#ffffff', 
            scale: 2,
            logging: false,
            useCORS: true
        });
        
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().split('T')[0];
        link.download = `BIS_Schedule_Year${selectedYear}_${timestamp}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        console.log('✅ Schedule exported as image successfully');
    } catch (error) {
        alert('❌ Error creating image: ' + error.message);
        console.error('Export error:', error);
    }
}

async function downloadAsPDF() {
    const table = document.getElementById('scheduleTableContainer');
    
    if (!table) {
        alert('⚠️ Schedule table not found!');
        return;
    }
    
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert('⚠️ jsPDF library not loaded. Please refresh the page.');
        return;
    }
    
    try {
        clearPreview();
        clearDragHighlights();
        
        const canvas = await html2canvas(table, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true
        });
        
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });
        
        const imgWidth = 280;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const x = (297 - imgWidth) / 2;
        
        pdf.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);
        
        const timestamp = new Date().toISOString().split('T')[0];
        pdf.save(`BIS_Schedule_Year${selectedYear}_${timestamp}.pdf`);
        
        console.log('✅ Schedule exported as PDF successfully');
    } catch (error) {
        alert('❌ Error creating PDF: ' + error.message);
        console.error('PDF export error:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ BIS Schedule Builder Loaded');
    console.log('📚 Features: Course Locking, Delete Slots, Drag & Drop with Highlights, Export');
});
