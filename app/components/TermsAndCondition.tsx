// components/TermsAndConditions.tsx
import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="md:px-20 px-5 text-justify my-44">
      <h1 className="text-4xl font-bold mb-10 uppercase text-primary">
        Terms of service
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-primary">
          1. Introduction
        </h2>
        <p>
          Welcome to our website! By accessing or using our service, you agree
          to comply with and be bound by the following terms and conditions. If
          you do not agree to these terms, please do not use our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-primary">
          2. Use of the Website
        </h2>
        <p>
          You agree to use our website only for lawful purposes and in a way
          that does not infringe on the rights of, restrict, or inhibit anyone
          else’s use of the website. Prohibited behavior includes harassing,
          causing distress or inconvenience to any other user, and transmitting
          obscene or offensive content.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-primary">
          3. Intellectual Property
        </h2>
        <p>
          All content, including text, graphics, logos, and images, is the
          property of our website or its content suppliers. You may not
          reproduce, distribute, or create derivative works of such content
          without our prior written consent.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-primary">
          4. Termination
        </h2>
        <p>
          We reserve the right to terminate or suspend your access to our
          website at any time, without notice, for conduct that we believe
          violates these terms or is harmful to other users of the website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-primary">
          5. Limitation of Liability
        </h2>
        <p>
          Our website and its content are provided on an &rdquo;as is&rdquo;
          basis, without any warranties of any kind. We will not be liable for
          any damages of any kind arising from the use of our website, including
          but not limited to direct, indirect, incidental, punitive, and
          consequential damages.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-primary">
          6. Changes to the Terms
        </h2>
        <p>
          We may update these terms from time to time. Any changes will be
          effective immediately upon posting on the website. Your continued use
          of the website after any changes constitutes your agreement to the new
          terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-primary">
          7. Governing Law
        </h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of [Your Country/State]. You agree to submit to the
          exclusive jurisdiction of the courts of [Your Country/State].
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-primary">
          8. Contact Information
        </h2>
        <p>
          If you have any questions about these terms and conditions, please
          contact us at [Your Contact Email or Phone Number].
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
