package br.com.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity(name = "bank")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bank implements Serializable {

    @Id
    private Long bank;

    private String name;

}