package br.com.api.service;

import org.springframework.stereotype.Service;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class File1Service {

    public String createFile(String path) throws IOException {

        String fileName = path + "File1_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")) + ".txt";
        File file = new File(fileName);
        file.createNewFile();

        FileOutputStream fos = new FileOutputStream(file);
        DataOutputStream outStream = new DataOutputStream(new BufferedOutputStream(fos));
        outStream.writeUTF("Hello");
        outStream.close();

        return fileName;

    }

}
