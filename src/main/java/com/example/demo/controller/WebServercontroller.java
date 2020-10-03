package com.example.demo.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


import org.python.core.PyFunction;
import org.python.core.PyObject;
import org.python.core.PyString;
import org.python.util.PythonInterpreter;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ch.qos.logback.classic.Logger;

@RestController
//@RequestMapping("/")
@CrossOrigin(origins = { "*" }, maxAge = 3000)
public class WebServercontroller {

	private static final Logger LOGGER = (Logger) LoggerFactory.getLogger(WebServercontroller.class);


	// 파일 업로드 이미지 받기
	 @RequestMapping(value = "/", method = RequestMethod.POST)
	    public ResponseEntity  handleFileUpload(@RequestParam("img") MultipartFile file) throws InterruptedException 
	 	{
	        try {
	            System.out.printf("File name=%s, size=%s\n", file.getOriginalFilename(),file.getSize());
	         
	            File fileToSave = new File("C:\\Users\\yodg3\\git\\s03p22a409\\TF_Object_Detection_API\\test_images\\" + file.getOriginalFilename());
	          
	            file.transferTo(fileToSave);
	            System.out.println("파일이ㅣ 저장된건가 ");
	            System.out.println(fileToSave);

	            String pythonScriptPath = "C:\\Users\\yodg3\\git\\s03p22a409\\TF_Object_Detection_API\\";
			 	Runtime rt = Runtime.getRuntime();
			
			 	Process p= null;

			 	try {
			 		p = rt.exec("python C:\\Users\\yodg3\\git\\s03p22a409\\TF_Object_Detection_API\\run_inference_tf.Graph.py");
			 		System.out.println("나와랑ㅜㅜ");
			 		
			 	}catch (Exception e) {
					e.printStackTrace();
				}finally {
					p.waitFor();
					p.destroy();
				}
	  
	        } catch (IOException ioe) {
	           System.out.println("살패으아으아ㅡ아ㅡ아ㅡㅏ");
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	     
	        return ResponseEntity.ok().build();
	    }

	
	private ResponseEntity<Map<String, Object>> handleSuccess(Object data) {
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", true);
		resultMap.put("data", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	private ResponseEntity<Map<String, Object>> handleException(Exception e) {
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", false);
		resultMap.put("data", e.getMessage());
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
