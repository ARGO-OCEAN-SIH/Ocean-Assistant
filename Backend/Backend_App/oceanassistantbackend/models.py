from django.contrib.auth.models import AbstractUser
from django.db import models

# Custom User (will use SQLite)
class CustomUser(AbstractUser):
    is_allowed = models.BooleanField(default=True)

    def __str__(self):
        return self.username

# -------- REMOVE or COMMENT OUT TechnicalKnowledge model -------- #
# You said this table doesn't exist, so remove it
# class TechnicalKnowledge(models.Model):
#     query = models.TextField(unique=True)
#     answer = models.TextField()
# 
#     class Meta:
#         db_table = "technical_knowledge"
#         managed = False
# 
#     def __str__(self):
#         return self.query

# Argo Measurements (will use PostgreSQL)
class ArgoMeasurement(models.Model):
    float_id = models.CharField(max_length=20)
    timestamp = models.DateTimeField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    pressure = models.FloatField()
    temperature = models.FloatField(null=True, blank=True)
    salinity = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = "argo_measurements"  # This is correct
        managed = False  # Table already exists in PostgreSQL

    def __str__(self):
        return f"{self.float_id} - {self.timestamp}"