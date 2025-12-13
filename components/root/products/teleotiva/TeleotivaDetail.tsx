import { Download, File } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function TeleotivaDetail() {
  return (
    <section className="  px-44 py-24">
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold text-primary">Details</h2>
        <p className="text-4xl font-semibold">Demo Aplikasi TeleOTIVA</p>
        <div className="aspect-video w-full border-2 border-gray-600" />
      </div>

      <div className="mt-24 space-y-8">
        <p className="text-4xl font-semibold">User Manual TeleOTIVA</p>

        <div className="flex overflow-hidden rounded-lg">
          <div className="grid size-12 place-items-center bg-red-200">
            <File className="text-primary" />
          </div>
          <div className="flex h-12 items-center justify-center gap-4 bg-red-100 px-6">
            <p>User Manual</p>
            <Download className="text-primary" />
          </div>
        </div>

        <div className="">
          <p className="text-lg text-gray-700">
            Tele-OTIVA is a mobile phone-based technology that utilizes an AI
            model to detect precancerous cervical lesions using cervicography
            data. The models performance was tested through several stages:
            evaluating the AI model, having oncology-gynecologists assess
            cervicography images taken by healthcare workers, and conducting
            direct tests on 1,611 women aged 20 to 50 at Dr. Mohammad Hoesin
            Hospital in Palembang and 12 primary health centers. Twelve
            healthcare workers were trained to use the application, called the
            TeleOTIVA App. Four mobile phones—OVO, Infinix, Xiaomi Redmi, and
            Samsung—were used to evaluate the processing speed and quality of
            VIA images.
          </p>
          <figure className="relative my-12 aspect-video w-full">
            <Image
              src={
                "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Ff50a614aa84e423e795b836e2f6822f0c4e185a8-1920x1080.png%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75"
              }
              fill
              className="object-contain object-center"
              alt=""
            />
          </figure>
          <p className="text-lg text-gray-700">
            The system architecture employs a detailed approach, using
            Python/PyTorch for cervical image segmentation, detection, and
            classification through the YoloSegv8 architecture. Golang is
            responsible for create, read, update, and delete (CRUD) operations,
            while Flutter is used for mobile app development. A cloud server
            handles data processing and learning tasks. Docker is employed to
            manage the server and prevent service overlap, and SQL is used to
            store data from various system processes, including medical record
            input, image prediction, treatment, and recommendations from
            oncology-gynecology subspecialists. Product development will focus
            on enhancing patient databases, improving service detection systems,
            optimizing UI/UX interfaces, and strengthening data and information
            security measures (see Figure 1).
          </p>
        </div>
      </div>
    </section>
  );
}
