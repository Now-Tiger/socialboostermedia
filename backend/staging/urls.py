from django.urls import path
from .views import StagingListCreateApiView, StagingCreateUpdateApiView


urlpatterns = [
    path('health-check/', view=StagingListCreateApiView.as_view(), name='health-check'),
    path('db/<str:pk>', view=StagingCreateUpdateApiView.as_view(), name='get-single-rec'),

]
