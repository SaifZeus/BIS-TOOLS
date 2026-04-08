// ============================================================
// BIS Schedule Builder — script.js
// ============================================================

// ── Firebase Configuration ───────────────────────────────────
// IMPORTANT: Replace the databaseURL value with the URL shown
// in Firebase Console → Realtime Database.
// All other values are already correct.
const firebaseConfig = {
    apiKey:            'AIzaSyCviBnee-DjBgN2hZQA-yEoNN9kJ6iqULc',
    authDomain:        'bis-pretest.firebaseapp.com',
    databaseURL:       'https://bis-student-portal-default-rtdb.firebaseio.com',
    projectId:         'bis-pretest',
    storageBucket:     'bis-pretest.firebasestorage.app',
    messagingSenderId: '1088226044850',
    appId:             '1:1088226044850:web:38b84054525089d86f92ab',
    measurementId:     'G-LHH7QC9EH3',
};

// ── XSS Helper ───────────────────────────────────────────────
function escHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ── Firebase Init ────────────────────────────────────────────
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try { firebase.initializeApp(firebaseConfig); }
    catch (e) { console.warn('[BIS] Firebase init failed; using local data.', e); }
}

// ── Data Normalisation ───────────────────────────────────────
function normalizeSlotData(slot) {
    return { ...slot, teamsCode: slot?.teamsCode || '' };
}
function normalizeProviderData(provider) {
    return {
        ...provider,
        whatsappLink: provider?.whatsappLink || '',
        schedule: (provider?.schedule || []).map(dayItem => ({
            ...dayItem,
            slots: (dayItem?.slots || []).map(normalizeSlotData),
        })),
    };
}
function normalizeSubjectData(subject) {
    return {
        ...subject,
        doctors:  (subject?.doctors  || []).map(normalizeProviderData),
        sections: (subject?.sections || []).map(normalizeProviderData),
    };
}

// ── 1. Time Slots & Days ─────────────────────────────────────
const timeSlots = [
    { id: 1, display: '8:00 - 10:00'  },
    { id: 2, display: '10:00 - 12:00' },
    { id: 3, display: '12:00 - 2:00'  },
    { id: 4, display: '2:00 - 4:00'   },
    { id: 5, display: '4:00 - 6:00'   },
    { id: 6, display: '6:00 - 8:00'   },
];
const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

