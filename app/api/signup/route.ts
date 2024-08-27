import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { writeFile } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

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
    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const resumeFileName = `${Date.now()}-${resume.name}`;
    const resumePath = path.join(process.cwd(), 'uploads', resumeFileName);
    await writeFile(resumePath, buffer);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        experience: parseInt(experience),
        jobCategory,
        expectedLPA: parseFloat(expectedLPA),
        resume: `/uploads/${resumeFileName}`,
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