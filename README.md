# BIS Student Portal

A professional, modern web portal for Business Information Systems students at Helwan University, featuring GPA calculation and schedule building tools.

## 🌟 Features

### Landing Page
- **Professional Design:** Modern, responsive interface with BIS branding
- **Hero Section:** Eye-catching header with logo and clear value proposition
- **Service Cards:** Two main utilities with hover effects and smooth transitions
- **FAQ Section:** Accordion-style answers to common questions
- **Footer:** Social links, navigation, and legal disclaimer

### GPA Calculator
- ✅ Calculate semester and cumulative GPA
- ✅ Automatic grade point conversion (A+ to F scale)
- ✅ Support for all 4 academic years
- ✅ Previous cumulative GPA integration
- ✅ Rating system (Excellent, Very Good, Good, etc.)
- ✅ Export results as PNG or PDF

### Schedule Builder
- ✅ Interactive weekly timetable (horizontal layout)
- ✅ 6 time slots (8:00 AM - 8:00 PM)
- ✅ Preview mode for doctor selection
- ✅ Drag-and-drop slot movement with visual highlights
- ✅ Course locking (single enrollment per subject)
- ✅ Conflict detection and prevention
- ✅ Group ID tracking
- ✅ Export schedule as PNG or PDF

## 📁 Project Structure

```
BIS-Student-Portal/
├── index.html                    # Landing page
├── landing-style.css             # Landing page styles
├── landing-script.js             # Landing page interactions
├── BIS_LOGO.png                  # BIS program logo
│
├── bis-gpa-calculator/
│   ├── index.html                # GPA Calculator app
│   ├── style.css                 # GPA Calculator styles
│   ├── script.js                 # GPA Calculator logic
│   └── BIS_LOGO.png              # Logo
│
└── bis-schedule-builder/
    ├── index.html                # Schedule Builder app
    ├── style.css                 # Schedule Builder styles
    ├── script.js                 # Schedule Builder logic
    └── BIS_LOGO.png              # Logo
```

## 🎨 Design System

### Color Palette
```css
--bis-primary: #1e3a5f      /* Navy Blue - Primary brand color */
--bis-secondary: #2c5282    /* Deep Blue - Secondary elements */
--bis-accent: #4a9eff       /* Bright Blue - Accents and CTAs */
--bis-light: #63b3ed        /* Light Blue - Highlights */
--bis-dark: #0f2744         /* Dark Navy - Footers */
```

### Typography
- **Primary Font:** Poppins (Google Fonts)
- **Monospace Font:** JetBrains Mono (for code/numbers)
- **Weights:** 300, 400, 500, 600, 700, 800

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

### Border Radius
- **Buttons:** 12px
- **Cards:** 16px - 24px
- **Main Containers:** 28px
- **Badges/Tags:** 20px - 50px (rounded)

## 🚀 Getting Started

### Option 1: Local Development
1. Download all files maintaining the folder structure
2. Open `index.html` in your browser
3. Navigate to GPA Calculator or Schedule Builder

### Option 2: Web Hosting
1. Upload entire project to your web host
2. Ensure folder structure is maintained
3. Access via your domain (e.g., `yourdomain.com/`)

### Option 3: GitHub Pages
1. Create a new repository
2. Upload all files
3. Enable GitHub Pages in repository settings
4. Access via `username.github.io/repository-name`

## 📱 Browser Support

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technologies Used

### Frontend
- **HTML5:** Semantic markup
- **CSS3:** Modern styling with animations
- **Vanilla JavaScript:** No frameworks, pure JS

### Libraries
- **html2canvas:** Export functionality (GPA Calculator & Schedule Builder)
- **jsPDF:** PDF generation (GPA Calculator & Schedule Builder)
- **Google Fonts:** Poppins and JetBrains Mono

## 📊 Data Structure

### GPA Calculator
```javascript
{
    code: "BIS201",
    name: "Database Systems",
    hours: 3,
    level: 2,
    semester: 1,
    elective: false
}
```

### Schedule Builder
```javascript
{
    name: "Money and Banking",
    color: "#ef4444",
    doctors: [{
        name: "Dr. Mahmoud Eltony",
        schedule: [{
            day: "Sunday",
            slots: [{id: 1, g: "G20"}]
        }]
    }]
}
```

## 🎯 Key Features Explained

### Landing Page
- **FAQ Accordion:** Click questions to expand/collapse answers
- **Service Cards:** Hover for lift effect, click to navigate
- **Responsive Design:** Adapts to mobile, tablet, and desktop
- **Smooth Animations:** Fade-in effects on scroll

### GPA Calculator
- **Auto-calculation:** Real-time GPA updates
- **Cumulative GPA:** Includes previous semesters
- **Export:** Download as professional PDF or PNG
- **Validation:** Ensures all required fields are filled

### Schedule Builder
- **Drag & Drop:** Move slots between time periods
- **Visual Highlights:** Shows valid drop targets during drag
- **Course Locking:** Prevents duplicate enrollments
- **Conflict Detection:** Warns about overlapping slots
- **Group Tracking:** Maintains group IDs when moving slots

## 🔒 Privacy & Security

- **No Server:** All processing happens in your browser
- **No Tracking:** No analytics or user tracking
- **Local Storage:** Data stored only on your device
- **No Account:** No registration or login required

## 📝 FAQ

### Is this affiliated with Helwan University?
No, this is an independent personal project created to help students during registration periods.

### Is the data updated?
Yes, the Schedule Builder data is updated term-by-term after official schedules are released.

### Can I use this on mobile?
Yes! All tools are fully responsive and work on mobile devices.

### How accurate is the GPA calculation?
It uses the official Helwan University grading scale, but always verify important calculations with academic advisors.

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

### To Report Issues:
1. Describe the issue clearly
2. Include browser and device information
3. Provide steps to reproduce

### To Suggest Features:
1. Explain the use case
2. Describe the expected behavior
3. Share mockups if applicable

## 📄 License & Disclaimer

**Made by:** Saif Wael

**Disclaimer:** This website is an independent tool and is not affiliated with, endorsed by, or connected to Helwan University or the BIS program. All rights reserved to Saif Wael.

## 📞 Contact

- **LinkedIn:** [linkedin.com/in/saifwael](https://www.linkedin.com/in/saifwael/)
- **Facebook:** [ReaMrZeus](https://www.facebook.com/ReaMrZeus)
- **BIS Page:** [BIS.FCBA.Helwan.uni](https://www.facebook.com/BIS.FCBA.Helwan.uni)

## 🎓 For Students

This portal was built by a BIS student for BIS students. Use these tools to:
- Plan your schedule before registration opens
- Calculate your GPA after exam results
- Visualize your academic progress
- Save time during the hectic registration period

**Good luck with your studies!** 📚✨

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Developed with ❤️ for BIS Students**
