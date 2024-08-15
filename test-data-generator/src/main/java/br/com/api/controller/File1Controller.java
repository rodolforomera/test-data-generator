package br.com.api.controller;

import br.com.api.data.File1Dto;
import br.com.api.service.File1Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("file1")
@RequiredArgsConstructor
public class File1Controller {

    private final File1Service file1Service;

    @PostMapping("/create/")
    public String createFile1(@RequestBody File1Dto file1Dto){
        try {
            return file1Service.createFile(file1Dto.getPath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
