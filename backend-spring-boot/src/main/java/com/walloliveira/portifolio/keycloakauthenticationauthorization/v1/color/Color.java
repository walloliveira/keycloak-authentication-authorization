package com.walloliveira.portifolio.keycloakauthenticationauthorization.v1.color;

import java.util.Objects;

public record Color(String id, String name, String hex) {
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Color color = (Color) o;
        return id.equals(color.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
