from django.urls import path, include
from rest_framework import routers
from .views import ListNameView, ListView


router = routers.DefaultRouter()
router.register(r'listName', ListNameView)
router.register(r'list', ListView)

urlpatterns = [
    path("", include(router.urls))
]

