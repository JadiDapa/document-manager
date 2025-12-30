import SignInForm from "@/components/auth/sign-in/SignInForm";
import AuthHeader from "@/components/auth/AuthHeader";
import Image from "next/image";

export default function SignInPage() {
  return (
    <section className="flex min-h-screen overflow-hidden">
      <div className="relative hidden flex-1 lg:block">
        <Image
          src="https://static.vecteezy.com/system/resources/previews/006/663/308/large_2x/3d-cloud-storage-design-icon-digital-file-organization-free-vector.jpg"
          fill
          className="object-cover object-center"
          alt="Auth Image"
        />
      </div>

      <main className="bg-card flex w-full flex-col items-center justify-center rounded-e-4xl p-8 shadow-2xl lg:w-[45%] lg:px-40">
        <AuthHeader
          title="Sign In Now!"
          subtitle="Sebelum melangkah lebih lanjut, silahkan masuk terlebih dahulu!"
        />
        <SignInForm />
      </main>
    </section>
  );
}
