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

# New models for admin dashboard

class Institute(models.Model):
    name = models.CharField(max_length=255)
    logo_url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name

class Contributor(models.Model):
    name = models.CharField(max_length=255)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    position = models.CharField(max_length=255, blank=True, null=True)
    achievements = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Internship(models.Model):
    title = models.CharField(max_length=255)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    # Store bullet points as JSON list (stringified)
    bullet_points = models.JSONField(default=list, blank=True)
    # Plans stored as JSON list of objects: {name, price, features}
    plans = models.JSONField(default=list, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.title
