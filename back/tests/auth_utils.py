from back.views import ObtainFoxJWTToken


def get_jwt_token(factory, credentials):
    """Utility to get auth jwt token for protected api views"""
    request = factory.post(
        "/api/token-auth/",
        credentials,
    )
    response = ObtainFoxJWTToken.as_view()(request)
    assert "token" in response.data, "No token returned!"
    assert response.data["token"], "Token is None!!!"
    return response.data["token"]
