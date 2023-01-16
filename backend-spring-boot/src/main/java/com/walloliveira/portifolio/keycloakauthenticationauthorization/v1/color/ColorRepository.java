package com.walloliveira.portifolio.keycloakauthenticationauthorization.v1.color;

import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ColorRepository {

    private final Set<Color> colors = new HashSet<>();

    @PostConstruct
    public void postConstruct() {
        colors.add(new Color(UUID.randomUUID().toString(), "green", "#32a852"));
        colors.add(new Color(UUID.randomUUID().toString(), "red", "#9c1616"));
    }

    public List<Color> findAll() {
        return Collections.unmodifiableSet(this.colors)
                .stream()
                .toList();
    }

    public Optional<Color> findById(String id) {
        return colors.stream()
                .filter(color -> color.id().equalsIgnoreCase(id))
                .findFirst();
    }

    public void remove(Color color) {
        colors.remove(color);
    }

    public void save(Color color) {
        this.colors.add(color);
    }
}
