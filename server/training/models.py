from django.db import models

class Registration(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    college = models.CharField(max_length=255)
    year = models.CharField(max_length=50)
    course = models.CharField(max_length=255, default='General')
    plan = models.CharField(max_length=50, default='Basic')
    
    # Razorpay details
    razorpay_order_id = models.CharField(max_length=255, blank=True, null=True)
    razorpay_payment_id = models.CharField(max_length=255, blank=True, null=True)
    razorpay_signature = models.CharField(max_length=255, blank=True, null=True)
    is_paid = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.course} ({self.plan})"
