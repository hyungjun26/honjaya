package com.example.demo.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.persistence.criteria.CriteriaBuilder.In;

import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.python.icu.impl.number.Parse;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.demo.dto.ImageObject;
import com.example.demo.dto.ImageUploadResponse;

import ch.qos.logback.classic.Logger;

@RestController
//@RequestMapping("/")
@CrossOrigin(origins = { "*" }, maxAge = 3000)
public class WebServercontroller {
	@GetMapping("/ping")
	public String pong() {
		return "pong";
	}

	private static final Logger LOGGER = (Logger) LoggerFactory.getLogger(WebServercontroller.class);

	static String filename;
	static int num;

	// 최초 파일 업로드 이미지 받아서 마스킹 한 이미지 보내기
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ResponseEntity<ImageUploadResponse> handleFileUpload(@RequestParam("img") MultipartFile file)
			throws InterruptedException {
		ResponseEntity<ImageUploadResponse> res = null;
		try {

			// 난수 생성
			Random rand = new Random();
			rand.setSeed(System.currentTimeMillis());// 중복 제거
			num = rand.nextInt(10000000);
//			System.out.println(num);
			filename = num + ".png";// 랜덤으로 뽑은 수 파일 명으로 저장

			System.out.printf("File name=%s, size=%s\n", filename, file.getSize());
			File fileToSave = new File("C:\\Users\\multicampus\\s03p23a409\\yolact\\images\\input\\" + filename);
			String name = file.getOriginalFilename();
			file.transferTo(fileToSave);
			//// 파일 업로드 하고 파이썬 실행 폴더에 저장까지는 됨

			Runtime rt = Runtime.getRuntime();

			Process p = null;
			// conda run -n my-python-2-env python --version
			String anaconda = "C:\\ProgramData\\Anaconda3\\condabin\\conda.bat activate edge_env";
			String path = "C:\\Users\\multicampus\\s03p23a409\\yolact\\eval.py";
			String inputPath = "C:\\Users\\multicampus\\s03p23a409\\yolact\\" + "images\\input\\" + filename;
			String outputPath = "C:\\Users\\multicampus\\s03p23a409\\yolact\\" + "images\\output\\" + filename;
			String[] envp = { "python", path,
					"--trained_model=C:\\Users\\multicampus\\s03p23a409\\yolact\\weights\\yolact_base_54_800000.pth",
					"--score_threshold=0.15", "--top_k=15", "--image=" + inputPath + ":" + outputPath };

			String pythonCommand = String.join(" ", envp);

			try {
				// yolact eval.py 파일 실행
				p = rt.exec(anaconda + " && " + pythonCommand);
//				System.out.println(p);
//				System.out.println("....");

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				p.waitFor();
				BufferedReader br = new BufferedReader(new InputStreamReader(p.getErrorStream()));
				StringBuilder sb = new StringBuilder();
				String line;
				while ((line = br.readLine()) != null) {
					sb.append(line).append('\n');
				}
				res = showImages();
				System.out.println("> exit value: " + p.exitValue() + ", \n" + sb.toString());
				p.destroy();
				System.out.println(res.toString());
			}

		} catch (IOException ioe) {
//			System.out.println("살패으아으아ㅡ아ㅡ아ㅡㅏ");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		return res;
	}

	// 이미지 보내기
	public ResponseEntity<ImageUploadResponse> showImages() throws IOException {
		String boundary = "---------THIS_IS_THE_BOUNDARY";
		File path = new File("C:\\Users\\multicampus\\s03p23a409\\yolact\\images\\output\\");
		File[] fileList = Arrays.stream(path.listFiles()).filter(e -> e.getName().indexOf(String.valueOf(num)) != -1)
				.toArray(File[]::new);
		String name = "";
		String filen = num + "";
		String id = null;
		List<byte[]> imagesData = new ArrayList<byte[]>();
		for (int i = 0; i < fileList.length; i++) {
			imagesData.add(FileUtils.readFileToByteArray(fileList[i]));
		}

		List<ImageObject> objects = new ArrayList<ImageObject>();
		int idx = 0;
		for (File file : fileList) {
//			System.out.println(file.getName());
			name = file.getName().split("\\.")[0];

			String[] arr = name.split("_");

			idx += 1;
			if (arr.length < 2)
				continue;
			String type = arr[1];

			if (!type.equals("mask") && !type.equals("background")) {
				id = arr[2];
				ImageObject io = new ImageObject(file.getName(), type, Integer.parseInt(id), imagesData.get(idx-1));
			
				objects.add(io);
			}
		}

		List<String> contentTypes = new ArrayList<>();
		for (int i = 0; i < fileList.length; i++) {
			contentTypes.add(MediaType.IMAGE_PNG_VALUE);

		}
		// byte[][] allImages = getMultipleImageResponse(boundary,fileList,
		// contentTypes,imagesData);

		ImageUploadResponse ir = new ImageUploadResponse(num + "", objects);
//	    final HttpHeaders headers = new HttpHeaders();
//	    headers.set("Content-Type","multipart/x-mixed-replace; boundary=" + boundary);
//	    System.out.println(ir.toString());

		return new ResponseEntity<>(ir, HttpStatus.CREATED);
	}

	private static byte[] concat(byte[] a, byte[] b) {
		byte[] r = Arrays.copyOf(a, a.length + b.length);
		System.arraycopy(r, a.length, b, 0, b.length);

		return r;
	}

	private static byte[][] getMultipleImageResponse(String boundary, File[] fileList, List<String> contentTypes,
			List<byte[]> imagesData) {
		byte[][] finalByteArray = new byte[fileList.length][0];
		Integer imagesCounter = -1;
		for (File imageName : fileList) {
			imagesCounter++;

			byte[] currentImageByteArray = Base64.encodeBase64(imagesData.get(imagesCounter));

			finalByteArray[imagesCounter] = currentImageByteArray;
		}
		return finalByteArray;
	}

	private static byte[] getMultipleImageResponse(byte[] imagesData) {
		return Base64.encodeBase64(imagesData);

	}

	public void moveFile(final String sourcePath, final String destinationPath) throws NullPointerException {
		File sourceFile = new File(sourcePath);
		sourceFile.renameTo(new File(destinationPath));
	}
	
	private final String yolactBasePath = "C:\\Users\\multicampus\\s03p23a409\\yolact\\";
	private final String edgeBasePath = "C:\\Users\\multicampus\\s03p23a409\\edge-connect\\";
	
	// object select 할때 yolact 실행
	@RequestMapping(value = "/select", method = RequestMethod.POST)
	public ResponseEntity<ImageUploadResponse> handleFileSelect(@RequestBody Map<Object, Object> body)
			throws InterruptedException {
		ResponseEntity<ImageUploadResponse> res = null;
		try {
			String key = (String) body.get("key");
			List<Object> index = (List<Object>) body.get("check");
//			System.out.println(body.toString());
//			// Object[] index = (Object[]) body.get("check");
//			System.out.println(key);
//			System.out.println(index);

			// System.out.println(index.size());
			// 난수 생성
			filename = key + ".png";// 랜덤으로 뽑은 수 파일 명으로 저장

//	            //파일 명 찾기..?
			File path = new File(yolactBasePath + "images\\output\\");
			File[] fileList = Arrays.stream(path.listFiles())
					.filter(e -> e.getName().indexOf(String.valueOf(key)) != -1).toArray(File[]::new);
			String name = "";
			StringBuilder skipBuilder = new StringBuilder("--skip=[");
			List<String> skipList = new ArrayList<>();
			for (File file : fileList) {
//				System.out.println(file.getName());
				name = file.getName().split("\\.")[0];
				String[] arr = name.split("_");
				if (arr.length < 2)
					continue;
				String type = arr[1];
				if (!type.equals("mask") && !type.equals("background")) {
					String id = arr[2];
					boolean contain = false;
					for (Object object : index) {
						if (Integer.parseInt(id) == (int) object) {
							contain = true;
						}

					}
					if (!contain) {
						skipList.add(id);
					}
				}
			}
			skipBuilder.append(String.join(",", skipList)).append("]");
			String skip = skipBuilder.toString();
//			System.out.println(skip);

			List<String> contentTypes = new ArrayList<>();
			for (int i = 0; i < fileList.length; i++) {
				contentTypes.add(MediaType.IMAGE_PNG_VALUE);

			}

			Runtime rt = Runtime.getRuntime();
			Process p = null;
			
			// conda run -n my-python-2-env python --version
			String anacondaExec = "C:\\ProgramData\\Anaconda3\\condabin\\conda.bat activate edge_env";
			String ypath = "C:\\Users\\multicampus\\s03p23a409\\yolact\\eval.py";
			String inputPath = "C:\\Users\\multicampus\\s03p23a409\\yolact\\" + "images\\input\\" + filename;
			String outputPath = "C:\\Users\\multicampus\\s03p23a409\\yolact\\" + "images\\output\\" + filename;
			String[] envp = { "python", ypath,
					"--trained_model=C:\\Users\\multicampus\\s03p23a409\\yolact\\weights\\yolact_base_54_800000.pth",
					"--score_threshold=0.11", "--top_k=50", "--image=" + inputPath + ":" + outputPath, skip };

			// String sg = "--skip=[1,2,3,4,5,6,7,8,9,10,11,12,13,0]";
			String pythonCommand = String.join(" ", envp);

			
			
			String edgeExec = edgeBasePath + "test.py";
			String edgeinputPathfold = edgeBasePath + "examples\\places2\\origin\\";
			String edgeinputPath = edgeBasePath + "examples\\places2\\origin\\" + filename;
			String edgeOutputPath = edgeBasePath + "checkpoints\\results";

			// --checkpoints ./checkpoints/places2 --input ./examples/places2/images --mask
			// ./examples/places2/masks --output ./checkpoints/results
			String[] edgeEnvp = { "python", edgeExec,
					"--checkpoints " + edgeBasePath + "checkpoints\\places2",
					"--input " + edgeBasePath + "examples\\places2\\images\\" + filename,
					"--mask " + edgeBasePath + "examples\\places2\\masks\\" + filename,
					"--output " + edgeOutputPath };

			// String sg = "--skip=[]1,2,3,4,5,6,0]";

			String edgepythonCommand = String.join(" ", edgeEnvp);
			
			try {
				// yolact eval.py 파일 실행
				System.out.println("Exec: " + (anacondaExec + " && " + pythonCommand));
				p = rt.exec(anacondaExec + " && " + pythonCommand);
//				System.out.println(p);
//				System.out.println("다시 실행 yolact...");
				p.waitFor();
				BufferedReader br = new BufferedReader(new InputStreamReader(p.getErrorStream()));
				StringBuilder sb = new StringBuilder();
				String line;
				while ((line = br.readLine()) != null) {
					sb.append(line).append('\n');
				}
//				System.out.println("> exit value: " + p.exitValue() + ", \n" + sb.toString());
				p.destroy();
				// 파일 이동 

				String sourceImagePath = yolactBasePath + "images\\output\\" + filename;
				String sourceMaskPath = yolactBasePath + "images\\output\\" + key + "_mask.png";
				String destinationImagePath = edgeBasePath + "examples\\places2\\origin\\" + filename;
				String destinationMaskPath = edgeBasePath + "examples\\places2\\origin\\" + key + "_mask.png";
				
				moveFile(sourceImagePath, destinationImagePath);
				moveFile(sourceMaskPath, destinationMaskPath);

				System.out.println("Exec: " + (anacondaExec + " && " + edgepythonCommand));
				p = rt.exec(anacondaExec + " && " + edgepythonCommand);
//				System.out.println(p);
//				System.out.println("edge실행 완료");

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				p.waitFor();
				BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
				StringBuilder sb = new StringBuilder();
				String line;
				while ((line = br.readLine()) != null) {
					sb.append(line).append('\n');
				}
				System.out.println("> exit value: " + p.exitValue() + ", \n" + sb.toString());
				res = showImages();
				p.destroy();
//				System.out.println(res.toString());
			}

		} catch (IOException ioe) {
//			System.out.println("살패으아으아ㅡ아ㅡ아ㅡㅏ");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		return res;
	}

	// 객체 선택한 이미지 받아서 최종 결과 보내기
	@RequestMapping(value = "/result", method = RequestMethod.POST)
	public ResponseEntity<ImageUploadResponse> handleResult(@RequestParam("img") MultipartFile file)
			throws InterruptedException {
		try {

			filename = num + ".png";// 랜덤으로 뽑은 수 파일 명으로 저장

			// System.out.printf("File name=%s, size=%s\n", filename,file.getSize());

			File fileToSave = new File(
					"C:\\Users\\multicampus\\s03p23a409\\edge-connect\\examples\\places2\\origin\\" + filename);

			String name = file.getOriginalFilename();

			file.transferTo(fileToSave);
			Runtime rt = Runtime.getRuntime();
			Process p = null;

			try {
				// edge-connect test.py 파일 실행
			
				System.out.println(p);
				System.out.println("check");
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				p.waitFor();
				BufferedReader br = new BufferedReader(new InputStreamReader(p.getErrorStream()));
				StringBuilder sb = new StringBuilder();
				String line;
				while ((line = br.readLine()) != null) {
					sb.append(line).append('\n');
				}

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
	
	

		
}
