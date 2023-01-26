package com.walloliveira.portifolio.keycloakauthenticationauthorization.v1.color;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;


@RestController
@RequestMapping("/v1/colors")
@CrossOrigin("*")
public final class ColorResource {

    private final ColorRepository repository;

    ColorResource(ColorRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<ListResponse> list() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ListResponse(this.repository.findAll()));
    }

    @PostMapping
    public ResponseEntity<Color> create(@RequestBody NewColor newColor) {
        final var color = newColor.toColor();
        this.repository.save(color);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(color);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        final var colorFounded = this.repository.findById(id);
        if (colorFounded.isPresent()) {
            this.repository.remove(colorFounded.get());
        } else {
            throw new InvalidParameterException("ID not found");
        }
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
