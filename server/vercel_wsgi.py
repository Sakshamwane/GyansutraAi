import os
import sys
from django.core.wsgi import get_wsgi_application

# Add the server directory to the python path
sys.path.append(os.path.join(os.path.dirname(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
app = get_wsgi_application()
