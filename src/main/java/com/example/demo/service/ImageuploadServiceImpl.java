package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ImageuploadDto;
import com.example.demo.repo.Imageuploadrepo;

@Service
public class ImageuploadServiceImpl implements ImageuploadService {

	@Autowired
	Imageuploadrepo irepo;



	@Override
	public int insertimageupload(ImageuploadDto image) {
		// TODO Auto-generated method stub
		return irepo.insertimageupload(image);
	}

}
