/**
 * Student Manager - Main Application File
 * Handles page interactions and API communication
 */

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Log page load for debugging
    console.log('Student Manager App Initialized');

    // Get current page from HTML data attribute or filename
    const currentPage = document.body.getAttribute('data-page');
    
    if (currentPage) {
        // Load page-specific functionality
        loadPageFunctionality(currentPage);
    }

    // Setup global event listeners
    setupGlobalListeners();
}

/**
 * Setup global event listeners
 */
function setupGlobalListeners() {
    // Mobile menu toggle (if exists)
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Form submit handlers
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Modal close handlers
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
}

/**
 * Load page-specific functionality
 */
function loadPageFunctionality(page) {
    switch (page) {
        case 'index':
            loadHomePage();
            break;
        case 'students':
            loadStudentsPage();
            break;
        case 'students-form':
            loadStudentsFormPage();
            break;
        case 'courses':
            loadCoursesPage();
            break;
        case 'courses-form':
            loadCoursesFormPage();
            break;
        case 'enrollments':
            loadEnrollmentsPage();
            break;
        case 'enrollments-form':
            loadEnrollmentsFormPage();
            break;
        case 'grades':
            loadGradesPage();
            break;
        case 'grades-form':
            loadGradesFormPage();
            break;
    }
}

// ===== HOME PAGE =====
function loadHomePage() {
    loadStatistics();
}

