from accounts.serializers import UserSerializer
from django.shortcuts import render
from rest_framework import status
from rest_framework import serializers
from .serializers import ProfileSerializers,MovementPassSerializers,AdminDashboardSerializer


from .models import  Profile,MovementPass
from rest_framework import viewsets, views
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser

from rest_framework.permissions import AllowAny, IsAuthenticated
from knox.auth import TokenAuthentication

from django.contrib.auth.models import User

from .tests import AdminDashboard


# Create your views here.


class AdminGetAllUserViewset(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]

    def list(self, request, **kwargs):
        profile = Profile.objects.filter(is_admin=False).order_by('-created_at')
        serializer = ProfileSerializers(profile, many = True)
        return Response(serializer.data) 

    def retrieve(self, request, pk=None): 
        query = Profile.objects.filter(id=pk)
        all_Data = []
        serializer = ProfileSerializers(query,many=True)
        for i in serializer.data:
            print(i['user'])
            movePass = MovementPass.objects.filter(user = i['user']['id'])
            movePassSerializer = MovementPassSerializers(movePass, many= True)
            i['movementPass'] = movePassSerializer.data
            for x in movePassSerializer.data:
                profile =  Profile.objects.filter(user=x['user']['id'])
            
                profile_serializer = ProfileSerializers(profile,many=True)
            
                x['profile']=profile_serializer.data
            all_Data.append(i)

        return Response(all_Data)

        

@method_decorator(ensure_csrf_cookie, name='dispatch')
class ProfileViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]
    parser_classes = (MultiPartParser, FormParser,JSONParser)
    # queryset = Profile.objects.all()
    # serializer_class = ProfileSerializers

    def list(self, request, **kwargs):
        user = request.user
      
        profile = Profile.objects.filter(user = user)
     
        serializer = ProfileSerializers(profile,many=True)
       
        all_Data=[]
        for i in serializer.data:

            movePass = MovementPass.objects.filter(user = i['user']['id'])
            movePassSerializer = MovementPassSerializers(movePass, many= True)
            i['movementPass'] = movePassSerializer.data
            all_Data.append(i)

        return Response(all_Data)

    # def retrieve(self, request, pk=None): 
    #     query = Profile.objects.get(id=pk)
    #     serializer = ProfileSerializers(query)
    #     return Response(serializer.data)

    def create(self, request):
        user = self.request.user
        print(request.data['birthDate'])
        profile= Profile(user=user,name = request.data['name'],profession=request.data['profession'],
                    country=request.data['country'],city=request.data['city'],area=request.data['area'],
                    birth_date=request.data['birthDate'],Nid=request.data['Nid'],phone=request.data['phone'],image=request.data['image'])
        profile.save()
        # profile_serializer = self.get_serializer(
        #     data=request.data)
        
        # profile_serializer.is_valid(raise_exception=True)
        # profile_serializer.save(user=user)
        response_mesage = {"msg": "Created"}
        return Response(response_mesage)

    # def update(self, request, *args, **kwargs):
    #     user = self.request.user
    #     print(user.id)
    #     instance = Profile.objects.get(user=user.id)
        

    #     profile_serializer = ProfileSerializers(
    #         instance, data=request.data, partial=False)
    #     if profile_serializer.is_valid():
    #         profile_serializer.save()
    #         response_mesage = {"msg": "updated",
    #                            "data": profile_serializer.data}
    #         return Response(response_mesage)
    #     else:
    #         print('error', profile_serializer.errors)
    #         return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@method_decorator(ensure_csrf_cookie, name='dispatch')
class ApplyPass(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]
    parser_classes = (MultiPartParser, FormParser,JSONParser)

    def list(self, request, **kwargs):
        user=self.request.user
        movementpass = MovementPass.objects.filter(user=user)
        print(movementpass)
        serializer = MovementPassSerializers(movementpass,many=True)
        print(serializer.data)
        all_data = []

        for item in serializer.data:
            profile =  Profile.objects.filter(user=user)
            print(profile)
            profile_serializer = ProfileSerializers(profile,many=True)
            item['profile']=profile_serializer.data
            all_data.append(item)
        return Response(all_data)


    def create(self, request):
        user = self.request.user

        movementpass = MovementPass(user=user,from_m = request.data['location'],to_m =request.data['toGO'] ,
                        district=request.data['district'] ,time_spand=request.data['timeSpend'] ,
                        date=request.data['date'] ,reason= request.data['reason'])
        movementpass.save()
        response_mesage = {"msg": "Movement pass is Applied"}
        return Response(response_mesage)


    def retrieve(self, request, pk=None):
        user = self.request.user
        movementpass = MovementPass.objects.filter(id = pk)
        print(movementpass)
        serializer = MovementPassSerializers(movementpass,many=True)
        
        all_data = []

        for item in serializer.data:
            profile =  Profile.objects.filter(user=item['user']['id'])
            print(profile)
            profile_serializer = ProfileSerializers(profile,many=True)
            
            item['profile']=profile_serializer.data
            all_data.append(item)
        print(all_data)
            
        return Response(all_data)




