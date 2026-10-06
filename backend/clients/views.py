from rest_framework import generics
from .models import ClientProfile
from .serializers import ClientProfileSerializer


class ClientProfileListCreateView(generics.ListCreateAPIView):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer


class ClientProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer
