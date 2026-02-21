import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin, emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword({ user, url, token }, request) {
      console.log("sendResetPassword", { email: user.email, url, token });
    },
    async onPasswordReset({ user }, request) {
      console.log("onPasswordReset", { email: user.email });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
  },
  plugins: [
    admin({
      defaultRole: "user",
    }),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        console.log("sendVerificationOTP", { email, otp, type });
      },
    }),
    nextCookies(),
  ],
});