async function loadStatistics() {
    try {
        const studentsData = await API.getStudents();
        const coursesData = await API.getCourses();
        const enrollmentsData = await API.getEnrollments();
        const gradesData = await API.getGrades();

        // Update stats
        document.querySelector('[data-stat="students"]').textContent = 
            studentsData['hydra:member']?.length || 0;
        document.querySelector('[data-stat="courses"]').textContent = 
            coursesData['hydra:member']?.length || 0;
        document.querySelector('[data-stat="enrollments"]').textContent = 
            enrollmentsData['hydra:member']?.length || 0;
        document.querySelector('[data-stat="grades"]').textContent = 
            gradesData['hydra:member']?.length || 0;
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// ===== STUDENTS PAGE =====
async function loadStudentsPage() {
    const tableBody = document.querySelector('tbody');
    if (!tableBody) return;

    UI.showLoading(tableBody);

    try {
        const data = await API.getStudents();
        const students = data['hydra:member'] || [];

        if (students.length === 0) {
            UI.showEmpty(tableBody, 'No students found. Create one to get started!');
            return;
        }

        tableBody.innerHTML = students
            .map(student => `
                <tr>
                    <td>${escapeHtml(student.firstName)} ${escapeHtml(student.lastName)}</td>
                    <td>${escapeHtml(student.user?.email || 'N/A')}</td>
                    <td>${student.gpa || 'N/A'}</td>
                    <td>${escapeHtml(student.status)}</td>
                    <td>
                        <div class="btn-group">
                            <button class="btn btn-primary btn-small" onclick="editStudent(${student.id})">
                                Edit
                            </button>
                            <button class="btn btn-danger btn-small" onclick="deleteStudent(${student.id})">
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            `)
            .join('');
    } catch (error) {
        UI.showError(tableBody, `Error loading students: ${error.message}`);
    }
}

async function deleteStudent(id) {
    if (!UI.confirm('Are you sure you want to delete this student?')) return;

    try {
        await API.deleteStudent(id);
        UI.showAlert('Student deleted successfully', 'success');
        loadStudentsPage(); // Reload the list
    } catch (error) {
        UI.showAlert(`Error deleting student: ${error.message}`, 'error');
    }
}

function editStudent(id) {
    window.location.href = `students-form.html?id=${id}`;
}

// ===== STUDENTS FORM PAGE =====
async function loadStudentsFormPage() {
    const form = document.querySelector('form');
    if (!form) return;

    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');

    if (studentId) {
        // Edit mode
        try {
            const student = await API.getStudent(studentId);
            document.querySelector('[name="firstName"]').value = student.firstName;
            document.querySelector('[name="lastName"]').value = student.lastName;
            document.querySelector('[name="status"]').value = student.status;
            document.querySelector('h1').textContent = 'Edit Student';
            form.setAttribute('data-id', studentId);
        } catch (error) {
            UI.showAlert(`Error loading student: ${error.message}`, 'error');
        }
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const studentId = form.getAttribute('data-id');

    try {
        if (form.getAttribute('data-page') === 'students-form') {
            if (studentId) {
                await API.updateStudent(studentId, data);
                UI.showAlert('Student updated successfully', 'success');
            } else {
                await API.createStudent(data);
                UI.showAlert('Student created successfully', 'success');
            }
            setTimeout(() => window.location.href = 'students.html', 1000);
        }
        // Add similar handlers for other forms
    } catch (error) {
        UI.showAlert(`Error: ${error.message}`, 'error');
    }
}

// ===== COURSES PAGE =====
async function loadCoursesPage() {
    const tableBody = document.querySelector('tbody');
    if (!tableBody) return;

    UI.showLoading(tableBody);

    try {
        const data = await API.getCourses();
        const courses = data['hydra:member'] || [];

        if (courses.length === 0) {
            UI.showEmpty(tableBody, 'No courses found. Create one to get started!');
            return;
        }

        tableBody.innerHTML = courses
            .map(course => `
                <tr>
                    <td>${escapeHtml(course.code)}</td>
                    <td>${escapeHtml(course.title)}</td>
                    <td>${course.credits}</td>
                    <td>${escapeHtml(course.instructor || 'N/A')}</td>
                    <td>${course.capacity}</td>
                    <td>${escapeHtml(course.semester)}</td>
                    <td>
                        <div class="btn-group">
                            <button class="btn btn-primary btn-small" onclick="editCourse(${course.id})">
                                Edit
                            </button>
                            <button class="btn btn-danger btn-small" onclick="deleteCourse(${course.id})">
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            `)
            .join('');
    } catch (error) {
        UI.showError(tableBody, `Error loading courses: ${error.message}`);
    }
}

async function deleteCourse(id) {
    if (!UI.confirm('Are you sure you want to delete this course?')) return;

    try {
        await API.deleteCourse(id);
        UI.showAlert('Course deleted successfully', 'success');
        loadCoursesPage();
    } catch (error) {
        UI.showAlert(`Error deleting course: ${error.message}`, 'error');
    }
}

function editCourse(id) {
    window.location.href = `courses-form.html?id=${id}`;
}

// ===== COURSES FORM PAGE =====
async function loadCoursesFormPage() {
    const form = document.querySelector('form');
    if (!form) return;

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (courseId) {
        try {
            const course = await API.getCourse(courseId);
            document.querySelector('[name="title"]').value = course.title;
            document.querySelector('[name="code"]').value = course.code;
            document.querySelector('[name="description"]').value = course.description || '';
            document.querySelector('[name="credits"]').value = course.credits;
            document.querySelector('[name="capacity"]').value = course.capacity;
            document.querySelector('[name="semester"]').value = course.semester;
            document.querySelector('h1').textContent = 'Edit Course';
            form.setAttribute('data-id', courseId);
        } catch (error) {
            UI.showAlert(`Error loading course: ${error.message}`, 'error');
        }
    }
}

// ===== ENROLLMENTS PAGE =====
async function loadEnrollmentsPage() {
    const tableBody = document.querySelector('tbody');
    if (!tableBody) return;

    UI.showLoading(tableBody);

    try {
        const data = await API.getEnrollments();
        const enrollments = data['hydra:member'] || [];

        if (enrollments.length === 0) {
            UI.showEmpty(tableBody, 'No enrollments found. Create one to get started!');
            return;
        }

        tableBody.innerHTML = enrollments
            .map(enrollment => `
                <tr>
                    <td>${escapeHtml(enrollment.student?.firstName || 'N/A')} ${escapeHtml(enrollment.student?.lastName || '')}</td>
                    <td>${escapeHtml(enrollment.course?.title || 'N/A')}</td>
                    <td>${UI.formatDate(enrollment.enrollmentDate)}</td>
                    <td>${escapeHtml(enrollment.status)}</td>
                    <td>
                        <button class="btn btn-danger btn-small" onclick="dropEnrollment(${enrollment.id})">
                            Drop
                        </button>
                    </td>
                </tr>
            `)
            .join('');
    } catch (error) {
        UI.showError(tableBody, `Error loading enrollments: ${error.message}`);
    }
}

async function dropEnrollment(id) {
    if (!UI.confirm('Are you sure you want to drop this course?')) return;

    try {
        await API.deleteEnrollment(id);
        UI.showAlert('Enrollment dropped successfully', 'success');
        loadEnrollmentsPage();
    } catch (error) {
        UI.showAlert(`Error dropping enrollment: ${error.message}`, 'error');
    }
}

// ===== ENROLLMENTS FORM PAGE =====
async function loadEnrollmentsFormPage() {
    try {
        const studentsData = await API.getStudents();
        const coursesData = await API.getCourses();

        const studentSelect = document.querySelector('[name="student"]');
        const courseSelect = document.querySelector('[name="course"]');

        if (studentSelect) {
            studentSelect.innerHTML = (studentsData['hydra:member'] || [])
                .map((s, i) => `<option value="${i}">${escapeHtml(s.firstName)} ${escapeHtml(s.lastName)}</option>`)
                .join('');
        }

        if (courseSelect) {
            courseSelect.innerHTML = (coursesData['hydra:member'] || [])
                .map((c, i) => `<option value="${i}">${escapeHtml(c.title)}</option>`)
                .join('');
        }
    } catch (error) {
        UI.showAlert(`Error loading form data: ${error.message}`, 'error');
    }
}

// ===== GRADES PAGE =====
async function loadGradesPage() {
    const tableBody = document.querySelector('tbody');
    if (!tableBody) return;

    UI.showLoading(tableBody);

    try {
        const data = await API.getGrades();
        const grades = data['hydra:member'] || [];

        if (grades.length === 0) {
            UI.showEmpty(tableBody, 'No grades found. Record one to get started!');
            return;
        }

        tableBody.innerHTML = grades
            .map(grade => `
                <tr>
                    <td>${escapeHtml(grade.student?.firstName || 'N/A')} ${escapeHtml(grade.student?.lastName || '')}</td>
                    <td>${escapeHtml(grade.course?.title || 'N/A')}</td>
                    <td>${grade.score}/100</td>
                    <td><strong>${escapeHtml(grade.gradeLetter)}</strong></td>
                    <td>${UI.formatDate(grade.dateRecorded)}</td>
                </tr>
            `)
            .join('');
    } catch (error) {
        UI.showError(tableBody, `Error loading grades: ${error.message}`);
    }
}

// ===== GRADES FORM PAGE =====
async function loadGradesFormPage() {
    try {
        const studentsData = await API.getStudents();
        const coursesData = await API.getCourses();

        const studentSelect = document.querySelector('[name="student"]');
        const courseSelect = document.querySelector('[name="course"]');

        if (studentSelect) {
            studentSelect.innerHTML = (studentsData['hydra:member'] || [])
                .map((s, i) => `<option value="${i}">${escapeHtml(s.firstName)} ${escapeHtml(s.lastName)}</option>`)
                .join('');
        }

        if (courseSelect) {
            courseSelect.innerHTML = (coursesData['hydra:member'] || [])
                .map((c, i) => `<option value="${i}">${escapeHtml(c.title)}</option>`)
                .join('');
        }
    } catch (error) {
        UI.showAlert(`Error loading form data: ${error.message}`, 'error');
    }
}

// ===== UTILITY FUNCTIONS =====

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

/**
 * Close modal
 */
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.classList.remove('active'));
}

/**
 * Open modal
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}
