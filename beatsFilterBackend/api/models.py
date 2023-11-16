from django.db import models

class Beats(models.Model):
    beatName = models.CharField(max_length=20)
    beatBpm = models.IntegerField()
    beatGenre = models.CharField(max_length=20, default='')
    beatKey = models.CharField(max_length=10, blank=True, null=True)
    prodNickNames = models.CharField(max_length=30)
    beatFile = models.FileField(upload_to='audio/beats', default='')
    mp3LeasePrice = models.IntegerField(blank=True, null=True)
    wavLeasePrice = models.IntegerField(blank=True, null=True)
    trackoutLeasePrice = models.IntegerField(blank=True, null=True)
    unlimitedLeasePrice = models.IntegerField(blank=True, null=True)
    exclusiveLeasePrice = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.beatName
