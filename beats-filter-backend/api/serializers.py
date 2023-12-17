from rest_framework import serializers
from .models import Beats

class BeatsSerializer(serializers.ModelSerializer):
    beatName = serializers.CharField(max_length=20)
    beatBpm = serializers.IntegerField()
    beatGenre = serializers.CharField(max_length=20)
    beatKey = serializers.CharField(max_length=10)
    prodNickNames = serializers.CharField(max_length=30)
    beatFile = serializers.FileField()
    mp3LeasePrice = serializers.IntegerField()
    wavLeasePrice = serializers.IntegerField()
    trackoutLeasePrice = serializers.IntegerField()
    unlimitedLeasePrice = serializers.IntegerField()
    exclusiveLeasePrice = serializers.IntegerField()

    class Meta:
        model = Beats
        fields = ('beatName', 'beatBpm', 'beatGenre', 'beatKey', 
                  'prodNickNames', 'beatFile', 
                  'mp3LeasePrice', 'wavLeasePrice', 'trackoutLeasePrice', 
                  'unlimitedLeasePrice', 'exclusiveLeasePrice', )