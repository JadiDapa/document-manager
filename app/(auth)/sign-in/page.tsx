import SignInForm from "@/components/auth/sign-in/SignInForm";
import AuthHeader from "@/components/auth/AuthHeader";
import Image from "next/image";

export default function SignInPage() {
  return (
    <section className="flex min-h-screen overflow-hidden">
      <div className="relative hidden flex-1 brightness-80 lg:block">
        <Image
          src="https://corenews.id/wp-content/uploads/2024/08/Pusri-Palembang.jpg"
          fill
          className="object-cover object-center"
          alt="Auth Image"
        />
      </div>

      <main className="bg-card flex w-full flex-col items-center justify-center rounded-e-4xl p-8 shadow-2xl lg:w-[46%] lg:px-36">
        <AuthHeader
          title="Selamat Datang!"
          subtitle="masuk terlebih dahulu sebelum melangkah lebih lanjut untuk ke Pengarsipan PT PUSRI!"
        />
        <SignInForm />
      </main>
    </section>
  );
}
