import razorpay
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.conf import settings
import base64
from .models import Registration, Institute, Contributor, Internship, DemoRequest, Event, BlogPost
from .serializers import InstituteSerializer, ContributorSerializer, InternshipSerializer, DemoRequestSerializer, EventSerializer, BlogPostSerializer

@csrf_exempt
def check_admin_auth(request):
    token = request.headers.get('X-GyanSutra-Admin-Token')
    if not token:
        print("Auth failed: No X-GyanSutra-Admin-Token header")
        return False
        
    try:
        decoded = base64.b64decode(token).decode()
        username, password = decoded.split(':')
        
        target_user = getattr(settings, 'ADMIN_USERNAME', '').strip()
        target_pass = getattr(settings, 'ADMIN_PASSWORD', '').strip()
        
        match = (username.strip() == target_user and password.strip() == target_pass)
        if not match:
            print(f"Auth failed: Credentials mismatch for user {username.strip()}")
        return match
    except Exception as e:
        print(f"Auth system error: {str(e)}")
        return False


def get_razorpay_client():
    return razorpay.Client(auth=(
        getattr(settings, 'RAZORPAY_KEY_ID', ''), 
        getattr(settings, 'RAZORPAY_KEY_SECRET', '')
    ))

@api_view(['POST'])
def register(request):
    client = get_razorpay_client()
    data = request.data
    try:
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
        
        payment = client.order.create(data=order_data)
        record.razorpay_order_id = payment['id']
        record.save()
        
        return Response({
            'order_id': payment['id'],
            'amount': payment['amount'],
            'currency': payment['currency'],
            'key_id': getattr(settings, 'RAZORPAY_KEY_ID', ''),
            'record_id': record.id
        })
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
def verify_payment(request):
    client = get_razorpay_client()
    data = request.data
    record_id = data.get('record_id')
    
    try:
        record = Registration.objects.get(id=record_id)
        
        # Verify signature matching real Razorpay implementation if not in mock phase
        key_secret = getattr(settings, 'RAZORPAY_KEY_SECRET', '')
        if key_secret: # Only verify if secret is available
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