@method_decorator(ensure_csrf_cookie, name='dispatch')
class DisApproveUserPassViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]
    def create(self, request, *args, **kwargs):
        id = request.data['id']
        print(id)
        movementpass = MovementPass.objects.get(id = id)
        movementpass.is_approved=False
        movementpass.save()
        response_mesage = {"msg": "DisApproved"}
        return  Response(response_mesage)





@method_decorator(ensure_csrf_cookie, name='dispatch')
class ApproveUserPassViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]
    def list(self, request, **kwargs):
        approvedPass = MovementPass.objects.filter(is_approved=True)
        serializer = MovementPassSerializers(approvedPass, many=True)

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        id = request.data['id']
        print(id)
        movementpass = MovementPass.objects.get(id = id)
        movementpass.is_approved=True
        movementpass.save()
        response_mesage = {"msg": "Approved"}
        return  Response(response_mesage)



@method_decorator(ensure_csrf_cookie, name='dispatch')
class PendingUserPassViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]
    def list(self, request, **kwargs):
        approvedPass = MovementPass.objects.filter(is_approved=False)
        serializer = MovementPassSerializers(approvedPass, many=True)

        return Response(serializer.data)





@method_decorator(ensure_csrf_cookie, name='dispatch')
class ExpireUserPassViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]

    def list(self, request, **kwargs):
        expiredPass = MovementPass.objects.filter(is_expired=True)
        serializer = MovementPassSerializers(expiredPass, many=True)

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        id = request.data['id']
        print(id)
        movementpass = MovementPass.objects.get(id = id)
        movementpass.is_expired=True
        movementpass.save()
        response_mesage = {"msg": "Expired"}
        return  Response(response_mesage)





@method_decorator(ensure_csrf_cookie, name='dispatch')
class UnexpireUserPassViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]
    def create(self, request, *args, **kwargs):
        id = request.data['id']
        print(id)
        movementpass = MovementPass.objects.get(id = id)
        movementpass.is_expired=False
        movementpass.save()
        response_mesage = {"msg": "Unexpired"}
        return  Response(response_mesage)





class AdminDashboardViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]
    
    def list(self, request, **kwargs):
        total_user = (Profile.objects.filter(is_admin=False).count())
        pass_obj = MovementPass.objects.all()
        total_pass =  pass_obj.count()
        total_approved_pass = pass_obj.filter(is_approved=True).count()
        total_pending_pass = pass_obj.filter(is_approved=False).count()
        total_expired_pass = pass_obj.filter(is_expired = True ).count()
        recent_users = Profile.objects.all().order_by('-created_at')[:5]
        recent_pass = MovementPass.objects.all().order_by('-id')[:5]
        print(total_user,total_pass,total_approved_pass,total_pending_pass,total_expired_pass)

        dashboard = AdminDashboard(total_user,total_pass,total_approved_pass,total_pending_pass,total_expired_pass)
        serializer = AdminDashboardSerializer(dashboard)
        return Response(serializer.data)



@method_decorator(ensure_csrf_cookie, name='dispatch')
class AdminFetchUserMovementPass(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]
    parser_classes = (MultiPartParser, FormParser,JSONParser)

    def list(self, request, **kwargs):
        id = kwargs['id']
        print(id)
        movePass = MovementPass.objects.filter(user__id = id)
        print(movePass)
        serializer = MovementPassSerializers(movePass, many=True)
        return Response(serializer.data)



class RecentUsersViewset(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]


    def list(self, request, **kwargs):
        recent_users = Profile.objects.filter(is_admin=False).order_by('-created_at')[:5]
        serializer = ProfileSerializers(recent_users, many=True)
        return Response(serializer.data)


class RecentMovementPassViewset(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]


    def list(self, request, **kwargs):
        recent_users = MovementPass.objects.all().order_by('-id')[:5]
        serializer = MovementPassSerializers(recent_users, many=True)
        return Response(serializer.data)

class AllMovementPassViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication ]
    permission_classes = [permissions.IsAuthenticated,]

    def list(self, request, **kwargs):
        movePass = MovementPass.objects.all()
        serializer= MovementPassSerializers(movePass,many = True)
        all_data = []

        for item in serializer.data:
            profile =  Profile.objects.filter(user=item['user']['id'])
            print(profile)
            profile_serializer = ProfileSerializers(profile,many=True)
            item['profile']=profile_serializer.data
            all_data.append(item)
        return Response(all_data)
        
