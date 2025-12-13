import Image from "next/image";

export default function CardiacoreDetail() {
  return (
    <section className="  px-44 py-24">
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold text-primary">Details</h2>
        <ul className="list-disc space-y-2 ps-4">
          <li>Medical Records (Postnatal subject medical record data)</li>
          <li>
            Inference Hole (The position information of postnatal cardiac hole)
          </li>
          <li>
            AI-assisted Postnatal Cardiac Septal Defects Prediction (CardiaCore
            is capable of predicting postnatal cardiac septal defects)
          </li>
        </ul>
        <div className="aspect-video w-full border-2 border-gray-600" />
      </div>

      <div className="mt-24 space-y-8">
        <div className="">
          <p className="text-lg text-gray-700">
            The ultrasonography video-recording dataset, comprising both normal
            and cardiac septal defects conditions—including atrial septal
            defects (ASDs), ventricular septal defects (VSDs), and
            atrioventricular septal defects (AVSDs) on apical four-chamber
            (A4CH), apical five-chamber (A5CH), parasternal long axis (PLAX),
            parasternal short axis (PSAX), and subcostal (SC).
          </p>
          <figure className="relative my-12 aspect-video w-full">
            <Image
              src={
                "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F19c76563762baeba93cd82dae4d8878ab59267fc-8457x4500.jpg%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75"
              }
              fill
              className="object-contain object-center"
              alt=""
            />
          </figure>
          <p className="py-4 text-lg text-gray-700">
            The framework of CardiaCore is as follows:
          </p>
          <ul className="list-disc space-y-2 ps-4">
            <li>
              Postnatal cardiac normal-abnormal classification: With
              AI-assisted, CardiaCore is trained to distinguish between normal
              and abnormal postnatal cardiac anatomy.
            </li>
            <li>
              Standard view classification: With AI-assisted, CardiaCore is
              trained to classify images based on standard echocardiographic
              views.
            </li>
            <li>
              Cardiac septal defect detection: After a cardiac abnormality is
              detected and the view is classified, CardiaCore detects specific
              cardiac defects.
            </li>
            <li>
              Decision-making algorithm: The final step integrates medical
              knowledge to make a precise decision based on the presence,
              position, and type of defect, as well as the echocardiographic
              view.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