// ── 2. Course Data ───────────────────────────────────────────
const updatedCoursesData = {
    1: [
        {
            name: '⚠️ Coming Soon', color: '#94a3b8',
            doctors: [{ name: 'Level 1 courses will be added soon', schedule: [{ day: 'Saturday', slots: [{ id: 1, g: 'INFO' }] }] }],
        },
    ],
    2: [
        {
            name: 'Money and Banking', color: '#ef4444',
            doctors: [
                { name: 'Dr. Mahmoud Eltony',      schedule: [{ day: 'Saturday', slots: [{ id: 2, g: 'G18' }, { id: 3, g: 'G19' }] }, { day: 'Sunday',    slots: [{ id: 1, g: 'G20' }, { id: 2, g: 'G21' }, { id: 3, g: 'G22' }] }] },
                { name: 'Dr. Mohamed Abdel Wahid', schedule: [{ day: 'Saturday', slots: [{ id: 1, g: 'G1'  }, { id: 2, g: 'G2'  }, { id: 3, g: 'G3'  }] }, { day: 'Sunday',    slots: [{ id: 1, g: 'G4'  }, { id: 2, g: 'G5'  }, { id: 3, g: 'G6'  }] }, { day: 'Monday',    slots: [{ id: 1, g: 'G7'  }, { id: 2, g: 'G8'  }, { id: 3, g: 'G9'  }] }] },
                { name: 'Dr. Gaber Abdel Gawad',   schedule: [{ day: 'Sunday',   slots: [{ id: 1, g: 'G10' }, { id: 2, g: 'G11' }, { id: 3, g: 'G12' }] }, { day: 'Monday',    slots: [{ id: 1, g: 'G13' }, { id: 2, g: 'G14' }, { id: 3, g: 'G15' }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G16' }, { id: 2, g: 'G17' }] }] },
                { name: 'Dr. Thoraya',              schedule: [{ day: 'Thursday', slots: [{ id: 1, g: 'G24' }, { id: 2, g: 'G25' }, { id: 3, g: 'G26' }] }] },
            ],
        },
        {
            name: 'Accounting for Corporations', color: '#3b82f6',
            doctors: [
                { name: 'Dr. Amr Hassan',        schedule: [{ day: 'Sunday',   slots: [{ id: 1, g: 'G10' }, { id: 2, g: 'G11' }] }, { day: 'Monday',   slots: [{ id: 1, g: 'G12' }, { id: 2, g: 'G13' }] }] },
                { name: 'Dr. Mohamed El Ardy',   schedule: [{ day: 'Saturday', slots: [{ id: 1, g: 'G1'  }, { id: 2, g: 'G2'  }] }, { day: 'Sunday',   slots: [{ id: 1, g: 'G3'  }, { id: 2, g: 'G4'  }, { id: 4, g: 'G5'  }] }, { day: 'Monday',   slots: [{ id: 1, g: 'G6'  }, { id: 2, g: 'G7'  }] }] },
                { name: 'Dr. Ahmed Ibrahim',     schedule: [{ day: 'Saturday', slots: [{ id: 3, g: 'G14' }] }, { day: 'Sunday',   slots: [{ id: 1, g: 'G15' }, { id: 2, g: 'G16' }, { id: 4, g: 'G17' }] }] },
                { name: 'Dr. Soha Samir',        schedule: [{ day: 'Sunday',   slots: [{ id: 1, g: 'G18' }, { id: 2, g: 'G19' }, { id: 3, g: 'G20' }] }, { day: 'Monday',   slots: [{ id: 1, g: 'G21' }, { id: 2, g: 'G22' }, { id: 3, g: 'G23' }] }, { day: 'Thursday', slots: [{ id: 1, g: 'G24' }, { id: 2, g: 'G25' }, { id: 3, g: 'G26' }] }] },
                { name: 'Dr. Yasmeen Abdel Aal', schedule: [{ day: 'Monday',   slots: [{ id: 1, g: 'G8'  }, { id: 2, g: 'G9'  }] }] },
                { name: 'Dr. Hamdy Habl',        schedule: [{ day: 'Thursday', slots: [{ id: 1, g: 'G22' }, { id: 2, g: 'G23' }, { id: 3, g: 'G24' }] }] },
            ],
        },
        {
            name: 'System Analysis 2', color: '#8b5cf6', sections: [],
            doctors: [
                { name: 'Dr. Menna Ibrahim', schedule: [{ day: 'Monday',    slots: [{ id: 1, g: 'G8'  }, { id: 2, g: 'G9'  }, { id: 3, g: 'G10' }] }] },
                { name: 'Dr. Wael Karam',    schedule: [{ day: 'Saturday',  slots: [{ id: 4, g: 'G1'  }] }, { day: 'Thursday',  slots: [{ id: 2, g: 'G2'  }, { id: 3, g: 'G3'  }, { id: 4, g: 'G4'  }] }] },
                { name: 'Dr. Ashraf Said',   schedule: [{ day: 'Saturday',  slots: [{ id: 1, g: 'G22' }] }, { day: 'Sunday',    slots: [{ id: 2, g: 'G15' }] }] },
                { name: 'Dr. Amr Galal',     schedule: [{ day: 'Saturday',  slots: [{ id: 2, g: 'G5'  }, { id: 3, g: 'G6'  }, { id: 4, g: 'G7'  }] }] },
                { name: 'Dr. Antony',        schedule: [{ day: 'Tuesday',   slots: [{ id: 1, g: 'G11' }, { id: 2, g: 'G12' }, { id: 3, g: 'G13' }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G14' }] }] },
                { name: 'Dr. Walaa Mohamed', schedule: [{ day: 'Wednesday', slots: [{ id: 1, g: 'G19' }, { id: 2, g: 'G20' }, { id: 3, g: 'G21' }] }] },
                { name: 'Dr. Sara Naeem',    schedule: [{ day: 'Thursday',  slots: [{ id: 2, g: 'G15' }, { id: 3, g: 'G16' }, { id: 4, g: 'G17' }] }] },
                { name: 'Dr. Amira Mohie',   schedule: [{ day: 'Wednesday', slots: [{ id: 1, g: 'G23' }, { id: 2, g: 'G24' }, { id: 3, g: 'G25' }] }] },
            ],
        },
        {
            name: 'Programming 2', color: '#f59e0b', sections: [],
            doctors: [
                { name: 'Dr. Mahmoud Bahlol', schedule: [{ day: 'Sunday',    slots: [{ id: 1, g: 'G25' }, { id: 2, g: 'G26' }] }] },
                { name: 'Dr. Amr Mansour',    schedule: [{ day: 'Saturday',  slots: [{ id: 4, g: 'G21' }, { id: 5, g: 'G22' }] }, { day: 'Tuesday',   slots: [{ id: 2, g: 'G23' }, { id: 3, g: 'G24' }] }] },
                { name: 'Dr. Wael Haider',    schedule: [{ day: 'Tuesday',   slots: [{ id: 3, g: 'G17' }] }, { day: 'Thursday',  slots: [{ id: 2, g: 'G18' }, { id: 3, g: 'G19' }, { id: 4, g: 'G20' }] }] },
                { name: 'Dr. Mahmoud Halawa', schedule: [{ day: 'Monday',    slots: [{ id: 1, g: 'G9'  }, { id: 2, g: 'G10' }, { id: 3, g: 'G11' }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G12' }] }] },
                { name: 'Dr. Mohamed Atteya', schedule: [{ day: 'Wednesday', slots: [{ id: 4, g: 'G5'  }, { id: 5, g: 'G6'  }] }, { day: 'Thursday',  slots: [{ id: 4, g: 'G7'  }, { id: 5, g: 'G8'  }] }] },
                { name: 'Dr. Amr Ibrahim',    schedule: [{ day: 'Thursday',  slots: [{ id: 1, g: 'G13' }, { id: 2, g: 'G15' }, { id: 3, g: 'G16' }] }] },
                { name: 'Dr. Heba Mohsen',    schedule: [{ day: 'Thursday',  slots: [{ id: 1, g: 'G1'  }, { id: 2, g: 'G2'  }, { id: 3, g: 'G3'  }] }] },
            ],
        },
        {
            name: 'Marketing', color: '#ec4899',
            doctors: [
                { name: 'Dr. Wafaa Abdel Samie', schedule: [{ day: 'Sunday',    slots: [{ id: 1, g: 'G1'  }, { id: 2, g: 'G2'  }, { id: 3, g: 'G3'  }] }, { day: 'Tuesday',   slots: [{ id: 1, g: 'G4'  }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G5'  }, { id: 2, g: 'G6'  }, { id: 3, g: 'G7'  }] }] },
                { name: 'Dr. Rasha El Naggar',   schedule: [{ day: 'Sunday',    slots: [{ id: 1, g: 'G8'  }, { id: 2, g: 'G9'  }, { id: 3, g: 'G10' }] }] },
                { name: 'Dr. Amira Moussa',      schedule: [{ day: 'Wednesday', slots: [{ id: 1, g: 'G11' }, { id: 2, g: 'G12' }, { id: 3, g: 'G13' }] }] },
                { name: 'Dr. Mohamed Ramadan',   schedule: [{ day: 'Tuesday',   slots: [{ id: 2, g: 'G14' }, { id: 4, g: 'G15' }, { id: 5, g: 'G16' }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G17' }, { id: 2, g: 'G18' }, { id: 4, g: 'G19' }] }] },
                { name: 'Dr. Mostafa Youssef',   schedule: [{ day: 'Tuesday',   slots: [{ id: 2, g: 'G20' }, { id: 4, g: 'G21' }, { id: 5, g: 'G22' }] }, { day: 'Thursday',  slots: [{ id: 3, g: 'G23' }] }] },
                { name: 'Dr. Sarah Hashem',      schedule: [{ day: 'Thursday',  slots: [{ id: 1, g: 'G25' }, { id: 2, g: 'G26' }, { id: 3, g: 'G24' }] }] },
            ],
        },
        {
            name: 'Creative Thinking', color: '#14b8a6',
            doctors: [
                { name: 'Dr. Mohamed El Tayar',   schedule: [{ day: 'Thursday',  slots: [{ id: 2, g: 'G17' }, { id: 3, g: 'G18' }, { id: 4, g: 'G19' }] }] },
                { name: 'Dr. Mai Qenawi',         schedule: [{ day: 'Wednesday', slots: [{ id: 1, g: 'G14' }, { id: 2, g: 'G15' }, { id: 3, g: 'G16' }] }] },
                { name: 'Dr. Hanan Morsi',        schedule: [{ day: 'Saturday',  slots: [{ id: 4, g: 'G10' }, { id: 5, g: 'G11' }] }] },
                { name: 'Dr. Abeer El Ghandour',  schedule: [{ day: 'Sunday',    slots: [{ id: 1, g: 'G1'  }, { id: 2, g: 'G2'  }, { id: 3, g: 'G3'  }] }] },
                { name: 'Dr. Mohamed Obeid',      schedule: [{ day: 'Monday',    slots: [{ id: 1, g: 'G24' }, { id: 3, g: 'G25' }, { id: 4, g: 'G26' }] }] },
                { name: 'Dr. Marwa El Badry',     schedule: [{ day: 'Monday',    slots: [{ id: 4, g: 'G4'  }, { id: 5, g: 'G5'  }] }] },
                { name: 'Dr. Mona Zaghloul',      schedule: [{ day: 'Thursday',  slots: [{ id: 1, g: 'G20' }, { id: 2, g: 'G21' }] }] },
                { name: 'Dr. Nahla El Shourbagy', schedule: [{ day: 'Thursday',  slots: [{ id: 3, g: 'G22' }, { id: 4, g: 'G23' }] }] },
            ],
        },
    ],
    3: [
        {
            name: 'Economics of Information', color: '#6366f1',
            doctors: [
                { name: 'Dr. Somaya Abdel Mawla', schedule: [{ day: 'Saturday',  slots: [{ id: 4, g: 'G4'  }] }, { day: 'Sunday',    slots: [{ id: 1, g: 'G5'  }, { id: 2, g: 'G6'  }, { id: 3, g: 'G7'  }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G8'  }, { id: 2, g: 'G9'  }, { id: 3, g: 'G10' }] }] },
                { name: 'Dr. Shaimaa Wehbe',      schedule: [{ day: 'Saturday',  slots: [{ id: 1, g: 'G17' }, { id: 2, g: 'G18' }, { id: 3, g: 'G19' }] }, { day: 'Monday',    slots: [{ id: 1, g: 'G20' }, { id: 2, g: 'G21' }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G22' }, { id: 2, g: 'G23' }, { id: 3, g: 'G24' }] }] },
                { name: 'Dr. Rasha El Kordi',     schedule: [{ day: 'Sunday',    slots: [{ id: 1, g: 'G11' }, { id: 2, g: 'G12' }, { id: 3, g: 'G13' }] }, { day: 'Monday',    slots: [{ id: 1, g: 'G14' }, { id: 2, g: 'G15' }, { id: 3, g: 'G16' }] }] },
                { name: 'Dr. Omar Salman',        schedule: [{ day: 'Wednesday', slots: [{ id: 1, g: 'G1'  }, { id: 2, g: 'G2'  }, { id: 3, g: 'G3'  }] }] },
            ],
        },
        {
            name: 'Auditing', color: '#06b6d4',
            doctors: [
                { name: 'Dr. Eman Saad El Din', schedule: [{ day: 'Saturday',  slots: [{ id: 5, g: 'G18' }] }, { day: 'Monday',    slots: [{ id: 1, g: 'G19' }, { id: 2, g: 'G20' }, { id: 3, g: 'G21' }] }] },
                { name: 'Dr. Ashraf Mansour',   schedule: [{ day: 'Saturday',  slots: [{ id: 1, g: 'G9'  }, { id: 2, g: 'G10' }, { id: 3, g: 'G11' }] }, { day: 'Sunday',    slots: [{ id: 1, g: 'G12' }, { id: 2, g: 'G13' }, { id: 3, g: 'G14' }] }, { day: 'Monday',    slots: [{ id: 1, g: 'G15' }, { id: 2, g: 'G16' }, { id: 3, g: 'G17' }] }] },
                { name: 'Dr. Hanan Jaber',      schedule: [{ day: 'Monday',    slots: [{ id: 1, g: 'G1'  }, { id: 2, g: 'G2'  }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G3'  }, { id: 2, g: 'G4'  }, { id: 3, g: 'G5'  }] }, { day: 'Thursday',  slots: [{ id: 1, g: 'G6'  }, { id: 2, g: 'G7'  }, { id: 3, g: 'G8'  }] }] },
                { name: 'Dr. Hamdy Habl',       schedule: [{ day: 'Thursday',  slots: [{ id: 1, g: 'G22' }, { id: 2, g: 'G23' }, { id: 3, g: 'G24' }] }] },
            ],
        },
        {
            name: 'Management Information Systems', color: '#84cc16',
            doctors: [
                { name: 'Dr. Ahmed Mounir',     schedule: [{ day: 'Saturday',  slots: [{ id: 1, g: 'G11' }, { id: 2, g: 'G12' }, { id: 3, g: 'G13' }] }, { day: 'Monday',    slots: [{ id: 1, g: 'G10' }] }] },
                { name: 'Dr. Bishoy',           schedule: [{ day: 'Saturday',  slots: [{ id: 1, g: 'G17' }, { id: 2, g: 'G18' }, { id: 3, g: 'G19' }] }] },
                { name: 'Dr. Christina Albert', schedule: [{ day: 'Sunday',    slots: [{ id: 1, g: 'G4'  }, { id: 2, g: 'G5'  }, { id: 3, g: 'G6'  }] }] },
                { name: 'Dr. Shirin Tayea',     schedule: [{ day: 'Monday',    slots: [{ id: 1, g: 'G7'  }, { id: 2, g: 'G8'  }, { id: 3, g: 'G9'  }] }] },
                { name: 'Dr. Yehia Helmy',      schedule: [{ day: 'Monday',    slots: [{ id: 2, g: 'G1'  }, { id: 3, g: 'G2'  }, { id: 4, g: 'G3'  }] }] },
                { name: 'Dr. Dalia Magdy',      schedule: [{ day: 'Wednesday', slots: [{ id: 1, g: 'G14' }, { id: 2, g: 'G15' }, { id: 3, g: 'G16' }] }] },
                { name: 'Dr. Dina Helal',       schedule: [{ day: 'Thursday',  slots: [{ id: 1, g: 'G20' }, { id: 2, g: 'G21' }, { id: 3, g: 'G22' }] }] },
            ],
        },
        {
            name: 'Internet Application', color: '#f43f5e',
            doctors: [
                { name: 'Dr. Amani Ahmed',          schedule: [{ day: 'Saturday',  slots: [{ id: 3, g: 'G7'  }] }, { day: 'Thursday',  slots: [{ id: 1, g: 'G8'  }, { id: 2, g: 'G9'  }, { id: 3, g: 'G10' }] }] },
                { name: 'Dr. Iman Hanafi',           schedule: [{ day: 'Saturday',  slots: [{ id: 1, g: 'G22' }, { id: 2, g: 'G23' }, { id: 3, g: 'G24' }] }] },
                { name: 'Dr. Mortada Salah El Din',  schedule: [{ day: 'Monday',    slots: [{ id: 1, g: 'G1'  }, { id: 2, g: 'G2'  }, { id: 4, g: 'G3'  }] }] },
                { name: 'Dr. Ibrahim Zaghloul',      schedule: [{ day: 'Monday',    slots: [{ id: 2, g: 'G4'  }, { id: 3, g: 'G5'  }, { id: 4, g: 'G6'  }] }] },
                { name: 'Dr. Nanis Nabil',           schedule: [{ day: 'Tuesday',   slots: [{ id: 1, g: 'G15' }, { id: 2, g: 'G16' }] }, { day: 'Thursday',  slots: [{ id: 1, g: 'G17' }, { id: 2, g: 'G18' }] }] },
                { name: 'Dr. Thanaa Mohamed',        schedule: [{ day: 'Wednesday', slots: [{ id: 1, g: 'G11' }, { id: 2, g: 'G12' }] }, { day: 'Thursday',  slots: [{ id: 1, g: 'G13' }, { id: 2, g: 'G14' }] }] },
                { name: 'Dr. Noura Shoaib',          schedule: [{ day: 'Thursday',  slots: [{ id: 2, g: 'G19' }, { id: 3, g: 'G20' }, { id: 4, g: 'G21' }] }] },
            ],
        },
        {
            name: 'Advanced Database', color: '#a855f7',
            doctors: [
                { name: 'Dr. Mohamed Hassan',     schedule: [{ day: 'Saturday',  slots: [{ id: 4, g: 'G9'  }, { id: 5, g: 'G10' }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G11' }, { id: 2, g: 'G12' }] }] },
                { name: 'Dr. Menna Mamdouh',      schedule: [{ day: 'Sunday',    slots: [{ id: 1, g: 'G23' }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G24' }] }] },
                { name: 'Dr. Ibrahim El Desouki', schedule: [{ day: 'Monday',    slots: [{ id: 1, g: 'G5'  }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G6'  }, { id: 2, g: 'G7'  }, { id: 3, g: 'G8'  }] }] },
                { name: 'Dr. Ahmed El Sidawy',    schedule: [{ day: 'Monday',    slots: [{ id: 4, g: 'G1'  }, { id: 5, g: 'G2'  }] }, { day: 'Thursday',  slots: [{ id: 3, g: 'G3'  }, { id: 4, g: 'G4'  }] }] },
                { name: 'Dr. Yasser El Gedawy',   schedule: [{ day: 'Monday',    slots: [{ id: 1, g: 'G19' }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G20' }, { id: 4, g: 'G21' }, { id: 5, g: 'G22' }] }] },
                { name: 'Dr. Mira Tamer',         schedule: [{ day: 'Tuesday',   slots: [{ id: 1, g: 'G16' }, { id: 2, g: 'G17' }, { id: 3, g: 'G18' }] }] },
                { name: 'Dr. Hany Gouda',         schedule: [{ day: 'Thursday',  slots: [{ id: 1, g: 'G13' }, { id: 2, g: 'G14' }, { id: 3, g: 'G15' }] }] },
            ],
        },
        {
            name: 'Operation Research', color: '#fbbf24',
            doctors: [
                { name: 'Dr. Ghada Taha',       schedule: [{ day: 'Sunday',    slots: [{ id: 1, g: 'G15' }, { id: 2, g: 'G16' }, { id: 3, g: 'G17' }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G18' }] }] },
                { name: 'Dr. Mahmoud Sadeq',    schedule: [{ day: 'Sunday',    slots: [{ id: 1, g: 'G11' }, { id: 2, g: 'G12' }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G13' }, { id: 2, g: 'G14' }] }] },
                { name: 'Dr. Ahmed Abdel Hadi', schedule: [{ day: 'Monday',    slots: [{ id: 1, g: 'G1'  }, { id: 2, g: 'G2'  }, { id: 5, g: 'G3'  }] }, { day: 'Wednesday', slots: [{ id: 1, g: 'G4'  }, { id: 3, g: 'G5'  }] }] },
                // FIX C-3: Was [{id:1,g:'G19'},{id:1,g:'G21'},{id:4,g:'G20'}] — duplicate id:1 corrected.
                // Verify the exact slot IDs against the official timetable before publishing.
                { name: 'Dr. Khaled Mohamed',   schedule: [{ day: 'Monday',    slots: [{ id: 1, g: 'G19' }, { id: 2, g: 'G21' }, { id: 3, g: 'G20' }] }, { day: 'Thursday',  slots: [{ id: 1, g: 'G22' }, { id: 2, g: 'G23' }, { id: 4, g: 'G24' }] }] },
                { name: 'Dr. Hend Atteya',      schedule: [{ day: 'Tuesday',   slots: [{ id: 2, g: 'G6'  }, { id: 3, g: 'G7'  }] }, { day: 'Thursday',  slots: [{ id: 1, g: 'G8'  }, { id: 2, g: 'G9'  }, { id: 3, g: 'G10' }] }] },
            ],
        },
    ],
    4: [
        {
            name: '⚠️ Coming Soon', color: '#94a3b8',
            doctors: [{ name: 'Level 4 courses will be added soon', schedule: [{ day: 'Saturday', slots: [{ id: 1, g: 'INFO' }] }] }],
        },
    ],
};

Object.keys(updatedCoursesData).forEach(level => {
    updatedCoursesData[level] = updatedCoursesData[level].map(normalizeSubjectData);
});

// ── 3. Application State ─────────────────────────────────────
let selectedYear      = null;
let scheduleData      = {};
let previewData       = null;
let draggedSlot       = null;
let selectionMode     = 'lectures';
let quickActionsState = null;
let _lastRenderHash   = {};

// ── 4. scheduleData Accessors ─────────────────────────────────
function getCellEntries(key) {
    if (Array.isArray(scheduleData[key])) return scheduleData[key];
    if (scheduleData[key] && typeof scheduleData[key] === 'object') {
        const legacy = { ...scheduleData[key] };
        if (!legacy.entryId)   legacy.entryId   = makeEntryId();
        if (!legacy.type)      legacy.type       = 'lecture';
        if (!legacy.teamsCode) legacy.teamsCode  = '';
        scheduleData[key] = [legacy];
        return scheduleData[key];
    }
    return [];
}

function addEntryToCell(key, entry) {
    if (!Array.isArray(scheduleData[key])) scheduleData[key] = [];
    scheduleData[key].push(entry);
}

function removeEntryById(entryId) {
    Object.keys(scheduleData).forEach(key => {
        const filtered = getCellEntries(key).filter(e => e.entryId !== entryId);
        if (filtered.length === 0) delete scheduleData[key];
        else scheduleData[key] = filtered;
        delete _lastRenderHash[key];
    });
}

function makeEntryId() {
    return `slot_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ── 5. Selection & Course Helpers ────────────────────────────
function getSelectionType()  { return selectionMode === 'sections' ? 'section' : 'lecture'; }

function getCourseByName(name) {
    return (updatedCoursesData[selectedYear] || []).find(c => c.name === name) || null;
}

function getSectionList(course) {
    if (Array.isArray(course.sections) && course.sections.length > 0) return course.sections;
    return (course.doctors || [])
        .filter(d => /sec/i.test(d.name))
        .map(s => ({ name: s.name, whatsappLink: s.whatsappLink || '', schedule: s.schedule }));
}

function getCourseOptions(course, mode) {
    return mode === 'sections' ? getSectionList(course) : (course.doctors || []);
}

function isSubjectLocked(subjectName, type = 'lecture') {
    return Object.values(scheduleData).some(entries =>
        (entries || []).some(e => e.name === subjectName && e.type === type)
    );
}

// ── 6. Firebase Load ─────────────────────────────────────────
async function loadScheduleFromFirebase() {
    try {
        const snapshot = await firebase.database().ref('schedule').once('value');
        const remote   = snapshot.val();
        if (remote) {
            Object.keys(remote).forEach(level => {
                if (remote[level]?.length > 0) {
                    updatedCoursesData[level] = remote[level].map(normalizeSubjectData);
                }
            });
            console.info('[BIS] Schedule loaded from Firebase.');
        }
    } catch (err) {
        console.warn('[BIS] Falling back to local data:', err.message);
    }
}

// ── 7. Schedule Table Init ────────────────────────────────────
function initScheduleTable() {
    const tbody = document.getElementById('scheduleBody');
    tbody.innerHTML = '';
    days.forEach(day => {
        const row     = document.createElement('tr');
        const dayCell = document.createElement('td');
        dayCell.className   = 'day-column';
        dayCell.textContent = day;
        row.appendChild(dayCell);
        timeSlots.forEach(slot => {
            const cell = document.createElement('td');
            cell.id        = `${day}-${slot.id}`;
            cell.className = 'schedule-cell';
            cell.setAttribute('data-day',  day);
            cell.setAttribute('data-slot', slot.id);
            cell.innerHTML = '<div class="slot-content slot-empty">Free</div>';
            cell.addEventListener('click',    () => handleSlotClick(day, slot.id));
            cell.addEventListener('dragover', e  => e.preventDefault());
            cell.addEventListener('drop',     e  => handleDrop(e, day, slot.id));
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

// ── 8. Toggle UI ─────────────────────────────────────────────
function syncToggleUI() {
    document.querySelectorAll('.selector-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-mode') === selectionMode);
    });
}

// ── 9. Year Selection (FIX H-5) ──────────────────────────────
// Receives the clicked <button> element as `triggerEl` via
// onclick="selectYear(1, this)" — no window.event dependency.
function selectYear(year, triggerEl) {
    selectedYear = year;
    document.querySelectorAll('.year-card').forEach(c => c.classList.remove('active'));
    if (triggerEl) triggerEl.classList.add('active');

    selectionMode   = 'lectures';
    scheduleData    = {};
    previewData     = null;
    _lastRenderHash = {};
    syncToggleUI();
    closeQuickActions();
    initScheduleTable();
    loadSubjects(year);

    document.getElementById('subjectSection').style.display  = 'block';
    document.getElementById('scheduleSection').style.display = 'block';
}

// ── 10. Subject List (FIX H-2, H-4) ─────────────────────────
function loadSubjects(year) {
    const container  = document.getElementById('subjectsContainer');
    const allCourses = updatedCoursesData[year] || [];
    const type       = getSelectionType();

    const courses = selectionMode === 'sections'
        ? allCourses.filter(c => getSectionList(c).length > 0)
        : allCourses.filter(c => (c.doctors || []).length > 0);

    if (courses.length === 0) {
        container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-secondary)"><p>No courses available for this selection.</p></div>';
        container.onclick   = null;
        return;
    }

    container.innerHTML = courses.map(course => {
        const options     = getCourseOptions(course, selectionMode);
        const isLocked    = isSubjectLocked(course.name, type);
        const lockedClass = isLocked ? 'subject-locked' : '';
        const lockedBadge = isLocked ? '<span class="locked-badge">🔒 Enrolled</span>' : '';
        const emptyText   = selectionMode === 'sections' ? 'No sections available yet.' : 'No lectures available yet.';

        const items = options.length === 0
            ? `<div class="doctor-item disabled">${emptyText}</div>`
            : options.map((opt, idx) => `
                <div class="doctor-item ${isLocked ? 'disabled' : ''}"
                     data-subject-name="${escHtml(course.name)}"
                     data-doctor-name="${escHtml(opt.name)}"
                     data-color="${escHtml(course.color)}"
                     data-doctor-index="${idx}"
                     data-type="${escHtml(type)}">
                    <div class="doctor-name">${type === 'section' ? '' : '👨‍🏫'} ${escHtml(opt.name)}</div>
                    <div class="doctor-schedule">${escHtml(formatSchedule(opt.schedule))}</div>
                </div>`).join('');

        return `
            <div class="subject-card ${lockedClass}">
                <div class="subject-header">
                    <div class="subject-color" style="background:${escHtml(course.color)};"></div>
                    <div class="subject-name">${escHtml(course.name)}</div>
                    ${lockedBadge}
                </div>
                <div class="doctor-list">${items}</div>
            </div>`;
    }).join('');

    // Single delegated listener — assigning to .onclick removes any prior handler
    container.onclick = function (e) {
        const item = e.target.closest('.doctor-item:not(.disabled)');
        if (!item) return;
        const subjectName = item.getAttribute('data-subject-name');
        const doctorIndex = parseInt(item.getAttribute('data-doctor-index'), 10);
        const course      = allCourses.find(c => c.name === subjectName);
        if (!course) return;
        const options = getCourseOptions(course, selectionMode);
        const opt     = options[doctorIndex];
        if (!opt) return;
        previewDoctor({
            subjectName,
            doctorName:   item.getAttribute('data-doctor-name'),
            color:        item.getAttribute('data-color'),
            schedule:     opt.schedule,
            type:         item.getAttribute('data-type'),
            whatsappLink: opt.whatsappLink || '#',
        }, item);
    };
}

function formatSchedule(schedule) {
    return schedule.map(d => `${d.day}: ${d.slots.map(s => s.g).join(', ')}`).join(' | ');
}

// ── 11. Preview ───────────────────────────────────────────────
function previewDoctor(previewItem, selectedElement) {
    clearPreview();
    previewData = {
        entryId:      makeEntryId(),
        name:         previewItem.subjectName,
        doctor:       previewItem.doctorName,
        color:        previewItem.color,
        schedule:     previewItem.schedule,
        type:         previewItem.type,
        whatsappLink: previewItem.whatsappLink,
    };
    document.querySelectorAll('.doctor-item').forEach(i => i.classList.remove('selected'));
    selectedElement.classList.add('selected');

    const cellSlotMap = new Map();
    previewData.schedule.forEach(item => {
        item.slots.forEach(slotData => {
            const key = `${item.day}-${slotData.id}`;
            if (!cellSlotMap.has(key)) cellSlotMap.set(key, []);
            cellSlotMap.get(key).push({ day: item.day, slotData });
        });
    });

    cellSlotMap.forEach((daySlots, key) => {
        const cell = document.getElementById(key);
        if (!cell) return;
        const entries        = getCellEntries(key);
        const hasLecture     = entries.some(e => e.type === 'lecture');
        const sectionEntries = entries.filter(e => e.type === 'section');
        const occupiedHalves = new Set(sectionEntries.map(e => e.half).filter(Boolean));

        if (previewData.type === 'lecture') {
            if (entries.length > 0) return;
            const slotData = daySlots[0].slotData;
            cell.classList.add('preview-highlight');
            cell.innerHTML = `
                <div class="slot-content slot-preview" style="background:${escHtml(previewData.color)};opacity:0.5;">
                    <div class="slot-subject">${escHtml(previewData.name)}</div>
                    <div class="slot-doctor">${escHtml(previewData.doctor)}</div>
                    <div class="slot-group">${escHtml(slotData.g)}</div>
                    <div class="slot-hint">Click to add</div>
                </div>`;
            return;
        }

        const validSlots = daySlots.filter(({ slotData }) => {
            if (hasLecture) return false;
            const rh = slotData.h || null;
            if (!rh) return sectionEntries.length < 2;
            return !occupiedHalves.has(rh);
        });
        if (validSlots.length === 0) return;

        cell.classList.add('preview-highlight');
        const parts = validSlots.map(({ slotData }) => {
            const halfClass = slotData.h ? `slot-half-height slot-half-${slotData.h}` : '';
            return `
                <div class="slot-content slot-preview slot-section ${halfClass}"
                     style="background:${escHtml(previewData.color)};opacity:0.5;"
                     data-preview-h="${escHtml(String(slotData.h || ''))}"
                     data-preview-g="${escHtml(slotData.g)}">
                    <div class="slot-subject">${escHtml(previewData.name)}</div>
                    <div class="slot-doctor">${escHtml(previewData.doctor)}</div>
                    <div class="slot-group">${escHtml(slotData.g)}</div>
                    <div class="slot-hint">Click to add</div>
                </div>`;
        });
        const wrapClass = validSlots.length > 1 ? 'slot-stack slot-split' : 'slot-stack';
        cell.innerHTML = `<div class="${wrapClass}">${parts.join('')}</div>`;
    });
}

// ── 12. Slot Click ────────────────────────────────────────────
function handleSlotClick(day, slotId) {
    const key = `${day}-${slotId}`;
    if (!previewData) return;

    const matchingSlots = [];
    previewData.schedule.forEach(item => {
        if (item.day === day) item.slots.forEach(s => { if (s.id === slotId) matchingSlots.push(s); });
    });
    if (matchingSlots.length === 0) return alert('⚠️ This slot is not available for the selected doctor.');

    const existing       = getCellEntries(key);
    const hasLecture     = existing.some(e => e.type === 'lecture');
    const sectionEntries = existing.filter(e => e.type === 'section');
    const occupiedHalves = new Set(sectionEntries.map(e => e.half).filter(Boolean));

    if (previewData.type === 'section' && hasLecture) return alert('⚠️ Conflict: You already have a lecture scheduled at this time.');
    if (previewData.type === 'lecture' && existing.length > 0) return alert('⚠️ Conflict: This time slot already has sections assigned.');

    if (previewData.type === 'section') {
        const cell           = document.getElementById(key);
        const clickedStrip   = cell?.querySelector('[data-preview-h]');
        const clickedHalfStr = clickedStrip ? clickedStrip.getAttribute('data-preview-h') : null;
        const clickedHalf    = clickedHalfStr ? parseInt(clickedHalfStr, 10) : null;

        let chosenSlot = clickedHalf ? (matchingSlots.find(s => s.h === clickedHalf) || null) : null;
        if (!chosenSlot) {
            chosenSlot = matchingSlots.find(s => {
                const h = s.h || null;
                return h ? !occupiedHalves.has(h) : occupiedHalves.size < 2;
            }) || null;
        }
        if (!chosenSlot) {
            return occupiedHalves.size >= 2
                ? alert('⚠️ This 2-hour block already has sections in both hours.')
                : alert('⚠️ Conflict: The required hour for this section is already taken.');
        }

        const rh = chosenSlot.h || null;
        let assignedHalf;
        if (rh && !occupiedHalves.has(rh)) { assignedHalf = rh; }
        else if (!rh) { assignedHalf = occupiedHalves.has(1) ? 2 : 1; }
        else { return alert('⚠️ Conflict: The required hour for this section is already taken.'); }

        if (getCellEntries(key).filter(e => e.type === 'section').length >= 2)
            return alert('⚠️ This 2-hour block already has sections in both hours.');

        addEntryToCell(key, { ...previewData, entryId: makeEntryId(), group: chosenSlot.g, teamsCode: chosenSlot.teamsCode || '', half: assignedHalf });
    } else {
        const sd = matchingSlots[0];
        addEntryToCell(key, { ...previewData, group: sd.g, teamsCode: sd.teamsCode || '', half: null });
    }

    delete _lastRenderHash[key];
    clearPreview();
    previewData = null;
    document.querySelectorAll('.doctor-item').forEach(i => i.classList.remove('selected'));
    renderSchedule();
    loadSubjects(selectedYear);
}

// ── 13. Drag Highlighting ────────────────────────────────────
function highlightValidDropTargets(entryData) {
    clearDragHighlights();
    const course  = (updatedCoursesData[selectedYear] || []).find(c => c.name === entryData.name);
    if (!course) return;
    const options = entryData.type === 'section' ? getSectionList(course) : course.doctors;
    const option  = (options || []).find(d => d.name === entryData.doctor);
    if (!option) return;

    option.schedule.forEach(item => {
        item.slots.forEach(slotData => {
            const cellKey        = `${item.day}-${slotData.id}`;
            const cell           = document.getElementById(cellKey);
            const entries        = getCellEntries(cellKey);
            const hasLecture     = entries.some(e => e.type === 'lecture');
            const sectionEntries = entries.filter(e => e.type === 'section');
            const occupiedHalves = new Set(sectionEntries.map(e => e.half).filter(Boolean));
            let valid;
            if (entryData.type === 'lecture') {
                valid = entries.length === 0;
            } else {
                const rh = slotData.h || null;
                valid = !hasLecture && (rh ? !occupiedHalves.has(rh) : occupiedHalves.size < 2);
            }
            if (cell && valid) {
                cell.classList.add('drag-target-highlight');
                cell.style.setProperty('--drag-color', entryData.color);
            }
        });
    });
}

function clearDragHighlights() {
    document.querySelectorAll('.drag-target-highlight').forEach(cell => {
        cell.classList.remove('drag-target-highlight');
        cell.style.removeProperty('--drag-color');
    });
}

// ── 14. HTML5 Drag Handlers ───────────────────────────────────
function handleDragStart(e, day, slotId, entryId) {
    const key   = `${day}-${slotId}`;
    const entry = getCellEntries(key).find(item => item.entryId === entryId);
    if (!entry) return;
    draggedSlot = { key, data: entry };
    e.currentTarget.style.opacity = '0.5';
    e.dataTransfer.effectAllowed  = 'move';
    e.dataTransfer.setData('text/plain', entryId);
    highlightValidDropTargets(entry);
}

function handleDragEnd(e) {
    e.currentTarget.style.opacity = '1';
    clearDragHighlights();
    draggedSlot = null;
}

function findSlotInProviderSchedule(entryData, targetDay, targetSlotId) {
    const course  = getCourseByName(entryData.name);
    if (!course) return null;
    const options = entryData.type === 'section' ? getSectionList(course) : course.doctors;
    const option  = (options || []).find(d => d.name === entryData.doctor);
    if (!option) return null;
    for (const dayItem of option.schedule || []) {
        if (dayItem.day !== targetDay) continue;
        const found = (dayItem.slots || []).find(s => s.id === targetSlotId);
        if (found) return found;
    }
    return null;
}

function handleDrop(e, targetDay, targetSlotId) {
    e.preventDefault();
    if (!draggedSlot) return;

    const targetKey      = `${targetDay}-${targetSlotId}`;
    const allTarget      = getCellEntries(targetKey);
    const targetEntries  = allTarget.filter(e => e.entryId !== draggedSlot.data.entryId);
    const hasLecture     = targetEntries.some(e => e.type === 'lecture');
    const targetSections = targetEntries.filter(e => e.type === 'section');
    const occupiedHalves = new Set(targetSections.map(e => e.half).filter(Boolean));

    if (draggedSlot.data.type === 'lecture' && targetEntries.length > 0) { clearDragHighlights(); return alert('⚠️ Target slot is already occupied!'); }
    if (draggedSlot.data.type === 'section' && hasLecture)                { clearDragHighlights(); return alert('⚠️ Conflict: You have a lecture at this time!'); }

    function removeFromSource() {
        const src = getCellEntries(draggedSlot.key).filter(e => e.entryId !== draggedSlot.data.entryId);
        if (src.length === 0) delete scheduleData[draggedSlot.key];
        else scheduleData[draggedSlot.key] = src;
        delete _lastRenderHash[draggedSlot.key];
    }

    if (draggedSlot.data.type === 'section') {
        const draggedHalf = draggedSlot.data.half || null;
        let resolvedSlot  = null;
        const course  = getCourseByName(draggedSlot.data.name);
        const options = course ? getSectionList(course) : [];
        const option  = options.find(d => d.name === draggedSlot.data.doctor);
        if (option) {
            for (const dayItem of option.schedule || []) {
                if (dayItem.day !== targetDay) continue;
                const exactMatch = (dayItem.slots || []).find(s => s.id === targetSlotId && (s.h || null) === draggedHalf);
                const anyMatch   = (dayItem.slots || []).find(s => s.id === targetSlotId);
                resolvedSlot = exactMatch || anyMatch || null;
                if (resolvedSlot) break;
            }
        }
        if (!resolvedSlot) { clearDragHighlights(); return alert('⚠️ Not available in provider schedule!'); }

        const rh = resolvedSlot.h || null;
        let assignedHalf;
        if (rh && !occupiedHalves.has(rh)) { assignedHalf = rh; }
        else if (!rh && draggedHalf && !occupiedHalves.has(draggedHalf)) { assignedHalf = draggedHalf; }
        else if (!rh && !draggedHalf && occupiedHalves.size < 2) { assignedHalf = occupiedHalves.has(1) ? 2 : 1; }
        else { clearDragHighlights(); return (occupiedHalves.size >= 2 ? alert('⚠️ Both hours taken.') : alert('⚠️ Required hour taken.')); }

        removeFromSource();
        addEntryToCell(targetKey, { ...draggedSlot.data, group: resolvedSlot.g, teamsCode: resolvedSlot.teamsCode || '', half: assignedHalf });
    } else {
        const slotAvail = findSlotInProviderSchedule(draggedSlot.data, targetDay, targetSlotId);
        if (!slotAvail) { clearDragHighlights(); return alert('⚠️ Not available in provider schedule!'); }
        removeFromSource();
        addEntryToCell(targetKey, { ...draggedSlot.data, group: slotAvail.g, teamsCode: slotAvail.teamsCode || '', half: null });
    }

    delete _lastRenderHash[targetKey];
    clearDragHighlights();
    draggedSlot = null;
    renderSchedule();
}

// ── 15. Touch Drag & Drop — FIX M-5 ──────────────────────────
// Pointer-event based touch DnD. Works on iOS, Android, and
// any pointer-capable device. Uses the same handleDrop() logic
// so conflict rules are identical on all platforms.
let touchDragState = null;

function initTouchDrag(el, day, slotId, entryId) {
    let longPressTimer = null;
    let isDragging     = false;

    el.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse') return; // desktop uses HTML5 DnD
        isDragging = false;

        longPressTimer = setTimeout(() => {
            const key   = `${day}-${slotId}`;
            const entry = getCellEntries(key).find(i => i.entryId === entryId);
            if (!entry) return;

            isDragging  = true;
            draggedSlot = { key, data: entry };
            el.setPointerCapture(e.pointerId);

            const rect  = el.getBoundingClientRect();
            const ghost = el.cloneNode(true);
            Object.assign(ghost.style, {
                position: 'fixed', left: `${rect.left}px`, top: `${rect.top}px`,
                width: `${rect.width}px`, opacity: '0.8', pointerEvents: 'none',
                zIndex: '9000', borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)', transition: 'none',
            });
            document.body.appendChild(ghost);
            el.style.opacity = '0.35';
            highlightValidDropTargets(entry);

            touchDragState = {
                entryId, ghost, sourceEl: el,
                offsetX: e.clientX - rect.left,
                offsetY: e.clientY - rect.top,
            };

            // Haptic feedback where available
            if (navigator.vibrate) navigator.vibrate(40);
        }, 350); // 350 ms long-press to start drag
    }, { passive: true });

    el.addEventListener('pointermove', e => {
        if (!isDragging || !touchDragState || touchDragState.entryId !== entryId) return;
        const { ghost, offsetX, offsetY } = touchDragState;
        ghost.style.left = `${e.clientX - offsetX}px`;
        ghost.style.top  = `${e.clientY - offsetY}px`;
    }, { passive: true });

    el.addEventListener('pointerup', e => {
        clearTimeout(longPressTimer);
        if (!isDragging || !touchDragState || touchDragState.entryId !== entryId) return;

        const { ghost, sourceEl } = touchDragState;
        const target = document.elementFromPoint(e.clientX, e.clientY);
        const cell   = target?.closest('.schedule-cell');

        if (cell) {
            const targetDay    = cell.getAttribute('data-day');
            const targetSlotId = parseInt(cell.getAttribute('data-slot'), 10);
            handleDrop({ preventDefault: () => {} }, targetDay, targetSlotId);
        }

        ghost.remove();
        sourceEl.style.opacity = '1';
        clearDragHighlights();
        draggedSlot    = null;
        touchDragState = null;
        isDragging     = false;
    }, { passive: true });

    el.addEventListener('pointercancel', () => {
        clearTimeout(longPressTimer);
        if (touchDragState?.entryId === entryId) {
            touchDragState.ghost.remove();
            touchDragState.sourceEl.style.opacity = '1';
        }
        clearDragHighlights();
        draggedSlot    = null;
        touchDragState = null;
        isDragging     = false;
    }, { passive: true });
}

// ── 16. Quick Actions — FIX C-1 ──────────────────────────────
// The corrupted duplicate declaration has been removed.
// This is the single, authoritative implementation.
function openQuickActions(entry, event) {
    closeQuickActions();
    quickActionsState = { entryId: entry.entryId };

    const menu = document.createElement('div');
    menu.className = 'quick-actions-menu';
    menu.id = 'quickActionsMenu';
    menu.innerHTML = `
        <div class="quick-title">${escHtml(entry.name)} - ${escHtml(entry.group)}${entry.type === 'section' ? ' <span class="sec-pill">SEC</span>' : ''}</div>
        <div class="quick-sub">${escHtml(entry.doctor)}</div>
        <button type="button" class="quick-btn" data-action="copy">Copy Teams Code</button>
        <button type="button" class="quick-btn" data-action="whatsapp">Go to WhatsApp Group</button>
        <button type="button" class="quick-btn danger" data-action="remove">Remove from Schedule</button>`;
    document.body.appendChild(menu);

    const x = Math.min(event.clientX + 10, window.innerWidth  - 260);
    const y = Math.min(event.clientY + 10, window.innerHeight - 230);
    menu.style.left = `${x}px`;
    menu.style.top  = `${y}px`;

    menu.querySelector('[data-action="copy"]').addEventListener('click', async () => {
        const code = entry.teamsCode || 'Coming Soon';
        try { await navigator.clipboard.writeText(code); alert('Teams code copied.'); }
        catch { alert(`Teams Code: ${code}`); }
    });

    menu.querySelector('[data-action="whatsapp"]').addEventListener('click', () => {
        if (!entry.whatsappLink || entry.whatsappLink === '#') { alert('Contact link will be available soon.'); return; }
        window.open(entry.whatsappLink, '_blank', 'noopener,noreferrer');
    });

    menu.querySelector('[data-action="remove"]').addEventListener('click', () => {
        removeEntryById(entry.entryId);
        closeQuickActions();
        renderSchedule();
        loadSubjects(selectedYear);
    });
}

function closeQuickActions() {
    document.getElementById('quickActionsMenu')?.remove();
    quickActionsState = null;
}

// ── 17. Render Schedule — FIX H-4 ────────────────────────────
// Cells are only repainted when their content hash changes.
// Touch DnD listeners are attached once at paint time.
function renderSchedule() {
    days.forEach(day => {
        timeSlots.forEach(slot => {
            const key     = `${day}-${slot.id}`;
            const entries = getCellEntries(key);
            const hash    = JSON.stringify(entries);
            if (_lastRenderHash[key] === hash) return;
            _lastRenderHash[key] = hash;

            const cell = document.getElementById(key);
            if (!cell) return;

            if (entries.length === 0) {
                cell.innerHTML = '<div class="slot-content slot-empty">Free</div>';
                return;
            }

            const sorted = [...entries].sort((a, b) => {
                if (a.type !== b.type) return a.type === 'lecture' ? -1 : 1;
                if (a.type === 'section') return (a.half || 0) - (b.half || 0);
                return 0;
            });
            const isSplit = sorted.every(e => e.type === 'section');

            cell.innerHTML = `
                <div class="slot-stack ${isSplit ? 'slot-split' : ''}">
                    ${sorted.map(e => `
                        <div class="slot-content slot-confirmed ${e.type === 'section' ? `slot-section slot-half-height slot-half-${e.half || ''}` : ''}"
                             data-entry-id="${escHtml(e.entryId)}"
                             draggable="true"
                             style="background:${escHtml(e.color)};color:white;cursor:move;">
                            ${e.type === 'section' ? '<span class="sec-badge">SEC</span>' : ''}
                            <div class="slot-subject">${escHtml(e.name)}</div>
                            <div class="slot-doctor">${escHtml(e.doctor)}</div>
                            <div class="slot-group">${escHtml(e.group)}</div>
                            <div class="slot-delete-hint">Tap for actions</div>
                        </div>`).join('')}
                </div>`;

            cell.querySelectorAll('.slot-confirmed').forEach(div => {
                const eid = div.getAttribute('data-entry-id');
                // HTML5 DnD (desktop)
                div.addEventListener('dragstart', e => handleDragStart(e, day, slot.id, eid));
                div.addEventListener('dragend',   handleDragEnd);
                // Pointer-based touch DnD (mobile/tablet)
                initTouchDrag(div, day, slot.id, eid);
                // Quick actions
                div.addEventListener('click', e => {
                    e.stopPropagation();
                    const entry = getCellEntries(key).find(i => i.entryId === eid);
                    if (entry) openQuickActions(entry, e);
                });
            });
        });
    });
}

// ── 18. Clear Preview ─────────────────────────────────────────
function clearPreview() {
    document.querySelectorAll('.preview-highlight').forEach(cell => {
        cell.classList.remove('preview-highlight');
        const key     = `${cell.dataset.day}-${cell.dataset.slot}`;
        const entries = getCellEntries(key);
        cell.innerHTML = entries.length === 0
            ? '<div class="slot-content slot-empty">Free</div>'
            : '';   // renderSchedule will fill it in
        delete _lastRenderHash[key];
    });
    if (document.querySelectorAll('.preview-highlight').length === 0 && previewData) {
        renderSchedule();
    }
}

// ── 19. Reset ─────────────────────────────────────────────────
function resetSchedule() {
    if (!confirm('Are you sure you want to reset your schedule?')) return;
    selectedYear    = null;
    scheduleData    = {};
    previewData     = null;
    draggedSlot     = null;
    _lastRenderHash = {};
    closeQuickActions();
    document.getElementById('subjectSection').style.display  = 'none';
    document.getElementById('scheduleSection').style.display = 'none';
    document.querySelectorAll('.year-card').forEach(c => c.classList.remove('active'));
}

// ── 20. Export ────────────────────────────────────────────────
//
// Root cause of mobile crop:
//   The wrapper div (.schedule-table-wrapper) has overflow-x:auto.
//   html2canvas respects that clip boundary, so it only renders
//   the visible viewport width — off-screen columns are cut off.
//
// Fix strategy — captureFullTable():
//   1. Measure the FULL natural dimensions of the inner <table>
//      (scrollWidth × scrollHeight) BEFORE html2canvas is called,
//      while the real DOM is still intact.
//   2. Pass those pixel values to html2canvas as explicit `width`
//      and `windowWidth` overrides so the library allocates a
//      canvas large enough for the whole table.
//   3. Use `onclone` to patch only the cloned document:
//      – Remove overflow clipping from the wrapper and every
//        ancestor up to <body> so nothing clips the render.
//      – Force the cloned wrapper and table to their full natural
//        widths so the layout engine doesn't re-collapse them.
//      – Hide the scrollbar track that would otherwise appear
//        at the bottom of the cloned wrapper.
//   The real DOM is never mutated, so the page stays interactive
//   while the export is running.

async function captureFullTable() {
    const wrapper = document.getElementById('scheduleTableContainer');
    const table   = wrapper.querySelector('.schedule-table');

    // Measure true full dimensions from the inner table element,
    // which is never clipped (only the wrapper clips it visually).
    const fullWidth  = table.scrollWidth;
    const fullHeight = table.scrollHeight;

    const canvas = await html2canvas(wrapper, {
        backgroundColor: '#ffffff',
        scale:           2,
        logging:         false,
        useCORS:         true,

        // Tell html2canvas the canvas dimensions it must allocate.
        // Without these, it defaults to the element's clientWidth
        // (the clipped viewport width on mobile).
        width:       fullWidth,
        height:      fullHeight,

        // windowWidth must also match so percentage-based layouts
        // inside the clone don't re-calculate against a small viewport.
        windowWidth: fullWidth,

        // onclone receives the cloned document just before rendering.
        // We patch overflow and sizing here — the real DOM is untouched.
        onclone(clonedDoc) {
            // ── 1. Remove overflow clipping on the wrapper ──────────
            const clonedWrapper = clonedDoc.getElementById('scheduleTableContainer');
            clonedWrapper.style.overflow   = 'visible';
            clonedWrapper.style.width      = `${fullWidth}px`;
            clonedWrapper.style.maxWidth   = 'none';
            clonedWrapper.style.boxShadow  = 'none'; // shadow would bleed outside
            clonedWrapper.style.borderRadius = '0';

            // ── 2. Force the cloned table to its natural width ──────
            const clonedTable = clonedWrapper.querySelector('.schedule-table');
            if (clonedTable) {
                clonedTable.style.width    = `${fullWidth}px`;
                clonedTable.style.minWidth = 'none';
            }

            // ── 3. Walk ancestors: clear any overflow that could clip
            //       the render (main-card, container, body, etc.) ────
            let ancestor = clonedWrapper.parentElement;
            while (ancestor && ancestor !== clonedDoc.body) {
                ancestor.style.overflow  = 'visible';
                ancestor.style.maxWidth  = 'none';
                ancestor.style.width     = `${fullWidth}px`;
                ancestor = ancestor.parentElement;
            }
            // Body itself just needs overflow cleared
            if (clonedDoc.body) {
                clonedDoc.body.style.overflow = 'visible';
                clonedDoc.body.style.width    = `${fullWidth}px`;
            }

            // ── 4. Inject a rule to hide the scrollbar track that
            //       the cloned wrapper would otherwise render ─────────
            const style = clonedDoc.createElement('style');
            style.textContent = `
                #scheduleTableContainer::-webkit-scrollbar { display: none !important; }
                #scheduleTableContainer { scrollbar-width: none !important; }
            `;
            clonedDoc.head.appendChild(style);
        },
    });

    return canvas;
}

async function downloadAsImage() {
    const wrapper = document.getElementById('scheduleTableContainer');
    if (!wrapper)            { alert('⚠️ Schedule table not found!'); return; }
    if (!window.html2canvas) { alert('⚠️ html2canvas not loaded. Please refresh.'); return; }

    try {
        clearPreview(); clearDragHighlights(); closeQuickActions();

        const canvas = await captureFullTable();
        const link   = document.createElement('a');
        link.download = `BIS_Schedule_Year${selectedYear}_${new Date().toISOString().split('T')[0]}.png`;
        link.href     = canvas.toDataURL('image/png');
        link.click();
    } catch (err) {
        alert('Error creating image: ' + err.message);
        console.error('[BIS] Export error:', err);
    }
}

async function downloadAsPDF() {
    const wrapper = document.getElementById('scheduleTableContainer');
    if (!wrapper)             { alert('⚠️ Schedule table not found!'); return; }
    if (!window.jspdf?.jsPDF) { alert('⚠️ jsPDF not loaded. Please refresh.'); return; }

    try {
        clearPreview(); clearDragHighlights(); closeQuickActions();

        const canvas    = await captureFullTable();
        const { jsPDF } = window.jspdf;

        // Landscape A4: printable area 277 × 190 mm (with 10 mm margins)
        const pdf        = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const pageW      = 297;  // A4 landscape width  in mm
        const pageH      = 210;  // A4 landscape height in mm
        const marginX    = 10;
        const marginY    = 10;
        const imgWidth   = pageW - marginX * 2;                        // 277 mm
        const imgHeight  = (canvas.height / canvas.width) * imgWidth;  // preserve aspect ratio
        const centeredY  = Math.max(marginY, (pageH - imgHeight) / 2); // vertically centre if it fits

        pdf.addImage(
            canvas.toDataURL('image/png'),
            'PNG',
            marginX,
            centeredY,
            imgWidth,
            imgHeight
        );
        pdf.save(`BIS_Schedule_Year${selectedYear}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
        alert('Error creating PDF: ' + err.message);
        console.error('[BIS] PDF export error:', err);
    }
}

// ── 21. Single DOMContentLoaded — FIX M-6 ───────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Firebase
    if (typeof firebase !== 'undefined' && firebase.apps.length) {
        loadScheduleFromFirebase();
    }

    // Close quick-actions on outside click
    document.addEventListener('click', e => {
        const menu = document.getElementById('quickActionsMenu');
        if (menu && !menu.contains(e.target)) closeQuickActions();
    });

    // Static Lecture / Section toggle buttons
    document.querySelectorAll('.selector-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const mode = this.getAttribute('data-mode');
            if (mode === selectionMode || !selectedYear) return;
            selectionMode = mode;
            syncToggleUI();
            previewData = null;
            clearPreview();
            loadSubjects(selectedYear);
        });
    });
});
