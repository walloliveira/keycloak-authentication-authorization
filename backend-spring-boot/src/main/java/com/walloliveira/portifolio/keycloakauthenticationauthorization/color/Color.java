package com.walloliveira.portifolio.keycloakauthenticationauthorization.color;

public final class Color {
    private final String id;
    private String name;
    private String hex;

    public Color(String id, String name, String hex) {
        this.id = id;
        this.name = name;
        this.hex = hex;
    }

    public void update(NewColor newColor) {
        this.name = newColor.name();
        this.hex = newColor.hex();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getHex() {
        return hex;
    }
}
