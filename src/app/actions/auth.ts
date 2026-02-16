"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
	emailOtpSchema,
	forgotPasswordSchema,
	loginSchema,
	updatePasswordSchema,
} from "@/lib/validations/auth";

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

export async function resendVerificationOtpAction(
	prevState: AuthState,
	formData: FormData
): Promise<AuthState> {
	const email = formData.get("email") as string;

	const parsed = emailOtpSchema.pick({ email: true }).safeParse({ email });

	if (!parsed.success) {
		const message =
			parsed.error.issues[0]?.message || "Please enter a valid email address";
		return { error: message };
	}

	try {
		const res = await auth.api.sendVerificationOTP({
			body: {
				email: parsed.data.email,
				type: "email-verification",
			},
			headers: await headers(),
		});

		if (!res) {
			return { error: "Could not resend verification code" };
		}

		return { success: true, email: parsed.data.email };
	} catch (error: any) {
		return { error: error.message || "Failed to resend verification code" };
	}
}

export async function requestPasswordResetAction(
	prevState: AuthState,
	formData: FormData
): Promise<AuthState> {
	const email = formData.get("email") as string;

	const parsed = forgotPasswordSchema.safeParse({ email });

	if (!parsed.success) {
		const message =
			parsed.error.issues[0]?.message || "Please enter a valid email address";
		return { error: message };
	}

	try {
		const res = await auth.api.requestPasswordReset({
			body: {
				email: parsed.data.email,
				redirectTo:
					process.env.NEXT_PUBLIC_APP_URL +
					"/reset-password",
			},
		});

		if (!res) {
			return { error: "Unable to send reset instructions" };
		}

		return { success: true };
	} catch (error: any) {
		return {
			error: error.message || "Unable to send reset instructions",
		};
	}
}

export async function resetPasswordAction(
	prevState: AuthState,
	formData: FormData
): Promise<AuthState> {
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;
	const token = formData.get("token") as string | null;

	if (!token) {
		return { error: "Reset link is invalid or expired" };
	}

	const parsed = updatePasswordSchema.safeParse({
		password,
		confirmPassword,
	});

	if (!parsed.success) {
		const message =
			parsed.error.issues[0]?.message ||
			"Please check your new password and try again";
		return { error: message };
	}

	try {
		const res = await auth.api.resetPassword({
			body: {
				newPassword: parsed.data.password,
				token,
			},
		});

		if (!res) {
			return { error: "Unable to reset password" };
		}

		return { success: true };
	} catch (error: any) {
		return {
			error: error.message || "Unable to reset password",
		};
	}
}

export async function signOutAction() {
	await auth.api.signOut({
		headers: await headers(),
	});
	updateTag("session");
	redirect("/login");
}
