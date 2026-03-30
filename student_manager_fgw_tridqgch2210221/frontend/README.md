# Student Manager - Frontend Application

## Overview

This is the client-side application for the Student Manager system. It's built with vanilla HTML5, CSS3, and JavaScript (ES6+) and communicates with the backend API via REST endpoints powered by API Platform.

## Project Structure

```
frontend/
├── index.html              # Home/Dashboard page
├── students.html           # List all students
├── students-form.html      # Create/Edit student form
├── courses.html            # List all courses
├── courses-form.html       # Create/Edit course form
├── enrollments.html        # List all enrollments
├── enrollments-form.html   # Create new enrollment form
├── grades.html             # List all grades
├── grades-form.html        # Record new grade form
├── about.html              # About page
├── css/
│   └── style.css           # Complete CSS framework (responsive, component-based)
└── js/
    ├── api.js              # API communication wrapper class
    └── app.js              # Main application logic and page handlers
```

## Features

### 1. **Responsive Design**
- Works on desktop, tablet, and mobile devices
- CSS Grid for layouts
- Flexbox for component alignment
- Mobile-first approach with breakpoints at 768px and 480px

### 2. **Component Library** (CSS)
- Buttons (primary, secondary, danger, small variants)
- Forms (text, email, number, date, select, textarea inputs)
- Tables with hover effects
- Cards for content grouping
- Alerts (info, success, warning, error)
- Modals for dialogs
- Navigation bar
- Footer
- Stats cards for dashboard
- Empty states

### 3. **API Integration** (api.js)
- Centralized API wrapper with all CRUD operations
- Methods for: Students, Courses, Enrollments, Grades
- Error handling with meaningful messages
- UI helper methods for common interactions

### 4. **Page Functionality** (app.js)
- Dynamic data loading from API
- Form submissions and validation
- Edit/Delete operations with confirmation
- Page initialization and event handling
- Search and filter capabilities

## Getting Started

### 1. **Serving the Application**

#### Option A: Live Server (VS Code Extension)
```bash
# Install "Live Server" extension in VS Code
# Right-click index.html and select "Open with Live Server"
```

#### Option B: Python Built-in Server
```bash
# Navigate to frontend directory
cd path/to/frontend

# Python 3.x
python -m http.server 8080

# Python 2.x
python -m SimpleHTTPServer 8080

# Then visit: http://localhost:8080
```

#### Option C: Node.js HTTP Server
```bash
# Install http-server globally (if not already)
npm install -g http-server

# Navigate to frontend directory
cd path/to/frontend

# Start server
http-server

# Then visit the provided URL (usually http://localhost:8080)
```

#### Option D: Using Symfony Development Server
From the backend directory:
```bash
symfony serve
# Frontend accessible at http://localhost:8000 (adjust API_URL in js/api.js)
```

### 2. **Configure API Endpoint**

Edit `js/api.js` and update the API base URL if needed:

```javascript
const API_URL = 'http://localhost:8000/api';  // Change if your API is on a different URL
```

### 3. **Access the Application**

