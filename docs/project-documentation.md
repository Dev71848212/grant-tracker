# Nonprofit Grant & Funding Tracker

## Forestview Enterprise Application Project

**Course:** CSC 4110 Software Engineering  
**Team:** Team 3  
**Team Members:** Haitham Muhsin, Muhammad Bazzi, Samuel Womack

---

## 1. Product Vision

The Nonprofit Grant & Funding Tracker is designed to help small nonprofit and community organizations organize the grant funding process in one centralized application.

The system helps users create organization profiles, prepare grant applications, save and edit drafts, track important grant deadlines and application statuses, and manage reporting and compliance requirements.

The goal is to reduce administrative work, prevent missed deadlines, and help nonprofit organizations remain organized throughout the grant lifecycle.

---

## 2. Mission

Our mission is to provide nonprofit organizations with a simple and organized platform for managing grant applications from initial preparation through reporting and compliance.

The Grant Tracker focuses on reducing repetitive administrative work while helping organizations spend more time serving their communities.

---

## 3. Business Problem

Small nonprofit organizations may manage grant information using separate documents, spreadsheets, emails, calendars, and reminders.

This creates several risks:

- Missing grant application deadlines
- Submitting incomplete applications
- Losing track of application status
- Missing reporting or compliance requirements
- Spending excessive staff time on administrative work

The Grant Tracker centralizes these activities into one application.

---

## 4. Core Product Features

### Grant Application Management

Users can:

- Create nonprofit client profiles
- Select an organization type
- Use a guided grant application template
- Save grant application drafts
- Retrieve previously saved drafts
- Edit existing grant drafts

### Grant Tracking & Deadlines

Users can:

- Add grant deadlines
- View upcoming deadlines
- Track application status
- Update applications through statuses such as:
  - Researching
  - Drafting
  - Submitted
  - Awarded
  - Declined

### Reporting & Compliance

Users can:

- Create reporting requirements
- Assign reporting due dates
- Track incomplete requirements
- Mark reporting requirements as complete

---

## 5. Customer Risks Addressed

### Missing Application Deadlines

**Risk:** Organizations may lose the opportunity to compete for funding.

**Grant Tracker Response:** Centralizes grant deadlines and upcoming due dates.

### Incomplete Applications

**Risk:** Missing information or required documentation may result in rejection.

**Grant Tracker Response:** Provides guided application templates and saved drafts to help organize applications.

### Poor Grant Tracking

**Risk:** Organizations may lose track of applications or fail to follow up.

**Grant Tracker Response:** Tracks applications from Researching through Submitted, Awarded, or Declined.

### Failure to Meet Grant Requirements

**Risk:** Organizations may lose funding, face repayment requirements, or become ineligible for future grants.

**Grant Tracker Response:** Provides reporting deadlines, compliance tracking, and completion status management.

### Limited Staff and Resources

**Risk:** Staff may spend excessive time performing administrative work instead of serving their communities.

**Grant Tracker Response:** Centralizes grant information and reduces repetitive manual work.

---

## 6. Technical Architecture

The Grant Tracker uses a client-server architecture.

### Frontend

- React
- Vite
- HTML
- CSS
- JavaScript

### Backend

- Django
- Django REST Framework
- REST API

### Data Storage

- SQLite persistent database

### Development & Project Management

- Git
- GitHub
- Jira
- Scrum

The React frontend communicates with the Django backend through REST API requests. The backend processes requests and stores persistent Grant Tracker information in the database.

---

## 7. Development Methodology

Team 3 uses Scrum to organize development.

Project work is managed in Jira using:

- Epics
- User Stories
- Tasks
- Bugs
- Story Points
- Sprint Goals
- Sprint Boards
- Sprint Reports
- Burndown Charts

The workflow is:

**To Do → In Progress → In Review → Done**

---

## 8. User Guide

### Creating a Client Profile

1. Open the Grant Tracker.
2. Enter the organization name.
3. Select an organization type.
4. Enter the organization's mission.
5. Enter the target population.
6. Enter contact information.
7. Select **Create Client Profile**.

### Creating a Grant Application

1. Create or select a client profile.
2. Open the Guided Grant Application.
3. Enter the requested grant information.
4. Continue through each step of the guided form.
5. Review the entered information.
6. Save the grant draft.

### Editing a Grant Draft

1. Locate the Saved Grant Drafts section.
2. Select **Edit Draft**.
3. Update the desired information.
4. Select **Update Grant Draft**.
5. Verify that the updated information remains saved.

### Tracking Grants

Users can record grant deadlines and monitor the current application status.

Supported application statuses include:

- Researching
- Drafting
- Submitted
- Awarded
- Declined

### Reporting & Compliance

Users can create reporting requirements, assign due dates, monitor incomplete requirements, and mark requirements as completed.

---

## 9. Licensing and Use

The Grant Tracker is an academic software project developed by Team 3 for CSC 4110 Software Engineering at Wayne State University.

The application is intended for educational and demonstration purposes.

---

## 10. Disclaimer and Indemnification

The Grant Tracker is a project-management and organizational tool. It does not guarantee grant eligibility, approval, funding, or regulatory compliance.

Users remain responsible for verifying grant requirements, submission deadlines, application information, reporting obligations, and compliance requirements with the appropriate funding organization.

Team 3 and the developers of the Grant Tracker are not responsible for missed funding opportunities, rejected applications, incorrect information entered by users, missed deadlines, or other losses resulting from use of the application.
