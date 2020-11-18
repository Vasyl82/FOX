from django.shortcuts import get_object_or_404


class SignatureService:
    def __init__(self, pk, UserClass):
        self.user = get_object_or_404(UserClass, pk=pk)

    def read(self):
        self.user.signature.open("rb")
        return self.user.signature.read()

    @property
    def name(self):
        return self.user.signature.name
