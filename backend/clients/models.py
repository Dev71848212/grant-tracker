from django.db import models


class ClientProfile(models.Model):
    ORGANIZATION_TYPES = [
        ('nonprofit', 'Nonprofit'),
        ('community', 'Community Organization'),
        ('student', 'Student Organization'),
        ('education', 'Education Program'),
        ('youth', 'Youth Program'),
        ('other', 'Other'),
    ]

    organization_name = models.CharField(max_length=200)
    organization_type = models.CharField(
        max_length=50,
        choices=ORGANIZATION_TYPES
    )
    mission = models.TextField()
    target_population = models.TextField()
    contact_name = models.CharField(max_length=100)
    contact_email = models.EmailField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.organization_name

class GrantDraft(models.Model):
    client = models.ForeignKey(
        ClientProfile,
        on_delete=models.CASCADE,
        related_name="grant_drafts"
    )

    grant_title = models.CharField(max_length=200)
    problem_statement = models.TextField()
    goals = models.TextField()
    target_population = models.TextField()
    planned_activities = models.TextField()
    budget_summary = models.TextField()
    evaluation_plan = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.grant_title
