from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('verify-payment/', views.verify_payment, name='verify_payment'),
    path('request-demo/', views.request_demo, name='request_demo'),
    path('admin/demo-requests/', views.demo_request_list, name='demo_request_list'),
    # Admin Institute endpoints
    path('admin/institutes/', views.institute_list, name='institute_list'),
    path('admin/institutes/<int:pk>/', views.institute_detail, name='institute_detail'),
    # Admin Contributor endpoints
    path('admin/contributors/', views.contributor_list, name='contributor_list'),
    path('admin/contributors/<int:pk>/', views.contributor_detail, name='contributor_detail'),
    # Admin Internship endpoints
    path('admin/internships/', views.internship_list, name='internship_list'),
    path('admin/internships/<int:pk>/', views.internship_detail, name='internship_detail'),
]
