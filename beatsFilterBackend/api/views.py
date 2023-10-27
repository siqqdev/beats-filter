from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Beats
from .serializers import BeatsSerializer
from rest_framework import generics

class BeatsApi(APIView):
    def get(self, request):
        beats_data = Beats.objects.all()
        serializer = BeatsSerializer(beats_data, many=True)
        return Response({'beatsList': serializer.data})

    def post(self, request):
        serializer = BeatsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'beatsList': serializer.data})
    
class BeatByGenresList(generics.ListAPIView):
    serializer_class = BeatsSerializer

    def get_queryset(self):
        genres = self.request.query_params.get('genres').split(',')
        queryset = Beats.objects.filter(beatGenre__in=genres)
        return queryset
