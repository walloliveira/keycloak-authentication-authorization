package com.walloliveira.portifolio.keycloakauthenticationauthorization.color;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/colors")
public class ColorResource {
    ArrayList<ColorResponse> colorResponses = new ArrayList<>();

    ColorResource() {
        colorResponses.add(new ColorResponse("green", "#32a852"));
        colorResponses.add(new ColorResponse("red", "#9c1616"));
    }

    @GetMapping
    public List<ColorResponse> list() {
        return colorResponses;
    }
}
