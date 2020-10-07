package com.example.demo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data

public class ImageObject {
	String file_name;
	String type;
	int id;
	byte[] image;
	public ImageObject(String file_name, String type, int id, byte[] image) {
		super();
		this.file_name = file_name;
		this.type = type;
		this.id = id;
		this.image = image;
	}
	
	
}
