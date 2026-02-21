# BIS Admin System - Complete Setup Guide

## 🎯 Overview

A professional, secure Admin System for managing GPA courses and schedule data across the BIS Student Portal with Firebase integration.

---

## 📁 File Structure

```
/admin/
├── index.html                          # Admin login & dashboard
├── admin-style.css                     # Professional BIS-themed CSS
├── admin-script.js                     # Firebase integration logic
└── firebase-database-structure.json    # Sample database structure

Updated Files:
├── /bis-gpa-calculator/
│   ├── index.html                      # Added Firebase SDKs
│   └── script.js                       # Added Firebase fetch logic
└── /bis-schedule-builder/
    ├── index.html                      # Added Firebase SDKs
    └── script.js                       # Added Firebase fetch logic
```

---

## 🔥 Firebase Setup (Step-by-Step)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name: `bis-student-portal`
4. Disable Google Analytics (optional)
5. Click "Create Project"

### 2. Enable Realtime Database

1. In Firebase Console, go to **Build → Realtime Database**
2. Click "Create Database"
3. Select location (e.g., `us-central1`)
4. Start in **Test Mode** for development:
   ```json
   {
     "rules": {
       ".read": "auth != null",
       ".write": "auth != null"
     }
   }
   ```
5. Click "Enable"

### 3. Enable Email/Password Authentication

1. Go to **Build → Authentication**
2. Click "Get Started"
3. Click "Sign-in method" tab
4. Enable **Email/Password**
5. Click "Save"

### 4. Create Admin User

1. In Authentication section, click "Users" tab
2. Click "Add User"
3. Email: `admin@bis.edu.eg` (or your preferred email)
4. Password: Create a strong password
5. Click "Add User"

### 5. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click web icon (`</>`)
4. Register app name: `BIS Admin`
5. Copy the `firebaseConfig` object

Example:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "bis-student-portal.firebaseapp.com",
  databaseURL: "https://bis-student-portal-default-rtdb.firebaseio.com",
  projectId: "bis-student-portal",
  storageBucket: "bis-student-portal.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 6. Import Sample Data

1. Go to **Realtime Database**
2. Click the three dots (⋮) → "Import JSON"
3. Upload `firebase-database-structure.json`
4. Click "Import"

Your database should now have:
- `courses/` node with sample courses
- `schedule/` node with sample schedule data

---

## 🔧 Configuration

### Update Admin Panel Configuration

Open `/admin/admin-script.js` and replace Firebase config (line 9):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",              // Replace with your API key
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Update GPA Calculator Configuration

Open `/bis-gpa-calculator/script.js` and replace Firebase config (line 30):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Update Schedule Builder Configuration

Open `/bis-schedule-builder/script.js` and replace Firebase config (line 30):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

---

## 🚀 Usage

### Accessing the Admin Panel

1. Navigate to: `http://yoursite.com/admin/`
2. Login with admin credentials:
   - Email: `admin@bis.edu.eg`
   - Password: (the password you set in Firebase)
3. Dashboard loads automatically after successful login

### Managing GPA Courses

**View Courses:**
- Click "GPA Courses" in sidebar
- View all courses in table format

**Add Course:**
1. Click "Add Course" button
2. Fill in:
   - Course Code (e.g., `ACC101`)
   - Course Name (e.g., `Principles of Accounting 1`)
   - Credit Hours (1-6)
   - Level (1-4)
   - Semester (1-2)
3. Click "Save Course"
4. Success toast appears
5. Course appears in table immediately

**Edit Course:**
1. Click edit icon (pencil) on course row
2. Modify values in modal
3. Click "Save Course"
4. Changes update immediately

**Delete Course:**
1. Click delete icon (trash) on course row
2. Confirm deletion
3. Course removed from database

**Search Courses:**
- Type in search box to filter by code or name
- Results update in real-time

### Managing Schedule Data

**View Schedule:**
- Click "Schedule Data" in sidebar
- Select level from dropdown (1-4)
- View all subjects for that level

**Add Subject:**
1. Click "Add Subject" button
2. Fill in:
   - Subject Name
   - Color (color picker)
   - Level
3. Add Doctors:
   - Click "+ Add Doctor"
   - Enter doctor name
   - Enter schedule in JSON format:
     ```json
     [
       {
         "day": "Sunday",
         "slots": [
           {"id": 1, "g": "G1"},
           {"id": 2, "g": "G2"}
         ]
       }
     ]
     ```
   - Add multiple doctors as needed
4. Click "Save Subject"

**Edit Subject:**
1. Click edit icon on subject card
2. Modify values
3. Click "Save Subject"

**Delete Subject:**
1. Click delete icon on subject card
2. Confirm deletion
3. Subject removed

### Settings

