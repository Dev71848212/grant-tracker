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
