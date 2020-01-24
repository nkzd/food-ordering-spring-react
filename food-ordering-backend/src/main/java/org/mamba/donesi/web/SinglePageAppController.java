package org.mamba.donesi.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SinglePageAppController {
    @RequestMapping(value = {"/", "/login", "/signup","/restaurants/**","/profile", "/admin/**"})
    public String index() {
        return "index.html";
    }
}