package com.example.wikigroup.wikigroup.controller;
import com.example.wikigroup.wikigroup.model.Contact;
import com.example.wikigroup.wikigroup.repository.ContactRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class WikiController {
    @Autowired
    private ContactRepository contactRepository;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/team")
    public String team() {
        return "team";
    }

    @GetMapping("/project")
    public String project() {
        return "project";
    }

    @GetMapping("/requirements")
    public String requirements() {
        return "requirements";
    }

    @GetMapping("/architecture")
    public String architecture() {
        return "architecture";
    }

    @GetMapping("/development")
    public String development() {
        return "development";
    }

    @GetMapping("/tests")
    public String tests() {
        return "tests";
    }

    @GetMapping("/deployment")
    public String deployment() {
        return "deployment";
    }

    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("contact", new Contact());
        return "contact";
    }
    @PostMapping("/contact")
    public String submitContact(@Valid Contact contact, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("error", "Por favor corrige los errores en el formulario.");
            return "contact";
        }
        // Custom email validation for proper format
        if (!contact.getCorreo().matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
            model.addAttribute("error", "El correo debe contener '@' seguido de un punto, sin espacios ni caracteres especiales.");
            return "contact";
        }
        contactRepository.save(contact);
        model.addAttribute("success", "Mensaje enviado con éxito. ¡Gracias por contactarnos!");
        model.addAttribute("contact", new Contact());
        return "contact";
    }

}