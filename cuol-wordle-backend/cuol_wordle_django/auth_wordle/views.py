from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

#Users are registered in auth_wordle_user table
class RegistrationView(APIView):
    permission_classes = (AllowAny,)
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message":"User Registered"},status=status.HTTP_201_CREATED)

