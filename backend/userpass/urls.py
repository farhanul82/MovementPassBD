from django.urls import path, include, re_path

from django.urls import path

from .views import PendingUserPassViewSet, AdminFetchUserMovementPass,AdminGetAllUserViewset, ApproveUserPassViewSet,UnexpireUserPassViewSet,ExpireUserPassViewSet, DisApproveUserPassViewSet,AllMovementPassViewSet,ProfileViewSet,ApplyPass,AdminDashboardViewSet,RecentUsersViewset,RecentMovementPassViewset

from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register("userProfile", ProfileViewSet, basename='ProfileViewSet')
router.register("applyForPass", ApplyPass, basename='ProfileViewSet')

router.register("adminDashboard", AdminDashboardViewSet, basename='AdminDashboardViewSet')
router.register("recentUsers", RecentUsersViewset, basename='RecentUsersViewset')
router.register("recentPass", RecentMovementPassViewset, basename='RecentMovementPassViewset')
router.register("allMovementPass", AllMovementPassViewSet, basename='AllMovementPassViewSet')
router.register("disApproveUerPass", DisApproveUserPassViewSet, basename='DisApproveUserPassViewSet')
router.register("approveUerPass", ApproveUserPassViewSet, basename='ApproveUserPassViewSet')
router.register("expireUerPass", ExpireUserPassViewSet, basename='ExpireUserPassViewSet')
router.register("unExpireUerPass", UnexpireUserPassViewSet, basename='UnexpireUserPassViewSet')
router.register("adminGetAllUser", AdminGetAllUserViewset, basename='AdminGetAllUserViewset')
router.register("userMovementPass", AdminFetchUserMovementPass, basename='AdminFetchUserMovementPass')
router.register("userPendingPass", PendingUserPassViewSet, basename='PendingUserPassViewSet')


urlpatterns = [
    path('api/', include(router.urls)),
]