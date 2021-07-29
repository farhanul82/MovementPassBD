from django.test import TestCase

# Create your tests here.
class AdminDashboard():
    def __init__(self,total_user,total_pass,total_approved_pass,total_pending_pass,total_expired_pass):
        self.total_user = total_user
        self.total_pass = total_pass
        self.total_approved_pass = total_approved_pass
        self.total_pending_pass = total_pending_pass
        self.total_expired_pass = total_expired_pass
        