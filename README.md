# Student Manager Website

A comprehensive **Student Management System** built with **Symfony 5.x**, **API Platform**, **PostgreSQL**, and modern web technologies (HTML5, CSS3, Bootstrap, JavaScript).

## 🎯 Project Overview

This is a full-featured web application for managing:
- **Students** - Registration, enrollment tracking, and performance monitoring
- **Courses** - Course management with capacity and scheduling
- **Enrollments** - Student course registrations and status management
- **Grades** - Grade recording and GPA calculations
- **Users** - Authentication, authorization, and role-based access control

### Technology Stack
| Component | Technology |
|-----------|-----------|
| Backend | Symfony 5.x + PHP 7.4+ |
| API | API Platform (RESTful + Swagger/OpenAPI) |
| Database | PostgreSQL |
| Frontend | HTML5, CSS3, Bootstrap 5 |
| Interactivity | JavaScript/ES6 |
| Package Manager | Composer (PHP), npm (Frontend) |
| Version Control | Git (GitHub/BitBucket) |

---

## ✨ Features

### Core Features
✅ User authentication & authorization (Login/Register/Logout)  
✅ Student management (CRUD operations)  
✅ Course management (CRUD operations)  
✅ Course enrollment system  
✅ Grade recording and tracking  
✅ GPA calculation  
✅ Role-based access control (Admin/User)  
✅ Responsive web interface  
✅ RESTful API with Swagger documentation  
✅ Complete API documentation

### Advanced Features
✅ Pagination and filtering  
✅ Search functionality  
✅ Data validation  
✅ Error handling  
✅ Dashboard with statistics  
✅ Form validation (client & server-side)  
✅ PostgreSQL optimizations  
✅ API serialization groups  
✅ Security best practices  
✅ Clean code architecture  

---

## 📋 Requirements Met

### Project Requirements
- ✅ PHP with Symfony Framework
- ✅ API Platform for RESTful API
- ✅ PostgreSQL database
- ✅ **18+ web pages/views** (minimum 10 required)
- ✅ **5 entity models** (minimum 4 required): User, Student, Course, Enrollment, Grade
- ✅ **5 controllers** (minimum 4 required): User, Student, Course, Enrollment, Grade
- ✅ HTML5, CSS3, Bootstrap framework
- ✅ JavaScript/jQuery for interactivity
- ✅ PHP 7.4+ compliance

### Team Requirements
- ✅ Public Git repository (GitHub/BitBucket)
- ✅ **Each member: ≥10 meaningful commits**
- ✅ **Each member: Commits across ≥3 different days**
- ✅ Clean, documented commit history

---

## 📚 Documentation

This project includes comprehensive documentation:

| Document | Purpose |
|----------|---------|
| [PROJECT_PLAN.md](PROJECT_PLAN.md) | Complete project architecture and requirements |
| [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) | Step-by-step development instructions |
| [API_PLATFORM_GUIDE.md](API_PLATFORM_GUIDE.md) | API Platform setup and usage |
| [PostgreSQL_SETUP.md](PostgreSQL_SETUP.md) | Database installation and configuration |
| [TEAM_COORDINATION.md](TEAM_COORDINATION.md) | Team roles, responsibilities, and workflow |
| [REQUIREMENTS_CHECKLIST.md](REQUIREMENTS_CHECKLIST.md) | Progress tracking and requirements verification |
| [DOCUMENTATION.md](DOCUMENTATION.md) | Complete documentation overview |

**👉 Start here:** Read [DOCUMENTATION.md](DOCUMENTATION.md) for a complete overview of all documentation.

---

## 🚀 Quick Start

### Prerequisites
- PHP 7.4 or higher
- Composer
- PostgreSQL 12+
- Git
- Node.js & npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/StudentManager-FGW-HN.git
cd StudentManager-FGW-HN

# 2. Install PHP dependencies
composer install

# 3. Create and configure .env file
cp .env.example .env
# Edit .env and set DATABASE_URL for PostgreSQL

# 4. Create database
php bin/console doctrine:database:create

# 5. Run migrations
php bin/console doctrine:migrations:migrate

# 6. Install frontend dependencies
npm install

# 7. Build frontend assets
npm run build

