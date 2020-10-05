package com.example.demo.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Stream;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.demo.dto.ImageuploadDto;
import com.example.demo.service.ImageuploadService;

import ch.qos.logback.classic.Logger;

@RestController
//@RequestMapping("/")
@CrossOrigin(origins = { "*" }, maxAge = 3000)
public class WebServercontroller {

	private static final Logger LOGGER = (Logger) LoggerFactory.getLogger(WebServercontroller.class);


	@Autowired
	ImageuploadService iService;
	
	static String filename;
	static int num;
	// 파일 업로드 이미지 받기
	 @RequestMapping(value = "/", method = RequestMethod.POST)
	    public ResponseEntity  handleFileUpload(@RequestParam("img") MultipartFile file,
	    		MultipartHttpServletRequest mtfRequest ) throws InterruptedException 
	 	{
	        try {
				/*
				 * List<MultipartFile> fileList = mtfRequest.getFiles("file");
				 * ArrayList<Map<String, Object>> list = new ArrayList<>();
				 */


	        	// 난수 생성 
	            Random rand = new Random();
	            rand.setSeed(System.currentTimeMillis());//중복 제거
	            num = rand.nextInt(10000000);
	            System.out.println(num);
	            filename =num+".png";// 랜덤으로 뽑은 수 파일 명으로 저장 
	            
	            System.out.printf("File name=%s, size=%s\n", filename,file.getSize());
	         
	            File fileToSave = new File("C:\\Users\\multicampus\\s03p23a409\\yolact\\images\\input\\" + filename);
	          
	            String name = file.getOriginalFilename();
	            
	            file.transferTo(fileToSave);
	            System.out.println("파일이 저장된건가 ");
	            System.out.println(fileToSave);
	            //// 파일 업로드 하고 파이썬 실행 폴더에 저장까지는 됨 

	            
	            
	            //디비에 저장하기 위한 것...
	            ImageuploadDto image  = new ImageuploadDto();
	            image.setNum(num);
	            image.setName(name);
	            iService.insertimageupload(image);
	            // 디비에 난수랑 파일 이름 저장 완료 
	            
	            Runtime rt = Runtime.getRuntime();
	            
			 	Process p= null;
			 	// conda run -n my-python-2-env python --version
			 	String anaconda = "C:\\ProgramData\\Anaconda3\\condabin\\conda.bat activate edge_env";
			 	
			 	String path = "C:\\Users\\multicampus\\s03p23a409\\yolact\\eval.py";
			 	String inputPath = "C:\\Users\\multicampus\\s03p23a409\\yolact\\" + "images\\input\\" + filename;
			 	String outputPath = "C:\\Users\\multicampus\\s03p23a409\\yolact\\" 
			 			+ "images\\output\\" + filename;
			 	String[] envp = {
			 			"python",
			 			path,
			 			"--trained_model=C:\\Users\\multicampus\\s03p23a409\\yolact\\weights\\yolact_base_54_800000.pth", 
			 			"--score_threshold=0.15", 
			 			"--top_k=15", 
			 			"--image="+inputPath+":"+outputPath};
			 	
			 	String pythonCommand = String.join(" ", envp);
			 	
			 	
			 	try {
			 		//yolact eval.py 파일 실행 
			 		p = rt.exec(anaconda + " && " + pythonCommand);
			 		// eval.py 뒤에 명령어..? 옵션 이거 설정을 어떻게 하징,, 
			 		// 디텍션한 결과 가지고 와야 하는뎅 
			 	//	int exitVal = p.exitValue();
			 		
			 		System.out.println(p);
			 		System.out.println("나와랑ㅜㅜ");
			 	//	List<MultipartFile> fileList = mtfRequest.getFiles(studentNumber);
			 		//System.out.println(fileList);
			 		
			 	}catch (Exception e) {
					e.printStackTrace();
				}finally {
					p.waitFor();
					BufferedReader br = new BufferedReader(new InputStreamReader(p.getErrorStream()));
					StringBuilder sb = new StringBuilder();
					String line;
					while ((line = br.readLine()) != null) {
						sb.append(line).append('\n');
					}
					showImages();
					System.out.println("> exit value: " + p.exitValue() + ", \n" + sb.toString());
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
	
	
	public ResponseEntity<byte[]> showImages () throws IOException {
	    String boundary="---------THIS_IS_THE_BOUNDARY";
	    File path = new File("C:\\Users\\multicampus\\s03p23a409\\yolact\\images\\output\\");
	    File fileList[] = path.listFiles();
	    String name = "";
	    String filen = num+""; 

//	    if(fileList.length > 0){
//	    	for(File file : fileList) {
//	    		name = file.getName();
//	    		if(name.contains(filen)) // 이거 if 왜 있죠
//	    		{
////	    			System.out.println(name);
//	    
//	    		}
//	    		
//	    	}
//	    }
	  
	    //List<String> imageNames = Arrays.asList(new String[]{"C:\\Users\\multicampus\\s03p23a409\\yolact\\images\\output\\"+filename});
	    
	    List<String> contentTypes = new ArrayList<>();
	    for (int i = 0; i < fileList.length; i++) {
	    	contentTypes.add(MediaType.IMAGE_PNG_VALUE);
			
		}
	    List<byte[]> imagesData = new ArrayList<byte[]>();
	    for(int i = 0; i< fileList.length; i++) {
	    	 imagesData.add(FileUtils.readFileToByteArray(fileList[i]));
	    }
	    byte[] allImages = getMultipleImageResponse(boundary,fileList, contentTypes,imagesData);
	    final HttpHeaders headers = new HttpHeaders();
	    headers.set("Content-Type","multipart/x-mixed-replace; boundary=" + boundary);
	    return new ResponseEntity<byte[]>(allImages,headers,HttpStatus.CREATED);
	}
	
	private static byte[] concat(byte[] a, byte[] b) {
		byte[] r = Arrays.copyOf(a, a.length + b.length);
		System.arraycopy(r, a.length, b, 0, b.length);
		
		return r;
	}

	private static byte[] getMultipleImageResponse(String boundary, File[] fileList, List<String> contentTypes, List<byte[]> imagesData){
	    System.out.println(fileList.length);
	    System.out.println(contentTypes.toString());
	    System.out.println(imagesData.size());
		byte[] finalByteArray = new byte[0];
	    Integer imagesCounter = -1;
	    for(File imageName : fileList){
	        imagesCounter++;
	        String header="--" + boundary 
	                + "\r\nContent-Disposition: form-data; name=\"" + imageName
	                + "\"; filename=\"" + imageName + "\"\r\n"
	                + "Content-type: " + contentTypes.get(imagesCounter) + "\r\n\r\n";
	        byte[] currentImageByteArray = concat(header.getBytes(), imagesData.get(imagesCounter));
	        finalByteArray = concat(finalByteArray, concat(currentImageByteArray, "\r\n\r\n".getBytes()));
	        if (imagesCounter == fileList.length - 1) {
	            String end = "--" + boundary + "--";
	            finalByteArray = concat(finalByteArray, end.getBytes());
	        }
	    }
	    return finalByteArray;
	}
	
	
	

}