# -------------------------------------------------------------------
# Admin CRUD endpoints (protected by simple Basic Auth)
# -------------------------------------------------------------------

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def institute_list(request):
    if request.method == 'POST' and not check_admin_auth(request):
        return Response({'detail': 'Unauthorized'}, status=401)
    if request.method == 'GET':
        qs = Institute.objects.all()
        ser = InstituteSerializer(qs, many=True)
        return Response(ser.data)
    # POST - create
    ser = InstituteSerializer(data=request.data)
    if ser.is_valid():
        ser.save()
        return Response(ser.data, status=201)
    return Response(ser.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def institute_detail(request, pk):
    if not check_admin_auth(request):
        return Response({'detail': 'Unauthorized'}, status=401)
    try:
        obj = Institute.objects.get(pk=pk)
    except Institute.DoesNotExist:
        return Response({'detail': 'Not found'}, status=404)
    if request.method == 'GET':
        ser = InstituteSerializer(obj)
        return Response(ser.data)
    if request.method == 'PUT':
        ser = InstituteSerializer(obj, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors, status=400)
    # DELETE
    obj.delete()
    return Response(status=204)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def contributor_list(request):
    if request.method == 'POST' and not check_admin_auth(request):
        return Response({'detail': 'Unauthorized'}, status=401)
    if request.method == 'GET':
        qs = Contributor.objects.all()
        ser = ContributorSerializer(qs, many=True)
        return Response(ser.data)
    ser = ContributorSerializer(data=request.data)
    if ser.is_valid():
        ser.save()
        return Response(ser.data, status=201)
    return Response(ser.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def contributor_detail(request, pk):
    if not check_admin_auth(request):
        return Response({'detail': 'Unauthorized'}, status=401)
    try:
        obj = Contributor.objects.get(pk=pk)
    except Contributor.DoesNotExist:
        return Response({'detail': 'Not found'}, status=404)
    if request.method == 'GET':
        ser = ContributorSerializer(obj)
        return Response(ser.data)
    if request.method == 'PUT':
        ser = ContributorSerializer(obj, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors, status=400)
    obj.delete()
    return Response(status=204)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def internship_list(request):
    if request.method == 'POST' and not check_admin_auth(request):
        return Response({'detail': 'Unauthorized'}, status=401)
    if request.method == 'GET':
        qs = Internship.objects.all()
        ser = InternshipSerializer(qs, many=True)
        return Response(ser.data)
    ser = InternshipSerializer(data=request.data)
    if ser.is_valid():
        ser.save()
        return Response(ser.data, status=201)
    return Response(ser.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def internship_detail(request, pk):
    if not check_admin_auth(request):
        return Response({'detail': 'Unauthorized'}, status=401)
    try:
        obj = Internship.objects.get(pk=pk)
    except Internship.DoesNotExist:
        return Response({'detail': 'Not found'}, status=404)
    if request.method == 'GET':
        ser = InternshipSerializer(obj)
        return Response(ser.data)
    if request.method == 'PUT':
        ser = InternshipSerializer(obj, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors, status=400)
    obj.delete()
    return Response(status=204)

@api_view(['POST'])
@permission_classes([AllowAny])
def request_demo(request):
    serializer = DemoRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Demo request submitted successfully'}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def demo_request_list(request):
    if not check_admin_auth(request):
        return Response({'detail': 'Unauthorized'}, status=401)
    qs = DemoRequest.objects.all().order_by('-created_at')
    ser = DemoRequestSerializer(qs, many=True)
    return Response(ser.data)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def event_list(request):
    if request.method == 'POST' and not check_admin_auth(request):
        return Response({'detail': 'Unauthorized'}, status=401)
    if request.method == 'GET':
        qs = Event.objects.all().order_by('date', 'time')
        ser = EventSerializer(qs, many=True)
        return Response(ser.data)
    # POST - create
    ser = EventSerializer(data=request.data)
    if ser.is_valid():
        ser.save()
        return Response(ser.data, status=201)
    return Response(ser.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def event_detail(request, pk):
    if not check_admin_auth(request) and request.method != 'GET':
        return Response({'detail': 'Unauthorized'}, status=401)
    try:
        obj = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'detail': 'Not found'}, status=404)
    if request.method == 'GET':
        ser = EventSerializer(obj)
        return Response(ser.data)
    if request.method == 'PUT':
        ser = EventSerializer(obj, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors, status=400)
    # DELETE
    obj.delete()
    return Response(status=204)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def blog_list(request):
    if request.method == 'POST' and not check_admin_auth(request):
        return Response({'detail': 'Unauthorized'}, status=401)
    if request.method == 'GET':
        qs = BlogPost.objects.all().order_by('-created_at')
        ser = BlogPostSerializer(qs, many=True)
        return Response(ser.data)
    # POST - create
    ser = BlogPostSerializer(data=request.data)
    if ser.is_valid():
        ser.save()
        return Response(ser.data, status=201)
    return Response(ser.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def blog_detail(request, pk):
    # Handle slug or ID
    try:
        if str(pk).isdigit():
            obj = BlogPost.objects.get(pk=pk)
        else:
            obj = BlogPost.objects.get(slug=pk)
    except BlogPost.DoesNotExist:
        return Response({'detail': 'Not found'}, status=404)

    if request.method == 'GET':
        ser = BlogPostSerializer(obj)
        return Response(ser.data)
    
    if not check_admin_auth(request):
        return Response({'detail': 'Unauthorized'}, status=401)

    if request.method == 'PUT':
        ser = BlogPostSerializer(obj, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors, status=400)
    # DELETE
    obj.delete()
    return Response(status=204)
