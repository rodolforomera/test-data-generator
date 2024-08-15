package br.com.api.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;

@Controller
@RequestMapping("/")
public class StaticWebController {

    @RequestMapping("/bank")
    public ModelAndView toDashBoardPage(HttpServletRequest request, HttpServletResponse response) throws IOException {
        return new ModelAndView("forward:/");
    }

    @RequestMapping("/arquivo1")
    public ModelAndView  someOtherPage(HttpServletRequest request,    HttpServletResponse response) throws IOException {
        return new ModelAndView("forward:/");
    }

}