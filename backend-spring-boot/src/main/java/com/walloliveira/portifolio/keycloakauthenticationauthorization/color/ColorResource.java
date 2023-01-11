package com.walloliveira.portifolio.keycloakauthenticationauthorization.color;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/v1/colors")
public final class ColorResource {
    ArrayList<Color> colors = new ArrayList<>();

    ColorResource() {
        colors.add(new Color(UUID.randomUUID().toString(), "green", "#32a852"));
        colors.add(new Color(UUID.randomUUID().toString(), "red", "#9c1616"));
    }

    @GetMapping
    public ResponseEntity<ListResponse> list() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ListResponse(colors));
    }

    @PostMapping
    public ResponseEntity<Color> create(@RequestBody NewColor newColor) {
        final var color = newColor.toColor();
        colors.add(color);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(color);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id, @RequestBody NewColor newColor) {
        final var colorsFounded = colors
                .stream()
                .filter(color -> color.getId().equalsIgnoreCase(id))
                .toList();
        if (colorsFounded.size() == 1) {
            final var colorFounded = colorsFounded.get(0);
            colors.remove(colorFounded);
        } else {
            throw new InvalidParameterException("ID not found");
        }
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
