import axios from "axios";

const Arquivo1Service = {
    createFile: function(path) {
        return axios.post('http://localhost:8082/file1/create/', {path: path});
    },
};

export default Arquivo1Service;