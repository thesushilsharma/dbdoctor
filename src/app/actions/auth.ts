"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { emailOtpSchema, loginSchema } from "@/lib/validations/auth";

export type AuthState = {
	error?: string;
	success?: boolean;
	email?: string;
} | null;

export async function signInAction(
	prevState: AuthState,
	formData: FormData
): Promise<AuthState> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const rememberMe = formData.get("remember") === "on";

	const parsed = loginSchema.safeParse({ email, password });
	if (!parsed.success) {
		const message = parsed.error.issues[0]?.message || "Invalid credentials";
		return { error: message };
	}

	try {
		// Better-auth server-side sign in
		const res = await auth.api.signInEmail({
			body: {
				email: parsed.data.email,
				password: parsed.data.password,
				rememberMe,
			},
			headers: await headers(),
		});

		if (!res) {
			return { error: "Invalid email or password" };
		}

		// Invalidate session cache
		updateTag("session");

		return { success: true };
	} catch (error: any) {
		return { error: error.message || "An error occurred during sign in" };
	}
}

export async function signUpAction(
	prevState: AuthState,
	formData: FormData
): Promise<AuthState> {
	const givenName = formData.get("givenName") as string;
	const familyName = formData.get("familyName") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (password !== confirmPassword) {
		return { error: "Passwords do not match" };
	}

	try {
		const res = await auth.api.signUpEmail({
			body: {
				email,
				password,
				name: `${givenName} ${familyName}`,
			},
			headers: await headers(),
		});

		if (!res) {
			return { error: "Failed to create account" };
		}

		// Invalidate session cache
		updateTag("session");

		return { success: true, email };
	} catch (error: any) {
		return { error: error.message || "An error occurred during sign up" };
	}
}

export async function verifyEmailOtpAction(
	prevState: AuthState,
	formData: FormData
): Promise<AuthState> {
	const email = formData.get("email") as string;
	const otp = formData.get("otp") as string;

	const parsed = emailOtpSchema.safeParse({ email, otp });

	if (!parsed.success) {
		const message =
			parsed.error.issues[0]?.message || "Invalid verification code";
		return { error: message };
	}

	try {
		const res = await auth.api.checkVerificationOTP({
			body: {
				email: parsed.data.email,
				type: "email-verification",
				otp: parsed.data.otp,
			},
			headers: await headers(),
		});

		if (!res) {
			return { error: "Invalid or expired verification code" };
		}

		updateTag("session");

		return { success: true, email: parsed.data.email };
	} catch (error: any) {
		return { error: error.message || "Failed to verify email" };
	}
}

export async function signOutAction() {
	await auth.api.signOut({
		headers: await headers(),
	});
	updateTag("session");
	redirect("/login");
}
