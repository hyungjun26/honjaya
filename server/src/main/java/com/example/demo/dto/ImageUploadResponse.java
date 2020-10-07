package com.example.demo.dto;

import java.util.Arrays;
import java.util.List;

import lombok.Data;

@Data
public class ImageUploadResponse {
	String key;
	List<ImageObject> objects;
	
	public ImageUploadResponse(String key, List<ImageObject> objects) {
		super();
		this.key = key;
		this.objects = objects;
	}

	
	
	
}
