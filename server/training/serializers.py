from rest_framework import serializers
from .models import Institute, Contributor, Internship

class InstituteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = ['id', 'name', 'logo_url']

class ContributorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contributor
        fields = ['id', 'name', 'image_url', 'company', 'position', 'achievements']

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = ['id', 'title', 'image_url', 'description', 'bullet_points', 'plans', 'price']
