from rest_framework import serializers
from .models import ClientProfile, GrantDraft


class ClientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientProfile
        fields = '__all__'


class GrantDraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrantDraft
        fields = '__all__'
