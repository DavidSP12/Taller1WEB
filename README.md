# WikiGroup - Documentación Completa del Proyecto

## 📋 Descripción General

WikiGroup es una aplicación web desarrollada con **Spring Boot** que funciona como una wiki de documentación para proyectos de desarrollo web. La aplicación permite navegar por diferentes secciones de documentación y incluye un sistema de contacto con persistencia de datos.

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
WikiGroup/
├── .mvn/                    # Configuración de Maven Wrapper
├── src/
│   ├── main/
│   │   ├── java/com/example/wikigroup/wikigroup/
│   │   │   ├── WikigroupApplication.java     # Clase principal
│   │   │   ├── ServletInitializer.java       # Configuración para WAR
│   │   │   ├── controller/
│   │   │   │   └── WikiController.java       # Controlador principal
│   │   │   ├── model/
│   │   │   │   └── Contact.java              # Entidad de contacto
│   │   │   └── repository/
│   │   │       └── ContactRepository.java    # Repositorio JPA
│   │   └── resources/
│   │       ├── application.properties        # Configuración
│   │       ├── static/                       # Recursos estáticos
│   │       │   ├── css/style.css            # Estilos CSS
│   │       │   └── js/script.js             # JavaScript
│   │       └── templates/                    # Plantillas Thymeleaf
│   │           ├── layout.html              # Layout base
│   │           ├── index.html               # Página principal
│   │           ├── contact.html             # Formulario contacto
│   │           └── [otras páginas].html
│   └── test/                # Pruebas unitarias
├── pom.xml                  # Configuración Maven
└── mvnw, mvnw.cmd          # Maven Wrapper
```

## 🔧 Componentes Principales

### 1. Configuración Maven (pom.xml)

```xml:c:\Users\rockp\OneDrive\Desktop\CODES\DESWEB\WikiGroup\pom.xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.1.5</version>
</parent>

<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- Thymeleaf Template Engine -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>
    
    <!-- Base de datos H2 (en memoria) -->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Lombok para reducir código boilerplate -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

### 2. Clase Principal

```java:c:\Users\rockp\OneDrive\Desktop\CODES\DESWEB\WikiGroup\src\main\java\com\example\wikigroup\wikigroup\WikigroupApplication.java
@SpringBootApplication
public class WikigroupApplication {
    public static void main(String[] args) {
        SpringApplication.run(WikigroupApplication.class, args);
    }
}
```

### 3. Controlador Principal

```java:c:\Users\rockp\OneDrive\Desktop\CODES\DESWEB\WikiGroup\src\main\java\com\example\wikigroup\wikigroup\controller\WikiController.java
@Controller
public class WikiController {
    @Autowired
    private ContactRepository contactRepository;

    // Rutas de navegación
    @GetMapping("/")
    public String index() { return "index"; }
    
    @GetMapping("/team")
    public String team() { return "team"; }
    
    @GetMapping("/project")
    public String project() { return "project"; }
    
    // Formulario de contacto
    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("contact", new Contact());
        return "contact";
    }
    
    @PostMapping("/contact")
    public String submitContact(@Valid Contact contact, BindingResult result, Model model) {
        // Validación y guardado
        if (result.hasErrors()) {
            model.addAttribute("error", "Por favor corrige los errores en el formulario.");
            return "contact";
        }
        contactRepository.save(contact);
        model.addAttribute("success", "Mensaje enviado con éxito!");
        return "contact";
    }
}
```

### 4. Modelo de Datos

```java:c:\Users\rockp\OneDrive\Desktop\CODES\DESWEB\WikiGroup\src\main\java\com\example\wikigroup\wikigroup\model\Contact.java
@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Los nombres son obligatorios")
    @Size(max = 100)
    private String nombres;

    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(max = 100)
    private String apellidos;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe tener un formato válido")
    private String correo;

    @Min(value = 0) @Max(value = 16)
    private int semestre;

    @NotBlank(message = "La descripción es obligatoria")
    @Size(max = 500)
    private String descripcion;
}
```

### 5. Repositorio

```java:c:\Users\rockp\OneDrive\Desktop\CODES\DESWEB\WikiGroup\src\main\java\com\example\wikigroup\wikigroup\repository\ContactRepository.java
@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    // Hereda métodos CRUD automáticamente
}
```

## ⚙️ Configuración

### application.properties

```properties:c:\Users\rockp\OneDrive\Desktop\CODES\DESWEB\WikiGroup\src\main\resources\application.properties
# Configuración del servidor
server.port=8080
spring.application.name=wikigroup

# Base de datos H2 (en memoria)
spring.datasource.url=jdbc:h2:mem:wikigroup_db
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# Thymeleaf
spring.thymeleaf.cache=false
spring.thymeleaf.mode=HTML
```

## 🎨 Frontend

### Tecnologías Utilizadas
- **Thymeleaf**: Motor de plantillas para generar HTML dinámico
- **CSS3**: Estilos responsivos con Flexbox/Grid
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía Roboto

### Estructura de Plantillas
- **layout.html**: Plantilla base con header y navegación
- **index.html**: Página principal
- **contact.html**: Formulario de contacto con validación
- **Páginas de documentación**: team, project, requirements, etc.

## 🚀 Funcionalidades

1. **Navegación por secciones**:
   - Inicio
   - Equipo
   - Proyecto
   - Requerimientos
   - Arquitectura
   - Desarrollo
   - Pruebas
   - Despliegue

2. **Sistema de contacto**:
   - Formulario con validación
   - Persistencia en base de datos H2
   - Validación de email personalizada
   - Mensajes de éxito/error

3. **Características técnicas**:
   - Diseño responsivo
   - Validación tanto frontend como backend
   - Base de datos en memoria para desarrollo
   - Logging configurado
   - Empaquetado como WAR para despliegue

## 🔄 Flujo de Funcionamiento

1. **Inicio**: <mcfile name="WikigroupApplication.java" path="c:\Users\rockp\OneDrive\Desktop\CODES\DESWEB\WikiGroup\src\main\java\com\example\wikigroup\wikigroup\WikigroupApplication.java"></mcfile> arranca la aplicación Spring Boot
2. **Navegación**: <mcfile name="WikiController.java" path="c:\Users\rockp\OneDrive\Desktop\CODES\DESWEB\WikiGroup\src\main\java\com\example\wikigroup\wikigroup\controller\WikiController.java"></mcfile> maneja las rutas y renderiza las plantillas Thymeleaf
3. **Contacto**: Los datos del formulario se validan y persisten usando <mcfile name="ContactRepository.java" path="c:\Users\rockp\OneDrive\Desktop\CODES\DESWEB\WikiGroup\src\main\java\com\example\wikigroup\wikigroup\repository\ContactRepository.java"></mcfile>
4. **Base de datos**: H2 en memoria almacena los contactos durante la ejecución

## 📦 Comandos de Ejecución

```bash
# Compilar y ejecutar
.\mvnw spring-boot:run

# Generar WAR
.\mvnw clean package

# Acceder a la consola H2
http://localhost:8080/h2-console
```

Este proyecto implementa una arquitectura MVC limpia con Spring Boot, proporcionando una base sólida para una aplicación web de documentación con funcionalidades de contacto.
        
