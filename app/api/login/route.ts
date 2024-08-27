import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	const { email, password } = await request.json();

	if (!email || !password) {
		return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { email: email },
		});

		if (!user) {
			return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

		return NextResponse.json({ token }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
	}
}
