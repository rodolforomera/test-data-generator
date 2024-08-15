package br.com.api.data;

import lombok.Data;

import java.io.Serializable;

@Data
public class BankDto implements Serializable {

    private long bank;

    private String name;

}