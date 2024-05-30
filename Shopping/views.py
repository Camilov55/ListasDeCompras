from rest_framework import viewsets
from .serializer import ListNameSerializer, ListSerializer
from .models import ListName, List

# Create your views here.

class ListNameView(viewsets.ModelViewSet):
    serializer_class = ListNameSerializer
    queryset = ListName.objects.all()

class ListView(viewsets.ModelViewSet):
    serializer_class = ListSerializer
    queryset = List.objects.all()