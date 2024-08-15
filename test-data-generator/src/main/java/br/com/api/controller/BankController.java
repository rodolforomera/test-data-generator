package br.com.api.controller;

import br.com.api.data.BankDto;
import br.com.api.model.Bank;
import br.com.api.service.BankService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("bank")
@RequiredArgsConstructor
public class BankController {

    private final BankService bankService;

    @GetMapping("/paged")
    public Page<Bank> getBanks(@RequestParam(name = "pageNumber") int pageNumber,
                               @RequestParam(name = "pageSize") int pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page content = bankService.findAllBank(pageable);
        return content;
    }

    @GetMapping("/")
    public List<Bank> getBanks(){
        return bankService.findAllBank();
    }

    @PostMapping("/")
    public void saveBank(@RequestBody BankDto bankDto){
        bankService.save(bankDto);
    }

    @DeleteMapping("/{id}")
    public void deleteBank(@PathVariable("id") Integer bank){
        bankService.delete(bank);
    }

}