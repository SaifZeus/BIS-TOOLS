# BIS Schedule Builder

A professional, interactive schedule builder for Business Information Systems students at Helwan University.

## 📁 Project Structure

```
bis-schedule-builder/
├── index.html       # Main HTML file
├── style.css        # Styles matching BIS branding
├── script.js        # Schedule building logic
├── BIS_LOGO.png     # University logo
└── README.md        # This file
```

## 🚀 Features

- **Year Selection:** Choose your academic year (1-4)
- **Subject Browsing:** View all available subjects for your year
- **Doctor Selection:** See available doctors and their time slots
- **Visual Schedule:** Interactive weekly timetable with color-coded subjects
- **Smart Selection:** Automatically prevents time conflicts
- **Export Options:** Download your schedule as Image (PNG) or PDF
- **Responsive Design:** Works on desktop, tablet, and mobile devices
- **BIS Branding:** Consistent theme with GPA Calculator

## 📅 Fixed Time Slots

1. 8:10 AM - 10:12 AM
2. 10:12 AM - 12:2 PM
3. 12:2 PM - 2:4 PM
4. 2:4 PM - 4:6 PM
5. 4:6 PM - 6:8 PM

## 🎯 How to Use

1. **Select Year:** Click on your academic year (1, 2, 3, or 4)
2. **Browse Subjects:** View available subjects for your year
3. **Choose Doctor:** Click on a doctor to see their schedule
4. **Build Schedule:** Selected slots automatically fill in the table
5. **Export:** Download your final schedule as PNG or PDF

## 🎨 Customization

### Adding More Courses

Edit `script.js` and find the `coursesData` object:

```javascript
const coursesData = {
    1: [ // Year 1
        {
            code: 'MRK',
            name: 'Money and Banking',
            color: subjectColors[0],
            doctors: [
                {
                    name: 'Dr. Wafaa',
                    schedule: [
                        { day: 'Sunday', slots: [1, 2, 3] },
                        { day: 'Tuesday', slots: [1] }
                    ]
                }
            ]
        }
    ]
};
```

### Changing Colors

Subject colors are defined in `script.js`:
```javascript
const subjectColors = [
    '#ef4444', // Red
    '#f59e0b', // Orange
    // ... add more colors
];
```

## 🔗 Integration with GPA Calculator

The navigation button in the header links to the BIS GPA Calculator. Make sure both projects are in the same parent directory:

```
parent-folder/
├── bis-gpa-calculator/
│   └── index.html
└── bis-schedule-builder/
    └── index.html
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 👨‍💻 Developer

**Saif Wael**
- LinkedIn: [linkedin.com/in/saifwael](https://www.linkedin.com/in/saifwael/)
- Facebook: [ReaMrZeus](https://www.facebook.com/ReaMrZeus)

## 🏫 BIS Program

Business Information Systems - Faculty of Commerce and Business Administration  
Helwan University

[BIS Facebook Page](https://www.facebook.com/BIS.FCBA.Helwan.uni)

---

Made with ❤️ for BIS Students
