from rest_framework import serializers
from .models import Profile,MovementPass
from rest_framework import serializers, fields




class ProfileSerializers(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = "__all__"
        depth=1


class MovementPassSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = MovementPass
        fields = "__all__"
        depth=1

class AdminDashboardSerializer(serializers.Serializer):
    total_user = serializers.IntegerField()
    total_pass = serializers.IntegerField()
    total_approved_pass = serializers.IntegerField()
    total_pending_pass = serializers.IntegerField()
    total_expired_pass = serializers.IntegerField()
    