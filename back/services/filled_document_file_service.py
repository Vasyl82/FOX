from django.shortcuts import get_object_or_404


class FilledDocumentFileService:
    def __init__(self, pk, DocumentClass):
        self.document = get_object_or_404(DocumentClass, pk=pk)

    def read(self):
        self.document.filled_file.open("rb")
        return self.document.filled_file.read()

    @property
    def name(self):
        return self.document.filled_file.name
