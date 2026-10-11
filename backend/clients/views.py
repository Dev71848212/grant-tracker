from rest_framework import generics
from .models import ClientProfile, GrantDraft
from .serializers import ClientProfileSerializer, GrantDraftSerializer


class ClientProfileListCreateView(generics.ListCreateAPIView):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer


class ClientProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer


class GrantDraftListCreateView(generics.ListCreateAPIView):
    queryset = GrantDraft.objects.all()
    serializer_class = GrantDraftSerializer


class GrantDraftDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GrantDraft.objects.all()
    serializer_class = GrantDraftSerializer
