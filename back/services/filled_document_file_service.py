from django.shortcuts import get_object_or_404


class FilledDocumentFileService:
    def __init__(self, pk, DocumentClass):
        self.document = get_object_or_404(DocumentClass, pk=pk)

    def read(self):
        self.document.file.open("rb")

        if self.document.filled_file == "null":
            return self.document.file.read()
        else:
            return self.document.filled_file.read()

    @property
    def name(self):
        if self.document.filled_file == "null":
            return self.document.file.name
        else:
            return self.document.filled_file.name
