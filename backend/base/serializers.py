from rest_framework import serializers
from .models import MyUser, Post
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = MyUser
        fields = ['username', 'email', 'first_name', 'last_name', 'bio', 'profile_image', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = MyUser(**validated_data)
        user.set_password(password)
        user.save()
        return user

class MyUserProfileSerializer(serializers.ModelSerializer):
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    profile_image_url = serializers.SerializerMethodField()  # Add this line

    class Meta:
        model = MyUser
        fields = ['username', 'bio', 'profile_image', 'profile_image_url', 'follower_count', 'following_count']

    def get_follower_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

    def get_profile_image_url(self, obj):  # Define the method here
        if obj.profile_image:
            return obj.profile_image.url
        return None
class PostSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    formatted_date = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['username', 'description', 'formatted_date', 'likes', 'like_count']

    def get_username(self, obj):
        return obj.user.username
    def get_like_count(self, obj):
        return obj.likes.count()
    def get_formatted_date(self, obj):
        return obj.created_at.strftime('%d %b, %y')
