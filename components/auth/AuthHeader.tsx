import Image from "next/image";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="">
      <div className="text-primary flex items-center justify-center gap-6 text-3xl font-semibold tracking-wide">
        <figure className="relative size-16">
          <Image
            src={"/images/logo.png"}
            fill
            className="object-contain object-center"
            alt=""
          />
        </figure>
        <div className="leading-tight">
          <p className="text-primary text-2xl">Pengarsipan</p>
          <p className="text-4xl text-yellow-400">PUSRI</p>
        </div>
      </div>

      <h1 className="text-primary mt-10 text-center text-3xl font-medium lg:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-2 max-w-sm text-center text-sm">{subtitle}</p>
    </div>
  );
}
