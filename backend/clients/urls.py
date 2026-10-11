from django.urls import path
from .views import (
    ClientProfileListCreateView,
    ClientProfileDetailView,
    GrantDraftListCreateView,
    GrantDraftDetailView,
)

urlpatterns = [
    path('clients/', ClientProfileListCreateView.as_view()),
    path('clients/<int:pk>/', ClientProfileDetailView.as_view()),

    path('grants/', GrantDraftListCreateView.as_view()),
    path('grants/<int:pk>/', GrantDraftDetailView.as_view()),
]
