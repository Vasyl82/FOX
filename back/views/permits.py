from django.http import Http404, JsonResponse

from rest_framework.views import APIView
from back.services.permits import PermitVerificationService


class PermitVerification(APIView):
    def get(self, request, part1, part2, part3):
        verification_result = PermitVerificationService(
            part1, part2, part3
        ).verify_permit()
        if verification_result == "You do not have the permission to Scan the QR Code":
            raise Http404(verification_result)
        return JsonResponse(verification_result)