- View Firebase database URL
- Check last sync time
- Click "Sync All Data" to refresh from Firebase

---

## 🔒 Security Best Practices

### Production Security Rules

Replace test rules with production rules in Firebase:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null && auth.token.email.matches(/.*@bis\\.edu\\.eg$/)"
  }
}
```

This ensures:
- Only authenticated users can read
- Only users with `@bis.edu.eg` emails can write

### Additional Security

1. **Enable App Check:**
   - Go to Firebase → Build → App Check
   - Register your site
   - Prevents unauthorized API usage

2. **Restrict API Keys:**
   - Go to Google Cloud Console
   - API & Services → Credentials
   - Restrict Firebase API keys to your domain

3. **Strong Passwords:**
   - Use password manager
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols

---

## 🎨 Features

### Admin Panel Features

✅ **Glassmorphism Login Card**
- Modern design with backdrop blur
- Animated logo
- Smooth transitions

✅ **Professional Dashboard**
- Sidebar navigation
- Multiple views (Courses, Schedule, Settings)
- Clean data tables
- Search & filter functionality

✅ **CRUD Operations**
- Create, Read, Update, Delete
- Optimistic UI updates
- Success/Error toast notifications
- Confirmation dialogs

✅ **Firebase Integration**
- Real-time data sync
- Automatic persistence
- Fallback to local data
- Auth state management

✅ **BIS Theme Consistency**
- Matches Landing Page colors
- Uses same CSS variables
- Professional shadows & animations
- Responsive design

### Frontend Features

✅ **Automatic Data Loading**
- GPA Calculator fetches courses from Firebase
- Schedule Builder fetches schedule from Firebase
- Falls back to hardcoded data if Firebase unavailable
- No user action required

✅ **Optimistic Updates**
- Changes appear immediately in admin
- Toast notifications confirm success
- Real-time sync across devices

---

## 📊 Database Structure

### Courses Node

```json
{
  "courses": [
    {
      "code": "ACC101",
      "name": "Principles of Accounting 1",
      "hours": 3,
      "level": 1,
      "semester": 1
    }
  ]
}
```

**Fields:**
- `code` (string): Unique course code
- `name` (string): Full course name
- `hours` (number): Credit hours (1-6)
- `level` (number): Academic year (1-4)
- `semester` (number): Semester (1-2)

### Schedule Node

```json
{
  "schedule": {
    "2": [
      {
        "name": "Money and Banking",
        "color": "#ef4444",
        "doctors": [
          {
            "name": "Dr. Mahmoud Eltony",
            "schedule": [
              {
                "day": "Sunday",
                "slots": [
                  {"id": 1, "g": "G1"}
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

**Structure:**
- Level → Array of Subjects
  - Subject → `name`, `color`, `doctors[]`
    - Doctor → `name`, `schedule[]`
      - Schedule → `day`, `slots[]`
        - Slot → `id` (1-6), `g` (group code)

---

## 🐛 Troubleshooting

### Issue: "Firebase not configured"

**Solution:**
1. Check firebaseConfig in all three files
2. Ensure API key is correct
3. Verify databaseURL matches your project

### Issue: Login fails

**Solution:**
1. Verify email/password in Firebase Authentication
2. Check browser console for errors
3. Ensure Authentication is enabled in Firebase

### Issue: Data not loading

**Solution:**
1. Check Firebase Realtime Database rules
2. Verify data exists in database
3. Check browser console for errors
4. Test database connection in Firebase Console

### Issue: Changes not saving

**Solution:**
1. Verify auth state (logged in?)
2. Check database write rules
3. Inspect network tab for failed requests
4. Clear browser cache

---

## 📱 Mobile Support

Admin panel is fully responsive:
- ✅ Sidebar navigation (hamburger on mobile)
- ✅ Touch-friendly buttons
- ✅ Scrollable tables
- ✅ Responsive forms
- ✅ Mobile-optimized modals

---

## 🎯 Next Steps

1. **Configure Firebase** (follow setup above)
2. **Update all firebaseConfig** objects
3. **Create admin user** in Firebase
4. **Import sample data** (optional)
5. **Test login** at `/admin/`
6. **Add/edit some data** to verify
7. **Test frontend apps** to see data sync

---

## 💡 Pro Tips

1. **Backup Regularly:**
   - Export database JSON from Firebase console
   - Keep copy of Firebase config

2. **Test on Staging:**
   - Create separate Firebase project for testing
   - Test changes before production

3. **Monitor Usage:**
   - Check Firebase console for activity
   - Monitor read/write counts
   - Set up billing alerts

4. **Version Control:**
   - Keep track of database structure changes
   - Document any major updates

---

## 🔗 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Realtime Database Guide](https://firebase.google.com/docs/database)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Developer:** Saif Wael  
**Status:** ✅ Production Ready
