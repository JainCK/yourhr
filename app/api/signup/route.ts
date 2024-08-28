import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const experience = formData.get('experience') as string;
  const jobCategory = formData.get('jobCategory') as string;
  const expectedLPA = formData.get('expectedLPA') as string;
  const password = formData.get('password') as string;
  const resume = formData.get('resume') as File;

  if (!name || !email || !phone || !experience || !jobCategory || !expectedLPA || !password || !resume) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ error: 'JWT_SECRET is not set' }, { status: 500 });
  }

  try {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
    
    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const resumeFileName = `${Date.now()}-${resume.name}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: resumeFileName,
      Body: buffer,
      ContentType: resume.type,
    };
    
    await s3Client.send(new PutObjectCommand(uploadParams));
    
    const resumeUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${resumeFileName}`;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        experience: parseInt(experience),
        jobCategory,
        expectedLPA: parseFloat(expectedLPA),
        resume: resumeUrl,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}