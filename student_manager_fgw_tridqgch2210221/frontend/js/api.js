/**
 * API Communication Module
 * Handles all communication with the Symfony API Platform backend
 */

const API_BASE_URL = 'http://localhost:8000/api';

class API {
    /**
     * Make a GET request to the API
     */
    static async get(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('GET Error:', error);
            throw error;
        }
    }

    /**
     * Make a POST request to the API
     */
    static async post(endpoint, data) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('POST Error:', error);
            throw error;
        }
    }

    /**
     * Make a PUT request to the API
     */
    static async put(endpoint, data) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('PUT Error:', error);
            throw error;
        }
    }

    /**
     * Make a DELETE request to the API
     */
    static async delete(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.status === 204 ? null : await response.json();
        } catch (error) {
            console.error('DELETE Error:', error);
            throw error;
        }
    }

    // ===== STUDENTS =====
    static async getStudents() {
        return this.get('/students');
    }

    static async getStudent(id) {
        return this.get(`/students/${id}`);
    }

    static async createStudent(data) {
        return this.post('/students', data);
    }

    static async updateStudent(id, data) {
        return this.put(`/students/${id}`, data);
    }

    static async deleteStudent(id) {
        return this.delete(`/students/${id}`);
    }

    // ===== COURSES =====
    static async getCourses() {
        return this.get('/courses');
    }

    static async getCourse(id) {
        return this.get(`/courses/${id}`);
    }

    static async createCourse(data) {
        return this.post('/courses', data);
    }

    static async updateCourse(id, data) {
        return this.put(`/courses/${id}`, data);
    }

    static async deleteCourse(id) {
        return this.delete(`/courses/${id}`);
    }

    // ===== ENROLLMENTS =====
    static async getEnrollments() {
        return this.get('/enrollments');
    }

    static async createEnrollment(data) {
        return this.post('/enrollments', data);
    }

    static async deleteEnrollment(id) {
        return this.delete(`/enrollments/${id}`);
    }

    // ===== GRADES =====
    static async getGrades() {
        return this.get('/grades');
    }

    static async createGrade(data) {
        return this.post('/grades', data);
    }
}

/**
 * UI Helper Functions
 */
class UI {
    /**
     * Show an alert message
     */
    static showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        const container = document.querySelector('.container') || document.body;
        container.insertBefore(alertDiv, container.firstChild);

        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    /**
     * Show loading state
     */
    static showLoading(element) {
        element.innerHTML = '<div class="loading"><div class="spinner"></div> Loading...</div>';
    }

    /**
     * Show error state
     */
    static showError(element, message) {
        element.innerHTML = `<div class="alert alert-error">${message}</div>`;
    }

    /**
     * Show empty state
     */
    static showEmpty(element, message = 'No items found') {
        element.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📭</div><p>${message}</p></div>`;
    }

    /**
     * Format date
     */
    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    /**
     * Confirm action with user
     */
    static confirm(message) {
        return confirm(message);
    }

    /**
     * Navigate to a page
     */
    static navigate(page) {
        window.location.href = `${page}.html`;
    }
}

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API, UI };
}
