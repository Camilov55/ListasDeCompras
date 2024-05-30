from rest_framework import serializers
from .models import ListName, List

# Convertidor de tipos de datos 'py -> json

class ListNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListName
        fields = '__all__'


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        #fields = ('id',  'name', 'value', 'listName', 'done') # Es lo mismo que el de abajo
        fields = '__all__'