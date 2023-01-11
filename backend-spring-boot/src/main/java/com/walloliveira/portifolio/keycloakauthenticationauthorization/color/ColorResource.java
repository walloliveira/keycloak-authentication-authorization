package com.walloliveira.portifolio.keycloakauthenticationauthorization.color;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/v1/colors")
public class ColorResource {
    ArrayList<Color> colors = new ArrayList<>();

    ColorResource() {
        colors.add(new Color(UUID.randomUUID().toString(), "green", "#32a852"));
        colors.add(new Color(UUID.randomUUID().toString(), "red", "#9c1616"));
    }

    @GetMapping
    public ListResponse list() {
        return new ListResponse(colors);
    }

    @PostMapping
    public Color create(@RequestBody NewColor newColor) {
        final var color = newColor.toColor();
        colors.add(color);
        return color;
    }
}
