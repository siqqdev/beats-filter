from django.db import models

class Beats(models.Model):
    beatName = models.CharField(max_length=20)
    beatBpm = models.IntegerField()
    beatGenre = models.CharField(max_length=20, default='')
    beatKey = models.CharField(max_length=10)
    prodNickNames = models.CharField(max_length=30)
    beatFile = models.FileField(upload_to='audio/beats', default='')
    mp3LeasePrice = models.IntegerField()
    wavLeasePrice = models.IntegerField()
    trackoutLeasePrice = models.IntegerField()
    unlimitedLeasePrice = models.IntegerField()
    exclusiveLeasePrice = models.IntegerField()

    def __str__(self):
        return self.beatName
