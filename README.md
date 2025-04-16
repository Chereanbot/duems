# Employee Management System

A comprehensive web-based employee management system for Dilla University with role-based access control, attendance tracking, and performance management.

![System Overview](assets/images/du-logo-white.png)

## Features

### Authentication & Authorization
- Multi-role system (System Admin, Manager, Coordinator, Employee, Teacher, Student)
- Secure login system with password hashing
- Role-based access control (RBAC)
- Session management
- Password reset functionality
- Account lockout after failed attempts
- Change password functionality

### Role-Specific Features

#### System Admin
- User management and role assignment
- System configuration and maintenance
- Security management and monitoring
- System performance tracking
- Backup and recovery management
- System updates and patches
- Comprehensive system reports
- User activity monitoring

#### Manager
- Employee management and oversight
- Leave request approval
- Attendance monitoring
- Performance evaluation
- Schedule management
- Announcement creation
- Report generation
- Coordinator management

#### Coordinator
- Attendance tracking and reporting
- Leave request management
- Performance monitoring
- Schedule management
- Shift reporting
- Notification to managers
- Report generation
- Employee oversight

#### Employee
- Personal profile management
- Attendance tracking
- Leave request submission
- Schedule viewing
- Performance tracking
- Personal dashboard
- Help center access

#### Teacher
- Help center access
- Profile management
- Course management
- Student tracking

#### Student
- Help center access
- Profile management
- Course access
- Performance tracking

### Core Features
- Real-time attendance tracking
- Leave management system
- Performance evaluation
- Schedule management
- Report generation
- Notification system
- Help center
- User guides
- Profile management
- Security settings

## Technical Specifications

### Frontend
- HTML5 with semantic markup
- CSS3 with Flexbox and Grid
- JavaScript (ES6+)
- Bootstrap 5.3.0
- Bootstrap Icons 1.11.3
- Responsive design (mobile-first approach)
- Cross-browser compatibility

### Project Structure
```
├── assets/
│   └── images/
│       ├── du-logo-white.png
│       └── pattern.svg
├── css/
│   ├── ads.css
│   ├── dashboard.css
│   └── [role-specific CSS files]
├── js/
│   ├── ads.js
│   ├── dashboard.js
│   ├── login.js
│   ├── reset-password.js
│   └── change-password.js
├── services/
│   └── [service-related files]
├── sysadmin/
│   ├── dashboard.html
│   ├── security.html
│   ├── system-reports.html
│   ├── users.html
│   └── [other admin features]
├── manager/
│   ├── dashboard.html
│   ├── employees.html
│   ├── coordinators.html
│   └── [other manager features]
├── coordinator/
│   ├── dashboard.html
│   ├── attendance.html
│   ├── leave-requests.html
│   └── [other coordinator features]
├── employeer/
│   ├── dashboard.html
│   ├── profile.html
│   ├── attendance.html
│   └── [other employee features]
├── teacher/
│   └── help-center.html
├── student/
│   └── help-center.html
├── components/
│   └── [shared components]
├── login.html
├── reset-password.html
├── change-password.html
└── dashboard.html
```

## Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Git
- Web server (Apache, Nginx, or similar)

### Local Development
1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:
   ```bash
   cd employee-management-system
   ```

3. Open the project in your preferred code editor

4. Start a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx http-server
   ```

5. Access the website at `http://localhost:8000`

### Production Deployment
1. Set up a web server (Apache, Nginx)
2. Configure SSL certificate
3. Set up domain and DNS
4. Deploy files to server
5. Configure server settings
6. Test the deployment

## Usage Guide

### System Admin
- Access: `http://localhost:8000/sysadmin/dashboard.html`
- Manage users and roles
- Monitor system security
- Generate system reports
- Manage system updates
- Configure system settings
- Monitor user activity
- Manage backups

### Manager
- Access: `http://localhost:8000/manager/dashboard.html`
- Manage employees and coordinators
- Approve leave requests
- Monitor attendance
- Generate reports
- Create announcements
- Manage schedules
- Track performance

### Coordinator
- Access: `http://localhost:8000/coordinator/dashboard.html`
- Track attendance
- Manage leave requests
- Monitor performance
- Generate reports
- Manage schedules
- Notify managers
- Track shifts

### Employee
- Access: `http://localhost:8000/employeer/dashboard.html`
- View and update profile
- Track attendance
- Submit leave requests
- View schedule
- Track performance
- Access help center

### Teacher
- Access: `http://localhost:8000/teacher/help-center.html`
- Access help center
- Manage profile
- Track courses
- Monitor students

### Student
- Access: `http://localhost:8000/student/help-center.html`
- Access help center
- Manage profile
- View courses
- Track performance

## Security Features
- Secure authentication system
- Role-based access control
- Password protection
- Session management
- Input validation
- XSS prevention
- CSRF protection
- Secure password reset
- Account lockout
- Security monitoring

## Support
For any issues or questions, please contact the system administrator or refer to the help center within the application. 