# from django.contrib.auth.models import User
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string

from django_rest_passwordreset.signals import reset_password_token_created

from django_rest_passwordreset.models import ResetPasswordToken
from back.logger import log


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user

    log(
        log.INFO,
        "send an e-mail to the user [%s]",
        reset_password_token.user.username,
    )

    # URL_FORMAT = "http://46.101.221.249:8000/#/register?token={}&username={}"
    # URL_FORMAT = "http://127.0.0.1:8000/#/register?token={}&username={}"
    URL_FORMAT = settings.EMAIL_REGISTER_LINK_FORMAT

    context = {
        "current_user": reset_password_token.user,
        "username": reset_password_token.user.username,
        "user": reset_password_token.user.name,
        "company_name": reset_password_token.user.company.name,
        "email": reset_password_token.user.email,
        "reset_password_url": URL_FORMAT.format(
            # reverse("password_reset:reset-password-request"),
            reset_password_token.key,
            reset_password_token.user.username,
        ),
    }

    # render email text
    if reset_password_token.user.role == 'CliAdm':
        email_html_message = render_to_string("email/admin_reset_password.html", context)
        email_plaintext_message = render_to_string("email/admin_reset_password.txt", context)

        msg = EmailMultiAlternatives(
            subject="Welcome to FOX!",
            body=email_plaintext_message,
            from_email=settings.EMAIL_EMAIL_FROM,
            to=[reset_password_token.user.email],
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()

    if reset_password_token.user.role == 'CliMan':

        email_html_message = render_to_string("email/manager_reset_password.html", context)
        email_plaintext_message = render_to_string("email/manager_reset_password.txt", context)

        msg = EmailMultiAlternatives(
            subject="You have been added as a Manager",
            body=email_plaintext_message,
            from_email=settings.EMAIL_EMAIL_FROM,
            to=[reset_password_token.user.email],
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()

    if reset_password_token.user.role == "Contr":

        email_html_message = render_to_string("email/contractor_reset_password.html", context)
        email_plaintext_message = render_to_string("email/contractor_reset_password.txt", context)

        msg = EmailMultiAlternatives(
            subject="You have been added as a Contractor",
            body=email_plaintext_message,
            from_email=settings.EMAIL_EMAIL_FROM,
            to=[reset_password_token.user.email],
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()


def send_mail_on_creation(**kwargs):
    user = kwargs["instance"]
    if not user.is_active:
        log(log.INFO, "WE TRIED TO SEND EMAIL to [%s]", user.username)
        token = ResetPasswordToken.objects.create(user=user)
        # send a signal that the password token was created
        # let whoever receives this signal handle sending the email for the password reset
        reset_password_token_created.send(
            sender=user.__class__, instance=user, reset_password_token=token
        )
        user.is_active = True
        user.save()
