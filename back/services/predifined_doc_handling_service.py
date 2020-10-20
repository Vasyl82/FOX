from back.models import Template, Document


class PredefinedDocHandlingService:
    def __init__(self, project):
        self.project = project
        self.company = project.company

    def create_documents(self):
        hazardous_works = [
            "work_at_height",
            "lifting_work",
            "lifting_work",
            "confined_space",
            "hot_work",
            "chemical_handling",
            "work_alone",
            "work_at_sensitive_area",
            "cold_work",
        ]
        active_hazards = [
            getattr(Template.HazardousWork, hazardous_work).value
            for hazardous_work in hazardous_works
            if getattr(self.project, hazardous_work) is True
        ]
        templates = Template.objects.filter(
            company=self.company, hazardous_work__in=active_hazards
        )
        [self._create_doc_from_template(template) for template in templates]

    def _create_doc_from_template(self, template):
        file_to_copy = template.file
        Document.objects.create(
            project=self.project,
            name=f"{self.project.name}_{template.name}",
            template=template,
            file=file_to_copy,
        )
