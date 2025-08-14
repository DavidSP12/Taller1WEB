package com.example.wikigroup.wikigroup.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private @ NotBlank @Min(1) @Max(1000000000) Long id;

    @NotBlank
    @Size(max = 100)
    private @Getter @NotBlank @Setter @Size(max = 100) String nombres;

    @NotBlank
    @Size(max = 100)
    private @Getter @NotBlank @Setter @Size(max = 100) String apellidos;

    @NotBlank
    @Email
    @Size(max = 100)
    private @Getter @NotBlank @Setter @Email @Size(max = 100) String correo;

    @Min(0)
    @Max(16)
    private @Getter @Min(0) @Max(16) @Setter int semestre;

    @NotBlank
    private @Getter @NotBlank @Setter String descripcion;

}