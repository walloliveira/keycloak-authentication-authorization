package com.walloliveira.portifolio.keycloakauthenticationauthorization.v1.color;

import java.util.UUID;

public record NewColor(String name, String hex) {
    public Color toColor() {
        return new Color(
                UUID.randomUUID().toString(),
                this.name,
                this.hex
        );
    }
}
