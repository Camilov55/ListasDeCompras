from django.db import models

# Create your models here.

class ListName(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class List(models.Model):
    name = models.CharField(max_length=255)
    value = models.IntegerField()
    listName = models.ForeignKey(ListName, on_delete=models.CASCADE)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.name + ' - ' + self.listName.name