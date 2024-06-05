from django.urls import path

from . import views

app_name = "polls"
urlpatterns = [
    path("", views.get_views, name="getviews"),
    path("post_view/", views.post_view, name="postview"),
    path("filter_view/", views.filter_view, name="filterview"),
    path("<int:question_id>/", views.view_details, name="detailview"),
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
    path("tags_view/", views.tags_view, name="tagsview"),
]
