package com.example.demo.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;


import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.commons.io.FileUtils;

import org.slf4j.LoggerFactory;

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
			filename = num + ".png";// 랜덤으로 뽑은 수 파일 명으로 저장

	//		System.out.printf("File name=%s, size=%s\n", filename, file.getSize());
			File fileToSave = new File("C:\\Users\\multicampus\\s03p23a409\\yolact\\images\\input\\" + filename);
			String name = file.getOriginalFilename();
			file.transferTo(fileToSave);

			Runtime rt = Runtime.getRuntime();
			Process p = null;

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
				p.destroy();
			}

		} catch (IOException ioe) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		return res;
	}

	// 디텍션한 이미지 보내기
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
			name = file.getName().split("\\.")[0];
			String[] arr = name.split("_");
			idx += 1;
			if (arr.length < 2)
				continue;
			String type = arr[1];

			if (!type.equals("mask") && !type.equals("background")) {
				id = arr[2];
				ImageObject io = new ImageObject(file.getName(), type, Integer.parseInt(id), imagesData.get(idx - 1));
				objects.add(io);
			}
		}

		List<String> contentTypes = new ArrayList<>();
		for (int i = 0; i < fileList.length; i++) {
			contentTypes.add(MediaType.IMAGE_PNG_VALUE);
		}
		
		ImageUploadResponse ir = new ImageUploadResponse(num + "", objects);

		return new ResponseEntity<>(ir, HttpStatus.CREATED);
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

			filename = key + ".png";// 랜덤으로 뽑은 수 파일 명으로 저장

			File path = new File(yolactBasePath + "images\\output\\");
			File[] fileList = Arrays.stream(path.listFiles())
					.filter(e -> e.getName().indexOf(String.valueOf(key)) != -1).toArray(File[]::new);
			String name = "";
			StringBuilder skipBuilder = new StringBuilder("--skip=[");
			List<String> skipList = new ArrayList<>();
			for (File file : fileList) {

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

			List<String> contentTypes = new ArrayList<>();
			for (int i = 0; i < fileList.length; i++) {
				contentTypes.add(MediaType.IMAGE_PNG_VALUE);

			}

			Runtime rt = Runtime.getRuntime();
			Process p = null;

			String anacondaExec = "C:\\ProgramData\\Anaconda3\\condabin\\conda.bat activate edge_env";
			String ypath = "C:\\Users\\multicampus\\s03p23a409\\yolact\\eval.py";
			String inputPath = "C:\\Users\\multicampus\\s03p23a409\\yolact\\" + "images\\input\\" + filename;
			String outputPath = "C:\\Users\\multicampus\\s03p23a409\\yolact\\" + "images\\output\\" + filename;
			String[] envp = { "python", ypath,
					"--trained_model=C:\\Users\\multicampus\\s03p23a409\\yolact\\weights\\yolact_base_54_800000.pth",
					"--score_threshold=0.11", "--top_k=50", "--image=" + inputPath + ":" + outputPath, skip };

			String pythonCommand = String.join(" ", envp);

			String edgeExec = edgeBasePath + "test.py";
			String edgeinputPathfold = edgeBasePath + "examples\\places2\\origin\\";
			String edgeinputPath = edgeBasePath + "examples\\places2\\origin\\" + filename;
			String edgeOutputPath = edgeBasePath + "checkpoints\\results";

			String[] edgeEnvp = { "python", edgeExec, "--checkpoints " + edgeBasePath + "checkpoints\\places2",
					"--input " + edgeBasePath + "examples\\places2\\images\\" + filename,
					"--mask " + edgeBasePath + "examples\\places2\\masks\\" + filename, "--output " + edgeOutputPath };

			String edgepythonCommand = String.join(" ", edgeEnvp);

			try {
				// yolact eval.py 파일 실행
				// System.out.println("Exec: " + (anacondaExec + " && " + pythonCommand));
				p = rt.exec(anacondaExec + " && " + pythonCommand);

				p.waitFor();
				BufferedReader br = new BufferedReader(new InputStreamReader(p.getErrorStream()));
				StringBuilder sb = new StringBuilder();
				String line;
				while ((line = br.readLine()) != null) {
					sb.append(line).append('\n');
				}

				p.destroy();
				// 파일 이동

				String sourceImagePath = yolactBasePath + "images\\output\\" + filename;
				String sourceMaskPath = yolactBasePath + "images\\output\\" + key + "_mask.png";
				String destinationImagePath = edgeBasePath + "examples\\places2\\origin\\" + filename;
				String destinationMaskPath = edgeBasePath + "examples\\places2\\origin\\" + key + "_mask.png";

				moveFile(sourceImagePath, destinationImagePath);
				moveFile(sourceMaskPath, destinationMaskPath);

				// System.out.println("Exec: " + (anacondaExec + " && " + edgepythonCommand));
				p = rt.exec(anacondaExec + " && " + edgepythonCommand);

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
				// System.out.println("> exit value: " + p.exitValue() + ", \n" +
				// sb.toString());
				res = showResultImages(edgeOutputPath + "\\" + filename);
				p.destroy();
			}

		} catch (IOException ioe) {
			ioe.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		return res;
	}

	// 결과 이미지 보내기
	public ResponseEntity<ImageUploadResponse> showResultImages(String filePath) throws IOException {
		File result = new File(filePath);
		List<byte[]> imagesData = new ArrayList<byte[]>();
		imagesData.add(FileUtils.readFileToByteArray(result));

		List<ImageObject> objects = new ArrayList<ImageObject>();
		ImageObject io = new ImageObject(result.getName(), "result", 0, imagesData.get(0));

		objects.add(io);

		List<String> contentTypes = new ArrayList<>();
		contentTypes.add(MediaType.IMAGE_PNG_VALUE);

		ImageUploadResponse ir = new ImageUploadResponse(num + "", objects);

		return new ResponseEntity<>(ir, HttpStatus.CREATED);
	}

}
