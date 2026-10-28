# Grant Tracker Metrics & Testing

## Purpose

The Grant Tracker uses measurable software metrics to verify that major system features operate reliably and meet project requirements.

---

## Metric 1 — Grant Draft Save Success Rate

### Purpose
Measure how reliably users can save grant application drafts.

### Pseudocode

successful_saves = 0  
total_save_attempts = 0

FOR each grant draft save attempt:

    total_save_attempts = total_save_attempts + 1

    IF draft is successfully stored in the database:
        successful_saves = successful_saves + 1

save_success_rate =
(successful_saves / total_save_attempts) * 100

### Target
100% of valid grant draft save attempts should successfully store the draft.

### Testing Approach
1. Create a client profile.
2. Open the guided grant template.
3. Enter valid grant information.
4. Save the draft.
5. Verify that the draft is stored.
6. Refresh the application.
7. Retrieve the draft.
8. Confirm that the information remains unchanged.

### Pass Condition
The draft saves successfully and remains available after refresh.

---

## Metric 2 — Grant Deadline Tracking Accuracy

### Purpose
Measure whether grant deadlines are saved and displayed accurately.

### Pseudocode

correct_deadlines = 0  
total_deadlines_tested = 0

FOR each grant deadline tested:

    total_deadlines_tested = total_deadlines_tested + 1

    IF displayed_deadline equals saved_deadline:
        correct_deadlines = correct_deadlines + 1

deadline_accuracy =
(correct_deadlines / total_deadlines_tested) * 100

### Target
100% of saved grant deadlines should display the correct date.

### Pass Condition
The saved deadline is displayed correctly and remains unchanged after refresh.

---

## Metric 3 — Application Status Tracking Accuracy

### Purpose
Measure whether grant application statuses are saved and displayed correctly.

### Supported Statuses

- Researching
- Drafting
- Submitted
- Awarded
- Declined

### Pseudocode

correct_status_updates = 0  
total_status_updates = 0

FOR each application status update:

    total_status_updates = total_status_updates + 1

    IF displayed_status equals selected_status:
        correct_status_updates = correct_status_updates + 1

status_accuracy =
(correct_status_updates / total_status_updates) * 100

### Target
100% of valid status updates should save and display correctly.

### Pass Condition
Each selected status remains correct after the application is refreshed.

---

## Metric 4 — Reporting Requirement Completion Accuracy

### Purpose
Measure whether reporting requirements can be marked as complete and remain saved.

### Pseudocode

correct_completions = 0  
total_completion_tests = 0

FOR each reporting requirement tested:

    total_completion_tests = total_completion_tests + 1

    mark requirement as complete

    IF requirement displays as complete AND
       completion status remains saved:

        correct_completions = correct_completions + 1

completion_accuracy =
(correct_completions / total_completion_tests) * 100

### Target
100% of reporting requirements marked complete should remain complete.

### Pass Condition
The completion status remains saved after refresh.

---

## Metric 5 — Application Page Load Performance

### Purpose
Measure whether primary Grant Tracker pages meet the performance requirement.

### Pseudocode

successful_loads = 0  
total_load_tests = 0

FOR each primary page load:

    start_time = current_time

    load application page

    end_time = current_time

    load_time = end_time - start_time

    total_load_tests = total_load_tests + 1

    IF load_time <= 3 seconds:
        successful_loads = successful_loads + 1

performance_success_rate =
(successful_loads / total_load_tests) * 100

### Target
Primary application pages should load within 3 seconds under normal usage conditions.

### Pass Condition
The tested primary pages load within 3 seconds.

---

## Defect Tracking

If testing identifies a software defect, the defect will be entered into Jira as a Bug and linked to the related Story or feature.

The development workflow for defects is:

To Do → In Progress → In Review → Done

Testing results and defects are tracked through the Team 3 Jira project.
