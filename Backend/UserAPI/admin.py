from django.contrib import admin
from .models import EMPLOYEES_DB

# Optional admin view at `/admin/``
admin.site.register(EMPLOYEES_DB)