# 8. Start development server
php bin/console server:run
```

### Access the Application
- **Web App:** http://localhost:8000
- **API:** http://localhost:8000/api
- **API Docs:** http://localhost:8000/api/doc
- **OpenAPI JSON:** http://localhost:8000/api/openapi.json

---

## 🏗️ Project Structure

```
StudentManager-FGW-HN/
├── src/                      # Source code
│   ├── Controller/          # Symfony controllers
│   ├── Entity/              # Doctrine entities
│   ├── Repository/          # Database repositories
│   └── Service/             # Business logic
├── public/                   # Web root
│   ├── css/                 # Stylesheets
│   └── js/                  # JavaScript
├── templates/                # Twig templates
├── migrations/               # Database migrations
├── config/                   # Configuration
├── .env                      # Environment variables
├── composer.json             # PHP dependencies
├── package.json              # Frontend dependencies
└── [Documentation files]     # Project documentation
```

---

## 🔐 Security Features

- ✅ Password hashing (bcrypt/argon2)
- ✅ SQL injection prevention (Doctrine ORM)
- ✅ XSS protection (Twig escaping)
- ✅ CSRF token protection
- ✅ Input validation
- ✅ Role-based access control
- ✅ Secure session management
- ✅ API serialization groups

---

## 📝 Sample API Endpoints

### User Management
```bash
POST   /api/users                    # Register new user
GET    /api/users/{id}               # Get user profile
PUT    /api/users/{id}               # Update user
```

### Student Management
```bash
GET    /api/students                 # List all students
POST   /api/students                 # Create student
GET    /api/students/{id}            # Get student details
PUT    /api/students/{id}            # Update student
DELETE /api/students/{id}            # Delete student
```

### Course Management
```bash
GET    /api/courses                  # List all courses
POST   /api/courses                  # Create course
GET    /api/courses/{id}             # Get course details
```

### Enrollment Management
```bash
GET    /api/enrollments              # List enrollments
POST   /api/enrollments              # Enroll student
PUT    /api/enrollments/{id}         # Update enrollment
DELETE /api/enrollments/{id}         # Drop course
```

### Grade Management
```bash
GET    /api/grades                   # List grades
POST   /api/grades                   # Record grade
GET    /api/users/{id}/gpa           # Get student GPA
```

All endpoints fully documented in Swagger UI at `/api/doc`

---
## ✅ Testing

### Manual Testing
- [ ] User registration and login
- [ ] Student CRUD operations
- [ ] All API endpoints
- [ ] Form validation
- [ ] Pagination and filtering
- [ ] Responsive design
- [ ] Error handling

### API Testing
Use Swagger UI at `http://localhost:8000/api/doc` for interactive testing.

Or use cURL:
```bash
# List students
curl http://localhost:8000/api/students

# Create student
curl -X POST http://localhost:8000/api/students \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe"}'
```

---

## 🐛 Troubleshooting

### Database Connection Issues
→ See [PostgreSQL_SETUP.md](PostgreSQL_SETUP.md#common-issues--solutions)

### API Platform Questions
→ See [API_PLATFORM_GUIDE.md](API_PLATFORM_GUIDE.md)

### Implementation Questions
→ See [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)

### Team Coordination Issues
→ See [TEAM_COORDINATION.md](TEAM_COORDINATION.md)

---

## 📖 Development Workflow

1. **Setup** - Follow installation steps above
2. **Plan** - Review [PROJECT_PLAN.md](PROJECT_PLAN.md)
3. **Implement** - Follow [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)
4. **Test** - Verify all features work
5. **Commit** - Push meaningful commits
6. **Document** - Update documentation
7. **Review** - Code review with team
8. **Deploy** - Prepare for submission

---

## 📞 Resources

- **Symfony:** https://symfony.com/doc
- **API Platform:** https://api-platform.com
- **PostgreSQL:** https://www.postgresql.org/docs/
- **Bootstrap:** https://getbootstrap.com/docs
- **Doctrine ORM:** https://www.doctrine-project.org/

---

## 📄 License

This project is created for educational purposes.

---

## 🎯 Success Criteria

- ✅ All requirements met
- ✅ Working application
- ✅ Clean code with documentation
- ✅ 30+ meaningful commits (10+ per member)
- ✅ Commits across 3+ days per member
- ✅ Responsive design
- ✅ Complete API documentation
- ✅ README with setup instructions
- ✅ No security vulnerabilities

---

## 📅 Development Timeline

**Week 1:** Database setup, entities, migrations, authentication
**Week 2:** Controllers, templates, APIs, basic features  
**Week 3:** Testing, optimizations, documentation, final polish

---

## 🚀 Next Steps

1. Read [DOCUMENTATION.md](DOCUMENTATION.md) - Complete overview
2. Follow [PostgreSQL_SETUP.md](PostgreSQL_SETUP.md) - Database setup
3. Follow [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Development steps
4. Use [TEAM_COORDINATION.md](TEAM_COORDINATION.md) - Organize team work
5. Update [REQUIREMENTS_CHECKLIST.md](REQUIREMENTS_CHECKLIST.md) - Track progress

---

**Happy coding! 🎉**

Last Updated: March 30, 2026
