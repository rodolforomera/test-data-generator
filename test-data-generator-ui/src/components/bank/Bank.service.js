import axios from "axios";

const BankService = {
    getBanks: function(pageNumber, pageSize) {
        return axios.get('http://localhost:8082/bank/paged?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
    },
    saveBank: function(bank, bankName) {
        return axios.post('http://localhost:8082/bank/', {bank: bank, name: bankName});
    },
    excludeBank: function(bank) {
        return axios.delete('http://localhost:8082/bank/' + bank);
    },
    getAllBanks: function() {
        return axios.get('http://localhost:8082/bank/');
    },
};

export default BankService;