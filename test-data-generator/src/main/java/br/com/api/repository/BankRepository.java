package br.com.api.repository;

import br.com.api.model.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankRepository extends PagingAndSortingRepository<Bank, Integer>, JpaRepository<Bank, Integer> {

    

}