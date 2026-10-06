from django.urls import path
from .views import ClientProfileListCreateView, ClientProfileDetailView

urlpatterns = [
    path('clients/', ClientProfileListCreateView.as_view(), name='client-list-create'),
    path('clients/<int:pk>/', ClientProfileDetailView.as_view(), name='client-detail'),
]
