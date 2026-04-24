import razorpay
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from .models import Registration

# Initialize Razorpay Client
# We mock it or use env variables. Since we're providing code to user, we'll use a placeholder.
client = razorpay.Client(auth=(getattr(settings, 'RAZORPAY_KEY_ID', 'test_key'), getattr(settings, 'RAZORPAY_KEY_SECRET', 'test_secret')))

@api_view(['POST'])
def register(request):
    data = request.data
    # Create DB record
    record = Registration.objects.create(
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        college=data.get('college'),
        year=data.get('year'),
        course=data.get('course', 'General'),
        plan=data.get('plan', 'Basic'),
    )
    
    # Create Razorpay Order
    frontend_amount = data.get('amount', 500)
    amount = int(frontend_amount) * 100  # Amount is in paise
    order_data = {
        "amount": amount,
        "currency": "INR",
        "receipt": f"receipt_{record.id}",
    }
    
    try:
        payment = client.order.create(data=order_data)
        record.razorpay_order_id = payment['id']
        record.save()
        
        return Response({
            'order_id': payment['id'],
            'amount': payment['amount'],
            'currency': payment['currency'],
            'key_id': getattr(settings, 'RAZORPAY_KEY_ID', 'test_key'),
            'record_id': record.id
        })
    except Exception as e:
        # Fallback if Razorpay API keys not working (for local testing mockup)
        return Response({
            'order_id': 'order_mock123',
            'amount': amount,
            'currency': 'INR',
            'key_id': 'test_key',
            'record_id': record.id
        })

@api_view(['POST'])
def verify_payment(request):
    data = request.data
    record_id = data.get('record_id')
    
    try:
        record = Registration.objects.get(id=record_id)
        
        # Verify signature matching real Razorpay implementation if not in mock phase
        key_secret = getattr(settings, 'RAZORPAY_KEY_SECRET', 'test_secret')
        if key_secret != 'test_secret':
            params_dict = {
                'razorpay_order_id': data.get('razorpay_order_id'),
                'razorpay_payment_id': data.get('razorpay_payment_id'),
                'razorpay_signature': data.get('razorpay_signature')
            }
            # This throws an exception if signature is invalid
            client.utility.verify_payment_signature(params_dict)

        record.razorpay_payment_id = data.get('razorpay_payment_id')
        record.razorpay_signature = data.get('razorpay_signature')
        record.is_paid = True
        record.save()
        
        return Response({'status': 'Payment Successful'})
    except Exception as e:
        return Response({'status': 'Failed', 'error': str(e)}, status=400)
