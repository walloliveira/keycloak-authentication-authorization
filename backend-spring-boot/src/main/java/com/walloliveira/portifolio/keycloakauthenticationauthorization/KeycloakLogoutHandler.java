package com.walloliveira.portifolio.keycloakauthenticationauthorization;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;


@Component
public final class KeycloakLogoutHandler implements LogoutHandler {

    private final RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(KeycloakLogoutHandler.class);

    public KeycloakLogoutHandler(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logoutFromKeycloak((OidcUser) authentication.getPrincipal());
    }

    private void logoutFromKeycloak(OidcUser user) {
        final var builder = buildLogoutUriBuilder(user);
        final var statusCode = performLogoutRequest(builder).getStatusCode();
        if (statusCode.is2xxSuccessful()) {
            logger.info("Successfulley logged out from Keycloak");
        } else {
            logger.error("Could not propagate logout to Keycloak");
        }
    }

    private static UriComponentsBuilder buildLogoutUriBuilder(OidcUser user) {
        return UriComponentsBuilder
                .fromUriString(buildLogoutEndpoint(user))
                .queryParam("id_token_hint", user.getIdToken().getTokenValue());
    }

    private static String buildLogoutEndpoint(OidcUser user) {
        return user.getIssuer() +
                "/protocol/openid-connect/logout";
    }

    private ResponseEntity<String> performLogoutRequest(UriComponentsBuilder builder) {
        return this.restTemplate.getForEntity(builder.toUriString(), String.class);
    }
}
