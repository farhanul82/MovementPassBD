# Generated by Django 3.0.7 on 2021-06-28 19:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('userpass', '0002_auto_20210629_0101'),
    ]

    operations = [
        migrations.CreateModel(
            name='MovementPass',
            fields=[
                ('created_at', models.DateTimeField(auto_created=True, null=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('from_m', models.CharField(max_length=200, null=True, verbose_name='From Where')),
                ('to_m', models.CharField(max_length=200, null=True, verbose_name='To Where')),
                ('district', models.CharField(max_length=50, null=True, verbose_name='District Name')),
                ('sub_dristrict', models.CharField(blank=True, max_length=200, null=True, verbose_name='Sub Dristrict Name')),
                ('time_spand', models.CharField(max_length=50, null=True)),
                ('move', models.CharField(max_length=50, null=True)),
                ('date', models.DateTimeField(null=True)),
                ('reason', models.CharField(max_length=50, null=True)),
                ('qr_image', models.ImageField(blank=True, null=True, upload_to='qr/')),
                ('is_approved', models.BooleanField(default=False)),
                ('is_expired', models.BooleanField(default=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Movement Pass',
                'verbose_name_plural': 'Movement Pass',
            },
        ),
    ]