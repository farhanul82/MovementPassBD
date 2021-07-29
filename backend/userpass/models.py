from django.db import models
from django.contrib.auth.models import User
import uuid

import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw 



# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True,)
    name = models.CharField(max_length=50, default=" ")
    profession = models.CharField(max_length=50, default=" ")
    country = models.CharField(max_length=50, default=" ")
    city = models.CharField(max_length=50, default=" ")
    area = models.CharField(max_length=50, default=" ")
    birth_date = models.CharField(max_length=15, default=" ")
    Nid = models.CharField(max_length=15, default=" ")
    phone =models.CharField(max_length=15, default=" ")
    created_at = models.DateField(auto_now_add=True,null=True)
    image = models.ImageField(upload_to='profilepic/images', default="")
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.name



class MovementPass(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    from_m = models.CharField(max_length=200, blank=False, null=True, verbose_name='From Where')
    to_m = models.CharField(max_length=200, blank=False, null=True, verbose_name='To Where')
    district = models.CharField(max_length=50, verbose_name='District Name',null=True)
    time_spand = models.CharField( max_length=50, null=True)
   
    date = models.DateTimeField(null=True)
    #take_car = models.ForeignKey(TakeCar, on_delete=models.DO_NOTHING, null=True)
    #car_number = models.CharField(max_length=100, null=True, blank=True, verbose_name='Car Number')
    reason = models.CharField( max_length=50, null=True)
    qr_image = models.ImageField(upload_to='qr/',null=True,blank=True)
    is_approved = models.BooleanField(default=False)
    is_expired = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_created=True, null=True)

    def __str__(self):
        return f"{ self.reason } | {self.id}"
   
    def save(self,*args,**kwargs):
        img = qrcode.make(self.id)
        canvas = Image.new('RGB',(290, 290),'white')
        draw = ImageDraw.Draw(canvas)
        canvas.paste(img)
        frame = f"qr_code-{self.id}.png"
        buffer = BytesIO()
        canvas.save(buffer,'PNG')
        self.qr_image.save(frame,File(buffer),save=False)
        canvas.close()
        super().save(*args,**kwargs)

    class Meta:
        verbose_name_plural = 'Movement Pass'
        verbose_name = 'Movement Pass'