Open your browser and navigate to:
- `http://localhost:8080` (or whatever port you're using)

## File Descriptions

### HTML Pages

- **index.html** - Home/Dashboard page showing quick statistics and feature overview
- **students.html** - List all students with search/filter capabilities and edit/delete actions
- **students-form.html** - Form to create new students or edit existing ones
- **courses.html** - List all courses with filter by semester
- **courses-form.html** - Form to create new courses or edit existing ones
- **enrollments.html** - List all student course enrollments
- **enrollments-form.html** - Form to create new course enrollments
- **grades.html** - List all student grades with filter by letter grade
- **grades-form.html** - Form to record new grades with grade scale reference
- **about.html** - About page with project information and technology stack

### CSS (css/style.css)

**Features:**
- CSS Variables for color scheme and sizing
- Responsive grid system
- Component-based styling
- Animations and transitions
- Print-friendly styles
- Dark mode compatible (can be extended)

**Key Classes:**
```css
/* Layout */
.container {}       /* Max-width container */
.navbar {}          /* Navigation bar */
.footer {}          /* Footer */

/* Buttons */
.btn {}             /* Base button style */
.btn-primary {}     /* Primary action button */
.btn-secondary {}   /* Secondary button */
.btn-danger {}      /* Destructive action button */
.btn-small {}       /* Small button variant */

/* Forms */
.form-group {}      /* Form field wrapper */
.form-control {}    /* Input styling */
.form-actions {}    /* Button group in forms */

/* Tables */
.table {}           /* Base table */
.table-hover {}     /* Hover effect on rows */

/* Cards */
.card {}            /* Content card container */
.stat-card {}       /* Statistics card */

/* Alerts */
.alert {}           /* Base alert */
.alert-success {}   /* Success message */
.alert-error {}     /* Error message */
.alert-info {}      /* Information message */

/* Utilities */
.required {}        /* Required field indicator */
.text-center {}     /* Center text alignment */
```

### JavaScript (js/)

#### api.js
Provides centralized API communication:

```javascript
// Core methods
API.get(endpoint)           // GET request
API.post(endpoint, data)    // POST request
API.put(endpoint, data)     // PUT request
API.delete(endpoint)        // DELETE request

// Student operations
API.getStudents()           // Get all students
API.getStudent(id)          // Get specific student
API.createStudent(data)     // Create new student
API.updateStudent(id, data) // Update student
API.deleteStudent(id)       // Delete student

// Course operations
API.getCourses()            // Get all courses
API.getCourse(id)           // Get specific course
API.createCourse(data)      // Create new course
API.updateCourse(id, data)  // Update course
API.deleteCourse(id)        // Delete course

// Enrollment operations
API.getEnrollments()        // Get all enrollments
API.createEnrollment(data)  // Create new enrollment
API.deleteEnrollment(id)    // Delete enrollment

// Grade operations
API.getGrades()             // Get all grades
API.createGrade(data)       // Create new grade

// UI Helper methods
UI.showAlert(message, type)     // Show notification
UI.showLoading(element)         // Show loading spinner
UI.showError(element, message)  // Show error message
UI.showEmpty(element, message)  // Show empty state
UI.formatDate(dateString)       // Format date for display
UI.confirm(message)             // Show confirmation dialog
UI.navigate(url)                // Navigate to URL
```

#### app.js
Handles page-specific functionality:

- **Page Initialization** - Loads page-specific code based on data-page attribute
- **Navigation** - Mobile menu toggle and page navigation
- **Form Handling** - Validates and submits forms to API
- **Data Loading** - Fetches and displays data from API
- **CRUD Operations** - Edit, delete, and confirmation dialogs
- **Modal Management** - Open/close modal dialogs
- **Utility Functions** - HTML escaping, date formatting, etc.

## API Integration Details

### Expected API Endpoints

The frontend expects the following API endpoints (provided by API Platform):

```
GET    /api/students           - List all students
GET    /api/students/{id}      - Get specific student
POST   /api/students           - Create new student
PUT    /api/students/{id}      - Update student
DELETE /api/students/{id}      - Delete student

GET    /api/courses            - List all courses
GET    /api/courses/{id}       - Get specific course
POST   /api/courses            - Create new course
PUT    /api/courses/{id}       - Update course
DELETE /api/courses/{id}       - Delete course

GET    /api/enrollments        - List all enrollments
POST   /api/enrollments        - Create new enrollment
DELETE /api/enrollments/{id}   - Delete enrollment

GET    /api/grades             - List all grades
POST   /api/grades             - Create new grade
```

### API Response Format

API Platform returns responses in JSON format with Hydra collection structure:

```json
{
  "@context": "...",
  "@id": "/api/students",
  "@type": "Collection",
  "hydra:member": [
    {
      "@id": "/api/students/1",
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      ...
    }
  ],
  "hydra:totalItems": 1
}
```

## Error Handling

The application includes comprehensive error handling:

1. **Network Errors** - Displays error messages if API is unreachable
2. **Validation Errors** - Shows form validation messages
3. **API Errors** - Displays server error messages to user
4. **Not Found** - Shows appropriate message when resource doesn't exist
5. **Confirmation** - Asks user to confirm destructive actions (delete)

## Data Validation

### Client-Side Validation (HTML5)
- Required fields marked with `<span class="required">*</span>`
- Input types (email, number, date) with built-in validation
- Form submission prevents invalid data

### Server-Side Validation (Backend)
- All validations should be performed by the API
- Frontend displays server-returned error messages

## Browser Compatibility

The application uses modern JavaScript features and works on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

1. **CSS**
   - Minified stylesheet
   - CSS variables for DRY styling
   - Optimized media queries

2. **JavaScript**
   - Event delegation for dynamic elements
   - Debounced search operations
   - Efficient DOM manipulation

3. **Network**
   - Minimal API calls per page
   - Data caching where appropriate
   - Batch operations for multiple items

## Future Enhancements

Potential improvements for future versions:

1. **Authentication**
   - Login/logout functionality
   - JWT token handling
   - Protected routes

2. **Advanced Features**
   - Student grade reports
   - Course scheduling
   - GPA tracker
   - Transcript generation

3. **UI Improvements**
   - Dark mode toggle
   - Advanced search filters
   - Bulk operations
   - Drag-and-drop enrollment management

4. **Performance**
   - Service Worker for offline support
   - Local caching with IndexedDB
   - Progressive loading

## Testing

To test the application:

1. **Ensure Backend is Running**
   ```bash
   cd path/to/backend
   symfony serve
   ```

2. **Serve Frontend**
   ```bash
   cd path/to/frontend
   # Use any of the methods above to serve
   ```

3. **Test Features**
   - Navigate through all pages
   - Create, edit, delete students/courses
   - Create enrollments and record grades
   - Verify responsive design on different screen sizes
   - Test error handling by simulating API failures

## Troubleshooting

### CORS Errors
If you see CORS ("Cross-Origin Resource Sharing") errors in the browser console:
1. Ensure the backend is running
2. Check that API_URL in js/api.js matches the backend URL
3. Backend should have CORS enabled (API Platform handles this automatically)

### API Connection Failed
1. Verify backend is running on the configured URL/port
2. Check API_URL in js/api.js
3. Verify API Platform entities have @ApiResource annotations
4. Check browser console for specific error messages

### Empty Data Tables
1. Check if API is returning data
2. Use browser DevTools Network tab to inspect API calls
3. Verify API responses match expected JSON format

## Support & Documentation

- **Backend Documentation**: See `../IMPLEMENTATION_GUIDE.md`
- **API Documentation**: Available at `http://localhost:8000/api/doc` (when backend is running)
- **Project Overview**: See `../README.md`

## License

MIT License - See LICENSE file in project root

## Contributors

- Project Team - StudentManager-FGW-HN
