from django.contrib import admin
from django.urls import path
from api.views import BeatsApi, BeatByGenresList
from django.conf import settings
from django.conf.urls.static import static
from api import views

urlpatterns = [ 
    path('admin/', admin.site.urls),
    path('api/beats/', BeatsApi.as_view()),
    path('api/beats/filter/', BeatByGenresList.as_view(), name='beasts-by-genres'),  # Здесь имя было исправлено на 'beasts-by-genres'
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
