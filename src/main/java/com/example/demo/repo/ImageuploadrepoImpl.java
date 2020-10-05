package com.example.demo.repo;


import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.dto.ImageuploadDto;

@Repository
public class ImageuploadrepoImpl implements Imageuploadrepo {
	
	private static String ns = "com.example.demo.mapper.ImageuploadDto.";
	
	@Autowired
	SqlSessionTemplate template;
	@Override
	public int insertimageupload(ImageuploadDto image) {
		return template.insert(ns+ "imageupload",image);
	}

}
