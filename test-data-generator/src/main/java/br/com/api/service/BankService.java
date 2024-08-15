package br.com.api.service;

import br.com.api.data.BankDto;
import br.com.api.model.Bank;
import br.com.api.repository.BankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BankService {

    private final BankRepository bankRepository;

    public Page<Bank> findAllBank(Pageable pageable) {
        return bankRepository.findAll(pageable);
    }

    public List<Bank> findAllBank() {
        return bankRepository.findAll();
    }

    public Bank save(BankDto bankDto) {
        Bank bank = Bank.builder()
                .bank(bankDto.getBank())
                .name(bankDto.getName())
                .build();
        return bankRepository.save(bank);
    }

    public void delete(Integer bank) {
        bankRepository.deleteById(bank);
    }

}