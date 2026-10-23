from rest_framework import status
from rest_framework.test import APITestCase

from .models import ClientProfile


class GrantTrackingTests(APITestCase):
    def setUp(self):
        self.client_profile = ClientProfile.objects.create(
            organization_name="Community Partners",
            organization_type="nonprofit",
            mission="Support local families.",
            target_population="Families in the community.",
            contact_name="Morgan Lee",
            contact_email="morgan@example.com",
        )
        self.grant_data = {
            "client": self.client_profile.id,
            "grant_title": "Community Food Program",
            "deadline": "2026-12-15",
            "problem_statement": "Food insecurity affects local families.",
            "goals": "Improve access to healthy food.",
            "target_population": "Local families.",
            "planned_activities": "Provide weekly food distribution.",
            "budget_summary": "Funds support food and delivery.",
            "evaluation_plan": "Track families served.",
        }

    def test_grant_deadline_and_default_status_are_saved(self):
        response = self.client.post(
            "/api/grants/",
            self.grant_data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["deadline"], "2026-12-15")
        self.assertEqual(response.data["status"], "researching")

    def test_grant_status_and_deadline_can_be_updated(self):
        create_response = self.client.post(
            "/api/grants/",
            self.grant_data,
            format="json",
        )
        grant_id = create_response.data["id"]

        update_response = self.client.patch(
            f"/api/grants/{grant_id}/",
            {"deadline": "2027-01-20", "status": "submitted"},
            format="json",
        )

        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(update_response.data["deadline"], "2027-01-20")
        self.assertEqual(update_response.data["status"], "submitted")

    def test_invalid_grant_status_is_rejected(self):
        response = self.client.post(
            "/api/grants/",
            {**self.grant_data, "status": "unknown"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
